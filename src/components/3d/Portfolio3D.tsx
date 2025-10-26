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

import { AnimatePresence } from "motion/react";
import type { Content, ContentData, ContentType, Education } from "../../content.ts";
import "../../css/floating-ui.css";
import { usePos, useRot } from "../../utils.ts";
import Delay from "../Delay.tsx";
import ContentDisplay from "../floating-ui/ContentDisplay.tsx";
import Menu from "../floating-ui/Menu.tsx";
import Icon from "./icon/Icon.tsx";
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
	const [selectedContent, setSelectedContent] = useState<ContentType | null>(null);
	const [selectedIcon, setSelectedItem] = useState<ContentData | null>(null);
	const selectedId = useRef<string>(null);

	useEffect(() => {
		setSelectedContent("education");
		fetch("/content.json")
			.then((response) => response.json())
			.then(setData);
	}, []);

	const p = usePos();
	const r = useRot();

	const content =
		// data[selectedContent] ?? []
		[
			{
				id: "htb",
				title: "Hack the Box",
				logo: "/icons/other/htb.svg",
				"3d-logo": {
					id: "htb",
					url: "/icons/other/htb.svg",
					scale: 0.03,
					position: p,
					rotation: r,
					wide: false,
				},
			},
			{
				id: "fontys",
				title: "Fontys (Academic preperation)",
				logo: "/icons/other/fontys.svg",
				"3d-logo": {
					id: "fontys",
					url: "/icons/other/fontys.svg",
					scale: 0.0004,
					position: [1, 0.55, -0.41],
					rotation: [0, 0, 0],
					wide: true,
				},
			},
			{
				id: "tue",
				title: "Tue (Embedded Systems Pre-master)",
				logo: "/icons/other/tue.svg",
				"3d-logo": {
					id: "tue",
					url: "/icons/other/tue.svg",
					scale: 0.004,
					position: [1.9, 0.1, 0.65],
					rotation: [-0.2, 0.2, 0],
					wide: true,
				},
			},
			{
				id: "primagen",
				title: '"The Last Algorithms Course You\'ll Need" by The Primeagen',
				logo: "primeagen.webp",
				"3d-logo": {
					id: "p",
					url: "/images/other/primagen-icon.webp",
					scale: 0.7,
					position: [-1.9, -0.1, 0.65],
				},
			},
		] as Education[];

	return (
		<>
			<Canvas>
				<PerspectiveCamera position={[-1, 0.3, 5]} fov={75} makeDefault />
				<ambientLight intensity={0.7} />
				<directionalLight intensity={2} position={[200, 100, 300]} castShadow={false} />
				<OrbitControls />

				<Room>
					<Raycast
						onClick={(m: Mesh | null) => {
							function unselect() {
								selectedId.current = null;
								setSelectedItem(null);
							}

							if (!m) return unselect();
							window.navigator.clipboard.writeText(`position: [${p[0]}, ${p[1]}, ${p[2]}],
								rotation: [${r[0]}, ${r[1]}, ${r[2]}],`);

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
								<Icon key={icon.id} {...icon["3d-logo"]} />
							))}
					</Raycast>
					<Table text="Internships and Big Projects" />
				</Room>
			</Canvas>
			<Delay time={MENU_DELAY}>
				<AnimatePresence>
					{data && <Menu key="menu" onSelect={setSelectedContent} />}
					{selectedContent !== null && selectedIcon && <ContentDisplay data={selectedIcon} type={selectedContent} />}
				</AnimatePresence>
			</Delay>
		</>
	);
}
