import { motion } from "motion/react";

import { TRANSITION } from "../../constants.ts";
import type { Education } from "../../types.ts";
import G_Card from "./Card.tsx";
import ChangeAnimation from "./ChangeAnimation.tsx";

export default function EducationDisplay({ data }: { data: Education | null }) {
	if (!data) return null;

	return (
		<>
			{/* Icon + title + time */}
			<motion.div
				key="icon"
				style={{ top: 0, left: 0, position: "absolute" }}
				initial={{ transform: "translate(-100px,-100px)", opacity: 0 }}
				animate={{ transform: "translate(0,0)", opacity: 1 }}
				exit={{ transform: "translate(-100px,-100px)", opacity: 0 }}
				transition={TRANSITION}
			>
				<G_Card style={{ top: 0, left: 0, width: "min-content", minWidth: "20vw" }} className="col-2 d-flex">
					<ChangeAnimation id={data.id}>
						<img
							src={data.icon}
							className="w-100 mb-3"
							style={{ maxHeight: "20vh", maxWidth: "20vw", objectFit: "contain" }}
						/>
						<span className="text-center fw-bold fs-5">{data.title}</span>
					</ChangeAnimation>
				</G_Card>
			</motion.div>

			{/* Description */}
			<motion.div
				key="description"
				style={{ top: 0, right: 0, position: "absolute", width: "inherit" }}
				initial={{ transform: "translate(100px,-100px)", opacity: 0 }}
				animate={{ transform: "translate(0,0)", opacity: 1 }}
				exit={{ transform: "translate(100px,-100px)", opacity: 0 }}
				transition={TRANSITION}
			>
				<G_Card style={{ right: 0, top: 0 }} className="col-5">
					<ChangeAnimation id={data.id}>
						<span>{data.description}</span>
					</ChangeAnimation>
				</G_Card>
			</motion.div>
		</>
	);
}
