import { useFrame, useThree } from "@react-three/fiber";
import { countries } from "countries-languages";
import { useEffect, useRef } from "react";
import { Color } from "three";
import G from "three-globe";
import { COLOR_PALETTE } from "../../../constants";
import { languages } from "../../../content/about-me";
import type { ContentData, Countries, Language } from "../../../types";
import HologramMaterial from "../icon/HologramMaterial";

const COUNTRY_COLOR = "#21a3d2ff";
const COUNTRY_HIGHLIGHT_COLOR = "#3ecafdff";
const COUNTRY_STROKE = "#141d9c61";

const SIDE_COLOR = "#1abaff1c";
const SIDE_HIGHLIGHT_COLOR = "#1aabff75";

const POLYGON_OFFSET = 0.3;

export default function Globe(props: { language: ContentData | null }) {
	const { scene, clock } = useThree();
	const materialRef = useRef<HologramMaterial>(null);
	const globeRef = useRef<G>(null);
	const lang = (props.language as Language)?.iso ? (props.language as Language) : undefined;

	useFrame(({ clock }) => {
		materialRef.current?.update(clock);
		if (globeRef.current) globeRef.current.rotateY(0.01);
	});

	useEffect(() => {
		materialRef.current = new HologramMaterial(new Color(COLOR_PALETTE.PRIMARY), 70);
		materialRef.current.start(clock);

		const g = (globeRef.current = new G().globeMaterial(materialRef.current));
		g.position.set(-1.5, 1.7, -0.4);
		g.children.forEach((child) => child.scale.setScalar(0.008));

		scene.add(g);

		const highlightedCountries = highlightCountries();

		fetch("/dependencies/geodata.json")
			.then((res) => res.json())
			.then((countries) => {
				g.polygonsData(countries.features)
					.polygonCapColor((feat) =>
						isLangSpoken(feat, highlightedCountries) ? COUNTRY_HIGHLIGHT_COLOR : COUNTRY_COLOR,
					)
					.polygonStrokeColor(() => COUNTRY_STROKE)
					.polygonSideColor(() => SIDE_COLOR);

				g.polygonAltitude(() => POLYGON_OFFSET);
			});

		return () => {
			g.clear();
			scene.remove(g);
		};
	}, [clock, scene]);

	useEffect(() => {
		if (!globeRef.current) return;

		if (!lang) {
			globeRef.current.polygonAltitude(() => POLYGON_OFFSET).polygonSideColor(() => SIDE_COLOR);
			return;
		}

		const highlightedCountries = highlightCountries(lang);

		globeRef.current
			.polygonAltitude((feat) => POLYGON_OFFSET + (isLangSpoken(feat, highlightedCountries) ? 0.2 : -0.2))
			.polygonSideColor((feat) => (isLangSpoken(feat, highlightedCountries) ? SIDE_HIGHLIGHT_COLOR : SIDE_COLOR));
	}, [lang]);

	return null;
}

function isLangSpoken(feat, highlightedCountries: string[]) {
	return highlightedCountries.includes((feat as { properties: { NAME: string } }).properties.NAME);
}

function highlightCountries(language?: Language) {
	function check(country) {
		if (language) {
			return (countries as Countries)[country].languages[language.iso];
		} else {
			return languages.some((lang) => (countries as Countries)[country].languages[lang.iso]);
		}
	}

	const highlightedCountries: string[] = [];
	for (const country in countries as Countries) {
		if (check(country)) {
			highlightedCountries.push((countries as Countries)[country].name.official);
			highlightedCountries.push((countries as Countries)[country].name.common);
		}
	}

	return highlightedCountries;
}
