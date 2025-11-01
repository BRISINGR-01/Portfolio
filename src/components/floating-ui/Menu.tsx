import { useKeyboardControls } from "@react-three/drei";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { TRANSITION } from "../../constants";
import { Mode, type Controls } from "../../types.ts";
import G_Card from "./components/G_Card.tsx";
import InfoDisplay from "./InfoDisplay.tsx";

const modes = [
	{ mode: Mode.Experience, icon: "experience" },
	{ mode: Mode.Education, icon: "education" },
	{ mode: Mode.Contact, icon: "contact" },
	{ mode: Mode.Info, icon: "info" },
];

export default function Menu(props: { selected: Mode; onSelect: (type: Mode) => void }) {
	const [showInfo, setShowInfo] = useState(false);
	const [sub] = useKeyboardControls<Controls>();

	useEffect(
		() =>
			sub(
				(state) => state.escape,
				(pressed) => {
					if (pressed) setShowInfo(false);
				}
			),
		[sub]
	);

	return (
		<AnimatePresence>
			{showInfo ? (
				<InfoDisplay onClick={() => setShowInfo(false)} />
			) : (
				<motion.div
					key="menu"
					initial={{ transform: "translateY(100px)", opacity: 0 }}
					animate={{ transform: "translateY(0)", opacity: 1 }}
					transition={TRANSITION}
					exit={{ transform: "translateY(100px)", opacity: 0 }}
				>
					<G_Card style={{ bottom: 0, left: "50%", transform: "translateX(-50%)" }} className="m-4">
						<Row>
							{modes.map(({ mode, icon }, i) => (
								<OverlayTrigger
									key={i}
									placement="bottom"
									overlay={(p) => (
										<Tooltip {...p} arrowProps={{}}>
											{icon}
										</Tooltip>
									)}
								>
									<div
										style={{
											background: props.selected === mode ? "#447db69c" : undefined,
											boxShadow: props.selected === mode ? "0 0 2px rgba(255, 255, 255)" : undefined,
										}}
										className="menu-icon mx-2 icon pointer"
										onClick={() => (mode === Mode.Info ? setShowInfo(true) : props.onSelect(mode))}
									>
										<img src={`icons/ui/${icon}.svg`} alt={icon} height={40} />
									</div>
								</OverlayTrigger>
							))}
						</Row>
					</G_Card>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
