import { useFrame, useThree } from "@react-three/fiber";
import { countries } from "countries-languages";
import { useEffect, useRef } from "react";
import { Color } from "three";
import G from "three-globe";
import { COLOR_PALETTE, GLOBE_HIGHLIGHT_COLOR, GLOBE_SIDE_COLOR } from "../../constants";
import type { Countries, Language } from "../../types";
import HologramMaterial from "./icon/HologramMaterial";

export default function Globe(props: { langauge?: Language }) {
	const { scene, clock } = useThree();
	const materialRef = useRef<HologramMaterial>(null);
	const globeRef = useRef<G>(null);

	useFrame(({ clock }) => {
		materialRef.current?.update(clock);
		if (globeRef.current) globeRef.current.rotateY(-clock.getDelta() / 3);
	});

	useEffect(() => {
		materialRef.current = new HologramMaterial(new Color(COLOR_PALETTE.PRIMARY), 70);
		materialRef.current.start(clock);

		const g = (globeRef.current = new G().globeMaterial(materialRef.current));
		g.position.setY(1.3);
		g.children.forEach((child) => child.scale.setScalar(0.008));

		scene.add(g);

		fetch("/dependencies/geodata.json")
			.then((res) => res.json())
			.then((countries) => {
				console.log(countries);
				g.polygonsData(countries.features)
					.polygonCapColor(() => COLOR_PALETTE.PRIMARY)
					.polygonSideColor(() => GLOBE_SIDE_COLOR);

				// g.polygonAltitude((feat) => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST) * 4e-5));
				g.polygonAltitude(() => Math.random() * 0.2 + 0.2);
			});

		return () => {
			g.clear();
			scene.remove(g);
		};
	}, [clock, scene]);

	useEffect(() => {
		if (!globeRef.current) return;

		if (!props.langauge) {
			globeRef.current.polygonCapColor(() => COLOR_PALETTE.PRIMARY).polygonSideColor(() => GLOBE_SIDE_COLOR);
			globeRef.current.polygonAltitude(() => Math.random() * 0.2 + 0.2);

			return;
		}

		const highlightedCountries: string[] = [];
		for (const country in countries as Countries) {
			if ((countries as Countries)[country].languages[props.langauge.iso]) {
				highlightedCountries.push((countries as Countries)[country].name.common);
			}
		}

		globeRef.current.polygonCapColor((feat) =>
			highlightedCountries.includes((feat as { properties: { NAME: string } }).properties.NAME)
				? GLOBE_HIGHLIGHT_COLOR
				: COLOR_PALETTE.PRIMARY
		);
		globeRef.current.polygonAltitude((feat) =>
			highlightedCountries.includes((feat as { properties: { NAME: string } }).properties.NAME) ? 0.2 : 0.1
		);
	}, [props.langauge]);

	return null;
}
