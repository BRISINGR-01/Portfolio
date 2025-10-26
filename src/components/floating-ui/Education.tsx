import { motion } from "motion/react";

import { PieChart } from "@mui/x-charts";
import { OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { TRANSITION } from "../../constants.ts";
import type { Education } from "../../content.ts";
import { parseTimeSpan, useIcon } from "../../utils.ts";
import G_Card from "./Card.tsx";
import ChangeAnimation from "./ChangeAnimation.tsx";

export default function EducationDisplay({ data }: { data: Education | null }) {
	console.log(data);
	const icons = useIcon();

	if (!data) return null;

	return (
		<>
			{/* Logo + title + time */}
			<motion.div
				key="logo"
				style={{ top: 0, left: 0, position: "absolute" }}
				initial={{ transform: "translate(-100px,-100px)", opacity: 0 }}
				animate={{ transform: "translate(0,0)", opacity: 1 }}
				exit={{ transform: "translate(-100px,-100px)", opacity: 0 }}
				transition={TRANSITION}
			>
				<G_Card style={{ top: 0, left: 0, width: "min-content" }} className="col-2 d-flex">
					<ChangeAnimation id={data.id}>
						<img
							src={data.logo}
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
				<G_Card style={{ right: 0, top: 0 }} className="col-5">
					<ChangeAnimation id={data.id}>
						<span>{data.description}</span>
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
				<G_Card style={{ bottom: 0, left: 0 }}>
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
