import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense } from "react";
import { BufferGeometry, Mesh } from "three";
import {
	acceleratedRaycast,
	computeBatchedBoundsTree,
	computeBoundsTree,
	disposeBatchedBoundsTree,
	disposeBoundsTree,
} from "three-mesh-bvh";
import { BatchedMesh } from "three/webgpu";
import Loader from "./Loader";
import Raycast from "./Raycast";
import SVGObject, { type SVGObjectProps } from "./SVGObject";
import Table from "./Table";

BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
Mesh.prototype.raycast = acceleratedRaycast;

BatchedMesh.prototype.computeBoundsTree = computeBatchedBoundsTree;
BatchedMesh.prototype.disposeBoundsTree = disposeBatchedBoundsTree;
BatchedMesh.prototype.raycast = acceleratedRaycast;

export default function App() {
	const svgs: SVGObjectProps[] = [
		{
			url: "assets/icons/other/latin-is-simple.svg",
			scale: 0.0015,
			position: [-0.38, 0.37, 0],
			rotation: [0, 0.4, 0],
			wide: true,
		},
		{
			url: "assets/icons/other/SDG.svg",
			scale: 0.002,
			position: [-1.2, 0.63, 0.6],
			rotation: [0.15, 0.5, 0],
			wide: false,
		},
		{
			url: "assets/icons/other/2aeg.svg",
			scale: 0.005,
			position: [-1.45, -0.31, 0.25],
			rotation: [-1.54, 0, 0],
			wide: true,
		},
		{
			url: "assets/icons/other/ASML.svg",
			scale: 0.002,
			position: [0.21, 0.2, -0.36],
			rotation: [-0.35, -0.18, 0.04],
			wide: true,
		},
		{
			url: "assets/icons/other/ICClogo.svg",
			scale: 0.001,
			position: [-0.61, 0.33, 0.1],
			rotation: [-0.53, -0.11, 0],
			wide: true,
		},
		{
			url: "assets/icons/other/A1.svg",
			scale: 0.0015,
			position: [1.97, 0.4, 0.27],
			rotation: [-0.04, 0.19, 0],
			wide: true,
		},
	];

	for (const svg of svgs) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const ctrl = useControls(svg.url.split("/").at(-1)!.replace(".svg", ""), {
			position: {
				x: svg.position[0],
				y: svg.position[1],
				z: svg.position[2],
			},
			rotation: {
				value: {
					x: svg.rotation ? svg.rotation[0] : 0,
					y: svg.rotation ? svg.rotation[1] : 0,
					z: svg.rotation ? svg.rotation[2] : 0,
				},
			},
		});

		svg.position = [ctrl.position.x, ctrl.position.y, ctrl.position.z];
		svg.rotation = [ctrl.rotation.x, ctrl.rotation.y, ctrl.rotation.z];
	}

	return (
		<Canvas camera={{ position: [1, 1, 6], fov: 50 }} shadows gl={{ antialias: true }} frameloop="always">
			<ambientLight intensity={0.7} />
			<directionalLight intensity={1} position={[200, 100, 300]} castShadow={true} />

			<OrbitControls />
			<Suspense fallback={<Loader />}>
				<Raycast onClick={(m: Mesh) => console.log(m.name)}>
					{svgs.map((props, i) => (
						<SVGObject key={i} {...props} />
					))}
				</Raycast>
				<Table />
			</Suspense>
		</Canvas>
	);
}
