export type fn = () => void;

export type Icon3DParams = {
	position: [x: number, y: number, z: number];
	rotation?: [x: number, y: number, z: number];
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
	timespan: [string, string];
	context: string /** Short introduction on the company/setting */;
	description: string /** What I did there */;
	links?: { src: string; title?: string; img?: string }[];
	technologies?: { name: string; percentage: number }[];
	images?: { title: string; src: string; description: string }[];
	companyLogo?: string;
};

export type Education = ContentData & {
	description: string;
};

export type Book = {
	title: string;
	subTitle: string;
	author: string;
	description: string;
	cover: string;
	tags: string[];
};

export type HTBBadge = {
	title: string;
	description: string;
	image: string;
};

export type DailyDevBadge = {
	title: string;
	image: string;
};

export type Contact = ContentData & {
	address: string;
	url: string;
};

export type Language = ContentData & {
	iso: string;
};

export enum Mode {
	Experience = "experience",
	Education = "education",
	Interests = "interests",
	Languages = "languages",
	Contact = "contacts",
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
