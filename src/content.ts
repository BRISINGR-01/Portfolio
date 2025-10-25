export type WorkingExperience = {
	title: string;
	logo: string;
	timespan: [string, string];
	/** Short introduction on the company/setting */
	context: string;
	/** What I did there */
	description: string;
	technologies: { name: string; percentage: number }[];
	languages?: { id: string; percentage: number };
} & ContentData;

export type Book = {
	title: string;
	subTitle: string;
	author: string;
	description: string;
	cover: string;
	tags: string[];
} & ContentData;

export type Logo3DParams = {
	id: string;
	url: string;
	position: [x: number, y: number, z: number];
	rotation?: [x: number, y: number, z: number];
	scale: number;
	wide?: boolean;
};

export type Language = {
	id: string;
	name: string;
	flag: string;
};

export type Content = {
	projects: WorkingExperience[];
	books: Book[];
};

export type ContentData = {
	id: string;
	"3d-logo": Logo3DParams;
};

export type ContentType = keyof Content;
