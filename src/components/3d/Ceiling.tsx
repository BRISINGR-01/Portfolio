const width = 15;
const height = 5;

export default function Ceiling() {
	return (
		<mesh position={[0, height + 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
			<planeGeometry args={[width, width]} />
			<meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
		</mesh>
	);
}
