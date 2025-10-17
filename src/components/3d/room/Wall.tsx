import { useEffect, useRef } from "react";
import * as THREE from "three";
import { COLOR_PALETTE, ROOM } from "../../../constants";

export default function SciFiWall(props: { position: [x: number, y: number, z: number]; rotate: number }) {
	const gridRef = useRef<THREE.Group>(null);

	useEffect(() => {
		if (!gridRef.current) return;

		const group = gridRef.current;
		const hexRadius = ROOM.WIDTH / 39;

		const material = new THREE.LineBasicMaterial({ color: COLOR_PALETTE.PRIMARY });

		const sqrt3 = Math.sqrt(3);
		const cols = Math.ceil(ROOM.WIDTH / (hexRadius * 1.5));
		const rows = Math.floor(ROOM.HEIGHT / (hexRadius * sqrt3)) - 1;

		for (let row = 0; row <= rows; row++) {
			for (let col = 0; col <= cols; col++) {
				const x = col * hexRadius * 1.5;
				const y = row * hexRadius * sqrt3 + ((col % 2) * (hexRadius * sqrt3)) / 2;

				const geometry = new THREE.BufferGeometry();
				const vertices: number[] = [];
				for (let i = 0; i <= 6; i++) {
					const angle = (i / 6) * Math.PI * 2;
					vertices.push(
						x + hexRadius * Math.cos(angle) - ROOM.WIDTH / 2 + hexRadius / 2,
						y + hexRadius * Math.sin(angle) - ROOM.HEIGHT / 2 + ROOM.OFFSET + 0.3,
						ROOM.OFFSET
					);
				}
				geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

				const line = new THREE.Line(geometry, material);
				group.add(line);
			}
		}

		return () => {
			for (const el of group.children) {
				el.removeFromParent();
			}
		};
	}, []);

	return (
		<mesh position={props.position} rotation={[0, props.rotate, 0]}>
			<planeGeometry args={[ROOM.WIDTH, ROOM.HEIGHT]} />
			<meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
			<group ref={gridRef} />
		</mesh>
	);
}
