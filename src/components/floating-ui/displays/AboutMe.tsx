import { Image, Stack } from "react-bootstrap";
import { contacts } from "../../../content/about-me";
import LanguagesList from "../components/LanguagesList";
import Link from "../components/Link";

function IconLink(i: number) {
	return (
		<Link key={i} url={contacts[i].url} className="p-1 hover" style={{ width: "min-content" }}>
			<Image src={contacts[i].altIcon} style={{ height: "2em", filter: "drop-shadow(0px 0px 3px #00aaff)" }} />
		</Link>
	);
}

export default function AboutMe() {
	return (
		<Stack className="flex-lg-row" gap={4}>
			<div className="d-flex flex-column gap-3" style={{ width: "min-content" }}>
				<Image src="public/images/other/me.png" style={{ width: "100%" }} />
				<Stack direction="horizontal" className="justify-content-center flex-wrap">
					{[3, 5, 0, 4].map(IconLink)}
					<div>{[1, 2].map(IconLink)}</div>
				</Stack>

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
					systems, mobile apps and other types of software. I'm in my last year of my ICT bachelor at Fontys.
				</span>
			</Stack>
		</Stack>
	);
}
