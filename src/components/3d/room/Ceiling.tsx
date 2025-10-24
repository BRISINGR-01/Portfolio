import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { COLOR_PALETTE, ROOM } from "../../../constants";

export default function Ceiling() {
	const meshRef = useRef<THREE.Mesh>(null);

	const planeGeometry = useMemo(() => {
		const geom = new THREE.PlaneGeometry(ROOM.WIDTH, ROOM.WIDTH, 40, 40);

		// Add slight noise
		for (let i = 0; i < geom.attributes.position.count; i++) {
			geom.attributes.position.setX(i, geom.attributes.position.getX(i) + (Math.random() - 0.5) * ROOM.CEILING_NOISE);
			geom.attributes.position.setY(i, geom.attributes.position.getY(i) + (Math.random() - 0.5) * ROOM.CEILING_NOISE);
			geom.attributes.position.setZ(
				i,
				geom.attributes.position.getZ(i) + (Math.random() - 0.5) * ROOM.CEILING_NOISE * 2
			);
		}
		geom.computeVertexNormals();

		// Calculate distance from center for fade timing
		const positions = geom.attributes.position;
		const distances = new Float32Array(positions.count);
		const center = new THREE.Vector3(0, 0, 0);
		let maxDist = 0;

		for (let i = 0; i < positions.count; i++) {
			const v = new THREE.Vector3(positions.getX(i), positions.getY(i), positions.getZ(i));
			const dist = v.distanceTo(center);
			distances[i] = dist;
			maxDist = Math.max(maxDist, dist);
		}

		// Normalize 0–1
		for (let i = 0; i < positions.count; i++) distances[i] /= maxDist;

		geom.setAttribute("fadeFactor", new THREE.BufferAttribute(distances, 1));

		// Initialize vertex colors (all transparent)
		const colors = new Float32Array(positions.count * 3);
		geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

		return geom;
	}, []);

	useEffect(() => {
		const mesh = meshRef.current;
		if (!mesh) return;

		const geom = mesh.geometry as THREE.BufferGeometry;
		const fadeAttr = geom.getAttribute("fadeFactor");
		const colorAttr = geom.getAttribute("color");

		const clock = new THREE.Clock();
		const color = new THREE.Color(COLOR_PALETTE.PRIMARY);
		const duration = 3;

		function animate() {
			const t = clock.getElapsedTime() / duration; // control speed

			let isOver = true;

			for (let i = 0; i < fadeAttr.count; i++) {
				const fade = Math.min(Math.max((t - fadeAttr.getX(i)) * 2, 0), 1);
				colorAttr.setXYZ(i, color.r * fade, color.g * fade, color.b * fade);
				colorAttr.needsUpdate = true;
				if (fade !== 1) isOver = false;
			}

			if (!isOver) requestAnimationFrame(animate);
		}
		animate();
	}, []);

	return (
		<group position={[0, ROOM.HEIGHT - 0.2 + 2 * ROOM.OFFSET, 0]} rotation={[-Math.PI / 2, 0, 0]}>
			<mesh ref={meshRef} geometry={planeGeometry} position={[0, 0, -0.1]}>
				<meshStandardMaterial vertexColors wireframe transparent opacity={1} toneMapped={false} />
			</mesh>
		</group>
	);
}
