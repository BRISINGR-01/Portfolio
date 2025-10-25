import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { TABLE_DELAY } from "../../../constants";
import { fixGLTFDepth } from "../../../utils";
import Delay from "../../Delay";
import TableControls from "./TableControls";

export default function Table({ text }: { text: string }) {
	const { scene } = useGLTF("/3d/table.glb");

	useEffect(() => fixGLTFDepth(scene));

	return (
		<Delay time={TABLE_DELAY}>
			<group>
				<TableControls text={text} />
				<primitive object={scene} scale={40} position={[0, -2, 0]} />
			</group>
		</Delay>
	);
}
