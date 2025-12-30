import { COLOR_PALETTE } from "../../../../constants";
import type { fn } from "../../../../types";
import FadeAnim from "../FadeAnim";

export default function CloseBtn(props: { onClick: fn }) {
	return (
		<FadeAnim
			onClick={props.onClick}
			className="pointer hover d-flex align-items-center"
			style={{
				height: "100%",
				filter: `drop-shadow(0 0 6px ${COLOR_PALETTE.PRIMARY}) 
             drop-shadow(0 0 12px ${COLOR_PALETTE.PRIMARY})`,
			}}
		>
			<svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
				<path d="M18 6L6 18M6 6l12 12" stroke={COLOR_PALETTE.PRIMARY} strokeWidth="2" strokeLinecap="round" />
			</svg>
		</FadeAnim>
	);
}
