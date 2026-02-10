import { useKeyboardControls } from "@react-three/drei";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { TRANSITION } from "../../../constants.ts";
import { Mode, type Controls, type fn } from "../../../types.ts";
import { makeClickSound, prettifyTitle } from "../../../utils.ts";
import InfoDisplay from "./InfoDisplay.tsx";

const modes = [
	{ mode: Mode.AboutMe, icon: "about-me" },
	{ mode: Mode.Experience, icon: "experience" },
	{ mode: Mode.Education, icon: "education" },
	{ mode: Mode.Interests, icon: "other" },
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
					<div
						className={`position-absolute w-100 bottom-0 end-50 mb-${props.disabled ? 2 : 4} ${props.disabled && "opacity-50"}`}
						style={{ transform: "translateX(50%)", transition: ".25s" }}
					>
						<MenuButtons {...props} show={() => setShowInfo(true)} />
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export function MenuButtons(props: { selected: Mode; onSelect: (type: Mode) => void; disabled: boolean; show: fn }) {
	return (
		<Row className="gap-1 px-2 justify-content-center">
			{modes.map(({ mode, icon }, i) => {
				const handleProps = {
					style: {
						transition: ".5s",
						strokeDasharray: 100,
						strokeDashoffset: props.selected === mode ? 0 : 100,
					},
					pathLength: "100",
					stroke: "#00AAFF",
					strokeWidth: "8",
				};

				return (
					<OverlayTrigger
						placement="top"
						key={i}
						overlay={(p) => (
							<Tooltip {...p} className="glow-text">
								{prettifyTitle(icon)}
							</Tooltip>
						)}
					>
						<div
							className="position-relative p-0 menu-icon"
							style={{
								height: "4.5em",
								width: "4.5em",
								opacity: props.selected === mode ? 1 : 0.6,
							}}
							onClick={() => {
								if (props.disabled) return;

								if (mode === Mode.Info) {
									props.show();
								} else {
									makeClickSound();
									props.onSelect(mode);
								}
							}}
						>
							<div className="position-absolute w-100 h-100 top-0 left-0 pointer" style={{ padding: "1.2em" }}>
								<img className="w-100 h-100" src={`icons/ui/${icon}.svg`} alt={icon} />
							</div>
							<svg viewBox="0 0 178 178" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									className="menu-icon-frame"
									d="M53.0696 25.3101H124.006L151.764 54.0958V122.976L141.483 116.807V59.2362L118.352 35.5907H59.238L36.6206 59.2362V116.807L59.238 140.453H118.352L141.483 116.807L151.764 122.976L124.006 150.733H53.0696L26.34 122.976V54.0958L53.0696 25.3101Z"
									fill="#00AAFF"
								/>
								<path className="menu-icon-handle-l" {...handleProps} d="M4 74.256L4.0001 39.8158L38.3432 4H72.7833" />
								<path
									className="menu-icon-handle-r"
									{...handleProps}
									d="M174.003 102.33V136.77L139.661 172.586H105.22"
								/>
							</svg>
						</div>
					</OverlayTrigger>
				);
			})}
		</Row>
	);
}
