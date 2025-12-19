import React from "react";
import { Container } from "react-bootstrap";
import { Mode, type fn } from "../../types.ts";
import ClickToClose from "./components/ClickToClose.tsx";
import HologramDisplay from "./components/HologramDisplay.tsx";
import { MenuButtons } from "./Menu.tsx";

const keyboardShortcuts = [
	{ key: "esc", description: "Close window" },
	{ key: "f", description: "Toggle fullscreen" },
	{ key: "space", description: "Recenter" },
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
		<HologramDisplay onClick={props.onClick}>
			<Container fluid className="mb-5 mt-3 gap-3 d-flex flex-column">
				<h3 className="text-center">Welcome to my portfolio!</h3>
				<Grid>
					{keyboardShortcuts.map(({ key, description }, i) => (
						<React.Fragment key={i}>
							<div className="key-badge text-center me-3">
								<div>{key.toUpperCase()}</div>
							</div>
							<div className="pt-1">{description}</div>
						</React.Fragment>
					))}
				</Grid>
				<div>
					<p className="fs-6">Use the menu to navigate</p>
					<div
						className="rounded p-2 px-3"
						style={{
							transform: "scale(.8)",
							width: "fit-content",
							boxShadow: `0 0 14px 2px white`,
							background: "#c4ebff5e",
						}}
					>
						<MenuButtons onSelect={() => {}} show={() => {}} selected={Mode.Education} disabled={false} />
					</div>
				</div>
				<div>
					<p className="fs-6">Click on the icons to reveal more information</p>
					<img
						src="images/other/icon-example.png"
						alt="example-icon"
						style={{ height: "6em", width: "fit-content", boxShadow: `0 0 5px 1px white`, borderRadius: "10px" }}
					/>
				</div>
				<div>
					<p className="fs-6">Drag the top bar of windows to move them</p>
					<img
						src="images/ui/floating-header"
						alt="floating headers"
						style={{ height: "4em", width: "fit-content", boxShadow: `0 0 5px 1px white`, borderRadius: "10px" }}
					/>
				</div>
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
			</Container>
			<ClickToClose />{" "}
		</HologramDisplay>
	);
}
