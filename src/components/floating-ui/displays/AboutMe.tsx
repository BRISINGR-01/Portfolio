import { useEffect, useState } from "react";
import { Button, Image, Modal, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { contacts } from "../../../content/about-me";
import { Tags } from "../../../content/tags";
import "../../../css/about-me.css";
import { setEscAction, useIcon } from "../../../utils";
import CareerPath from "../components/CareerPath";
import LanguagesList from "../components/LanguagesList";
import Link, { TextLink } from "../components/Link";

function IconLink(i: number) {
	return (
		<Link key={i} hoverText={contacts[i].id} url={contacts[i].url}>
			<Image src={contacts[i].altIcon} style={{ height: "2em", filter: "drop-shadow(0px 0px 3px #00aaff)" }} />
		</Link>
	);
}

const linuxUserSince = new Date().getFullYear() - 2023;

export default function AboutMe() {
	const icons = useIcon();

	const [showCareer, setShowCareer] = useState(false);

	useEffect(() => {
		setEscAction(showCareer ? () => setShowCareer(false) : null);
	}, [showCareer]);

	return (
		<Stack direction="horizontal" className="align-items-start mb-4" gap={4}>
			<div className="d-flex flex-column gap-3" style={{ width: "min-content" }}>
				<Image src="images/other/me.png" style={{ width: "100%" }} />

				<Stack direction="vertical">
					<div style={{ width: "15em" }}>
						<LanguagesList />
					</div>
					<span className="m-1 ">* not offically tested</span>
				</Stack>
			</div>
			<Stack>
				<h3>Welcome to my portfolio!</h3>
				<span>
					My name is Alexander Popov and I specialize mostly in full-stack web development and embedded systems. However
					I am also invested in Linux and cyber security.
				</span>

				<br />
				<div>
					You can check out my CV, code and contacts if you are interested, or you could take a look at my career:
					<Stack direction="horizontal" className="justify-content-center w-100 my-2" gap={5}>
						<OverlayTrigger overlay={<Tooltip className="glow-text">open career pat</Tooltip>}>
							{/*  @ts-expect-error union too complex (react-bootstrap) */}
							<Button variant="" className="m-0 pb-2 p-0" onClick={() => setShowCareer(true)}>
								<img
									style={{ height: "2em", filter: "invert(1) drop-shadow(0 0 1px #a1d5ff)" }}
									src="icons/ui/career.svg"
								/>
							</Button>
						</OverlayTrigger>
						<Stack direction="horizontal" className="justify-content-center flex-wrap" gap={2}>
							{contacts.map((_, i) => IconLink(i))}
						</Stack>
						<Link url="files/cv.pdf" download hoverText="cv">
							<img
								style={{ height: "2rem", filter: "drop-shadow(0px 0px 3px #00aaff)" }}
								src="icons/ui/cv.svg"
								alt="cv"
							/>
						</Link>
					</Stack>
					<Stack direction="horizontal" className="mb-2 gap-2"></Stack>
				</div>

				<Section
					title="Expertise"
					sections={[
						{
							img: "icons/technologies/software.svg",
							content: (
								<span>
									<b>Web Development</b> I've build dozens of professional and hobby full-stack aplications with
									Typescript, React and some of them have 3D interactions using ThreeJS.
								</span>
							),
						},
						{
							img: "icons/technologies/hardware.svg",
							content: (
								<span>
									<b>Embedded & Robotics</b> - Experience with embedded systems, hardware integration, and real-time
									control. Currently working on a robotic arm for RoboCup, focusing on low-level control and reliable
									hardware-software interaction.
								</span>
							),
						},
						{
							img: "icons/technologies/linux.svg",
							content: (
								<span>
									<b>Linux & Systems</b> - Daily Linux user for {linuxUserSince}+ years across NixOS, Ubuntu, Fedora,
									and Arch. Comfortable with system configuration, debugging, and working close to the OS.
								</span>
							),
						},
						{
							img: "icons/technologies/hacking.svg",
							content: (
								<span>
									<b>Cybersecurity</b> - Completed multiple courses on Hack The Box and participated in CTFs such as
									MineTheMatrix and TrojanCTF. Developed several challenges for TrojanCTF, gaining hands-on experience
									in offensive security and challenge design.
								</span>
							),
						},
						{
							img: "icons/technologies/android.svg",
							content: (
								<span>
									<b>Mobile Development</b> - Built several Flutter apps for personal use, including a GPS bike tracker
									and a multilingual dictionary as hobby projects.
								</span>
							),
						},
					]}
				/>

				<Section
					title="Education"
					sections={[
						{
							img: "icons/other/fontys.svg",
							content: (
								<span>
									<b>Bachelor</b> - I'm in my last year of my{" "}
									<TextLink url="https://www.fontys.nl/en/Programmes/Information-Communication-Technology-bachelor-full-time.htm">
										ICT
									</TextLink>{" "}
									bachelor at Fontys. I chose the software path for most of the semesters, however I switched to
									technology (hardware) and I am now doing the "High Tech Embedded Systems" advanced semester. For two
									semesters I switched to the "Open Learning" method where students don't have lectures, but work on
									projects with real companies.
								</span>
							),
						},
						{
							img: "icons/other/tue.svg",
							content: (
								<span>
									<b>Pre-master</b> - Recently I finished my pre-master for{" "}
									<TextLink url="https://educationguide.tue.nl/programs/pre-master-programs/embedded-systems">
										Embedded Systems
									</TextLink>{" "}
									at the technical university of Eindhoven, where I studied electricity and mathematics.
								</span>
							),
						},
					]}
				/>

				<Section
					title="Things I've Built"
					sections={[
						{
							img: "icons/technologies/robot.svg",
							content: (
								<span>
									<b>Robotics - RoboCup</b> - Developing a robotic arm focused on embedded control, hardware
									integration, and reliable real-time behavior for competition scenarios.
								</span>
							),
						},
						{
							img: "icons/other/glow.svg",
							content: (
								<span>
									<b>GLOW Eindhoven</b> - Contributed to two large-scale light installations by student teams.
									<ul>
										<li>
											Echoes of Tomorrow (Delta Excellence Programme) - involved in concept development and prototyping.
										</li>
										<li>
											Phoenix (Venlo IDE): programmed and installed the spotlight sequence for the final installation.
										</li>
									</ul>
								</span>
							),
						},
						{
							img: "icons/other/ASML.svg",
							content: (
								<span>
									<b>ASML Internship</b> - Developed a C++ code analysis tool that generates interactive reports to
									visualize large codebases. Built custom bundling and recreated internal UI styling under strict
									constraints.
								</span>
							),
						},
						{
							img: "icons/other/latin-is-simple.svg",
							content: (
								<span>
									<b>Latin-is-Simple</b> - Rebuilt the training section of the platform, implementing five trainers with
									dynamic question generation, pattern matching for flexible answers, and a scoreboard system.
								</span>
							),
						},

						{
							img: "images/other/SDG.png",
							content: (
								<span>
									<b>SDG Challenge</b> - Designed a gamified recycling system using an ESP32 + RFID/NFC reader connected
									to a web platform for Sabic (2024) and co-developed "Solartrace" an educational transparence platform
									for Solarwatt (2025).
								</span>
							),
						},
					]}
				/>
				<Stack className="edu-section">
					<h4>Tech Stack</h4>
					<Stack direction="horizontal" className="w-100 justify-content-center" gap={2}>
						{[
							Tags["C/C++"],
							Tags.Arduino,
							Tags.ROS,
							Tags.Matlab,
							Tags.Python,
							Tags.TypeScript,
							Tags.ThreeJS,
							Tags.React,
							Tags.Wireshark,
						].map((tag) => {
							const t = Tags[tag].toString();
							const icon = icons.find((i) => i.name === t);
							if (!icon) return;

							return (
								<OverlayTrigger key={t} overlay={<Tooltip>{t}</Tooltip>}>
									<div className="position-relative d-flex" style={{ width: "min-content" }}>
										<svg
											className="h-100 w-auto position-absolute left-0 z-0"
											width="331"
											height="355"
											viewBox="0 0 331 357"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M36.5 44H265.5L291 68L293.5 297L76 295.5L36.5 242V44Z"
												fill="#031628"
												fillOpacity="0.423529"
											/>
											<path
												d="M317 89.5L251.5 18H14L36.5 44.5H250L289.5 89.5L291 295.5H80L38 250.5L36.5 44.5L14 18L14.5 250.5L78.5 321H317V89.5Z"
												fill="#00AAFF"
											/>
											<path d="M44 239.5H-1.52588e-05L85.5 334.5V289.5L44 239.5Z" fill="#A4E1FF" />
											<path d="M246.5 0H198L331 145V93L246.5 0Z" fill="#A4E1FF" />
											<path d="M284.306 328L268.5 357H301.694L317.5 328H284.306Z" fill="#A4E1FF" />
											<path d="M239.306 328L223.5 357H256.694L272.5 328H239.306Z" fill="#A4E1FF" />
											<path d="M190.306 328L174.5 357H207.694L223.5 328H190.306Z" fill="#A4E1FF" />
										</svg>

										<div
											className="d-flex align-items-center justify-content-center pointer z-1"
											style={{
												width: "2.8em",
												height: "2.8em",
											}}
										>
											{icon ? (
												<img
													src={icon.url}
													alt={t}
													style={{
														width: "60%",
														height: "60%",
														objectFit: "contain",
														transform: "translate(-1px, -1px)",
													}}
												/>
											) : (
												<span style={{ fontSize: 10, color: "#9fe6ff" }}>{t.slice(0, 2).toUpperCase()}</span>
											)}
										</div>
									</div>
								</OverlayTrigger>
							);
						})}
					</Stack>
				</Stack>

				<Modal show={showCareer} onHide={() => setShowCareer(false)} onEscapeKeyDown={() => setShowCareer(false)}>
					<Modal.Body
						className="p-0 d-flex align-items-center"
						style={{
							height: "100vh",
						}}
					>
						<div
							style={{
								padding: "2em",
								borderRadius: "20px",
								boxShadow: "0 0 4px 2px #1168a2",
								background: "#09365d8f",
								backdropFilter: "blur(4px)",
							}}
						>
							<CareerPath />
						</div>
					</Modal.Body>
				</Modal>
			</Stack>
		</Stack>
	);
}

function Section(props: { title: string; sections: { img?: string; content: React.JSX.Element }[] }) {
	return (
		<div className="edu-section">
			<span className="edu-corner">{props.title.slice(0, 3).toUpperCase()}_LOG.SYS</span>

			<h4>{props.title}</h4>

			{props.sections.map((section, i) => (
				<div className="edu-entry" key={i}>
					{section.img && (
						<div className="edu-icon-wrap">
							<Image src={section.img} style={{ transition: "0.3s", height: "1.8em" }} className="me-2" />
						</div>
					)}
					{section.content}
				</div>
			))}
		</div>
	);
}
