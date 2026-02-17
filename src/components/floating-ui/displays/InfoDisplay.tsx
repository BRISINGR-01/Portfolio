import React from "react";
import { Stack } from "react-bootstrap";
import { COLOR_PALETTE } from "../../../constants.ts";
import { Mode, type fn } from "../../../types.ts";
import HologramDisplay from "../hologram-display/HologramDisplay.tsx";
import { MenuButtons } from "./Menu.tsx";

const keyboardShortcuts = [
	{ key: "esc", description: "Close window" },
	{ key: "f", description: "Toggle fullscreen" },
	{ key: "space", description: "Recenter" },
	{ key: "➜", description: "Previuos" },
	{ key: "➜", description: "Next" },
];

const mobileControls = [
	{ icon: "pinch", description: "Pinch to zoom in/out" },
	{ icon: "touch-move", description: "Drag your finger to rotate the scene" },
];
const mouseControls = [
	{ icon: "right-click", description: "Drag while holding the right button of the mouse to move the scene" },
	{ icon: "left-click", description: "Drag while holding the left button of the mouse to rotate the scene" },
	{ icon: "scroll", description: "Scroll to zoom in/out" },
];

function Grid(props: { children: React.ReactElement[] }) {
	return (
		<div
			className="rounded-3"
			style={{
				height: "fit-content",
				display: "grid",
				gridTemplateColumns: "max-content 1fr",
				rowGap: "0.5rem",
				alignItems: "center",
			}}
		>
			{props.children}
		</div>
	);
}

export default function InfoDisplay(props: { onClick: fn }) {
	return (
		<HologramDisplay close={props.onClick}>
			<Stack className="py-2 ps-3 ms-3" gap={3}>
				<h3 className="text-center">Welcome to my portfolio!</h3>
				<Stack gap={3} className="flex-lg-row justify-content-lg-between">
					<Grid>
						<React.Fragment>
							<svg
								style={{ width: "2.2em", filter: "drop-shadow(0 0 1px black)" }}
								viewBox="0 0 130 121"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M89 83L88.6738 23L36.1538 38L28.4 15.5L96.79 0V28.775C96.79 28.775 96.79 65.1759 96.79 88.5C93.7478 86.3521 89 83 89 83ZM36.1538 38L36.33 102.33C36.36 102.65 36.38 102.97 36.38 103.29V103.3C36.38 111.06 28.24 118.76 18.19 120.5C8.15 122.23 0 117.34 0 109.58C0 101.82 8.15 94.12 18.19 92.39C21.97 91.74 25.48 92.03 28.4 93.05V15.5L36.1538 38ZM92.87 98.48C90.1 101.25 86.16 103.36 81.78 104.11C73.39 105.56 66.59 101.48 66.59 94.99C66.58 90.96 69.21 86.95 73.21 84.15C77.21 81.35 86 82.5 86 82.5L89 83C89 83 93.7478 86.3521 96.79 88.5C96.79 93 92.87 98.48 92.87 98.48Z"
									fill={COLOR_PALETTE.PRIMARY}
								/>
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
							Toggle music
						</React.Fragment>
						{
							keyboardShortcuts.map(({ key, description }, i) => (
								<React.Fragment key={i}>
									<div
										className="key-badge me-3"
										style={{
											transform: "Previuos" === description ? "rotateY(180deg)" : "",
											background: "#389fe498",
										}}
									>
										<div>{key.toUpperCase()}</div>
									</div>
									<div className="pt-1">{description}</div>
								</React.Fragment>
							)) as unknown as React.ReactElement
						}
					</Grid>
					<div className="d-flex flex-column gap-3">
						<div>
							<p className="fs-6">Use the menu to navigate</p>
							<div
								className="p-2 px-3"
								style={{
									borderRadius: "20%",
									transform: "scale(.8)",
									transformOrigin: "left",
									width: "fit-content",
									background: "#093246ac",
								}}
							>
								<MenuButtons onSelect={() => {}} show={() => {}} selected={Mode.Education} disabled={false} />
							</div>
						</div>
						<div>
							<span className="fs-6">Click on the icons to reveal more information</span>
							<br />
							<img
								src="images/other/icon-example.png"
								alt="example-icon"
								style={{
									height: "6em",
									width: "fit-content",
									boxShadow: `0 0 5px 1px ${COLOR_PALETTE.PRIMARY}`,
									borderRadius: "10px",
								}}
							/>
						</div>
					</div>
				</Stack>

				<span className="fs-4 gap-2 d-flex">
					Mouse
					<img src="/icons/ui/mouse.svg" alt="mouse" style={{ height: "1.2rem" }} />
				</span>
				<Grid>
					{mouseControls.map(({ icon, description }, i) => (
						<React.Fragment key={i}>
							<img src={`/icons/ui/${icon}.svg`} alt={icon} className="me-4" style={{ height: "2rem" }} />
							<div>{description}</div>
						</React.Fragment>
					))}
				</Grid>
				<span className="fs-4 gap-2 d-flex">
					Touch
					<img src="/icons/ui/touch.svg" alt="mouse" style={{ height: "1.5rem" }} />
				</span>
				<Grid>
					{mobileControls.map(({ icon, description }, i) => (
						<React.Fragment key={i}>
							<img src={`/icons/ui/${icon}.svg`} alt={icon} className="me-4" style={{ height: "2rem" }} />
							<div>{description}</div>
						</React.Fragment>
					))}
				</Grid>
			</Stack>
		</HologramDisplay>
	);
}
