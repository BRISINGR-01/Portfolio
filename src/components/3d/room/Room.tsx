import { WallFace } from "../../../constants";
import Ceiling from "./Ceiling";
import CircuitPattern from "./CircuitPattern";
import Wall from "./Wall";

export default function Room(props: { children: React.JSX.Element | React.JSX.Element[] }) {
	return (
		<>
			<CircuitPattern />
			<Ceiling />

			{props.children}

			<Wall wallFace={WallFace.North} />
			<Wall wallFace={WallFace.West} />
			<Wall wallFace={WallFace.South} />
			<Wall wallFace={WallFace.East} />
		</>
	);
}
