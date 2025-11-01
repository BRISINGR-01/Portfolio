import { useControls } from "leva";
import { useEffect, useState } from "react";
import { FrontSide, Material, type Group, type Mesh, type Object3D } from "three";
import { MONTHS } from "./constants";
import { Mode } from "./types";

export function fixMaterialDepth(material: Material) {
	material.depthWrite = true;
	material.depthTest = true;
	material.side = FrontSide;
}

export function fixGLTFDepth(scene: Group) {
	scene.traverse((child: Object3D | Mesh) => {
		if (!("isMesh" in child) || !child.isMesh) return;

		const geometry = child.geometry;
		geometry.computeBoundsTree();

		if (child.material instanceof Material) {
			fixMaterialDepth(child.material);
		} else {
			for (const material of child.material) {
				fixMaterialDepth(material);
			}
		}

		child.geometry.computeVertexNormals();
	});
}

export function parseTimeSpan(str: string) {
	const [m, y] = str.split("/").map(Number).slice(1);

	return `${MONTHS[m]} ${y}`;
}

export function calculateSVGPathRenderOffset(index: number, isWide?: boolean) {
	return index * -5 * (isWide ? 0.01 : 0.001);
}

export function useIcon() {
	const [icons, setIcons] = useState<{ name: string; url: string }[]>([]);

	useEffect(() => {
		if (icons.length) return;

		fetch("/icons.json")
			.then((res) => res.json())
			.then((data) => setIcons(data));
	}, [icons.length]);

	return icons;
}

export function useRot(r?: [number, number, number]) {
	return useControls("rot", { r: r ?? [0, 0, 0] }).r;
}

export function usePos(p?: [number, number, number]) {
	return useControls("pos", { p: p ?? [0, 0, 0] }).p;
}

export function setPointerCursor() {
	document.body.style.cursor = 'url("/cursors/move.cur") 0 0, auto';
}

export function setDefaultCursor() {
	document.body.style.cursor = 'url("/cursors/normal_select.cur") 0 0, auto';
}
export function prettifyTitle(text: string | null | Mode) {
	switch (text) {
		case Mode.Experience:
			return "Internships and Big Projects";
		case Mode.Education:
			return "Education and Knowledge Sources";
		case Mode.Contact:
			return "Contacts";
		case Mode.Info:
		case Mode.None:
			return null;
		default:
			return !text ? null : text[0].toUpperCase() + text.slice(1);
	}
}
