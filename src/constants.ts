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

window.addEventListener("DOMContentLoaded", () => {
	const style = window.getComputedStyle(document.documentElement);

	COLOR_PALETTE.PRIMARY = style.getPropertyValue("--primary");
	COLOR_PALETTE.SECONDARY = style.getPropertyValue("--secondary");
	COLOR_PALETTE.TERTIARY = style.getPropertyValue("--tertiary");
});
