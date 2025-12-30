import type { Language } from "../types";
import { prettifyTitle } from "../utils";
import { contacts } from "./contacts";
import { education } from "./education";
import { experience } from "./experience";

const languages: Language[] = [
	{ id: "bulgarian", iso: "bul" },
	{ id: "dutch", iso: "nld" },
	{ id: "english", iso: "eng" },
	{ id: "french", iso: "fra" },
	{ id: "german", iso: "deu" },
	{ id: "italian", iso: "ita" },
	{ id: "portuguese", iso: "por" },
	{ id: "spanish", iso: "spa" },
	// {id: "russian", iso: "rus"},
].map(({ id, iso }, i, total) => {
	i -= (total.length - 1) / 2;

	return {
		id,
		title: prettifyTitle(id),
		icon: `/icons/languages/${id}.svg`,
		iso,
		icon3D: {
			position: [i * 0.7 - 0.3, 0, 0.6] as [number, number, number],
			rotation: [-Math.PI / 5, 0, 0] as [number, number, number],
			scale: 0.015,
			wide: true,
		},
	};
});

const content = { experience, education, languages, contacts };
export default content;
