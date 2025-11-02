import { useGLTF, useKeyboardControls } from "@react-three/drei";
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
import { MENU_DELAY } from "../../constants";

import { AnimatePresence } from "motion/react";
import content from "../../content.ts";
import "../../css/floating-ui.css";
import { Mode, type ContentData, type Controls } from "../../types.ts";
import { prettifyTitle } from "../../utils.ts";
import Delay from "../Delay.tsx";
import ContentDisplay from "../floating-ui/ContentDisplay.tsx";
import Menu from "../floating-ui/Menu.tsx";
import Environment3D from "./Environment.tsx";
import Icon from "./icon/Icon.tsx";
import Raycast from "./Raycast.tsx";
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
	const [mode, setMode] = useState(Mode.None);
	const [selectedIcon, setSelectedIcon] = useState<ContentData | null>(null);
	const [hovered, setHovered] = useState<ContentData | null>(null);
	const [sub] = useKeyboardControls<Controls>();

	const selectedContent =
		mode === Mode.Experience
			? content.experience
			: mode === Mode.Education
			? content.education
			: mode === Mode.Contact
			? content.contacts
			: null;

	useEffect(() => {
		if (!window.localStorage.getItem("isFirstEntry")) {
			window.localStorage.setItem("isFirstEntry", "true");
			setMode(Mode.Info);
		}

		setMode(Mode.Contact);
		// setSelectedItem(content.education[5]);
		return sub(
			(state) => state.escape,
			(pressed) => {
				if (pressed) setSelectedIcon(null);
			}
		);
	}, [sub]);

	// const p = usePos([0, 0, 0]);
	// const r = useRot([0, 0, 0]);

	// content.contacts.at(-1)!.icon3D.position = p;
	// content.contacts.at(-1)!.icon3D.rotation = r;

	// console.log(
	// 	`position: [${p[0].toFixed(3)}, ${p[1].toFixed(3)}, ${p[2].toFixed(3)}],
	// 							rotation: [${r[0].toFixed(3)}, ${r[1].toFixed(3)}, ${r[2].toFixed(3)}],`
	// );

	const [visibleIcons, setVisibleIcons] = useState<ContentData[]>([]);

	useEffect(() => {
		if (!selectedContent) return;

		setVisibleIcons([]);

		for (let i = 0; i < selectedContent.length; i++) {
			// let React and the browser breathe before next mesh mount
			setTimeout(() => {
				if (i >= selectedContent.length) return;

				setVisibleIcons((prev) => [...prev, selectedContent[i]]);
			}, (i + 1) * 20);
		}
	}, [selectedContent]);

	return (
		<>
			<Environment3D>
				<Raycast
					key={mode} // refreshes values in the callback
					onClick={(m: Mesh | null) => {
						if (!m || !selectedContent) return setSelectedIcon(null);
						const newSelected = selectedContent.find((el) => el.id === m.name) ?? null;

						if (!newSelected || newSelected.id === selectedIcon?.id) return setSelectedIcon(null);

						setSelectedIcon(newSelected);
					}}
					onHover={(id: string | null) => {
						if (!id || !selectedContent) {
							setHovered(null);
						} else {
							setHovered(selectedContent.find((data) => data.id === id)!);
						}
					}}
				>
					{visibleIcons.map((icon) => (
						<Suspense key={icon.id} fallback={null}>
							<Icon {...icon} />
						</Suspense>
					))}
				</Raycast>
				<Table text={prettifyTitle(hovered?.title ?? mode)} />
			</Environment3D>

			<Delay time={MENU_DELAY}>
				<AnimatePresence>
					{!selectedIcon && (
						<Menu
							key="menu"
							selected={mode}
							onSelect={(c) => {
								setMode(c);
								setSelectedIcon(null);
							}}
						/>
					)}
					{selectedIcon && <ContentDisplay data={selectedIcon} type={mode} />}
				</AnimatePresence>
			</Delay>
		</>
	);
}
