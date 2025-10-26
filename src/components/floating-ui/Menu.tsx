import { motion } from "motion/react";
import { OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { TRANSITION } from "../../constants";
import type { ContentType } from "../../types.ts";
import G_Card from "./Card.tsx";

const icons: ContentType[] = ["projects", "education", "certificates", "books", "other"];

export default function Menu(props: { onSelect: (type: ContentType) => void }) {
	return (
		<motion.div
			key="menu"
			initial={{ transform: "translateY(100px)", opacity: 0 }}
			animate={{ transform: "translateY(0)", opacity: 1 }}
			transition={TRANSITION}
			exit={{ transform: "translateY(100px)", opacity: 0 }}
		>
			<G_Card style={{ bottom: 0, left: "50%", transform: "translateX(-50%)", translate: "" }}>
				<Row>
					{icons.map((icon, i) => (
						<OverlayTrigger
							key={i}
							placement="bottom"
							overlay={(p) => (
								<Tooltip {...p} arrowProps={{}}>
									{icon}
								</Tooltip>
							)}
						>
							<div className="menu-icon mx-2 icon pointer" onClick={() => props.onSelect(icon)}>
								<img src={`icons/ui/${icon}.svg`} alt={icon} height={40} />
							</div>
						</OverlayTrigger>
					))}
				</Row>
			</G_Card>
		</motion.div>
	);
}
