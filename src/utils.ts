import { FrontSide, Material, type Group, type Mesh, type Object3D } from "three";

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
