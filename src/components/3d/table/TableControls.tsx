import Text from "../Text";

const sides = [
	{
		position: [0, -0.48, 1.74],
		rotation: [-1.05, 0, 0],
	},
	{
		position: [0, -0.48, -1.74],
		rotation: [4.17, 0, 0],
	},
] as {
	position: [number, number, number];
	rotation: [number, number, number];
}[];

export default function TableControls({ text }: { text: string }) {
	return (
		<group>
			{sides.map((side, i) => (
				<group key={i} {...side}>
					{/* Covers for the table buttons */}
					<mesh>
						<planeGeometry args={[5.48, 0.26]} />
						<meshStandardMaterial color="black" />
					</mesh>
					<Text rotation={[0, 0, i === 1 ? Math.PI : 0]} position={[0, 0, 0]} isInverted={i === 1}>
						{text}
					</Text>
				</group>
			))}
		</group>
	);
}
