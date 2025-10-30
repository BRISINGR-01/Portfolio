import { motion } from "motion/react";

import { useState } from "react";
import { TRANSITION } from "../../constants.ts";
import type { Education } from "../../types.ts";
import ChangeAnimation from "./ChangeAnimation.tsx";
import G_Card from "./G_Card.tsx";
import HTBBadges from "./HTBBadges.tsx";

export default function EducationDisplay({ data }: { data: Education }) {
	const [showBadges, setShowBadges] = useState(false);

	if (showBadges) return <HTBBadges onClick={() => setShowBadges(false)} />;

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
				<G_Card style={{ top: 0, left: 0, width: "min-content", minWidth: "20vw" }} className="m-4">
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

			{/* Badges for HTB */}
			{data.id === "htb" && (
				<motion.div
					key="badges"
					style={{ bottom: 0, left: 0, position: "absolute" }}
					initial={{ transform: "translate(-100px, 100px)", opacity: 0 }}
					animate={{ transform: "translate(0,0)", opacity: 1 }}
					exit={{ transform: "translate(-100px, 100px)", opacity: 0 }}
					transition={TRANSITION}
				>
					<G_Card style={{ bottom: 0, left: 0 }} className="m-4 badges-icon" onClick={() => setShowBadges(true)}>
						<img src="/icons/ui/badge.svg" style={{ filter: "invert()", width: "7vw", objectFit: "contain" }} />
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
				<G_Card style={{ right: 0, top: 0 }} className="col-5 m-4">
					<ChangeAnimation id={data.id}>
						<span>{data.description}</span>
					</ChangeAnimation>
				</G_Card>
			</motion.div>
		</>
	);
}
