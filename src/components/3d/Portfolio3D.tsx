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
import { ICON_DELAY, MENU_DELAY, TABLE_DELAY } from "../../constants";

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
	const [visibleIcons, setVisibleIcons] = useState<ContentData[]>([]);
	const [sub] = useKeyboardControls<Controls>();

	const selectedContent =
		mode === Mode.Experience
			? content.experience
			: mode === Mode.Education
			? content.education
			: mode === Mode.Contact
			? content.contacts
			: null;
	// useEdit(content.education.at(-1)!);

	useEffect(() => {
		if (!window.localStorage.getItem("isFirstEntry")) {
			window.localStorage.setItem("isFirstEntry", "true");
			setMode(Mode.Info);
		}

		const t = setTimeout(() => setMode(Mode.Experience), TABLE_DELAY);

		const unsub = sub(
			(state) => state.escape,
			(pressed) => {
				if (pressed) setSelectedIcon(null);
			}
		);

		return () => {
			unsub();
			clearTimeout(t);
		};
	}, [sub]);

	useEffect(() => {
		if (!selectedContent) return;

		let t: number;
		setSelectedIcon(null);
		setVisibleIcons([]);

		for (let i = 0; i < selectedContent.length; i++) {
			// let React and the browser breathe before next mesh mount
			t = setTimeout(() => setVisibleIcons((prev) => [...prev, selectedContent[i]]), i * ICON_DELAY);
		}

		return () => clearTimeout(t);
	}, [selectedContent]);

	return (
		<>
			<Environment3D>
				<Delay time={TABLE_DELAY}>
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
				</Delay>
				<Table text={prettifyTitle(hovered?.title ?? mode)} />
			</Environment3D>

			<Delay time={MENU_DELAY}>
				<AnimatePresence>
					{selectedIcon ? (
						<ContentDisplay data={selectedIcon} type={mode} />
					) : (
						<Menu
							selected={mode}
							onSelect={setMode}
							disabled={!!selectedContent && visibleIcons.length !== selectedContent.length}
						/>
					)}
				</AnimatePresence>
			</Delay>
		</>
	);
}
