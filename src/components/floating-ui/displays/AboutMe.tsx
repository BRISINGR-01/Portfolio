import { Image, Stack } from "react-bootstrap";
import { contacts } from "../../../content/about-me";
import LanguagesList from "../components/LanguagesList";
import Link from "../components/Link";

function IconLink(i: number) {
	return (
		<Link key={i} hoverText={contacts[i].id} url={contacts[i].url}>
			<Image src={contacts[i].altIcon} style={{ height: "2em", filter: "drop-shadow(0px 0px 3px #00aaff)" }} />
		</Link>
	);
}

export default function AboutMe() {
	return (
		<Stack direction="horizontal" gap={4}>
			<div className="d-flex flex-column gap-3" style={{ width: "min-content" }}>
				<Image src="public/images/other/me.png" style={{ width: "100%" }} />
				<Stack direction="horizontal" className="justify-content-center flex-wrap">
					{contacts.map((_, i) => IconLink(i))}
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
				<div>
					You can sonwload my CV if you are interested
					{/* <Link >
					</Link> */}
					<img src="files/CV.png" alt="cv" />
					<iframe
						src="files/cv.pdf"
						style={{
							height: "auto",
							width: "auto",
						}}
					/>
				</div>
			</Stack>
		</Stack>
	);
}
