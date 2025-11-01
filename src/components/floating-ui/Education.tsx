import { motion } from "motion/react";

import { useState } from "react";
import { TRANSITION } from "../../constants.ts";
import { dailyDevBadges, htbBadges } from "../../content.ts";
import type { Education } from "../../types.ts";
import Badges from "./components/Badges.tsx";
import ChangeAnimation from "./components/ChangeAnimation.tsx";
import G_Card, { Position } from "./components/G_Card.tsx";

export default function EducationDisplay({ data }: { data: Education }) {
	const [showBadges, setShowBadges] = useState(false);

	if (showBadges)
		return (
			<Badges
				title={data.id === "htb" ? "Hack The Box Academy Badges" : "Daily Dev Badges"}
				badges={data.id === "htb" ? htbBadges : dailyDevBadges}
				onClick={() => setShowBadges(false)}
			/>
		);

	return (
		<>
			{/* Icon + title */}
			<motion.div
				key="icon"
				style={{ top: 0, left: 0, position: "absolute" }}
				initial={{ transform: "translate(-100px,-100px)", opacity: 0 }}
				animate={{ transform: "translate(0,0)", opacity: 1 }}
				exit={{ transform: "translate(-100px,-100px)", opacity: 0 }}
				transition={TRANSITION}
			>
				<G_Card position={Position.TopLeft} style={{ width: "min-content", minWidth: "20vw" }} className="m-4">
					<ChangeAnimation id={data.id}>
						<img
							src={data.altIcon ?? data.icon}
							className="w-100 mb-3"
							style={{ maxHeight: "20vh", maxWidth: "20vw", objectFit: "contain" }}
						/>
						<div className="w-100 text-center fw-bold fs-5">{data.title}</div>
					</ChangeAnimation>
				</G_Card>
			</motion.div>

			{/* Badges for HTB and Daily Dev */}
			{(data.id === "htb" || data.id === "daily-dev") && (
				<motion.div
					key="badges"
					style={{ bottom: 0, left: 0, position: "absolute" }}
					initial={{ transform: "translate(-100px, 100px)", opacity: 0 }}
					animate={{ transform: "translate(0,0)", opacity: 1 }}
					exit={{ transform: "translate(-100px, 100px)", opacity: 0 }}
					transition={TRANSITION}
				>
					<G_Card position={Position.BottomLeft} className="m-4 badges-icon" onClick={() => setShowBadges(true)}>
						<img src="/icons/ui/badge.svg" style={{ width: "7vw", objectFit: "contain" }} />
					</G_Card>
				</motion.div>
			)}

			{/* Description */}
			<motion.div
				key="description"
				style={{ top: 0, right: 0, position: "absolute", width: "inherit" }}
				initial={{ transform: "translate(100px,-100px)", opacity: 0 }}
				animate={{ transform: "translate(0,0)", opacity: 1 }}
				exit={{ transform: "translate(100px,-100px)", opacity: 0 }}
				transition={TRANSITION}
			>
				<G_Card position={Position.TopRight} className="col-5 m-4">
					<ChangeAnimation id={data.id}>
						<span>{data.description}</span>
					</ChangeAnimation>
				</G_Card>
			</motion.div>
		</>
	);
}
