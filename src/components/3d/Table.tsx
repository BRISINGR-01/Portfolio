import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { fixGLTFDepth } from "../../utils";

export default function Table() {
	const { scene } = useGLTF("/3d/hologram-table.glb");

	useEffect(() => fixGLTFDepth(scene));

	return <primitive object={scene} scale={40} position={[0, -2, 0]} />;
}
