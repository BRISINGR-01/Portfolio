import { type RefObject } from "react";
import { Color, FrontSide, Material, Mesh, type Clock, type Group, type Object3D, type ShaderMaterial } from "three";
import { COLOR_PALETTE } from "../../constants";
import HologramMaterial from "./icon/HologramMaterial";

export function updateMaterials(clock: Clock, materialRefs: RefObject<ShaderMaterial[]>) {
	for (const material of materialRefs.current) {
		material.uniforms.time.value = clock.getElapsedTime();
	}
}

export function restoreMaterial(obj: Object3D, materialRefs: RefObject<ShaderMaterial[]>) {
	materialRefs.current = [];
	obj.traverse((mesh) => {
		if (mesh instanceof Mesh) mesh.material = mesh.userData.originalMaterial;
	});
}

export function setHologramMaterial(
	obj: Object3D,
	materialRefs: RefObject<ShaderMaterial[]>,
	time: number,
	scale: number
) {
	obj.traverse((mesh) => {
		if (!(mesh instanceof Mesh)) return;

		mesh.userData.originalMaterial = mesh.material;

		const material = new HologramMaterial(new Color(COLOR_PALETTE.PRIMARY), scale);
		mesh.material = material;
		material.uniforms.animStart.value = time;
		materialRefs.current.push(material);
	});
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
