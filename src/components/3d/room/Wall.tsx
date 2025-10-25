import { useEffect, useRef } from "react";
import * as THREE from "three";
import { COLOR_PALETTE, ROOM, WallFace } from "../../../constants";

function calcPos(dir: WallFace) {
	let pos: [number, number, number];

	switch (dir) {
		case WallFace.North:
			pos = [0, 0, -ROOM.WIDTH / 2];
			break;
		case WallFace.West:
			pos = [-ROOM.WIDTH / 2, 0, 0];
			break;
		case WallFace.South:
			pos = [0, 0, ROOM.WIDTH / 2];
			break;
		case WallFace.East:
			pos = [ROOM.WIDTH / 2, 0, 0];
			break;
	}

	pos[1] += 0.5;

	return pos;
}

function calcRot(dir: WallFace) {
	switch (dir) {
		case WallFace.North:
			return 0;
		case WallFace.West:
			return Math.PI / 2;
		case WallFace.South:
			return Math.PI;
		case WallFace.East:
			return -Math.PI / 2;
	}
}

export default function Wall({ wallFace }: { wallFace: WallFace }) {
	const gridRef = useRef<THREE.Group>(null);

	useEffect(() => {
		if (!gridRef.current) return;
		const group = gridRef.current;

		const baseMaterial = new THREE.LineBasicMaterial({
			color: COLOR_PALETTE.PRIMARY,
			transparent: true,
			opacity: 0,
		});

		const yOffset = -ROOM.HEIGHT / 2 + ROOM.OFFSET + 0.3;
		const angles = Array.from({ length: 7 }).map((_, i) => (Math.PI * 2 * i) / 6);
		const cols = 30;
		const hexSide = ROOM.WIDTH / cols / 1.5;
		const hexRadius = hexSide * 1.5;
		const hexSqrt3 = hexSide * Math.sqrt(3);
		const rows = Math.ceil(ROOM.HEIGHT / hexSqrt3) + 1;

		type LineData = { line: THREE.Line; phase: number };
		const lines: LineData[] = [];

		let minPhase = Infinity;
		let maxPhase = -Infinity;

		for (let row = 0; row <= rows; row++) {
			for (let col = 0; col < cols; col++) {
				const x = col * hexRadius;
				const y = row * hexSqrt3 + ((col % 2) * hexSqrt3) / 2;

				const geometry = new THREE.BufferGeometry();
				const vertices: number[] = [];

				for (let i = 0; i <= 6; i++) {
					const isLastCol = col === cols - 1;
					if (isLastCol && (i === 0 || i === 6)) continue;
					const xOffset = (isLastCol && (i === 1 || i === 5) ? -0.015 : 0) + hexSide - ROOM.WIDTH / 2;
					const angle = angles[i];
					vertices.push(x + hexSide * Math.cos(angle) + xOffset, y + hexSide * Math.sin(angle) + yOffset, ROOM.OFFSET);
				}

				geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
				const line = new THREE.Line(geometry, baseMaterial.clone());

				// Define diagonal direction: bottom-left (low x, low y) → top-right (high x, high y)
				const phase = wallFace === WallFace.West || wallFace === WallFace.East ? cols * hexRadius - x + y : x + y; // direction of reveal

				minPhase = Math.min(minPhase, phase);
				maxPhase = Math.max(maxPhase, phase);

				lines.push({ line, phase });
				group.add(line);
			}
		}

		const phaseRange = maxPhase - minPhase;
		const clock = new THREE.Clock();
		const duration = 2;

		function animate() {
			const elapsed = clock.getElapsedTime();
			const t = elapsed / duration;

			for (const { line, phase } of lines) {
				const normalized = (phase - minPhase) / phaseRange; // 0 → 1 along diagonal
				const fade = Math.min(Math.max((t - normalized) * 4, 0), 1); // smooth fade
				(line.material as THREE.Material).opacity = fade;
			}

			if (t < 1.2) requestAnimationFrame(animate);
		}

		animate();

		return () => {
			for (const el of group.children) el.removeFromParent();
		};
	}, [wallFace]);

	return (
		<mesh position={calcPos(wallFace)} rotation={[0, calcRot(wallFace), 0]}>
			<group ref={gridRef} />
		</mesh>
	);
}
