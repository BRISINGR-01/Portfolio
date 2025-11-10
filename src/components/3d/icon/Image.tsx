import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Color, TextureLoader, Vector3 } from "three";
import { COLOR_PALETTE, HOLOGRAM_TRANSITION, IMAGE_DEPTH } from "../../../constants";
import type { ContentData } from "../../../types";
import HologramMaterial from "./HologramMaterial";

export default function Image(props: ContentData) {
	const texture = useLoader(TextureLoader, props.icon);
	const { get } = useThree();

	const [hologramMaterial, setHologramMaterial] = useState<HologramMaterial | null>(
		() => new HologramMaterial(new Color(COLOR_PALETTE.PRIMARY), 15)
	);

	useFrame(({ clock }) => {
		if (hologramMaterial) hologramMaterial.update(clock);
	});

	useEffect(() => {
		setHologramMaterial((mat) => {
			if (mat) mat.uniforms.animStart.value = get().clock.elapsedTime;

			return mat;
		});

		const t = setTimeout(() => setHologramMaterial(null), HOLOGRAM_TRANSITION);

		return () => {
			setHologramMaterial(null);
			clearTimeout(t);
		};
	}, [get, texture]);

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
				<meshBasicMaterial transparent attach="material-0" color={COLOR_PALETTE.PRIMARY} />
				{hologramMaterial ? (
					<shaderMaterial attach="material-1" {...hologramMaterial} />
				) : (
					<meshBasicMaterial transparent attach="material-1" map={texture} />
				)}
				{hologramMaterial ? (
					<shaderMaterial attach="material-2" {...hologramMaterial} />
				) : (
					<meshBasicMaterial transparent attach="material-2" map={texture} />
				)}
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
			{hologramMaterial ? (
				<shaderMaterial attach="material-4" {...hologramMaterial} />
			) : (
				<meshBasicMaterial attach="material-4" map={texture} />
			)}
			{hologramMaterial ? (
				<shaderMaterial attach="material-5" {...hologramMaterial} />
			) : (
				<meshBasicMaterial attach="material-5" map={texture} />
			)}
			<meshBasicMaterial attach="material-6" color={COLOR_PALETTE.PRIMARY} />
			<meshBasicMaterial attach="material-7" color={COLOR_PALETTE.PRIMARY} />
		</mesh>
	);
}
