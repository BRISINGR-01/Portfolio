import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import { Mesh, type Object3D, type ShaderMaterial } from "three";
import { HOLOGRAM_TRANSITION, TABLE_DELAY } from "../../../constants";
import Delay from "../../Delay";
import { fixGLTFDepth, setHologramMaterial, updateMaterials } from "../utils";
import TableControls from "./TableControls";

function toggleVisibility(obj: Object3D) {
	obj.traverse((mesh) => {
		if (mesh instanceof Mesh) mesh.material.opacity = !mesh.material.opacity;
	});
}

function restore(obj: Object3D, materialRefs: RefObject<ShaderMaterial[]>) {
	materialRefs.current = [];
	obj.traverse((mesh) => {
		if (mesh instanceof Mesh) mesh.material = mesh.userData.originalMaterial;
	});
}

export default function Table({ text }: { text: string | null }) {
	const { scene } = useGLTF("/3d/table.glb");
	const { get } = useThree();
	const materialRefs = useRef<ShaderMaterial[]>([]);

	useFrame(({ clock }) => updateMaterials(clock, materialRefs));

	useEffect(() => {
		toggleVisibility(scene);
		fixGLTFDepth(scene);

		let t: number;

		t = setTimeout(() => {
			toggleVisibility(scene);
			setHologramMaterial(scene, materialRefs, get().clock.elapsedTime, 200);

			t = setTimeout(() => restore(scene, materialRefs), HOLOGRAM_TRANSITION);
		}, TABLE_DELAY * 1000);

		return () => {
			restore(scene, materialRefs);
			clearTimeout(t);
		};
	}, [get, scene]);

	return (
		<group>
			<Delay time={TABLE_DELAY}>
				<TableControls text={text} />
			</Delay>
			<primitive object={scene} scale={40} position={[0, -2, 0]} />
		</group>
	);
}
