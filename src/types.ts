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
		public icon3D: Icon3DParams,
		public technologies?: { name: string; percentage: number }[],
		public altIcon?: string
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
		public icon3D: Icon3DParams,
		public altIcon?: string
	) {}
}

export class Contact implements ContentData {
	constructor(
		public id: string,
		public title: string,
		public icon: string,
		public address: string,
		public url: string,
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

export interface ContentData {
	id: string;
	title: string;
	icon: string;
	altIcon?: string;
	icon3D: Icon3DParams;
}

export enum Mode {
	Experience,
	Education,
	Contact,
	Info,
	None,
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
