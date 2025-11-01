import { motion } from "motion/react";

import { PieChart } from "@mui/x-charts";
import { Accordion, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { TRANSITION } from "../../constants";
import type { Experience } from "../../types.ts";
import { parseTimeSpan, useIcon } from "../../utils";
import ChangeAnimation from "./components/ChangeAnimation.tsx";
import G_Card, { Position } from "./components/G_Card.tsx";

export default function ExperienceDisplay({ data }: { data: Experience | null }) {
	const icons = useIcon();

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
				<G_Card position={Position.TopLeft} style={{ width: "min-content" }} className="col-2 m-4">
					<ChangeAnimation id={data.id} className="d-flex flex-column">
						<img
							src={data.icon}
							className="w-100 mb-3"
							style={{ maxHeight: "20vh", maxWidth: "20vw", objectFit: "contain" }}
						/>
						<span className="text-center fw-bold fs-5">{data.title}</span>
						<span className="text-nowrap fw-bold fs-6">
							{parseTimeSpan(data.timespan[0])} - {parseTimeSpan(data.timespan[1])}
						</span>
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
				<G_Card position={Position.TopRight} className="col-5 justify-content-start m-4">
					<ChangeAnimation id={data.id} className="w-100">
						<Accordion defaultActiveKey="1">
							<Accordion.Item eventKey="0">
								<Accordion.Header>Context</Accordion.Header>
								<Accordion.Body>{data.context}</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="1">
								<Accordion.Header>Description</Accordion.Header>
								<Accordion.Body>{data.description}</Accordion.Body>
							</Accordion.Item>
						</Accordion>
					</ChangeAnimation>
				</G_Card>
			</motion.div>

			{/* Tech chart */}
			<motion.div
				key="chart"
				initial={{ transform: "translate(-100px,100px)", opacity: 0 }}
				animate={{ transform: "translate(0,0)", opacity: 1 }}
				exit={{ transform: "translate(-100px,100px)", opacity: 0 }}
				transition={TRANSITION}
			>
				<G_Card position={Position.BottomLeft} className="m-4">
					<PieChart
						style={{
							maxHeight: "200px",
							maxWidth: "200px",
						}}
						series={[
							{
								data: data.technologies.map((tech) => ({
									id: tech.name,
									value: tech.percentage,
									label: tech.name,
								})),
								valueFormatter: (item) => `${item.value}%`,

								innerRadius: 20,
								outerRadius: 50,
								highlightScope: { fade: "global", highlight: "item" },
								highlighted: { outerRadius: 55 },
								faded: { innerRadius: 50, additionalRadius: -35, color: "gray" },
								paddingAngle: 5,
								cornerRadius: 5,
							},
						]}
						hideLegend
					/>
					<ChangeAnimation id={data.id}>
						<Row className="align-items-center mx-1 gap-2">
							{data.technologies
								.map((t) => icons.find((icon) => icon.name === t.name))
								.filter((i) => i != undefined)
								.map((icon, i) => (
									<OverlayTrigger key={i} placement="top" overlay={<Tooltip>{icon.name}</Tooltip>}>
										<img src={icon.url} alt={icon.name} height={40} className="icon" />
									</OverlayTrigger>
								))}
						</Row>
					</ChangeAnimation>
				</G_Card>
			</motion.div>
		</>
	);
}
