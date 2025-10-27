import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import type { ContentData } from "../../../types";
import { fixGLTFDepth } from "../../../utils";

export default function GLB(props: ContentData) {
	const { scene } = useGLTF(props.icon);
	useEffect(() => fixGLTFDepth(scene));

	return (
		<group>
			<primitive
				object={scene}
				name={props.id}
				scale={props.icon3D.scale}
				rotation={props.icon3D.rotation}
				position={props.icon3D.position}
			/>
		</group>
	);
}
