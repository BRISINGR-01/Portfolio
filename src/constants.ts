import type { KeyboardControlsEntry } from "@react-three/drei";
import type { Easing } from "motion/react";
import { Vector3 } from "three";
import { Controls } from "./types";

export const DEFAULT_SVG_ROTATION = new Vector3(0, Math.PI, Math.PI);
export const RAYCAST_CONTAINER_NAME = "raycast-container";

export const COLOR_PALETTE = {
	PRIMARY: "",
	SECONDARY: "",
	TERTIARY: "",
};

window.addEventListener("DOMContentLoaded", () => {
	const style = window.getComputedStyle(document.documentElement);

	COLOR_PALETTE.PRIMARY = style.getPropertyValue("--primary");
	COLOR_PALETTE.SECONDARY = style.getPropertyValue("--secondary");
	COLOR_PALETTE.TERTIARY = style.getPropertyValue("--tertiary");
});

export const controlsMap = [
	{ name: Controls.Escape, keys: ["Escape"] },
	{ name: Controls.Recenter, keys: ["Space"] },
	{ name: Controls.FullScreeen, keys: ["f"] },
] as KeyboardControlsEntry<Controls>[];

export const ROOM = {
	HEIGHT: 5,
	WIDTH: 15,
	OFFSET: 0.01,
	CEILING_NOISE: 0.2,
};
export const IMAGE_DEPTH = 0.02;
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const TRANSITION = { duration: 0.3, ease: "easeOut" as Easing };

export const IS_DEBUG = import.meta.env.DEV && false;

export const MENU_DELAY = IS_DEBUG ? 0 : 4.2;
export const TABLE_DELAY = IS_DEBUG ? 0 : 4;
export const HOLOGRAM_SWITCH_TIME = 0;
export const HOLOGRAM_ANIMATION_LENGTH = 0.4;
export const OUTLINE_HARDCODED_DELAY = 1; // account for loading time of icons
export const DEFAULT_CAMERA_POS = [-1, 0.3, 5] as [number, number, number];
export const INITIAL_CAMERA_POS = IS_DEBUG ? DEFAULT_CAMERA_POS : ([-4, 3, 7.5] as [number, number, number]);
