import { motion } from "motion/react";

import { useState } from "react";
import { Stack } from "react-bootstrap";
import { TRANSITION } from "../../../constants.ts";
import { dailyDevBadges, htbBadges } from "../../../content/content.ts";
import type { Education } from "../../../types.ts";
import Badges from "../components/Badges.tsx";
import ChangeAnimation from "../components/ChangeAnimation.tsx";
import IconFrame from "./IconFrame.tsx";

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
			{/* Badges for HTB and Daily Dev */}
			{(data.id === "htb" || data.id === "daily-dev") && (
				<motion.div
					key="badges"
					style={{ bottom: 0, left: 0, position: "absolute" }}
					initial={{ transform: "translate(-100px, 100px)", opacity: 0 }}
					animate={{ transform: "translate(0,0)", opacity: 1 }}
					exit={{ transform: "translate(-100px, 100px)", opacity: 0 }}
					transition={TRANSITION}
					onClick={() => setShowBadges(true)}
				>
					<img src="/icons/ui/badge.svg" style={{ width: "7vw", objectFit: "contain" }} />
				</motion.div>
			)}

			<Stack className="p-4 w-100" gap={4}>
				<div className="d-flex gap-4">
					<Stack className="align-items-center col-3" gap={3}>
						<IconFrame id={data.id} img={data.altIcon ?? data.icon} />
						<div className="w-100 text-center fw-bold fs-5">{data.title}</div>
					</Stack>

					{/* Text */}
					<Stack className="flex-grow-1 desc-context col-9" gap={3}>
						<ChangeAnimation id={"content-" + data.id}>{data.description}</ChangeAnimation>
					</Stack>
				</div>
			</Stack>
		</>
	);
}
