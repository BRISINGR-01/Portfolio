import { extend } from "@react-three/fiber";
import { DoubleSide } from "three";
import font from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { COLOR_PALETTE } from "../../constants";

extend({ TextGeometry });

export default function Text(props: {
	position: [x: number, y: number, z: number];
	rotation?: [x: number, y: number, z: number];
	scale?: number;
	children: string;
}) {
	const loadedFont = new FontLoader().parse(font);

	const geometry = new TextGeometry(props.children, {
		font: loadedFont,
		size: props.scale ?? 0.1,
		depth: 0.001,
		curveSegments: 5,
		bevelEnabled: true,
		bevelSize: 0.005,
		bevelThickness: 0.01,
		bevelSegments: 5,
	});
	geometry.computeBoundingBox();

	return (
		<mesh geometry={geometry} {...props}>
			<meshPhongMaterial specular={COLOR_PALETTE.PRIMARY} color={COLOR_PALETTE.PRIMARY} side={DoubleSide} depthWrite />
		</mesh>
	);
}
