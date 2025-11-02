import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { Color, TextureLoader, Vector3 } from "three";
import { COLOR_PALETTE, IMAGE_DEPTH } from "../../../constants";
import type { ContentData } from "../../../types";
import HologramMaterial from "./HologramMaterial";

export default function Image(props: ContentData) {
	const texture = useLoader(TextureLoader, props.icon);
	const hologramProps = useMemo(() => new HologramMaterial(new Color(COLOR_PALETTE.PRIMARY), 15), []);

	useFrame(({ clock }) => {
		hologramProps.uniforms.time.value = clock.getElapsedTime();
	});

	if (props.id.startsWith("sdg") || props.id === "instagram") {
		return (
			<mesh
				name={props.id}
				position={props.icon3D.position}
				rotation={new Vector3(...(props.icon3D.rotation ?? [0, 0, 0]))
					.add(new Vector3(Math.PI / 4, Math.PI / 2, 0))
					.toArray()}
			>
				<cylinderGeometry args={[props.icon3D.scale, props.icon3D.scale, IMAGE_DEPTH]} />

				<meshBasicMaterial attach="material-0" color={COLOR_PALETTE.PRIMARY} />

				<shaderMaterial attach="material-1" {...hologramProps} />
				<shaderMaterial attach="material-2" {...hologramProps} />

				{/* <meshBasicMaterial attach="material-1" transparent map={texture} /> */}
				{/* <meshBasicMaterial attach="material-2" transparent map={texture} /> */}
			</mesh>
		);
	}

	return (
		<mesh name={props.id} position={props.icon3D.position} rotation={props.icon3D.rotation}>
			<boxGeometry args={[props.icon3D.scale, props.icon3D.scale, IMAGE_DEPTH]} />

			<meshBasicMaterial attach="material-0" color={COLOR_PALETTE.PRIMARY} />
			<meshBasicMaterial attach="material-1" color={COLOR_PALETTE.PRIMARY} />
			<meshBasicMaterial attach="material-2" color={COLOR_PALETTE.PRIMARY} />
			<meshBasicMaterial attach="material-3" color={COLOR_PALETTE.PRIMARY} />

			<shaderMaterial attach="material-4" {...hologramProps} />
			<shaderMaterial attach="material-5" {...hologramProps} />

			<meshBasicMaterial attach="material-6" color={COLOR_PALETTE.PRIMARY} />
			<meshBasicMaterial attach="material-7" color={COLOR_PALETTE.PRIMARY} />
			{/* <meshBasicMaterial attach="material-0" color={COLOR_PALETTE.PRIMARY} />
			<meshBasicMaterial attach="material-1" color={COLOR_PALETTE.PRIMARY} />
			<meshBasicMaterial attach="material-2" color={COLOR_PALETTE.PRIMARY} />
			<meshBasicMaterial attach="material-3" color={COLOR_PALETTE.PRIMARY} />
			<meshBasicMaterial attach="material-4" transparent map={texture} />
			<meshBasicMaterial attach="material-5" transparent map={texture} />
			<meshBasicMaterial attach="material-6" color={COLOR_PALETTE.PRIMARY} />
			<meshBasicMaterial attach="material-7" color={COLOR_PALETTE.PRIMARY} /> */}
		</mesh>
	);
}
