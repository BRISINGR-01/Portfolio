import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
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
import { MENU_DELAY, TABLE_DELAY } from "../../constants";
import Raycast from "./Raycast";
import Room from "./room/Room";

import { AnimatePresence } from "motion/react";
import content from "../../content.ts";
import "../../css/floating-ui.css";
import type { ContentData, ContentType } from "../../types.ts";
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
	const [selectedContent, setSelectedContent] = useState<ContentType | null>(null);
	const [selectedIcon, setSelectedItem] = useState<ContentData | null>(null);

	useEffect(() => {
		setSelectedContent("education");
		// setSelectedItem(content.education[5]);
	}, []);

	// const p = usePos();
	// const r = useRot();

	// content.education.at(-1)!.icon3D.position = p;
	// content.education.at(-1)!.icon3D.rotation = r;

	// console.log(`position: [${p[0]}, ${p[1]}, ${p[2]}],
	// 							rotation: [${r[0]}, ${r[1]}, ${r[2]}],`);

	const [visibleIcons, setVisibleIcons] = useState<ContentData[]>([]);

	useEffect(() => {
		if (!selectedContent) return;
		const icons = content[selectedContent];

		setVisibleIcons([]);

		for (let i = 0; i < icons.length; i++) {
			// let React and the browser breathe before next mesh mount
			setTimeout(() => {
				if (i >= icons.length) return;

				setVisibleIcons((prev) => [...prev, icons[i]]);
			}, (i + 1) * 20);
		}
	}, [selectedContent]);

	return (
		<>
			<Canvas>
				<PerspectiveCamera position={[-1, 0.3, 5]} fov={75} />
				<ambientLight intensity={0.6} />
				<directionalLight intensity={0.8} position={[200, 100, 300]} />
				<OrbitControls />

				<Room>
					<Raycast
						key={selectedContent} // refreshes values in the callback
						onClick={(m: Mesh | null) => {
							if (!m) return setSelectedItem(null);

							const newSelected =
								(selectedContent ? content[selectedContent] : [])?.find((el) => el.id === m.name) ?? null;
							if (!newSelected) return setSelectedItem(null);
							if (newSelected && newSelected.id === selectedIcon?.id) return setSelectedItem(null);

							setSelectedItem(newSelected);
						}}
					>
						{selectedContent &&
							visibleIcons.map((icon) => (
								<Suspense key={icon.id} fallback={null}>
									<Icon {...icon} />
								</Suspense>
							))}
					</Raycast>
					<Delay time={TABLE_DELAY}>
						<Table text="Internships and Big Projects" />
					</Delay>
				</Room>
			</Canvas>
			<Delay time={MENU_DELAY}>
				<AnimatePresence>
					{!selectedIcon && (
						<Menu
							key="menu"
							onSelect={(c) => {
								setSelectedContent(c);
								setSelectedItem(null);
							}}
						/>
					)}
					{selectedContent && selectedIcon && <ContentDisplay data={selectedIcon} type={selectedContent} />}
				</AnimatePresence>
			</Delay>
		</>
	);
}
