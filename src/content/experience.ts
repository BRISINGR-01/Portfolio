import type { Experience } from "../types";
import projects from "./projects";

const text = {
	A1: {
		context:
			"A1 Bulgaria (previously known as Mtel or Mobiltel) is one of the biggest telecommunications company in Bulgaria owned by A1 Telekom Austria Group.",
	},
	"sdg-sabic": {
		context:
			"Sabic is the second largest plastic producer and a leading industry in packaging, technology and more. For my first SDG Challenge I worked on a gamified recycling initiative for their new office in Amsterdam.",
		description: "",
	},
	"sdg-solarwatt": {
		context:
			"For my second SDG Challenge I colaborated with Paulo Vieira on creating a transparency platform for Solarwatt - a lead in solar panels, energy storage and more in Germany and the Netherlands.",
	},
	"latin-is-simple": {
		context:
			"Created by two Austrian graduates this language learning app has gained dozens of thousands of users over the years. It is arguably the most advanced Latin-learning platform. It provides tools such as trainers, sentence analisys, and many more.",
	},
	ablanitsa: {
		context:
			'This is an ethnic diversity cooperation project between my highschool II English Language Highschool "Thomas Jefferson" and "St. Paisiy Hilendarski" School.',
		description:
			"My IT teacher offered me to participate in this extracurricular project, which was my first real programming endeavor. I created and deployed a website portraying the customs and displaying in 3d cultural clothings of different ethnicities in Bulgaria.",
	},
	icc: {
		context:
			"ICC offers top-notch home and office cleaning services. It was founded by Fontys students who allowed other students to work alongside them as a semester project, which I joined for my 3rd semester.",
	},
	asml: {
		context:
			"ASML is a global leader in lithography technology, enabling chipmakers to create microchips that are more powerful, faster and energy efficient. They create the machines used by companies like Intel to produce high-quality chips.",
	},
	glow: {
		context:
			'Glow is a light festival in Eindhoven, which gathers around 800,000 visitors once a year to illuminate the sky and buildings, showcase professional and student-made attractions and push the limits of creativity. Ever since the first time I visited Glow I wanted to take part of it, just as people dreamingly say "I want to work at Netflix".',
	},
};

export const sdgContext =
	"The SDG (Sustainable Developement Goals) are a set of goals defined by UN meant to make the world a better place. A challenge is regularly organized where groups of students work with companies on lowering their emissions, improving their employees' quality of life...";

export const experience: Experience[] = [
	{
		id: "A1",
		context: text.A1.context,
		icon3D: { scale: 0.0015, position: [-1.7, 0.39, 0.2], rotation: [-0.3, 0, 0.1], wide: true },
		project: projects.a1,
		title: projects.a1.title,
		icon: projects.a1.image,
	},
	{
		id: "sdg-sabic",
		context: text["sdg-sabic"].context,
		icon3D: { scale: 0.4, position: [-0.9, 0.04, 0.07], rotation: [0.8, 0.3, 0.3], wide: false },
		icon: projects.sdgSabic.image,
		title: projects.sdgSabic.title,
		project: projects.sdgSabic,
	},
	{
		id: "sdg-solarwatt",
		context: text["sdg-solarwatt"].context,
		project: projects.sdgSolarwatt,
		title: projects.sdgSolarwatt.title,
		icon: projects.sdgSolarwatt.image,
		icon3D: { scale: 0.4, position: [-1.78, -0.1, 0.45], rotation: [-0.9, -1.1, 0.8], wide: false },
	},
	{
		id: "latin-is-simple",
		context: text["latin-is-simple"].context,
		icon3D: { scale: 0.0015, position: [-0.2, 0.4, -0.3], rotation: [-0.2, 0.2, 0], wide: true },
		icon: projects.latinIsSimple.image,
		title: projects.latinIsSimple.title,
		project: projects.latinIsSimple,
	},
	{
		id: "icc",
		title: projects.icc.title,
		icon: projects.icc.image,
		context: text.icc.context,
		icon3D: { scale: 0.001, position: [1.9, 0.45, 0.45], rotation: [-0.2, 0.2, 0], wide: true },
		project: projects.icc,
	},
	{
		id: "asml",
		context: text.asml.context,
		icon3D: { scale: 0.002, position: [0.5, 0.19, -0.6], rotation: [-0.4, -0.5, 0.2], wide: true },
		project: projects.asml,
		title: projects.asml.title,
		icon: projects.asml.image,
	},
	{
		id: "glow",
		title: projects.glow.title,
		icon: projects.glow.image,
		project: projects.glow,
		context: text.glow.context,
		icon3D: { scale: 0.001, position: [-0.5, 0.3, -0.4], rotation: [-0.7, -0.2, 0.5], wide: true },
	},
];
