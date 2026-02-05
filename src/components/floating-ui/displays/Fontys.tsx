import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Badge, Col, ListGroup, Row, Stack } from "react-bootstrap";
import { COLOR_PALETTE, TRANSITION } from "../../../constants";
import { fontys } from "../../../content/content";
import "../../../css/fontys.css";
import type { fn, Semester } from "../../../types";
import { makeClickSound } from "../../../utils";
import FadeAnim from "../components/FadeAnim";
import { GithubLink } from "../components/Link";
import IconFrame from "../displays/IconFrame";
import { ProjectContent } from "./ProjectDisplay";

export default function Fontys({ setGoBackCb }: { setGoBackCb: (cb?: fn) => void }) {
	const [showSem, setShowSem] = useState<Semester | null>(null);
	useEffect(() => {
		if (showSem) {
			setGoBackCb(() => () => setShowSem(null));
		} else {
			setGoBackCb();
		}
	}, [setGoBackCb, showSem]);

	return (
		<Stack className="position-relative" gap={4} style={{ paddingBottom: "5em" }}>
			{showSem ? (
				<SemesterDetails sem={showSem} />
			) : (
				<>
					<Row>
						<Col xs={4} sm={3}>
							<IconFrame id="fontys" img={fontys.img} />
						</Col>

						<Col xs={9}>
							<FadeAnim>
								<h3>Fontys</h3>
								{fontys.description}
								<br />
								<div>
									<GithubLink url="https://github.com/BRISINGR-01/Fontys-projects" />
								</div>
							</FadeAnim>
						</Col>
					</Row>

					<FadeAnim>
						<SemestersList onSelect={setShowSem} />
					</FadeAnim>
				</>
			)}
		</Stack>
	);
}

function SemestersList(props: { onSelect: (sem: Semester) => void }) {
	return (
		<Stack direction="horizontal" className="align-items-start justify-content-center" gap={0}>
			{Array.from({ length: Math.ceil(fontys.semesters.length / 3) }).map((_, semI) => (
				<ListGroup key={semI} style={{ marginTop: `calc(${semI} * (1em + 2px))` }}>
					{fontys.semesters.slice(semI * 3, semI * 3 + 3).map((sem, i) => (
						<motion.div
							key={semI * 10 + i}
							initial={{ y: -5 * (i + 1) + "em", x: semI === 1 ? 0 : `${semI === 0 ? "" : "-"}100%` }}
							animate={{ y: 0, x: 0 }}
							exit={{ y: -5 * (i + 1) + "em", x: semI === 1 ? 0 : `${semI === 0 ? "" : "-"}100%` }}
							transition={TRANSITION}
						>
							<ListGroup.Item
								onMouseEnter={() => makeClickSound()}
								className="holo-item pointer"
								onClick={() => props.onSelect(sem)}
							>
								<Stack direction="horizontal" gap={1} className="holo-title glow-text px-3">
									Semester{" "}
									<div
										style={{
											width: "0.5em",
										}}
									>
										{i + semI * 3 + 1}
									</div>
								</Stack>
								<img
									className="r-arrow opacity-0"
									src="icons/ui/right-arrow.svg"
									style={{
										height: "1em",
										filter: "drop-shadow(0 0 4px cyan)",
										transition: ".3s",
										transform: "translateX(-50%)",
									}}
								/>
							</ListGroup.Item>
						</motion.div>
					))}
				</ListGroup>
			))}
		</Stack>
	);
}

function SemesterDetails({ sem }: { sem: Semester }) {
	return (
		<FadeAnim className="mt-3 mx-2">
			<motion.h2 initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={TRANSITION}>
				{sem.title}
			</motion.h2>
			<motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={TRANSITION}>
				{sem.description}
			</motion.div>

			{sem.courses && (
				<Stack direction="horizontal" className="flex-wrap justify-content-center my-3" gap={2}>
					{sem.courses.map((course, i) => (
						<Stack key={course} direction="horizontal">
							<motion.div
								initial={{ opacity: 0, scale: 0.6 }}
								animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.05 } }}
								exit={{ opacity: 0, scale: 0.6 }}
								transition={TRANSITION}
							>
								<Badge
									style={{
										background: "rgba(0, 170, 255, 0.48)",
										border: "3px solid rgba(74, 195, 255, 1)",
										color: "#e6faff",
										letterSpacing: "0.03em",
										fontWeight: 500,
										fontSize: ".8rem",
									}}
									className="pt-2"
									bg=""
								>
									{course}
								</Badge>
							</motion.div>
						</Stack>
					))}
				</Stack>
			)}

			{sem.title === "Semester 4 - Academic Preparation" && (
				<span className="d-flex gap-4 align-items-center mb-4">
					You can check out most of my projects and homework:
					<GithubLink url="http://github.com/BRISINGR-01/Maths" />
				</span>
			)}

			{sem.projects.map((project, i) => (
				<Stack key={i}>
					<motion.div
						key={i}
						initial={{ y: "-100%" }}
						animate={{ y: 0, transition: { delay: i * 0.5, duration: 0.3 } }}
						exit={{ y: "-100%" }}
					>
						<Row className="align-items-center">
							{project.github && (
								<Col xs={1} className="pe-0">
									<GithubLink url="project.github" />
								</Col>
							)}
							<Col>
								<h3
									className="my-3 p-0"
									style={{
										borderBottom: `3px solid ${COLOR_PALETTE.PRIMARY}`,
									}}
								>
									{project.title}
								</h3>
							</Col>
						</Row>
					</motion.div>

					<ProjectContent content={project.content} />
				</Stack>
			))}
		</FadeAnim>
	);
}
