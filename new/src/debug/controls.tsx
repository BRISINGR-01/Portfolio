import { TransformControls, type TransformControlsProps } from "@react-three/drei";
import type { Group } from "three";
import { useDebugChoice } from "../debug";

export function DebugControl(props: TransformControlsProps) {
	const state = useDebugChoice("control", ["translate", "rotate", "scale"]);

	return (
		<TransformControls
			mode={state}
			onChange={(state) => {
				if (!state?.target) return;

				const o = (state.target as { object: Group }).object;

				const data = `r: [${[o.rotation.x, o.rotation.y, o.rotation.z]
					.map((v) => Math.round(v * 100) / 100)
					.join(", ")}]\np: [${[o.position.x, o.position.y, o.position.z]
					.map((v) => Math.round(v * 100) / 100)
					.join(", ")}]`;
				localStorage.setItem("control-data", data);
				console.log(data);
			}}
			{...props}
		/>
	);
}
