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
						{keyboardShortcuts.map(({ key, description }, i) => (
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
						))}
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
