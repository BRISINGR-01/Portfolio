import { Suspense } from "react";
import { ROOM } from "../../../constants";
import Ceiling from "./Ceiling";
import CircuitPattern from "./CircuitPattern";
import SciFiWall from "./Wall";

export default function Room(props: { children: React.JSX.Element | React.JSX.Element[] }) {
	return (
		<>
			<Suspense fallback={null}>
				<CircuitPattern />
			</Suspense>
			<Ceiling />

			{props.children}

			<SciFiWall position={[0, 1, -ROOM.WIDTH / 2]} rotate={0} />
			<SciFiWall position={[0, 1, ROOM.WIDTH / 2]} rotate={Math.PI} />
			<SciFiWall position={[ROOM.WIDTH / 2, 1, 0]} rotate={-Math.PI / 2} />
			<SciFiWall position={[-ROOM.WIDTH / 2, 1, 0]} rotate={Math.PI / 2} />
		</>
	);
}
