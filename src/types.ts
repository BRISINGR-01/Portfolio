import type { Tags } from "./content/tags";

export type fn = () => void;

export type Tagged = {
	title: string;
	tags: Tags[];
	image?: string;
};
export type Icon3DParams = {
	position: [x: number, y: number, z: number];
	rotation: [x: number, y: number, z: number];
	scale: number;
	wide?: boolean;
};

export type ContentData = {
	id: string;
	title: string;
	icon: string;
	altIcon?: string;
	icon3D: Icon3DParams;
};

export type Icon = {
	_3d: string;
	flat: string;
	isCircle: boolean;
};

export type Experience = ContentData & {
	context: string /** Short introduction on the company/setting */;
	companyLogo?: string;
	project: Project;
};

export type Project = Tagged & {
	description?: React.JSX.Element | string;
	timespan?: string[];
	github?: string;
	content?: ProjectContent;
};

export type ProjectContent = { description: React.JSX.Element | string; img: string }[];

export type Education = ContentData & {
	description: string;
};

export type Book = Tagged & {
	image: string;
	subTitle: string;
	author: string;
	description: string;
};

export type HTBBadge = Tagged & {
	description: string;
	image: string;
};

export type DailyDevBadge = Tagged & {
	image: string;
};

export type Contact = ContentData & {
	address: string;
	url: string;
};

export type Language = ContentData & {
	iso: string;
	level: string;
};

export enum Mode {
	Experience = "experience",
	Education = "education",
	Tags = "interests",
	AboutMe = "about-me",
	Info = "info",
	None = "none",
}

export enum WallFace {
	North,
	West,
	South,
	East,
}

export enum Controls {
	Left = "left",
	Right = "right",
	Escape = "escape",
	Recenter = "recenter",
	FullScreeen = "full-screen",
}

export type Countries = {
	[key: string]: {
		name: {
			common: string;
			official: string;
		};
		languages: {
			[key: string]: string;
		};
		population: {
			count: number;
			worldPercentage: number;
		};
		geo: {
			area: number;
		};
	};
};

export type Semester = {
	title: string;
	description: string;
	projects: Project[];
	courses?: string[];
};

export type Certificate = Tagged & {
	image: string;
	company?: string;
	subCertificates?: Certificate[];
};
