import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ROOM } from "../../../constants";

export default function CircuitPattern() {
	const meshRef = useRef<THREE.Mesh>(null);

	useEffect(() => {
		// Create the video element
		const video = document.createElement("video");
		video.src = "/circuit.mkv"; // path to your video
		video.crossOrigin = "anonymous";
		video.loop = true;
		video.muted = true;
		video.playsInline = true;
		video.play();

		// Create a video texture
		const texture = new THREE.VideoTexture(video);
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		texture.format = THREE.RGBFormat;

		// Apply to material
		(meshRef.current!.material as THREE.MeshBasicMaterial).map = texture;
		(meshRef.current!.material as THREE.Material).needsUpdate = true;
	}, []);

	return (
		<mesh ref={meshRef} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, -2, 0]}>
			<planeGeometry args={[ROOM.WIDTH - ROOM.OFFSET, ROOM.WIDTH - ROOM.OFFSET]} />
			<meshBasicMaterial />
		</mesh>
	);
}
