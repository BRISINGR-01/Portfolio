import { useKeyboardControls } from "@react-three/drei";
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
import { ICON_DELAY, MENU_DELAY, SKIP_ANIMATIONS, TABLE_DELAY } from "../../constants";

import content from "../../content/index.ts";
import "../../css/floating-ui.css";
import { Mode, type ContentData, type Controls, type Language } from "../../types.ts";
import { prettifyTitle } from "../../utils.ts";
import Delay from "../Delay.tsx";
import ContentDisplay from "../floating-ui/ContentDisplay.tsx";
import Menu from "../floating-ui/Menu.tsx";
import Environment3D from "./Environment.tsx";
import Globe from "./Globe.tsx";
import Icon from "./icon/Icon.tsx";
import Raycast from "./Raycast.tsx";
import Table from "./table/Table.tsx";

BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
Mesh.prototype.raycast = acceleratedRaycast;

BatchedMesh.prototype.computeBoundsTree = computeBatchedBoundsTree;
BatchedMesh.prototype.disposeBoundsTree = disposeBatchedBoundsTree;
BatchedMesh.prototype.raycast = acceleratedRaycast;

export default function Portfolio3D() {
	const [mode, setMode] = useState(Mode.Experience);
	const [contentIndex, setContentIndex] = useState<number>(-1);
	const [hovered, setHovered] = useState<ContentData | null>(null);
	const [visibleIcons, setVisibleIcons] = useState<ContentData[]>([]);
	const [sub] = useKeyboardControls<Controls>();

	const selectedContent = content[mode] as ContentData[];
	const selectedIcon: ContentData | null = contentIndex === -1 ? null : selectedContent[contentIndex];
	// useEdit(selectedContent?.at(-1));

	useEffect(() => {
		const t = setTimeout(() => {
			if (SKIP_ANIMATIONS) return;

			if (!window.localStorage.getItem("isFirstEntry")) {
				window.localStorage.setItem("isFirstEntry", "true");
				setMode(Mode.Info);
			} else {
				setMode(Mode.Experience);
			}
		}, TABLE_DELAY);

		const unsub = sub(
			(state) => state.escape,
			(pressed) => pressed && setContentIndex(-1)
		);

		return () => {
			unsub();
			clearTimeout(t);
		};
	}, [sub]);

	useEffect(() => {
		if (!selectedContent) return;

		let t: number;
		setContentIndex(-1);
		setVisibleIcons([]);

		for (let i = 0; i < selectedContent.length; i++) {
			// let React and the browser breathe before next mesh mount
			t = setTimeout(() => setVisibleIcons((prev) => [...prev, selectedContent[i]]), i * ICON_DELAY);
		}

		return () => clearTimeout(t);
	}, [selectedContent]);

	return (
		<>
			<Environment3D pause={!!selectedIcon}>
				<Delay time={TABLE_DELAY}>
					<Raycast
						key={mode} // refreshes values in the callback
						onClick={(m: Mesh | null) => {
							if (!m || !selectedContent) return setContentIndex(-1);
							const newSelected = selectedContent.find((el) => el.id === m.name) ?? null;

							if (!newSelected || newSelected.id === selectedIcon?.id) return setContentIndex(-1);

							setContentIndex(selectedContent.findIndex(({ id }) => id === newSelected.id));
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
				<Table text={prettifyTitle(selectedIcon?.title ?? hovered?.title ?? mode)} />
				{mode === Mode.Languages && <Globe langauge={(selectedIcon ?? hovered) as Language} />}
			</Environment3D>

			<Delay time={MENU_DELAY}>
				{selectedContent && (
					<ContentDisplay
						close={() => setContentIndex(-1)}
						data={selectedIcon}
						type={mode}
						nrOfPages={selectedContent.length}
						onSelect={(i) => setContentIndex(i)}
						currentPage={contentIndex}
					/>
				)}
				<Menu
					show={!selectedIcon}
					selected={mode}
					onSelect={setMode}
					disabled={!!selectedContent && visibleIcons.length !== selectedContent.length}
				/>
			</Delay>
		</>
	);
}
