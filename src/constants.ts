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

export const HOVER_OUTLINE_HIDDEN = "#1abaff";
export const PERSISTENT_OUTLINE = "#ffffff";

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
	{ name: Controls.Left, keys: ["ArrowLeft"] },
	{ name: Controls.Right, keys: ["ArrowRight"] },
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

export const SKIP_ANIMATIONS = import.meta.env.DEV && true;

export const MENU_DELAY = SKIP_ANIMATIONS ? 0 : 4.2;
export const TABLE_DELAY = SKIP_ANIMATIONS ? 0 : 4;
export const HOLOGRAM_SWITCH_TIME = SKIP_ANIMATIONS ? 0 : 0;
export const HOLOGRAM_ANIMATION_LENGTH = SKIP_ANIMATIONS ? 0 : 0.4;
export const HOLOGRAM_TRANSITION = (HOLOGRAM_ANIMATION_LENGTH + HOLOGRAM_SWITCH_TIME) * 1000;
export const OUTLINE_HARDCODED_DELAY = SKIP_ANIMATIONS ? 0 : 1000; // account for loading time of icons

export const DEFAULT_CAMERA_POS = [-1, 0.7, 5] as [number, number, number];
export const INITIAL_CAMERA_POS = SKIP_ANIMATIONS ? DEFAULT_CAMERA_POS : ([-4, 3, 7.5] as [number, number, number]);
export const ZOOM_IN_DELAY = SKIP_ANIMATIONS ? 0 : 4100;

export const CEILING_BUILD_UP_DURATION = SKIP_ANIMATIONS ? 0.1 : 3;
export const WALL_BUILD_UP_DURATION = SKIP_ANIMATIONS ? 0.1 : 2;
export const WALL_DELAY = SKIP_ANIMATIONS ? 0 : 1.5;
export const ICON_DELAY = SKIP_ANIMATIONS ? 0 : 120;
