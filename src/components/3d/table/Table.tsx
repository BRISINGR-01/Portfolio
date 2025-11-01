import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh, type Object3D } from "three";
import { TABLE_DELAY } from "../../../constants";
import { fixGLTFDepth } from "../../../utils";
import Delay from "../../Delay";
import TableControls from "./TableControls";

function hide(obj: Object3D) {
	if (obj instanceof Mesh) {
		obj.material.opacity = 0;
	} else {
		obj.children.forEach(hide);
	}
}

function show(obj: Object3D) {
	if (obj instanceof Mesh) {
		obj.material.opacity = 1;
	} else {
		obj.children.forEach(show);
	}
}

export default function Table({ text }: { text: string | null }) {
	const { scene } = useGLTF("/3d/table.glb");

	useEffect(() => {
		hide(scene);
		fixGLTFDepth(scene);

		const t = setTimeout(() => show(scene), TABLE_DELAY * 1000);

		return () => clearTimeout(t);
	}, [scene]);

	return (
		<group>
			<Delay time={TABLE_DELAY}>
				<TableControls text={text} />
			</Delay>
			<primitive object={scene} scale={40} position={[0, -2, 0]} />
		</group>
	);
}
