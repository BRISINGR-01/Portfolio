import { useCallback, useRef } from "react";
import { Button, Image, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { contacts } from "../../../content/about-me";
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

export default function AboutMe() {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<Stack direction="horizontal" className="align-items-start" gap={4}>
			<div className="d-flex flex-column gap-3" style={{ width: "min-content" }}>
				<Image src="public/images/other/me.png" style={{ width: "100%" }} />

				<Stack direction="vertical">
					<div style={{ width: "15em" }}>
						<LanguagesList />
					</div>
					<span className="m-1 ">* not offically tested</span>
				</Stack>
			</div>
			<Stack>
				<h1>Welcome to my portfolio!</h1>
				<span>
					My name is Alexander Popov and I specialize mostly in web development. However I also develop embedded
					systems, mobile apps and other types of software as well as cyber security. I'm in my last year of my{" "}
					<TextLink url="https://www.fontys.nl/en/Programmes/Information-Communication-Technology-bachelor-full-time.htm">
						ICT
					</TextLink>{" "}
					bachelor at Fontys.
				</span>
				<br />
				<div>
					You can check out my CV, code and contacts if you are interested:
					<Stack direction="horizontal" className="justify-content-center gap-2 flex-wrap my-2">
						<Link url="files/cv.pdf" download hoverText="cv">
							<img
								style={{ height: "2rem", filter: "drop-shadow(0px 0px 3px #00aaff)" }}
								src="icons/ui/cv.svg"
								alt="cv"
							/>
						</Link>
						{contacts.map((_, i) => IconLink(i))}
					</Stack>
					<Stack direction="horizontal" className="mt-5 mb-2 justify-content-between gap-2">
						Or you could take a look at my career:
						<OverlayTrigger overlay={<Tooltip className="glow-text">scroll to career path</Tooltip>}>
							<Button
								variant=""
								className="border-2 border-light hover"
								onClick={useCallback(() => {
									const parent = getScrollableParent();
									if (ref.current) {
										ref.current.scrollIntoView(true);
										if (parent.children[0]) {
											parent.scrollBy(0, -20 - parseInt(parent.children[0].style.paddingTop.replace("px", "")));
										}
									}
								}, [])}
							>
								<img
									style={{ height: "1.5em", filter: "invert(1) drop-shadow(0 0 4px #a1d5ff)" }}
									src="icons/ui/recenter.svg"
								/>
							</Button>
						</OverlayTrigger>
					</Stack>
				</div>
				<div ref={ref}>
					<CareerPath />
				</div>
				<span className="mt-1">More detailed information is available in the "Experience" section</span>
			</Stack>
		</Stack>
	);
}

function getScrollableParent() {
	return document.getElementById("scroll-container")!;
}
