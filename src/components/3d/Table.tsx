import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { fixGLTFDepth } from "../../utils";
import Text from "./Text";

export default function Table({ text }: { text: string }) {
	const { scene } = useGLTF("/3d/hologram-table.glb");

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
