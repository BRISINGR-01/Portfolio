import { useEffect, useState } from "react";
import { COLOR_PALETTE } from "../../../constants";
import { disableMusic, enableMusic, makeClickSound } from "../../../utils";

export default function BgMusic() {
	const [isOn, setIsOn] = useState(false);

	useEffect(() => {
		window.localStorage.setItem("bg-music", isOn ? "true" : "false");
		if (isOn) {
			const isEnabled = enableMusic();

			if (!isEnabled) {
				setIsOn(false);
				return;
			}

			makeClickSound();
		} else {
			disableMusic();
		}
	}, [isOn]);

	return (
		<svg
			className="position-absolute top-0 end-0 m-4 z-5"
			style={{
				width: "2.2em",
			}}
			onClick={() => setIsOn(!isOn)}
			viewBox="0 0 130 121"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			{isOn ? (
				<path
					d="M89 83L88.6738 23L36.1538 38L28.4 15.5L96.79 0V28.775C96.79 28.775 96.79 65.1759 96.79 88.5C93.7478 86.3521 89 83 89 83ZM36.1538 38L36.33 102.33C36.36 102.65 36.38 102.97 36.38 103.29V103.3C36.38 111.06 28.24 118.76 18.19 120.5C8.15 122.23 0 117.34 0 109.58C0 101.82 8.15 94.12 18.19 92.39C21.97 91.74 25.48 92.03 28.4 93.05V15.5L36.1538 38ZM92.87 98.48C90.1 101.25 86.16 103.36 81.78 104.11C73.39 105.56 66.59 101.48 66.59 94.99C66.58 90.96 69.21 86.95 73.21 84.15C77.21 81.35 86 82.5 86 82.5L89 83C89 83 93.7478 86.3521 96.79 88.5C96.79 93 92.87 98.48 92.87 98.48Z"
					fill={COLOR_PALETTE.PRIMARY}
				/>
			) : (
				<path
					d="M88.85 51.97V23.09L60.43 31.25L36.42 13.75L96.79 0V57.76L88.85 51.97ZM36.33 57.46V102.54C36.36 102.86 36.38 103.18 36.38 103.5V103.51C36.38 111.27 28.24 118.97 18.19 120.71C8.15 122.44 0 117.55 0 109.79C0 102.03 8.15 94.33 18.19 92.6C21.97 91.95 25.48 92.24 28.4 93.26V51.68L36.33 57.46ZM92.87 98.69C90.1 101.46 86.16 103.57 81.78 104.32C73.39 105.77 66.59 101.69 66.59 95.2C66.58 91.17 69.21 87.16 73.21 84.36L92.87 98.69Z"
					fill={COLOR_PALETTE.PRIMARY}
				/>
			)}

			<path
				d="M10.4654 16.2749L116.5 94"
				pathLength="100"
				strokeWidth="15"
				stroke={COLOR_PALETTE.PRIMARY}
				style={{ transition: "0.3s", strokeDasharray: 100, strokeDashoffset: isOn ? 100 : 0 }}
				strokeLinecap="round"
			/>
			<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
