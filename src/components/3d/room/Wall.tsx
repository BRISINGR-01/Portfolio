import { useEffect, useRef } from "react";
import * as THREE from "three";
import { COLOR_PALETTE, ROOM } from "../../../constants";

export default function Wall(props: { position: [x: number, y: number, z: number]; rotate: number }) {
	const gridRef = useRef<THREE.Group>(null);

	useEffect(() => {
		if (!gridRef.current) return;
		const group = gridRef.current;
		const material = new THREE.LineBasicMaterial({ color: COLOR_PALETTE.PRIMARY });

		const yOffset = -ROOM.HEIGHT / 2 + ROOM.OFFSET + 0.3;
		const angles = Array.from({ length: 7 }).map((_, i) => (Math.PI * 2 * i) / 6);

		const cols = 30;
		const hexSide = ROOM.WIDTH / cols / 1.5;
		const hexRadius = hexSide * 1.5;
		const hexSqrt3 = hexSide * Math.sqrt(3);

		const rows = Math.ceil(ROOM.HEIGHT / hexSqrt3) + 1;

		for (let row = 0; row <= rows; row++) {
			for (let col = 0; col < cols; col++) {
				const x = col * hexRadius;
				const y = row * hexSqrt3 + ((col % 2) * hexSqrt3) / 2;

				const geometry = new THREE.BufferGeometry();
				const vertices: number[] = [];
				for (let i = 0; i <= 6; i++) {
					const isLastCol = col === cols - 1;

					// Edges 0 and 6 overflow
					if (isLastCol && (i === 0 || i == 6)) continue;

					// Edges 1 and 5 are a tiny bit too long
					const xOffset = (isLastCol && (i === 1 || i === 5) ? -0.015 : 0) + hexSide - ROOM.WIDTH / 2;

					const angle = angles[i];

					vertices.push(x + hexSide * Math.cos(angle) + xOffset, y + hexSide * Math.sin(angle) + yOffset, ROOM.OFFSET);
				}
				geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

				const line = new THREE.Line(geometry, material);
				group.add(line);
			}
		}

		return () => {
			for (const el of group.children) el.removeFromParent();
		};
	}, []);

	return (
		<mesh position={[props.position[0], props.position[1] + 1.5, props.position[2]]} rotation={[0, props.rotate, 0]}>
			<group ref={gridRef} />
		</mesh>
	);
}
