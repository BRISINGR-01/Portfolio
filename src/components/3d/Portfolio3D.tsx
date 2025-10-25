import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { BufferGeometry, Mesh } from "three";
import {
	acceleratedRaycast,
	computeBatchedBoundsTree,
	computeBoundsTree,
	disposeBatchedBoundsTree,
	disposeBoundsTree,
} from "three-mesh-bvh";
import { BatchedMesh } from "three/webgpu";
import { MENU_DELAY } from "../../constants";
import Raycast from "./Raycast";
import Room from "./room/Room";
import SVGObject from "./SVGObject";

import { useControls } from "leva";
import { AnimatePresence } from "motion/react";
import type { Content, ContentData, ContentType } from "../../content.ts";
import "../../css/floating-ui.css";
import Delay from "../Delay.tsx";
import IntenshipsAndBigProjects from "../floating-ui/InternshipsAndBigProjects";
import Menu from "../floating-ui/Menu.tsx";
import Table from "./table/Table.tsx";

BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
Mesh.prototype.raycast = acceleratedRaycast;

BatchedMesh.prototype.computeBoundsTree = computeBatchedBoundsTree;
BatchedMesh.prototype.disposeBoundsTree = disposeBatchedBoundsTree;
BatchedMesh.prototype.raycast = acceleratedRaycast;

useGLTF.preload("/3d/table.glb");
fetch("/circuit.mp4");

export default function Portfolio3D() {
	const [data, setData] = useState<Content | null>(null);
	let [content, setContent] = useState<ContentData[]>([]);
	const [selectedIcon, setSelectedItem] = useState<ContentData | null>(null);
	const selectedId = useRef<string>(null);

	useEffect(() => {
		fetch("/content.json")
			.then((response) => response.json())
			.then(setData);
	}, []);

	content = [
		{
			id: "math",
			value: "Intro to Theoretical Computer Science",
			url: "https://udacity.com/enrollment/cs313",
		},
		{
			id: "node",
			value: "NodeJS - The Complete Guide (MVC, REST, APIs, GraphQl)",
		},
		{
			id: "htb",
			value: "Hack the Box",
		},
		{
			id: "fontys",
			value: "Fontys (Academic preperation)",
			"3d-logo": {
				id: "fontys",
				url: "/icons/other/fontys.svg",
				scale: 0.0003,
				// position: usePos(),
				// rotation: useRot(),
				wide: true,
			},
		},
		{
			id: "tue",
			value: "Tue (Embedded Systems Pre-master)",
			"3d-logo": {
				id: "tue",
				url: "/icons/other/tue.svg",
				scale: 0.003,
				position: [1.9, 0.45, 0.65],
				rotation: [-0.2, 0.2, 0],
				wide: true,
			},
		},
		{
			id: "primagen",
			value: '"The Last Algorithms Course You\'ll Need" by The Primeagen',
			image: "primeagen.webp",
		},
	];

	const moveEnabled = useControls("move", {
		move: true,
	}).move;

	console.log(moveEnabled);

	return (
		<>
			<Canvas shadows>
				<PerspectiveCamera position={[-3, 0, 6]} fov={50} makeDefault />
				<ambientLight intensity={0.7} />
				<directionalLight intensity={0.5} position={[200, 100, 300]} castShadow={true} />
				<OrbitControls enabled={moveEnabled} />

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

							const newSelected = content?.find((el) => el["3d-logo"].id === m.name) ?? null;

							if (!newSelected) return unselect();
							if (newSelected && newSelected.id === selectedId.current) return unselect();

							selectedId.current = newSelected!.id;
							setSelectedItem(newSelected);
						}}
					>
						{content
							// .slice(0, 1)
							.map((icon) => (
								<SVGObject key={icon.id} {...icon["3d-logo"]} />
							))}
					</Raycast>
					<Table text="Internships and Big Projects" />
				</Room>
			</Canvas>
			<Delay time={MENU_DELAY}>
				<AnimatePresence>
					{data && (
						<Menu
							key="menu"
							onSelect={(type: ContentType) => {
								setContent(data[type]);
								console.log(data);
							}}
							onUnselect={() => setContent([])}
						/>
					)}
					{selectedIcon && <IntenshipsAndBigProjects data={selectedIcon} />}
				</AnimatePresence>
			</Delay>
		</>
	);
}
