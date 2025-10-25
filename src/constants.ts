import type { Easing } from "motion/react";
import { Vector3 } from "three";

export const DEFAULT_SVG_ROTATION = new Vector3(0, Math.PI, Math.PI);
export const RAYCAST_CONTAINER_NAME = "raycast-container";

export const COLOR_PALETTE = {
	PRIMARY: "",
	SECONDARY: "",
	TERTIARY: "",
};

export const ROOM = {
	HEIGHT: 5,
	WIDTH: 15,
	OFFSET: 0.01,
	CEILING_NOISE: 0.2,
};

window.addEventListener("DOMContentLoaded", () => {
	const style = window.getComputedStyle(document.documentElement);

	COLOR_PALETTE.PRIMARY = style.getPropertyValue("--primary");
	COLOR_PALETTE.SECONDARY = style.getPropertyValue("--secondary");
	COLOR_PALETTE.TERTIARY = style.getPropertyValue("--tertiary");
});

export const DEFAULT_LAYER = 0;
export const OCCLUSION_LAYER = 1;

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const TRANSITION = { duration: 0.3, ease: "easeOut" as Easing };

export enum WallFace {
	North,
	West,
	South,
	East,
}

const IS_DEBUG = true;

export const MENU_DELAY = IS_DEBUG ? 0 : 4.15;
export const TABLE_DELAY = IS_DEBUG ? 0 : 4;
