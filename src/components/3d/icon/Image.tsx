import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { COLOR_PALETTE } from "../../../constants";
import type { Logo3DParams } from "../../../content";

export default function Image(props: Logo3DParams) {
	const texture = useLoader(TextureLoader, props.url);

	return (
		<mesh position={props.position} rotation={props.rotation}>
			<boxGeometry args={[props.scale, props.scale, 0.03]} />

			<meshBasicMaterial attach="material-0" color={COLOR_PALETTE.PRIMARY} />
			<meshBasicMaterial attach="material-1" color={COLOR_PALETTE.PRIMARY} />
			<meshBasicMaterial attach="material-2" color={COLOR_PALETTE.PRIMARY} />
			<meshBasicMaterial attach="material-3" color={COLOR_PALETTE.PRIMARY} />
			<meshBasicMaterial attach="material-4" map={texture} />
			<meshBasicMaterial attach="material-5" map={texture} />
		</mesh>
	);
}
