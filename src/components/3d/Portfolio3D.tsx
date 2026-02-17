import { useKeyboardControls } from "@react-three/drei";
import { Suspense, useCallback, useEffect, useState } from "react";
import { BufferGeometry, Mesh } from "three";
import {
	acceleratedRaycast,
	computeBatchedBoundsTree,
	computeBoundsTree,
	disposeBatchedBoundsTree,
	disposeBoundsTree,
} from "three-mesh-bvh";
import { BatchedMesh } from "three/webgpu";
import { ICON_DELAY, TABLE_DELAY } from "../../constants";

import content from "../../content/index.ts";
import "../../css/floating-ui.css";
import { Mode, type ContentData, type Controls } from "../../types.ts";
import { getEscAction, makeClickSound, prettifyTitle } from "../../utils.ts";
import BgMusic from "../floating-ui/components/BgMusic.tsx";
import ContentDisplay from "../floating-ui/displays/ContentDisplay.tsx";
import Menu from "../floating-ui/displays/Menu.tsx";
import Icon from "./icon/Icon.tsx";
import AboutMe from "./other-components/AboutMe.tsx";
import Delay from "./other-components/Delay.tsx";
import Environment3D from "./other-components/Environment.tsx";
import Loader from "./other-components/Loader.tsx";
import Raycast from "./other-components/Raycast.tsx";
import Room from "./room/Room.tsx";
import Table from "./table/Table.tsx";

BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
Mesh.prototype.raycast = acceleratedRaycast;

BatchedMesh.prototype.computeBoundsTree = computeBatchedBoundsTree;
BatchedMesh.prototype.disposeBoundsTree = disposeBatchedBoundsTree;
BatchedMesh.prototype.raycast = acceleratedRaycast;

const defMode = Mode.AboutMe;

export default function Portfolio3D() {
	const [mode, setMode] = useState(defMode);
	const [contentIndex, setContentIndex] = useState<number>(-1);
	const [hovered, setHovered] = useState<ContentData | null>(null);
	const [visibleIcons, setVisibleIcons] = useState<ContentData[]>([]);
	const [sub] = useKeyboardControls<Controls>();

	const selectedContent = content[mode] as ContentData[];
	const selectedIcon: ContentData | null = contentIndex === -1 ? null : selectedContent[contentIndex];
	// useEdit(education?.at(-2));

	useEffect(
		() =>
			sub(
				(state) => state.escape,
				(pressed) => {
					if (!pressed) return;

					const action = getEscAction();

					if (action) {
						return action();
					}

					setContentIndex(-1);
				},
			),
		[sub],
	);

	useEffect(() => {
		setContentIndex(-1);
		setVisibleIcons([]);

		if (!selectedContent) return;

		let t: number;

		for (let i = 0; i < selectedContent.length; i++) {
			// let React and the browser breathe before next mesh mount
			t = setTimeout(() => setVisibleIcons((prev) => [...prev, selectedContent[i]]), i * ICON_DELAY);
		}

		return () => clearTimeout(t);
	}, [selectedContent]);

	const onClick = useCallback(
		(m: Mesh | null) => {
			if (!m || !selectedContent) return setContentIndex(-1);
			const newSelected = selectedContent.find((el) => el.id === m.name) ?? null;

			if (!newSelected || newSelected.id === selectedIcon?.id) return setContentIndex(-1);

			setContentIndex(selectedContent.findIndex(({ id }) => id === newSelected.id));
			makeClickSound();
		},
		[selectedContent, selectedIcon?.id],
	);

	const onHover = useCallback(
		(id: string | null) => {
			if (!id || !selectedContent) {
				setHovered(null);
			} else {
				setHovered(selectedContent.find((data) => data.id === id)!);
			}
		},
		[selectedContent],
	);

	return (
		<>
			<Suspense fallback={<Loader />}>
				<Environment3D pause={false}>
					<Room />
					<Raycast onClick={onClick} onHover={onHover}>
						<Delay time={TABLE_DELAY}>
							{visibleIcons.map((icon) => (
								<Suspense key={icon.id} fallback={null}>
									<Icon {...icon} />
								</Suspense>
							))}
						</Delay>
					</Raycast>
					<Table text={prettifyTitle(selectedIcon?.title ?? hovered?.title ?? mode)} />
					<Delay time={TABLE_DELAY}>
						{mode === Mode.AboutMe && <AboutMe selectedIcon={selectedIcon ?? hovered} />}
					</Delay>
				</Environment3D>
			</Suspense>

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
			<Delay time={TABLE_DELAY}>
				<Menu
					show={!selectedIcon}
					selected={mode}
					onSelect={setMode}
					disabled={!!selectedContent && visibleIcons.length !== selectedContent.length}
				/>
			</Delay>
			<BgMusic />
		</>
	);
}
