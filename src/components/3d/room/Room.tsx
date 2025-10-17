import { Suspense } from "react";
import { ROOM } from "../../../constants";
import Ceiling from "./Ceiling";
import CircuitPattern from "./CircuitPattern";
import Wall from "./Wall";

export default function Room(props: { children: React.JSX.Element | React.JSX.Element[] }) {
	return (
		<>
			<Suspense fallback={null}>
				<CircuitPattern />
			</Suspense>
			<Ceiling />

			{props.children}

			<Wall position={[0, 0, -ROOM.WIDTH / 2]} rotate={0} />
			<Wall position={[0, 0, ROOM.WIDTH / 2]} rotate={Math.PI} />
			<Wall position={[ROOM.WIDTH / 2, 0, 0]} rotate={-Math.PI / 2} />
			<Wall position={[-ROOM.WIDTH / 2, 0, 0]} rotate={Math.PI / 2} />
		</>
	);
}
