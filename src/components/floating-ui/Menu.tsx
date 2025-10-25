import { motion } from "motion/react";
import { OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { TRANSITION } from "../../constants";
import G_Card from "./Card.tsx";

const icons = [
	{ id: "projects", url: "icons/ui/projects.svg" },
	{ id: "education", url: "icons/ui/education.svg" },
	{ id: "certificates", url: "icons/ui/certificates.svg" },
	{ id: "other", url: "icons/ui/other.svg" },
];

export default function Menu(props: { onSelect: (id: string) => void }) {
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
									{icon.id}
								</Tooltip>
							)}
						>
							<div className="menu-icon mx-2 icon pointer" onClick={() => props.onSelect(icon.id)}>
								<img src={icon.url} alt={icon.id} height={40} />
							</div>
						</OverlayTrigger>
					))}
				</Row>
			</G_Card>
		</motion.div>
	);
}
