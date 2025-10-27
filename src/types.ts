export class Experience implements ContentData {
	constructor(
		public id: string,
		public title: string,
		public icon: string,
		public timespan: [string, string],
		/** Short introduction on the company/setting */
		public context: string,
		/** What I did there */
		public description: string,
		public technologies: { name: string; percentage: number }[],
		public icon3D: Icon3DParams
	) {}
}

export class Book {
	constructor(
		public title: string,
		public subTitle: string,
		public author: string,
		public description: string,
		public cover: string,
		public tags: string[]
	) {}
}

export class Education implements ContentData {
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public icon: string,
		public icon3D: Icon3DParams
	) {}
}

export interface Icon3DParams {
	position: [x: number, y: number, z: number];
	rotation?: [x: number, y: number, z: number];
	scale: number;
	wide?: boolean;
}

export interface Language {
	id: string;
	name: string;
	flag: string;
}

export interface Content {
	projects: Experience[];
	education: Education[];
}

export interface ContentData {
	id: string;
	icon: string;
	icon3D: Icon3DParams;
}

export type ContentType = keyof Content;

export enum WallFace {
	North,
	West,
	South,
	East,
}
