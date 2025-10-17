import { Vector3 } from "three";

export function calculateSVGPathRenderOffset(index: number, isWide?: boolean) {
	return index * -5 * (isWide ? 0.01 : 0.01);
}

export const DEFAULT_SVG_ROTATION = new Vector3(0, Math.PI, Math.PI);
export const RAYCAST_CONTAINER_NAME = "raycast-container";

export const COLOR_PALETTE = {
	PRIMARY: "",
	SECONDARY: "",
	TERTIARY: "",
};

export const ROOM = {
	HEIGHT: 7,
	WIDTH: 15,
	OFFSET: 0.01,
};

window.addEventListener("DOMContentLoaded", () => {
	const style = window.getComputedStyle(document.documentElement);

	COLOR_PALETTE.PRIMARY = style.getPropertyValue("--primary");
	COLOR_PALETTE.SECONDARY = style.getPropertyValue("--secondary");
	COLOR_PALETTE.TERTIARY = style.getPropertyValue("--tertiary");
});

export const DEFAULT_LAYER = 0;
export const OCCLUSION_LAYER = 1;

export type WorkingExperience = {
	id: string;
	title: string;
	logo: string;
	timespan: [string, string];
	/** Short introduction on the company/setting */
	context: string;
	/** What I did there */
	description: string;
	technologies: { name: string; percentage: number }[];
	languages?: { id: string; percentage: number };
	"3d-logo": Logo3DParams;
};

export type Logo3DParams = {
	id: string;
	url: string;
	position: Vector3 | [x: number, y: number, z: number];
	rotation?: [x: number, y: number, z: number];
	scale: number;
	wide?: boolean;
};

export type Language = {
	id: string;
	name: string;
	flag: string;
};

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
