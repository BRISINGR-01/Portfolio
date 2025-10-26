import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector2, type Camera, type Group, type Mesh, type Scene, type WebGLRenderer } from "three";
import { EffectComposer, OutlinePass, OutputPass, RenderPass } from "three/examples/jsm/Addons.js";
import { COLOR_PALETTE, RAYCAST_CONTAINER_NAME } from "../../constants";
import { setDefaultCursor, setPointerCursor } from "../../utils";

function createComposer(
	composer: React.RefObject<EffectComposer | null>,
	gl: WebGLRenderer,
	scene: Scene,
	camera: Camera,
	persistentOutlinePass: React.RefObject<OutlinePass | null>,
	outlinePass: React.RefObject<OutlinePass | null>,
	groupRef: React.RefObject<Group | null>
) {
	if (composer.current) {
		composer.current.dispose();
		composer.current = null;
	}

	composer.current = new EffectComposer(gl);
	composer.current.setSize(window.innerWidth, window.innerHeight);

	composer.current.addPass(new RenderPass(scene, camera));

	outlinePass.current = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), scene, camera);
	outlinePass.current.edgeStrength = 5;
	outlinePass.current.edgeGlow = 1;
	outlinePass.current.visibleEdgeColor.set(COLOR_PALETTE.PRIMARY);
	outlinePass.current.hiddenEdgeColor.set("#1abaff");
	composer.current.addPass(outlinePass.current);

	persistentOutlinePass.current = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), scene, camera);
	persistentOutlinePass.current.edgeStrength = 1;
	persistentOutlinePass.current.edgeGlow = 0;
	persistentOutlinePass.current.visibleEdgeColor.set("#ffffff");
	persistentOutlinePass.current.selectedObjects = groupRef.current!.children;
	composer.current.addPass(persistentOutlinePass.current);

	composer.current.addPass(new OutputPass());
}

export default function Raycast({
	children,
	onClick,
}: {
	onClick: (m: Mesh | null) => void;
	children: React.JSX.Element[];
}) {
	const groupRef = useRef<Group>(null);
	const { scene, camera, gl, raycaster } = useThree();
	const mouse = useRef(new Vector2());
	const composer = useRef<EffectComposer>(null);
	const outlinePass = useRef<OutlinePass>(null);
	const persistentOutlinePass = useRef<OutlinePass>(null);

	useFrame(() => {
		composer.current?.render();
	}, 0);

	useEffect(() => {
		if (persistentOutlinePass.current) persistentOutlinePass.current.selectedObjects = groupRef.current!.children;
	}, [children]);

	useEffect(() => createComposer(composer, gl, scene, camera, persistentOutlinePass, outlinePass, groupRef), [camera]);

	useEffect(() => {
		raycaster.firstHitOnly = true;
		gl.autoClear = false;

		createComposer(composer, gl, scene, camera, persistentOutlinePass, outlinePass, groupRef);

		let hovered: Mesh | null = null;
		function unselect() {
			outlinePass.current!.selectedObjects = [];
			hovered = null;
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
			outlinePass.current!.selectedObjects = [mesh];
			setPointerCursor();
		}

		function onClickCb() {
			onClick(hovered);
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
