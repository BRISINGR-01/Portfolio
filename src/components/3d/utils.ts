import { type RefObject } from "react";
import { Color, FrontSide, Material, Mesh, type Clock, type Group, type Object3D } from "three";
import { COLOR_PALETTE } from "../../constants";
import HologramMaterial from "./icon/HologramMaterial";

export function updateMaterials(clock: Clock, materialRefs: RefObject<HologramMaterial[]>) {
	for (const material of materialRefs.current) {
		material.update(clock);
	}
}

export function restoreMaterial(obj: Object3D) {
	obj.traverse((mesh) => {
		if (mesh instanceof Mesh) mesh.material = mesh.userData.originalMaterial;
	});
}

export function setHologramMaterial(obj: Object3D, clock: Clock, scale: number) {
	const material = new HologramMaterial(new Color(COLOR_PALETTE.PRIMARY), scale);
	material.start(clock);

	obj.traverse((mesh) => {
		if (!(mesh instanceof Mesh)) return;

		mesh.userData.originalMaterial = mesh.material;

		mesh.material = material;
	});

	return material;
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

export function fixMaterialDepth(material: Material) {
	material.depthWrite = true;
	material.depthTest = true;
	material.side = FrontSide;
}
