import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { HOLOGRAM_TRANSITION } from "../../../constants";
import type { ContentData } from "../../../types";
import { fixGLTFDepth, restoreMaterial, setHologramMaterial } from "../utils";
import type HologramMaterial from "./HologramMaterial";

export default function GLB(props: ContentData) {
	const { scene } = useGLTF(props.icon);
	const clock = useThree((state) => state.clock);
	const materialRef = useRef<HologramMaterial>(null);

	useEffect(() => {
		fixGLTFDepth(scene);
		materialRef.current = setHologramMaterial(scene, clock, 100);

		const t = setTimeout(() => restoreMaterial(scene), HOLOGRAM_TRANSITION);

		return () => {
			restoreMaterial(scene);
			clearTimeout(t);
		};
	}, [clock, props.icon3D.scale, scene]);

	useFrame(({ clock }) => materialRef.current?.update(clock));

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
