import { WALL_DELAY } from "../../../constants";
import { WallFace } from "../../../types";
import Delay from "../other-components/Delay";
import Ceiling from "./Ceiling";
import CircuitPattern from "./CircuitPattern";
import Wall from "./Wall";

export default function Room(props: { children: React.ReactNode }) {
	return (
		<>
			<CircuitPattern />
			<Ceiling />

			{props.children}

			<Delay time={WALL_DELAY}>
				<Wall wallFace={WallFace.North} />
				<Wall wallFace={WallFace.West} />
				<Wall wallFace={WallFace.South} />
				<Wall wallFace={WallFace.East} />
			</Delay>
		</>
	);
}
