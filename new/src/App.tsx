import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Euler, ExtrudeGeometry, MeshStandardMaterial, Shape, TextureLoader, type Texture } from "three";

function Table() {
	const { scene } = useGLTF("assets/3d/hologram-table.glb");
	return <primitive object={scene} scale={40} rotation={[0, 0.77, 0]} />;
}

function ImagePlane({ url }) {
	const texture = useLoader(TextureLoader, url) as Texture;

	// return (
	// 	<RoundedBox
	// 		args={[2, 2, 0.5]}
	// 		rotation={[-0.69, 0.86, 0.82, Euler.DEFAULT_ORDER]}
	// 		scale={[0.5, 0.5, 0.5]}
	// 		position={[-1.08, 1.89, 1.05]}
	// 		material={[
	// 			new MeshStandardMaterial({ color: "gray" }), // right
	// 			new MeshStandardMaterial({ color: "gray" }), // left
	// 			new MeshStandardMaterial({ color: "gray" }), // top
	// 			new MeshStandardMaterial({ color: "gray" }), // bottom
	// 			new MeshStandardMaterial({ map: texture }), // front (your image)
	// 			new MeshStandardMaterial({ color: "gray" }), // back
	// 		]}
	// 	/>
	// );
	return (
		<mesh
			rotation={[-0.69, 0.86, 0.82, Euler.DEFAULT_ORDER]}
			scale={[0.5, 0.5, 0.5]}
			position={[-1.08, 1.89, 1.05]}
			geometry={RoundedBox2({})}
			material={[
				new MeshStandardMaterial({ color: "gray" }), // right
				new MeshStandardMaterial({ color: "gray" }), // left
				new MeshStandardMaterial({ color: "gray" }), // top
				new MeshStandardMaterial({ color: "gray" }), // bottom
				new MeshStandardMaterial({ map: texture }), // front (your image)
				new MeshStandardMaterial({ color: "gray" }), // back
			]}
		>
			{Array.from({ length: 6 }).map((_, index) => (
				<meshStandardMaterial
					key={index}
					attach={`material-${index}`}
					color={index === 4 ? undefined : "gray"}
					map={index === 4 ? texture : undefined}
				/>
			))}
			{/* <boxGeometry args={[2, 2, 0.5]} /> */}
			{/* <RoundedBox args={[2, 2, 0.5]} /> */}
		</mesh>
	);
}

function RoundedBox2({ width = 2, height = 2, depth = 2, radius = 0.2 }) {
	// Create rounded rectangle shape
	const shape = new Shape();
	const hw = width / 2 - radius;
	const hh = height / 2 - radius;

	shape.moveTo(-hw, -hh + radius);
	shape.lineTo(-hw, hh - radius);
	shape.quadraticCurveTo(-hw, hh, -hw + radius, hh);
	shape.lineTo(hw - radius, hh);
	shape.quadraticCurveTo(hw, hh, hw, hh - radius);
	shape.lineTo(hw, -hh + radius);
	shape.quadraticCurveTo(hw, -hh, hw - radius, -hh);
	shape.lineTo(-hw + radius, -hh);
	shape.quadraticCurveTo(-hw, -hh, -hw, -hh + radius);

	// Extrude to 3D
	const geometry = new ExtrudeGeometry(shape, {
		depth: depth,
		bevelEnabled: false,
		steps: 1,
	});

	return geometry;
}

export default function App() {
	return (
		<Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
			<ambientLight intensity={0.4} />
			<pointLight position={[5, 5, 2]} intensity={6} />
			{/* <DebugControl> */}
			<ImagePlane url="assets/images/latin-is-simple-logo-blue.png" />
			{/* </DebugControl> */}
			<Table />

			<OrbitControls />
		</Canvas>
	);
}
