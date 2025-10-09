import { useEffect, useRef } from "react";
import * as THREE from "three";

const width = 15;
const height = 10;

export default function SciFiWall(props: { position: [x: number, y: number, z: number]; rotate: number }) {
	const gridRef = useRef<THREE.Group>(null);

	useEffect(() => {
		if (!gridRef.current) return;

		const group = gridRef.current;
		const hexRadius = width / 39;
		const hexHeight = 6;
		const hexWidth = width;

		// const material = new THREE.LineBasicMaterial({ color: 0x00aaff });
		const material = new THREE.LineBasicMaterial({ color: 0x268727 });

		const sqrt3 = Math.sqrt(3);
		const cols = Math.ceil(hexWidth / (hexRadius * 1.5));
		const rows = Math.ceil(hexHeight / (hexRadius * sqrt3));

		for (let row = 0; row <= rows; row++) {
			for (let col = 0; col <= cols; col++) {
				const x = col * hexRadius * 1.5;
				const y = row * hexRadius * sqrt3 + ((col % 2) * (hexRadius * sqrt3)) / 2;

				const geometry = new THREE.BufferGeometry();
				const vertices: number[] = [];
				for (let i = 0; i <= 6; i++) {
					const angle = (i / 6) * Math.PI * 2;
					vertices.push(
						x + hexRadius * Math.cos(angle) - hexWidth / 2 + hexRadius / 2,
						y + hexRadius * Math.sin(angle) - 2 + 0.01,
						0.01
					);
				}
				geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

				const line = new THREE.Line(geometry, material);
				group.add(line);
			}
		}
	}, []);

	return (
		<mesh
			position={props.position.map((p) => (p * width) / 2) as [number, number, number]}
			rotation={[0, props.rotate, 0]}
		>
			<planeGeometry args={[width, height]} />
			<meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
			<group ref={gridRef} />
		</mesh>
	);
}
