import { useControls } from "leva";
import { useEffect, useState } from "react";
import { FrontSide, Material, type Group, type Mesh, type Object3D } from "three";
import { MONTHS } from "./constants";
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
			child.material.forEach(fixMaterialDepth);
		}

		child.geometry.computeVertexNormals();
	});
}

export function parseTimeSpan(str: string) {
	const [m, y] = str.split("/").map(Number).slice(1);

	return `${MONTHS[m]} ${y}`;
}

export function useIcon() {
	const [icons, setIcons] = useState<{ name: string; url: string }[]>([]);

	useEffect(() => {
		if (icons.length) return;

		fetch("/icons.json")
			.then((res) => res.json())
			.then((data) => setIcons(data));
	}, []);

	return icons;
}

export function useRot() {
	return useControls("rot", { r: [0, 0, 0] }).r;
}

export function usePos() {
	return useControls("pos", [0, 0, 0]);
}

export function setPointerCursor() {
	document.body.style.cursor = 'url("/cursors/move.cur") 0 0, auto';
}

export function setDefaultCursor() {
	document.body.style.cursor = 'url("/cursors/normal_select.cur") 0 0, auto';
}
