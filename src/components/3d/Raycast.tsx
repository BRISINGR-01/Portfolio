import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector2, type Group, type Mesh } from "three";
import { EffectComposer, OutlinePass, OutputPass, RenderPass } from "three/examples/jsm/Addons.js";
import { COLOR_PALETTE, RAYCAST_CONTAINER_NAME } from "../../constants";

export default function Raycast(props: {
	onClick: (m: Mesh | null) => void;
	children: React.JSX.Element | React.JSX.Element[];
}) {
	const groupRef = useRef<Group>(null);
	const { scene, camera, gl, raycaster } = useThree();
	const mouse = useRef(new Vector2());
	const composer = useRef(new EffectComposer(gl));

	useFrame(() => {
		composer.current.render();
	}, 0);

	useEffect(() => {
		raycaster.firstHitOnly = true;
		gl.autoClear = false;

		composer.current.setSize(window.innerWidth, window.innerHeight);
		composer.current.addPass(new RenderPass(scene, camera));

		const outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), scene, camera);
		outlinePass.edgeStrength = 5;
		outlinePass.edgeGlow = 1;
		outlinePass.visibleEdgeColor.set(COLOR_PALETTE.PRIMARY);
		composer.current.addPass(outlinePass);

		const outputPass = new OutputPass();
		composer.current.addPass(outputPass);

		let hovered: Mesh | null = null;
		function unselect() {
			outlinePass.selectedObjects = [];
			hovered = null;
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
			outlinePass.selectedObjects = [mesh];
		}

		function onClick() {
			props.onClick(hovered);
		}

		function onResize() {
			rect = canvas.getBoundingClientRect();
		}

		canvas.addEventListener("click", onClick);
		canvas.addEventListener("pointermove", onMove);
		window.addEventListener("resize", onResize);
		return () => {
			canvas.removeEventListener("pointermove", onMove);
			canvas.removeEventListener("click", onClick);
			window.removeEventListener("resize", onResize);
		};
		//  eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<group ref={groupRef} name={RAYCAST_CONTAINER_NAME}>
			{props.children}
		</group>
	);
	// <HologramEffect composer={composer.current}>{props.children}</HologramEffect>
}
