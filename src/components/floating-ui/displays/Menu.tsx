import { useKeyboardControls } from "@react-three/drei";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { TRANSITION } from "../../../constants.ts";
import { Mode, type Controls, type fn } from "../../../types.ts";
import { prettifyTitle } from "../../../utils.ts";
import G_Card from "../components/G_Card.tsx";
import InfoDisplay from "./InfoDisplay.tsx";

const modes = [
	{ mode: Mode.Experience, icon: "experience" },
	{ mode: Mode.Education, icon: "education" },
	{ mode: Mode.Interests, icon: "other" },
	{ mode: Mode.AboutMe, icon: "about-me" },
	{ mode: Mode.Info, icon: "info" },
];

export default function Menu(props: {
	show: boolean;
	selected: Mode;
	onSelect: (type: Mode) => void;
	disabled: boolean;
}) {
	const [showInfo, setShowInfo] = useState(false);
	const [sub] = useKeyboardControls<Controls>();

	useEffect(
		() =>
			sub(
				(state) => state.escape,
				(pressed) => {
					if (pressed) setShowInfo(false);
				},
			),
		[sub],
	);

	return (
		<AnimatePresence>
			{!props.show ? null : showInfo ? (
				<InfoDisplay onClick={() => setShowInfo(false)} />
			) : (
				<motion.div
					key="menu"
					initial={{ transform: "translateY(100px)", opacity: 0 }}
					animate={{ transform: "translateY(0)", opacity: 1 }}
					transition={TRANSITION}
					exit={{ transform: "translateY(100px)", opacity: 0 }}
				>
					<G_Card
						style={{
							bottom: 0,
							left: "50%",
							transform: "translateX(-50%)",
							transition: TRANSITION.duration + "s",
							padding: "1em",
						}}
						className={`mb-${props.disabled ? 2 : 4} ${props.disabled && "opacity-50"}`}
					>
						<MenuButtons {...props} show={() => setShowInfo(true)} />
					</G_Card>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export function MenuButtons(props: { selected: Mode; onSelect: (type: Mode) => void; disabled: boolean; show: fn }) {
	return (
		<Row className="gap-3 px-2 justify-content-center">
			{modes.map(({ mode, icon }, i) => (
				<div
					className="position-relative p-0"
					style={{
						height: "3.5em",
						width: "3.5em",
					}}
				>
					<OverlayTrigger
						key={i}
						placement="bottom"
						overlay={(p) => (
							<Tooltip {...p} arrowProps={{}}>
								{prettifyTitle(icon)}
							</Tooltip>
						)}
					>
						<div
							className="position-absolute w-100 h-100 top-0 left-0 menu-icon pointer"
							style={{ padding: "0.7em" }}
							onClick={() => {
								if (props.disabled) return;

								if (mode === Mode.Info) {
									props.show();
								} else {
									props.onSelect(mode);
								}
							}}
						>
							<img className="w-100 h-100" src={`icons/ui/${icon}.svg`} alt={icon} />
						</div>
					</OverlayTrigger>
					<svg viewBox="0 0 122 122" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M26 0H95L122 28V95L112 89V33L89.5 10H32L10 33V89L32 112H89.5L112 89L122 95L95 122H26L0 95V28L26 0Z"
							style={{
								boxShadow: props.selected === mode ? "rgb(255, 255, 255) 0px 0px 5px" : undefined,
							}}
							fill="#00AAFF"
						/>
					</svg>
				</div>
			))}
		</Row>
	);
}
