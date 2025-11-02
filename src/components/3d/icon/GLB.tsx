import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Color, type Mesh, type ShaderMaterial } from "three";
import { COLOR_PALETTE } from "../../../constants";
import type { ContentData } from "../../../types";
import { fixGLTFDepth } from "../../../utils";
import HologramMaterial from "./HologramMaterial";

export default function GLB(props: ContentData) {
	const { scene } = useGLTF(props.icon);

	useEffect(() => fixGLTFDepth(scene), [scene]);

	const materialRefs = useRef<ShaderMaterial[]>([]);

	// Traverse all meshes and replace their material
	useEffect(() => {
		scene.traverse((child) => {
			if ((child as Mesh).isMesh) {
				const mesh = child as Mesh;

				const material = new HologramMaterial(new Color(COLOR_PALETTE.PRIMARY), props.icon3D.scale * 30);
				mesh.material = material;

				materialRefs.current.push(material);
			}
		});
	}, [scene, props]);

	useFrame((state) => {
		for (const material of materialRefs.current) {
			material.uniforms.time.value = state.clock.getElapsedTime();
		}
	});

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
