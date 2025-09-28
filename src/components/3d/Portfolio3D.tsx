import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
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
import Menu from "../Menu";
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

export default function Portfolio3D() {
	const svgs: SVGObjectProps[] = [
		{
			id: "latin-is-simple",
			url: "/icons/other/latin-is-simple.svg",
			scale: 0.0015,
			position: [-0.2, 0.4, -0.1],
			rotation: [-0.2, 0.2, 0],
			wide: true,
		},
		{
			id: "SDG",
			url: "/icons/other/SDG.svg",
			scale: 0.002,
			position: [-0.8, 0.73, 0.55],
			rotation: [0.4, 0.4, 0.4],
			wide: false,
		},
		{
			id: "2aeg",
			url: "/icons/other/2aeg.svg",
			scale: 0.005,
			position: [-0.5, -0.3, 0.2],
			rotation: [-1.5, 0, -0.5],
			wide: true,
		},
		{
			id: "ASML",
			url: "/icons/other/ASML.svg",
			scale: 0.002,
			position: [0.5, 0.19, -0.4],
			rotation: [-0.4, -0.5, 0.2],
			wide: true,
		},
		{
			id: "ICC",
			url: "/icons/other/ICClogo.svg",
			scale: 0.001,
			position: [1.9, 0.45, 0.65],
			rotation: [-0.2, 0.2, 0],
			wide: true,
		},
		{
			id: "A1",
			url: "/icons/other/A1.svg",
			scale: 0.0015,
			position: [-1.4, 0.4, 0.4],
			rotation: [-0.3, 0, 0],
			wide: true,
		},
	];

	for (const svg of svgs) {
		if (!import.meta.env.DEV) continue;

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
		window[svg.id] = ctrl;
	}

	return (
		<>
			<Canvas shadows gl={{ antialias: true }} frameloop="always">
				<PerspectiveCamera position={[-1.6, 1.4, 5.5]} fov={50} makeDefault />
				<ambientLight intensity={0.7} />
				<directionalLight intensity={1} position={[200, 100, 300]} castShadow={true} />
				<OrbitControls />

				<Suspense fallback={<Loader />}>
					<Raycast
						onClick={(m: Mesh) =>
							window.navigator.clipboard.writeText(`position: [${window[m.name].position.x}, ${
								window[m.name].position.y
							}, ${window[m.name].position.z}],
								rotation: [${window[m.name].rotation.x}, ${window[m.name].rotation.y}, ${window[m.name].rotation.z}],`)
						}
					>
						{svgs.slice(0, 1).map((props, i) => (
							<SVGObject key={i} {...props} />
						))}
					</Raycast>
					<Table text="Internships and Big Projects" />
				</Suspense>
			</Canvas>
			<Menu />
		</>
	);
}
