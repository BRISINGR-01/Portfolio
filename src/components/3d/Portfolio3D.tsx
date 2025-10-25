import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
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
import Raycast from "./Raycast";
import Room from "./room/Room";
import SVGObject from "./SVGObject";

import { AnimatePresence } from "motion/react";
import "../../css/floating-ui.css";
import IntenshipsAndBigProjects from "../floating-ui/InternshipsAndBigProjects";
import Menu from "../floating-ui/Menu.tsx";
import Table from "./table/Table.tsx";

BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
Mesh.prototype.raycast = acceleratedRaycast;

BatchedMesh.prototype.computeBoundsTree = computeBatchedBoundsTree;
BatchedMesh.prototype.disposeBoundsTree = disposeBatchedBoundsTree;
BatchedMesh.prototype.raycast = acceleratedRaycast;

export default function Portfolio3D() {
	const [icons, setData] = useState<WorkingExperience[] | null>(null);
	const [selectedIcon, setSelectedItem] = useState<WorkingExperience | null>(null);
	const selectedId = useRef<string>(null);

	useEffect(() => {
		fetch("/working-experience.json")
			.then((response) => response.json())
			.then((d) => setData(d));
	}, []);

	return (
		<>
			<Canvas shadows>
				<Suspense>
					<PerspectiveCamera position={[-2, 1.4, 6]} fov={50} makeDefault />
					<ambientLight intensity={0.7} />
					<directionalLight intensity={0.5} position={[200, 100, 300]} castShadow={true} />
					<OrbitControls />

					<Room>
						<Raycast
							onClick={(m: Mesh | null) => {
								function unselect() {
									selectedId.current = null;
									setSelectedItem(null);
								}

								if (!m) return unselect();
								// window.navigator.clipboard.writeText(`position: [${window[m.name].position.x}, ${
								// 	window[m.name].position.y
								// }, ${window[m.name].position.z}],
								// 	rotation: [${window[m.name].rotation.x}, ${window[m.name].rotation.y}, ${window[m.name].rotation.z}],`)

								const newSelected = icons?.find((el) => el["3d-logo"].id === m.name) ?? null;

								if (!newSelected) return unselect();
								if (newSelected && newSelected.id === selectedId.current) return unselect();

								selectedId.current = newSelected!.id;
								setSelectedItem(newSelected);
							}}
						>
							{!icons ? (
								<></>
							) : (
								icons
									.map((el) => el["3d-logo"])
									// .slice(0, 1)
									.map((props, i) => <SVGObject key={i} {...props} />)
							)}
						</Raycast>
						<Table text="Internships and Big Projects" />
					</Room>
				</Suspense>
			</Canvas>
			<AnimatePresence>
				{selectedIcon ? (
					<IntenshipsAndBigProjects data={selectedIcon} />
				) : (
					<Menu
						key="menu"
						onSelect={(id: string) => {
							console.log(id);
						}}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
