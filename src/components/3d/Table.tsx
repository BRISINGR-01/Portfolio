import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import type { Scene } from "three";
import { fixGLTFDepth } from "../../utils";
import Text from "./Text";

export default function Table({ text, scene: scene2 }: { text: string; scene: Scene }) {
	const { scene } = useGLTF("/3d/hologram-table.glb");
	console.log(scene2);

	if (scene2) scene2.add(scene);

	useEffect(() => fixGLTFDepth(scene));

	return (
		<group>
			<Text position={[-0.7, -0.5, 1.8]} rotation={[-0.98, 0, 0]}>
				{text}
			</Text>
			<primitive object={scene} scale={40} position={[0, -2, 0]} />
		</group>
	);
}
