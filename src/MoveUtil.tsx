import { TransformControls } from "@react-three/drei";
import { useControls } from "leva";

export function MoveUtil(props: { children: React.JSX.Element }) {
	const state = useControls("state", {
		state: { options: ["translate", "scale", "rotate", "move"], value: "translate" },
	}).state as "translate" | "scale" | "rotate";

	return <TransformControls mode={state}>{props.children}</TransformControls>;
}
