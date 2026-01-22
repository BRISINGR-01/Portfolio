import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh, type Object3D } from "three";
import { HOLOGRAM_TRANSITION, TABLE_DELAY } from "../../../constants";
import type HologramMaterial from "../icon/HologramMaterial";
import Delay from "../other-components/Delay";
import { fixGLTFDepth, restoreMaterial, setHologramMaterial } from "../utils";
import TableControls from "./TableControls";

function toggleVisibility(obj: Object3D) {
	obj.traverse((mesh) => {
		if (mesh instanceof Mesh) mesh.material.opacity = !mesh.material.opacity;
	});
}

export default function Table({ text }: { text: string | null }) {
	const { scene } = useGLTF("/3d/table.glb");
	const { clock } = useThree();
	const materialRef = useRef<HologramMaterial>(null);

	useFrame(({ clock }) => materialRef.current?.update(clock));

	useEffect(() => {
		toggleVisibility(scene);
		fixGLTFDepth(scene);

		let t: number;

		t = setTimeout(() => {
			toggleVisibility(scene);
			materialRef.current = setHologramMaterial(scene, clock, 200);

			t = setTimeout(() => restoreMaterial(scene), HOLOGRAM_TRANSITION);
		}, TABLE_DELAY * 1000);

		return () => {
			restoreMaterial(scene);
			clearTimeout(t);
		};
	}, [clock, scene]);

	return (
		<group>
			<Delay time={TABLE_DELAY}>
				<TableControls text={text} />
			</Delay>
			<primitive object={scene} scale={40} position={[0, -2, 0]} />
		</group>
	);
}
