import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { BufferGeometry, Mesh } from "three";
import {
	acceleratedRaycast,
	computeBatchedBoundsTree,
	computeBoundsTree,
	disposeBatchedBoundsTree,
	disposeBoundsTree,
} from "three-mesh-bvh";
import { BatchedMesh } from "three/webgpu";
import { type WorkingExperience } from "../../constants";
import Menu from "../Menu";
import Ceiling from "./Ceiling";
import CircuitPattern from "./CircuitPattern";
import Loader from "./Loader";
import Raycast from "./Raycast";
import SVGObject from "./SVGObject";
import Table from "./Table";
import SciFiWall from "./Wall";

BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
Mesh.prototype.raycast = acceleratedRaycast;

BatchedMesh.prototype.computeBoundsTree = computeBatchedBoundsTree;
BatchedMesh.prototype.disposeBoundsTree = disposeBatchedBoundsTree;
BatchedMesh.prototype.raycast = acceleratedRaycast;

export default function Portfolio3D() {
	const [data, setData] = useState<WorkingExperience[] | null>(null);
	const [selectedItem, setSelectedItem] = useState<WorkingExperience | null>(null);

	// 3. Create out useEffect function
	useEffect(() => {
		fetch("/working-experience.json")
			.then((response) => response.json())
			.then((data) => setData(data));
	}, []);

	// for (const svg of data?.map()) {
	// 	if (!import.meta.env.DEV) continue;

	// 	// eslint-disable-next-line react-hooks/rules-of-hooks
	// 	const ctrl = useControls(svg.url.split("/").at(-1)!.replace(".svg", ""), {
	// 		position: {
	// 			x: svg.position[0],
	// 			y: svg.position[1],
	// 			z: svg.position[2],
	// 		},
	// 		rotation: {
	// 			value: {
	// 				x: svg.rotation ? svg.rotation[0] : 0,
	// 				y: svg.rotation ? svg.rotation[1] : 0,
	// 				z: svg.rotation ? svg.rotation[2] : 0,
	// 			},
	// 		},
	// 	});

	// 	svg.position = [ctrl.position.x, ctrl.position.y, ctrl.position.z];
	// 	svg.rotation = [ctrl.rotation.x, ctrl.rotation.y, ctrl.rotation.z];
	// 	window[svg.id] = ctrl;
	// }

	return (
		<>
			<Canvas shadows>
				<color attach="background" args={["black"]} />
				<PerspectiveCamera position={[-2, 1.4, 6]} fov={50} makeDefault />
				<ambientLight intensity={0.7} />
				<directionalLight intensity={1} position={[200, 100, 300]} castShadow={true} />
				<OrbitControls maxDistance={10} />

				<Suspense fallback={<Loader />}>
					<Raycast
						onClick={(m: Mesh | null) => {
							if (!m) {
								setSelectedItem(null);
								return;
							}
							// window.navigator.clipboard.writeText(`position: [${window[m.name].position.x}, ${
							// 	window[m.name].position.y
							// }, ${window[m.name].position.z}],
							// 	rotation: [${window[m.name].rotation.x}, ${window[m.name].rotation.y}, ${window[m.name].rotation.z}],`)

							const newSelected = data?.find((el) => el["3d-logo"].id === m.name) ?? null;

							if (newSelected && newSelected === selectedItem) {
								setSelectedItem(null);
							} else {
								setSelectedItem(newSelected);
							}
						}}
					>
						{!data ? (
							<></>
						) : (
							data
								.map((el) => el["3d-logo"])
								.slice(0, 1)
								.map((props, i) => <SVGObject key={i} {...props} />)
						)}
					</Raycast>
					<Table text="Internships and Big Projects" />
					<Suspense fallback={null}>
						<CircuitPattern />
					</Suspense>
					<Ceiling />
					<SciFiWall position={[0, 0, -1]} rotate={0} />
					<SciFiWall position={[0, 0, 1]} rotate={Math.PI} />
					<SciFiWall position={[1, 0, 0]} rotate={-Math.PI / 2} />
					<SciFiWall position={[-1, 0, 0]} rotate={Math.PI / 2} />
				</Suspense>
			</Canvas>
			{selectedItem && <Menu data={selectedItem} />}
		</>
	);
}
