import { PieChart } from "@mui/x-charts";
import React, { Suspense, useEffect, useState } from "react";
import { OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import type { WorkingExperience } from "../constants";
import "../css/menu.css";
import { parseTimeSpan, useIcon } from "../utils";
import Loader from "./3d/Loader";

export default function Menu({ data }: { data: WorkingExperience | null }) {
	const [show, setShow] = useState(true);
	const icons = useIcon();

	useEffect(() => {
		setShow(data !== null);
	}, [data]);

	if (!data) return null;

	return (
		<>
			<Card style={{ top: 0, left: 0, width: "min-content" }} className="col-2 d-flex gap-2">
				<Suspense fallback={<Loader />}>
					<img
						src={data.logo}
						className="w-100"
						style={{ maxHeight: "20vh", maxWidth: "20vw", objectFit: "contain" }}
					/>
				</Suspense>
				{/* <span className="text-center" style={{ fontSize: "0.9em" }}>
					{data.title}
				</span>
				*/}
				<div className="timespan">
					{parseTimeSpan(data.timespan[0])} - {parseTimeSpan(data.timespan[1])}
				</div>
			</Card>
			<Card style={{ bottom: 0, left: 0 }}>
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
				<Row className="align-items-center mx-1 gap-2">
					{data.technologies
						.map((t) => icons.find((icon) => icon.name === t.name))
						.filter(Boolean)
						.map((icon, i) => (
							<OverlayTrigger key={i} placement="top" overlay={<Tooltip>{icon.name}</Tooltip>}>
								<img
									src={icon.url}
									alt={icon.name}
									height={40}
									className="rounded shadow-sm p-1"
									style={{ width: "auto", objectFit: "contain", background: "#335b8499" }}
									onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
									onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
								/>
							</OverlayTrigger>
						))}
				</Row>
			</Card>
			<Card style={{ right: 0, top: 0 }} className="col-5">
				<h2 className="my-3">{data.title}</h2>

				<p>{data.description}</p>
			</Card>
			{/* <Card>
				<Row>
					<Col md={2} className=" d-flex flex-column align-items-center">
						<ListGroup style={{ background: "inherit" }}>
							<ListGroup.Item style={{ background: "inherit" }}>Internships and big projects</ListGroup.Item>
							<ListGroup.Item>Education</ListGroup.Item>
							<ListGroup.Item>Areas</ListGroup.Item>
							<ListGroup.Item>Technologies</ListGroup.Item>
						</ListGroup>
					</Col>

					<Col md={10} className="p-4">
						<h2>🪐 Sci-Fi Hologram Interface</h2>
						<p>Welcome to the command console. This area displays live data streams, mission info, and controls.</p>
					</Col>
				</Row>
			</Card> */}
		</>
	);
}

function Card(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	return (
		<div
			{...props}
			style={{ ...props.style }}
			className={`g-card text-light m-4 p-3 position-absolute align-self-center ${props.className}`}
		>
			{props.children}
		</div>
	);
}
