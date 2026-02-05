import { useState, type CSSProperties, type PropsWithChildren } from "react";
import { COLOR_PALETTE } from "../../../constants";
import type { fn } from "../../../types";
import { makeClickSound } from "../../../utils";

export default function HoloButton(
	props: { onClick: fn; inactive?: boolean; style?: CSSProperties } & PropsWithChildren,
) {
	return (
		<div
			onClick={props.onClick}
			style={props.style}
			className="position-relative p-3 d-flex justify-content-center align-items-center"
		>
			<SVG />
			<span style={{ padding: "4px" }}>{props.children}</span>
		</div>
	);
}

function SVG() {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<svg
			className="position-absolute w-100 h-100 top-0 left-0"
			width="501"
			height="260"
			viewBox="0 0 501 260"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onMouseEnter={() => {
				makeClickSound();
				setIsHovered(true);
			}}
			onMouseLeave={() => setIsHovered(false)}
		>
			<path
				d="M66.4098 23.5H476.91V174L432.41 227L464.91 168V40H70.9098L33.9098 90V214.5H427.41L464.91 168L432.41 227H22.4098V85L66.4098 23.5Z"
				fill={COLOR_PALETTE.PRIMARY}
			/>
			<path
				d="M4.40979 69.227L51.9097 5.5H494.91V62.727"
				pathLength="200"
				style={{
					strokeDasharray: 150,
					strokeDashoffset: isHovered ? -150 : 80,
					transition: "stroke-dashoffset 0.4s ease-in",
				}}
				stroke={COLOR_PALETTE.PRIMARY}
				strokeWidth="11"
			/>
			<path
				d="M495.5 183.773L448 247.5H5V172.5"
				stroke={COLOR_PALETTE.PRIMARY}
				pathLength="100"
				style={{
					strokeDasharray: 44,
					strokeDashoffset: isHovered ? 10 : -19,
					transition: "stroke-dashoffset 0.4s ease-in",
				}}
				strokeWidth="11"
			/>
		</svg>
	);
}
