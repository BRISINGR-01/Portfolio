import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
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
import content from "../../content.ts";
import "../../css/floating-ui.css";
import type { ContentData, ContentType } from "../../types.ts";
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
	const [selectedContent, setSelectedContent] = useState<ContentType | null>(null);
	const [selectedIcon, setSelectedItem] = useState<ContentData | null>(null);

	useEffect(() => {
		setSelectedContent("projects");
	}, []);

	const p = usePos();
	const r = useRot();

	return (
		<>
			<Canvas>
				<PerspectiveCamera position={[-1, 0.3, 5]} fov={75} />
				<ambientLight intensity={0.7} />
				<directionalLight intensity={1} position={[200, 100, 300]} />
				<OrbitControls />

				<Room>
					{selectedContent === null ? (
						<></>
					) : (
						<Raycast
							key={selectedContent} // refreshes values in the callback
							onClick={(m: Mesh | null) => {
								if (!m) return setSelectedItem(null);
								window.navigator.clipboard.writeText(`position: [${p[0]}, ${p[1]}, ${p[2]}],
								rotation: [${r[0]}, ${r[1]}, ${r[2]}],`);

								const newSelected = content[selectedContent]?.find((el) => el.id === m.name) ?? null;

								if (!newSelected) return setSelectedItem(null);
								if (newSelected && newSelected.id === selectedIcon?.id) return setSelectedItem(null);

								setSelectedItem(newSelected);
							}}
						>
							{content[selectedContent].map((icon) => (
								<Icon key={icon.id} {...icon} />
							))}
						</Raycast>
					)}
					<Table text="Internships and Big Projects" />
				</Room>
			</Canvas>
			<Delay time={MENU_DELAY}>
				<AnimatePresence>
					{content && (
						<Menu
							key="menu"
							onSelect={(c) => {
								setSelectedContent(c);
								setSelectedItem(null);
							}}
						/>
					)}
					{selectedContent !== null && selectedIcon && <ContentDisplay data={selectedIcon} type={selectedContent} />}
				</AnimatePresence>
			</Delay>
		</>
	);
}
