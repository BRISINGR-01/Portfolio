import { useEffect, useRef } from "react";
import * as THREE from "three";
import { COLOR_PALETTE, ROOM } from "../../../constants";

export default function CircuitPattern() {
	const meshRef = useRef<THREE.Mesh>(null);

	useEffect(() => {
		const video = document.createElement("video");
		video.src = "/circuit.mkv";
		video.crossOrigin = "anonymous";
		video.loop = true;
		video.muted = true;
		video.playsInline = true;
		video.onloadstart = (e) => {
			const vid = (e.target as HTMLVideoElement)!;
			vid.playbackRate = 1.5;
		};

		const texture = new THREE.VideoTexture(video);
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		texture.format = THREE.RGBFormat;

		setTimeout(() => {
			video.play();
			meshRef.current!.material = new THREE.MeshBasicMaterial({ map: texture });
			meshRef.current!.material.needsUpdate = true;
		}, 2000);
	}, []);

	return (
		<mesh ref={meshRef} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, -2, 0]}>
			<planeGeometry args={[ROOM.WIDTH - ROOM.OFFSET, ROOM.WIDTH - ROOM.OFFSET]} />
			{/* Until video loads */}
			<meshBasicMaterial color={COLOR_PALETTE.SECONDARY} />
		</mesh>
	);
}
