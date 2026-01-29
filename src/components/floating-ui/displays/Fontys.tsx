import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Badge, Col, ListGroup, Row, Stack } from "react-bootstrap";
import { COLOR_PALETTE, TRANSITION } from "../../../constants";
import { fontys } from "../../../content/content";
import "../../../css/fontys.css";
import type { fn, Semester } from "../../../types";
import FadeAnim from "../components/FadeAnim";
import Link from "../components/Link";
import { ProjectContent } from "../components/ProjectDisplay";
import IconFrame from "../displays/IconFrame";

export default function Fontys(props: { setGoBackCb: (cb?: fn) => void }) {
	const [showSem, setShowSem] = useState<Semester | null>();
	useEffect(() => {
		if (showSem) {
			props.setGoBackCb(() => () => setShowSem(null));
		} else {
			props.setGoBackCb();
		}
	}, [props, showSem]);

	return (
		<Stack className="position-relative" gap={4} style={{ paddingBottom: "5em" }}>
			{showSem ? (
				<SemesterDetails sem={showSem} />
			) : (
				<>
					<Row>
						<Col xs={4} sm={3}>
							<IconFrame id="fontys" img={fontys.img} />
							{/* <Frame size={5}>
								<Image src={fontys.img} />
							</Frame> */}
						</Col>

						<Col xs={9}>
							<FadeAnim>
								<h3>Fontys</h3>
								{fontys.description}
								<br />
								<Link url="https://github.com/BRISINGR-01/Fontys-projects">
									<img
										src="icons/other/github.svg"
										alt="github"
										style={{
											height: "3em",
											border: "2px solid #69bcefff",
											boxShadow: "inset #0dcaf0 0px 0px 4px 1px",
											background: "var(--dark)",
										}}
										className="p-2 rounded-3 pointer hover"
									/>
								</Link>
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
							<ListGroup.Item className="holo-item pointer" onClick={() => props.onSelect(sem)}>
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
						<Stack direction="horizontal">
							<motion.div
								initial={{ opacity: 0, scale: 0.6 }}
								animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.05 } }}
								exit={{ opacity: 0, scale: 0.6 }}
								transition={TRANSITION}
							>
								<Badge
									key={course}
									style={{
										background: "rgba(0, 170, 255, 0.48)",
										border: "3px solid rgba(74, 195, 255, 1)",
										color: "#e6faff",
										letterSpacing: "0.03em",
										fontWeight: 500,
									}}
									className="fs-6 pt-2 hover"
									bg=""
								>
									{course}
								</Badge>
							</motion.div>
							{course === "Data Structures & Algorithms II" && (
								<Link className="hover ms-2" url="https://github.com/BRISINGR-01/Fontys-projects">
									<motion.img
										initial={{ opacity: 0, scale: 0.6 }}
										animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.05, duration: 0.2 } }}
										exit={{ opacity: 0, scale: 0.6 }}
										src="icons/other/github.svg"
										alt="github"
										style={{
											height: "2.2em",
											border: "2px solid #3faaecff",
											boxShadow: "inset #0dcaf0 0px 0px 4px 1px",
											background: "var(--dark)",
										}}
										className="p-1 rounded-3 pointer hover"
									/>
								</Link>
							)}
						</Stack>
					))}
				</Stack>
			)}

			{sem.projects.map((project, i) => (
				<Stack>
					<motion.div
						key={i}
						initial={{ y: "-100%" }}
						animate={{ y: 0, transition: { delay: i * 0.5, duration: 0.3 } }}
						exit={{ y: "-100%" }}
					>
						<h3
							className="text-center my-3 mx-5"
							style={{
								borderBottom: `3px solid ${COLOR_PALETTE.PRIMARY}`,
								letterSpacing: "0.08em",
							}}
						>
							{project.title}
							{project.github && (
								<Link url={project.github}>
									<img
										src="icons/other/github.svg"
										alt="github"
										style={{ height: "1em", border: "2px solid #c4e8ff", boxShadow: "#0dcaf0 0px 0px 4px 1px" }}
										className="ms-2 rounded-5 pointer hover"
									/>
								</Link>
							)}
						</h3>
					</motion.div>

					<ProjectContent content={project.content} />
				</Stack>
			))}
		</FadeAnim>
	);
}
