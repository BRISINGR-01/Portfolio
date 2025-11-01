import { motion } from "motion/react";

import { TRANSITION } from "../../constants.ts";
import type { Contact } from "../../types";
import ChangeAnimation from "./components/ChangeAnimation.tsx";
import G_Card, { Position } from "./components/G_Card.tsx";

export default function Contacts({ data }: { data: Contact }) {
	return (
		<motion.div
			key="icon"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={TRANSITION}
		>
			<G_Card position={Position.TopRight} className="m-4">
				<ChangeAnimation id={data.id} className="p-3">
					<img src={data.icon} className="w-100 mb-3" style={{ height: "10vh", objectFit: "contain" }} />
					<div className="w-100 text-center fw-bold fs-5">{data.title}</div>
					<a href={data.url} className="pointer w-100 text-center fw-bold fs-5">
						{data.address}
					</a>
				</ChangeAnimation>
			</G_Card>
		</motion.div>
	);
}
