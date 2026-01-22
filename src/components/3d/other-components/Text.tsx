import { extend } from "@react-three/fiber";
import { useMemo } from "react";
import { DoubleSide } from "three";
import font from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { COLOR_PALETTE } from "../../../constants";

extend({ TextGeometry });

export default function Text({
	children,
	position,
	isInverted,
	rotation,
	scale,
}: {
	position: [x: number, y: number, z: number];
	rotation?: [x: number, y: number, z: number];
	scale?: number;
	isInverted?: boolean;
	children: string;
}) {
	const geometry = useMemo(() => {
		const loadedFont = new FontLoader().parse(font);

		const geometry = new TextGeometry(children, {
			font: loadedFont,
			size: scale ?? 0.1,
			depth: 0.001,
			curveSegments: 5,
			bevelEnabled: true,
			bevelSize: 0.005,
			bevelThickness: 0.01,
			bevelSegments: 5,
		});
		geometry.computeBoundingBox();

		return geometry;
	}, [children, scale]);

	const pos = useMemo(
		() =>
			[
				position[0] - ((isInverted ? -1 : 1) * (geometry.boundingBox?.max.x ?? 0)) / 2,
				position[1] + (isInverted ? -1 : 1) * -0.05,
				position[2],
			] as [number, number, number],
		[geometry.boundingBox?.max.x, isInverted, position]
	);

	return (
		<mesh geometry={geometry} rotation={rotation} position={pos}>
			<meshPhongMaterial specular={COLOR_PALETTE.PRIMARY} color={COLOR_PALETTE.PRIMARY} side={DoubleSide} depthWrite />
		</mesh>
	);
}
