import { CameraControls, useKeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { DEFAULT_CAMERA_POS, INITIAL_CAMERA_POS, IS_DEBUG, ZOOM_IN_DELAY } from "../../constants";
import type { Controls } from "../../types";
import Room from "./room/Room";

export default function Environment(props: { children: React.ReactNode }) {
	const [sub] = useKeyboardControls<Controls>();
	const cameraControlsRef = useRef<CameraControls>(null);

	useEffect(() => {
		const zoomIn = () =>
			cameraControlsRef.current
				? cameraControlsRef.current.setLookAt(...DEFAULT_CAMERA_POS, 0, 0, 0, true)
				: Promise.reject();

		const unsubRecenter = sub(
			(state) => state.recenter,
			(pressed) => pressed && zoomIn()
		);

		const unsubFullScreen = sub(
			(state) => state["full-screen"],
			(pressed) => {
				if (!pressed) return;

				if (document.fullscreenElement) {
					document.exitFullscreen();
				} else {
					document.documentElement.requestFullscreen();
				}
			}
		);

		const t = setTimeout(
			() =>
				zoomIn().then(() => {
					cameraControlsRef.current!.enabled = true;
				}),
			ZOOM_IN_DELAY
		);

		return () => {
			clearTimeout(t);
			unsubRecenter();
			unsubFullScreen();
		};
	}, [sub, cameraControlsRef]);

	return (
		<Canvas camera={{ position: INITIAL_CAMERA_POS, fov: 75 }}>
			<CameraControls ref={cameraControlsRef} enabled={IS_DEBUG || false} />
			<ambientLight intensity={0.6} />
			<directionalLight intensity={0.9} position={[200, 100, 300]} />

			<Room>{props.children}</Room>
		</Canvas>
	);
}
