import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector2, type Group, type Mesh } from "three";
import { EffectComposer, OutlinePass, OutputPass, RenderPass } from "three/examples/jsm/Addons.js";
import { COLOR_PALETTE, RAYCAST_CONTAINER_NAME } from "../../constants";
import { setDefaultCursor, setPointerCursor } from "../../utils";

export default function Raycast({
	children,
	onClick,
	onHover: onHover,
}: {
	onClick: (m: Mesh | null) => void;
	onHover: (title: string | null) => void;
	children: null | React.JSX.Element[];
}) {
	const groupRef = useRef<Group>(null);
	const { scene, camera, gl, raycaster } = useThree();
	const mouse = useRef(new Vector2());
	const composer = useRef<EffectComposer>(null);
	const persistentOutlinePass = useRef<OutlinePass>(null);

	useFrame(() => composer.current?.render());

	useEffect(() => {
		if (!composer.current) return;

		for (const pass of composer.current.passes) {
			if (pass instanceof OutlinePass && pass.selectedObjects.length > 1) {
				pass.selectedObjects = groupRef.current!.children;
			}
		}
	}, [children]);

	useEffect(() => {
		raycaster.firstHitOnly = true;
		gl.autoClear = false;

		composer.current = new EffectComposer(gl);
		composer.current.setSize(window.innerWidth, window.innerHeight);

		composer.current.addPass(new RenderPass(scene, camera));

		const outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), scene, camera);
		outlinePass.edgeStrength = 5;
		outlinePass.edgeGlow = 1;
		outlinePass.visibleEdgeColor.set(COLOR_PALETTE.PRIMARY);
		outlinePass.hiddenEdgeColor.set("#1abaff");
		composer.current.addPass(outlinePass);

		persistentOutlinePass.current = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), scene, camera);
		persistentOutlinePass.current.edgeStrength = 1;
		persistentOutlinePass.current.edgeGlow = 0;
		persistentOutlinePass.current.visibleEdgeColor.set("#ffffff");
		persistentOutlinePass.current.selectedObjects = groupRef.current!.children;
		composer.current.addPass(persistentOutlinePass.current);

		composer.current.addPass(new OutputPass());

		let hovered: Mesh | null = null;
		function unselect() {
			outlinePass!.selectedObjects = [];
			hovered = null;
			onHover(null);
			setDefaultCursor();
		}

		const canvas = gl.domElement;
		let rect = canvas.getBoundingClientRect();
		function onMove(e: PointerEvent) {
			if (!groupRef.current) return;

			mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
			mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

			raycaster.setFromCamera(mouse.current, camera);

			const intersects = raycaster.intersectObjects(groupRef.current.children, true);
			if (!intersects.length) return unselect();

			let mesh = intersects[0].object as Mesh;
			if (!mesh.isMesh) return unselect();

			while (mesh.parent?.name !== RAYCAST_CONTAINER_NAME) {
				mesh = mesh.parent as Mesh;
			}

			if (hovered?.id === mesh.id) return;

			hovered = mesh;
			// onHover(mesh.name);
			outlinePass!.selectedObjects = [mesh];
			setPointerCursor();
		}

		function onClickCb() {
			onClick(hovered);
			setDefaultCursor();
		}

		function onResize() {
			rect = canvas.getBoundingClientRect();
		}

		canvas.addEventListener("click", onClickCb);
		canvas.addEventListener("pointermove", onMove);
		window.addEventListener("resize", onResize);
		return () => {
			canvas.removeEventListener("pointermove", onMove);
			canvas.removeEventListener("click", onClickCb);
			window.removeEventListener("resize", onResize);

			composer.current?.dispose();
			composer.current = null;
		};
		//  eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<group ref={groupRef} name={RAYCAST_CONTAINER_NAME}>
			{children}
		</group>
	);
}
