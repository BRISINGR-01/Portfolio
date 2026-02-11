import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Badge, Card, Container, Image, ListGroup, Stack } from "react-bootstrap";
import { TRANSITION } from "../../../constants";
import { books, certificates, dailyDevBadges, htbBadges } from "../../../content/content";
import { experience } from "../../../content/experience";
import projects from "../../../content/projects";
import { Tags } from "../../../content/tags";
import type { Book, Certificate, DailyDevBadge, fn, HTBBadge, Project } from "../../../types";
import { useIcon } from "../../../utils";
import BookDetails from "../books/BookDetails";
import FadeAnim from "../components/FadeAnim";
import Frame from "../components/Frame";
import HologramDisplay from "../hologram-display/HologramDisplay";
import Experiences from "./Experiences";
import { ProjectContent } from "./ProjectDisplay";

type Type = "book" | "certificate" | "project" | "htb-badge" | "daily-dev-badge";
type Entry = (Book | Certificate | Project | HTBBadge | DailyDevBadge) & {
	type: Type;
};

const data: Entry[] = [];

data.push(...Object.values(projects).map((p) => ({ ...p, type: "project" as Type })));
data.push(...books.map((b) => ({ ...b, type: "book" as Type })));
data.push(...htbBadges.map((b) => ({ ...b, type: "htb-badge" as Type })));
data.push(...dailyDevBadges.map((b) => ({ ...b, type: "daily-dev-badge" as Type })));
for (const cert of certificates) {
	data.push({ ...cert, type: "certificate" });
	if (cert.subCertificates) data.push(...cert.subCertificates.map((c) => ({ ...c, type: "certificate" as Type })));
}

const stringify = (t: Tags) => Tags[t.toString()];

const sections = {
	Programming: [
		Tags["JS/TS"],
		Tags["C/C++"],
		Tags.Arduino,
		Tags.Python,
		Tags.Rust,
		Tags.Go,
		Tags["C#"],
		Tags.SQL,
		Tags.NodeJS,
		Tags.GraphQl,
	],
	Technologies: [
		Tags.Linux,
		Tags.ThreeJS,
		Tags.React,
		Tags.Flutter,
		Tags.Supabase,
		Tags.Bootstrap,
		Tags.Vercel,
		Tags.Express,
		Tags["Next JS"],
		Tags[".NET"],
		Tags.Neo4j,
		Tags.Docker,
		Tags.Kubernetes,
		Tags.Matlab,
	],
	Other: [
		Tags.Web,
		Tags["Embedded Systems"],
		Tags.IOT,
		Tags.Cybersecurity,
		Tags.Maths,
		Tags.Concurrency,
		Tags["Software Architecture"],
		Tags["Code Quality"],
		Tags["Design Patterns"],
		Tags.Ubuntu,
		Tags["Red Hat"],
		Tags["Game Dev"],
		Tags.Deployment,
	],
};

export default function TagsDisplay(props: { onClick: fn }) {
	const [chosenTag, setChosenTag] = useState<Tags | null>(null);
	const [chosenEntry, setChosenEntry] = useState<Entry | null>(null);
	const [goBackCb, setGoBackCb] = useState<fn | undefined>(undefined);

	useEffect(() => {
		setGoBackCb(chosenTag ? () => () => setChosenTag(null) : undefined);
		setChosenEntry(null);
	}, [chosenTag]);

	useEffect(() => {
		if (!chosenTag) return;
		setGoBackCb(chosenEntry ? () => () => setChosenEntry(null) : () => () => setChosenTag(null));
	}, [chosenEntry, chosenTag]);

	return (
		<HologramDisplay close={props.onClick} goBackCb={goBackCb}>
			<div className="p-3">
				{!chosenTag ? (
					<TagsList setChosenTag={setChosenTag} />
				) : !chosenEntry ? (
					<ResultsList tag={chosenTag} onClick={setChosenEntry} />
				) : (
					<FadeAnim key={chosenEntry.title}>
						<Stack className="justify-content-center align-items-center h-100 w-100">
							{chosenEntry.type === "certificate" ? (
								<DisplayCertificate certificate={chosenEntry as Certificate} />
							) : chosenEntry.type === "htb-badge" ? (
								<DisplayHTB badge={chosenEntry as HTBBadge} />
							) : chosenEntry.type === "daily-dev-badge" ? (
								<DisplayDailyDev badge={chosenEntry as DailyDevBadge} />
							) : chosenEntry.type === "book" ? (
								<BookDetails book={chosenEntry as Book} />
							) : chosenEntry.type === "project" ? (
								(chosenEntry as Project).timespan ? (
									<Experiences data={experience.find(({ title }) => title === (chosenEntry as Project).title)!} />
								) : (
									<Stack>
										<h3>{chosenEntry.title}</h3>
										<Stack direction="horizontal" gap={2} className="flex-wrap">
											{chosenEntry.tags.map((t) => (
												<CustomBadge>{stringify(t)}</CustomBadge>
											))}
										</Stack>
										<ProjectContent content={(chosenEntry as Project).content} />
									</Stack>
								)
							) : (
								<>Something went wrong here...</>
							)}
						</Stack>
					</FadeAnim>
				)}
			</div>
		</HologramDisplay>
	);
}

function TagsList(props: { setChosenTag: (tag: Tags) => void }) {
	const icons = useIcon();
	const iconsMap = {};
	const tags = [sections.Other, sections.Programming, sections.Technologies].flat().map(stringify);
	for (const icon of icons) {
		if (tags.includes(icon.name)) iconsMap[icon.name] = icon.url;
	}

	return (
		<Stack direction="horizontal" className="flex-wrap mx-4" gap={4}>
			{Object.entries(sections).map(([section, tags]) => (
				<div key={section}>
					<h6 className="mb-2">{section}</h6>
					<Stack direction="horizontal" className="flex-wrap" gap={2}>
						{tags.map((t, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, scale: 0.6 }}
								animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.03 } }}
								exit={{ opacity: 0, scale: 0.6 }}
								transition={TRANSITION}
							>
								<div className="hover pointer" onClick={() => props.setChosenTag(t)}>
									<CustomBadge>
										{iconsMap[stringify(t)] && (
											<img style={{ height: "1em" }} className="me-1" src={iconsMap[stringify(t)]} />
										)}
										{stringify(t)}
									</CustomBadge>
								</div>
							</motion.div>
						))}
					</Stack>
				</div>
			))}
		</Stack>
	);
}

function ResultsList(props: { onClick: (e: Entry) => void; tag: Tags }) {
	return (
		<Stack>
			<h4>Category: {stringify(props.tag)}</h4>
			<ListGroup>
				{data
					.filter(({ tags }) => tags.includes(props.tag))
					.map((d, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: -i * 10 }}
							animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
							exit={{ opacity: 0, y: -i * 10 }}
							transition={TRANSITION}
						>
							<ListGroup.Item
								onClick={() => props.onClick(d)}
								className="d-flex justify-content-between align-items-center text-light pointer list-item-tags"
								style={{
									transition: ".3s",
									background: "linear-gradient(270deg,rgba(8, 166, 209, 0.36) 0%, rgba(15, 63, 95, 0.8) 100%)",
									borderColor: "#6fd6ffff",
									backdropFilter: "blur(1px)",
									zIndex: data.length - i,
								}}
							>
								<div>
									{d.image && <img className="me-2" src={d.image} style={{ height: "1em" }} />}
									{d.title}
								</div>
								<CustomBadge>{d.type}</CustomBadge>
							</ListGroup.Item>
						</motion.div>
					))}
			</ListGroup>
		</Stack>
	);
}

function DisplayCertificate(props: { certificate: Certificate }) {
	return (
		<div className="d-flex align-items-center flex-column gap-2">
			<h3 className="mt-2 w-100 text-center">{props.certificate.title}</h3>
			<Frame
				alt={props.certificate.title}
				style={{
					filter: props.certificate.subCertificates ? "drop-shadow(2px 2px 0px gold)" : "",
					height: "10em",
					width: "fit-content",
					background: "white",
				}}
				src={props.certificate.image}
				size={4}
			/>
			<Stack direction="horizontal" gap={2} className="flex-wrap justify-content-center">
				{props.certificate.tags.map((t) => (
					<CustomBadge>{stringify(t)}</CustomBadge>
				))}
			</Stack>
		</div>
	);
}

function CustomBadge(props: React.PropsWithChildren) {
	return (
		<Badge
			style={{
				background: "rgba(0, 170, 255, 0.48)",
				border: "3px solid rgba(74, 195, 255, 1)",
				color: "#e6faff",
				letterSpacing: "0.03em",
				fontWeight: 500,
				fontSize: ".8rem",
				height: "min-content",
			}}
			bg=""
		>
			{props.children}
		</Badge>
	);
}

function DisplayHTB(props: { badge: HTBBadge }) {
	return (
		<div className="d-flex align-items-center flex-column gap-2">
			<Container
				className="m-0 m-sm-2 p-0 d-flex justify-content-center flex-column"
				style={{
					width: "min-content",
					background: "rgba(0,0,0, 0)",
					borderRadius: 40,
				}}
			>
				<Image
					src={props.badge.image}
					alt={props.badge.title}
					style={{
						height: "160px",
						objectFit: "contain",
						width: "min-content",
					}}
				/>
				<Card.Body className="p-2">
					<Card.Title className="fs-6 text-center">
						{props.badge.title}
						<div className="small" style={{ color: "#7db9bd" }}>
							{props.badge.description}
						</div>
					</Card.Title>
				</Card.Body>
			</Container>
			<Stack direction="horizontal" gap={2} className="flex-wrap justify-content-center">
				{props.badge.tags.map((t) => (
					<CustomBadge>{stringify(t)}</CustomBadge>
				))}
			</Stack>
		</div>
	);
}

function DisplayDailyDev(props: { badge: DailyDevBadge }) {
	return (
		<div className="d-flex align-items-center flex-column gap-2">
			<Container
				className="m-0 m-sm-2 p-0 d-flex justify-content-center flex-column"
				style={{
					width: "min-content",
					background: "rgba(0,0,0, 0)",
					borderRadius: 40,
				}}
			>
				<Frame alt={props.badge.title} src={props.badge.image} size={3} style={{ height: "7em" }} />
				<Card.Body className="p-2">
					<Card.Title className="fs-6 text-center">{props.badge.title}</Card.Title>
				</Card.Body>
			</Container>
			<Stack direction="horizontal" gap={2} className="flex-wrap justify-content-center">
				{props.badge.tags.map((t) => (
					<CustomBadge>{stringify(t)}</CustomBadge>
				))}
			</Stack>
		</div>
	);
}
