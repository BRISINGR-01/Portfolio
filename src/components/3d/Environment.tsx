import { CameraControls, useKeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { defaultCameraPos, initialCameraPos, IS_DEBUG } from "../../constants";
import type { Controls } from "../../types";
import Room from "./room/Room";

export default function Environment(props: { children: React.ReactNode }) {
	const cameraControlsRef = useRef<CameraControls>(null);

	const [sub] = useKeyboardControls<Controls>();

	useEffect(() => {
		const zoomIn = () => {
			if (cameraControlsRef.current) {
				cameraControlsRef.current.setLookAt(...defaultCameraPos, 0, 0, 0, true);
			}
		};

		const unsubRecenter = sub(
			(state) => state.recenter,
			(pressed) => {
				if (pressed) zoomIn();
			}
		);
		const unsubFullScreen = sub(
			(state) => state["full-screen"],
			(pressed) => {
				if (pressed) {
					if (document.fullscreenElement) {
						document.exitFullscreen();
					} else {
						document.documentElement.requestFullscreen();
					}
				}
			}
		);

		const t = setTimeout(() => {
			zoomIn();
			cameraControlsRef.current!.enabled = true;
		}, 4100);

		return () => {
			clearTimeout(t);
			unsubRecenter();
			unsubFullScreen();
		};
	}, [sub, cameraControlsRef]);

	return (
		<Canvas camera={{ position: initialCameraPos, fov: 75 }}>
			<CameraControls ref={cameraControlsRef} enabled={IS_DEBUG || false} />
			<ambientLight intensity={0.6} />
			<directionalLight intensity={0.9} position={[200, 100, 300]} />

			<Room>{props.children}</Room>
		</Canvas>
	);
}
