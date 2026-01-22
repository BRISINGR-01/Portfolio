import { Image, Row, Stack, Table } from "react-bootstrap";
import { COLOR_PALETTE } from "../../../constants";
import { contacts, languages } from "../../../content/about-me";
import Link from "../components/Link";

export default function AboutMe() {
	console.log(`1px solid ${COLOR_PALETTE.PRIMARY}`);
	return (
		<Stack className="flex-lg-row w-100" gap={4}>
			<div className="d-flex flex-column my-5 gap-3" style={{ width: "min-content" }}>
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
				<Stack direction="horizontal" gap={2}>
					<span className="fs-4">My code</span>
					<Link url={contacts[1].address} className="p-1" style={{ width: "min-content" }}>
						<Image src={contacts[1].icon} style={{ height: "2em" }} />
					</Link>
					<Link url={contacts[2].address} className="p-1" style={{ width: "min-content" }}>
						<Image src={contacts[2].icon} style={{ height: "2em" }} />
					</Link>
				</Stack>
				<Stack direction="horizontal" gap={2}>
					<span className="fs-4">My socials & contact</span>
					<Link url={contacts[3].address} className="p-1" style={{ width: "min-content" }}>
						<Image src={contacts[3].icon} style={{ height: "2em" }} />
					</Link>
					<Link url={contacts[4].address} className="p-1" style={{ width: "min-content" }}>
						<Image src={contacts[4].icon} style={{ height: "2em" }} />
					</Link>
					<Link url={contacts[5].address} className="p-1" style={{ width: "min-content" }}>
						<Image src={contacts[5].icon} style={{ height: "2em" }} />
					</Link>
					<Link url={contacts[0].address} className="p-1" style={{ width: "min-content" }}>
						<Image src={contacts[0].icon} style={{ height: "2em" }} />
					</Link>
				</Stack>
			</Row>
		</Stack>
	);
}
