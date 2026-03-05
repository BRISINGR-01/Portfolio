import type { Contact, Language } from "../types";
import { prettifyTitle } from "../utils";

export const languages: Language[] = [
	{
		id: "bulgarian",
		iso: "bul",
		icon3D: {
			position: [-2.85, 0.06, 0.4] as [number, number, number],
			rotation: [-Math.PI / 10, -0.3, 0.1] as [number, number, number],
			scale: 0.015,
			wide: true,
		},
		level: "native",
		description: "Аз съм българин по народност и това е моят майчин език.",
	},
	{
		id: "english",
		iso: "eng",
		icon3D: {
			position: [-1.45, 0.06, 0.7] as [number, number, number],
			rotation: [-Math.PI / 10, 0.15, 0] as [number, number, number],
			scale: 0.015,
			wide: true,
		},
		level: "C2",
		description:
			"I have been studying English since I was 6 years old. I used it extensively during my studies in the Netherlands and hold a C2 CAE certificate.",
	},
	{
		id: "dutch",
		iso: "nld",
		icon3D: {
			position: [-2.15, 0.06, 0.6] as [number, number, number],
			rotation: [-Math.PI / 10, -0.15, 0.05] as [number, number, number],
			scale: 0.015,
			wide: true,
		},
		level: "B1*",
		description:
			"Ik woon al meer dan 4 jaar in Nederland en probeer zo veel mogelijk Nederlands te leren door met docenten te praten, en met iedereen die niet meteen naar Engels overschakelt.",
	},
	{
		id: "german",
		iso: "deu",
		icon3D: {
			position: [-2.81, 0.5, 0.25] as [number, number, number],
			rotation: [-Math.PI / 10, -0.3, 0.1] as [number, number, number],
			scale: 0.015,
			wide: true,
		},
		level: "B2",
		description:
			"Ich habe 4 Jahre lang Deutsch in der Schule am Schiller Institut gelernt und eine B2-Prüfung bestanden. Mein Chef bei Latin Is Simple ist Österreicher, daher sprechen wir oft Deutsch.",
	},
	{
		id: "french",
		iso: "fra",
		icon3D: {
			position: [-0.75, 0.06, 0.6] as [number, number, number],
			rotation: [-Math.PI / 10, 0.3, -0.05] as [number, number, number],
			scale: 0.015,
			wide: true,
		},
		level: "B2*",
		description:
			"J'ai commencé mon parcours de polyglotte avec le français. J'ai découvert la chanson \"J'ai cherché\", qui m'a inspiré à apprendre cette langue si belle.",
	},
	{
		id: "spanish",
		iso: "spa",
		icon3D: {
			position: [-0.75, 0.5, 0.45] as [number, number, number],
			rotation: [-Math.PI / 10, 0.3, -0.05] as [number, number, number],
			scale: 0.015,
			wide: true,
		},
		level: "B1*",
		description:
			"Aprendí español para un viaje a Valencia. También me ayudó mucho en Holanda con mis compañeros de clase (incluso enseñé OOP a uno de ellos en español). En ASML trabajé con un colega en un proyecto adicional de IA.",
	},
	{
		id: "italian",
		iso: "ita",
		icon3D: {
			position: [-2.15, 0.5, 0.45] as [number, number, number],
			rotation: [-Math.PI / 10, -0.15, 0.05] as [number, number, number],
			scale: 0.015,
			wide: true,
		},
		level: "A2*",
		description:
			"Ho imparato l'italiano per un viaggio a Roma e mi è piaciuto moltissimo. La trovo una delle lingue più belle e potenti del mondo. Mi fa pensare al latino, ma in versione moderna.",
	},
	{
		id: "portuguese",
		iso: "por",
		icon3D: {
			position: [-1.45, 0.5, 0.55] as [number, number, number],
			rotation: [-Math.PI / 10, 0.15, 0] as [number, number, number],
			scale: 0.015,
			wide: true,
		},
		level: "A2*",
		description: "No meu estágio na ASML eu falei quase inteiramente em português com o meu mentor brasileiro.",
	},
	{
		id: "russian",
		iso: "rus",
		icon3D: {
			position: [-2.76, 1, 0.1] as [number, number, number],
			rotation: [-Math.PI / 10, -0.3, 0.1] as [number, number, number],
			scale: 0.015,
			wide: true,
		},
		level: "A1*",
		description:
			'Я всегда думал, что русский - красивый язык и довольно близкий к болгарскому (моему родному языку). Многое я выучил, смотря один из лучших сериалов - "Кухня".',
	},
].map((l) => {
	return {
		title: prettifyTitle(l.id),
		icon: `/icons/languages/${l.id}.svg`,
		...l,
	};
});

export const contacts: Contact[] = [
	{
		id: "github",
		title: "Github",
		altIcon: "icons/other/github-outline.svg",
		icon: "icons/other/github.svg",
		address: "BRISINGR-01",
		url: "https://github.com/BRISINGR-01",
		icon3D: {
			position: [0.55, 0.25, 0.22],
			rotation: [0.0, 0.099, 0.05],
			scale: 0.003,
			wide: true,
		},
	},
	{
		id: "gitlab",
		title: "Gitlab",
		altIcon: "icons/other/gitlab-outline.svg",
		icon: "icons/other/gitlab.svg",
		address: "BRISINGR-01",
		url: "https://gitlab.com/BRISINGR-01",
		icon3D: {
			position: [0.3, -0.33, 0.32],
			rotation: [-1.59, 0.0, -0.2],
			scale: 0.005,
			wide: true,
		},
	},
	{
		id: "linkedin",
		title: "LinkedIn",
		altIcon: "icons/other/linkedin-outline.svg",
		icon: "icons/other/linkedin.svg",
		address: "alexander-popov-61126825a",
		url: "https://www.linkedin.com/in/alexander-popov-61126825a/",
		icon3D: {
			position: [1.119, 0.16, 0.159],
			rotation: [-0.441, -0.208, 0.1],
			scale: 0.004,
			wide: true,
		},
	},
	{
		id: "gmail",
		title: "Gmail",
		altIcon: "icons/other/gmail-outline.svg",
		icon: "icons/other/gmail.svg",
		address: "alexander.popov233@gmail.com",
		url: "mailto:alexander.popov233@gmail.com",
		icon3D: {
			position: [1.15, 0.6, 0.0],
			rotation: [0.3, -0.6, -0.14],
			scale: 0.009,
			wide: true,
		},
	},

	{
		id: "whatsapp",
		title: "Whatsapp",
		altIcon: "icons/other/whatsapp-outline.svg",
		icon: "icons/other/whatsapp.svg",
		address: "+31620429868",
		url: "tel:+31620429868",
		icon3D: {
			position: [2.3, 0.22, 0.56],
			rotation: [-0.3, 0.1, 0.2],
			scale: 0.0016,
			wide: true,
		},
	},
	{
		id: "instagram",
		title: "Instagram",
		altIcon: "icons/other/instagram-outline.svg",
		icon: "images/other/instagram.png",
		address: "@alexan6451",
		url: "https://www.instagram.com/alexan6451/",
		icon3D: {
			position: [0.39, -0.1, 0.25],
			rotation: [-0.6, 0.61, 4.53],
			scale: 0.3,
			wide: true,
		},
	},
];

export const aboutMe = [...languages, ...contacts];
