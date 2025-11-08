import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { type ShaderMaterial } from "three";
import { HOLOGRAM_TRANSITION } from "../../../constants";
import type { ContentData } from "../../../types";
import { fixGLTFDepth, restoreMaterial, setHologramMaterial, updateMaterials } from "../utils";

export default function GLB(props: ContentData) {
	const { scene } = useGLTF(props.icon);
	const { get } = useThree();
	const materialRefs = useRef<ShaderMaterial[]>([]);

	useEffect(() => {
		fixGLTFDepth(scene);
		setHologramMaterial(scene, materialRefs, get().clock.elapsedTime, 100);

		const t = setTimeout(() => restoreMaterial(scene, materialRefs), HOLOGRAM_TRANSITION);

		return () => {
			restoreMaterial(scene, materialRefs);
			clearTimeout(t);
		};
	}, [get, props.icon3D.scale, scene]);

	useFrame(({ clock }) => updateMaterials(clock, materialRefs));

	return (
		<primitive
			object={scene}
			name={props.id}
			scale={props.icon3D.scale}
			rotation={props.icon3D.rotation}
			position={props.icon3D.position}
		/>
	);
}
