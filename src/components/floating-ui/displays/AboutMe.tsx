import { Image, Row, Stack, Table } from "react-bootstrap";
import { COLOR_PALETTE } from "../../../constants";
import { contacts, languages } from "../../../content/about-me";
import Link from "../components/Link";

function IconLink(i: number) {
	return (
		<Link key={i} url={contacts[i].address} className="p-1 hover" style={{ width: "min-content" }}>
			<Image src={contacts[i].altIcon} style={{ height: "2em", filter: "drop-shadow(0px 0px 3px #00aaff)" }} />
		</Link>
	);
}

export default function AboutMe() {
	return (
		<Stack className="flex-lg-row w-100 p-5" gap={4}>
			<div className="d-flex flex-column mb-5 gap-3" style={{ width: "min-content" }}>
				<Image src="public/images/other/me.png" style={{ width: "100%" }} />
				<Stack direction="vertical">
					<span className="mt-2 mb-1">Spoken languages:</span>
					<Table bsPrefix="-" borderless>
						<tbody>
							{languages.map((l) => (
								<tr
									key={l.id}
									style={{
										boxShadow: `-1px 1px 2px 1px ${COLOR_PALETTE.PRIMARY}`,
										background: "linear-gradient(90deg, rgba(0, 53, 64, 0.8) 0%, rgba(41, 107, 162, 0) 100%)",
									}}
								>
									<td>
										<Image
											src={l.icon}
											className="ps-2"
											style={{
												height: "2em",
												filter: [
													[1, 1],
													[-1, 1],
													[1, -1],
													[-1, -1],
												]
													.map(([x, y]) => `drop-shadow(${x}px ${y}px 0.5px ${COLOR_PALETTE.PRIMARY})`)
													.join(" "),
											}}
										/>
									</td>
									<td className="px-3 py-2">{l.title}</td>
									<td className={`text-center ${l.level.endsWith("*") ? "" : "pe-2"}`}>{l.level}</td>
								</tr>
							))}
						</tbody>
					</Table>
					<span className="mt-1">*not offically tested</span>
				</Stack>
			</div>
			<Row className="justify-content-center gap-2" style={{ height: "min-content" }}>
				<h1>Welcome to my portfolio!</h1>
				<span>
					My name is Alexander Popov and I specialize mostly in web development. However I also develop embedded
					systems, mobile apps and other types of software. I'm in my last year of my ICT bachelor at Fontys.
				</span>
				<Stack direction="horizontal" gap={2}>
					<span className="fs-4">My code</span>
					{[1, 2].map(IconLink)}
				</Stack>
				<Stack direction="horizontal" gap={2}>
					<span className="fs-4">My socials & contact</span>
					{[3, 4, 5, 0].map(IconLink)}
				</Stack>
			</Row>
		</Stack>
	);
}
