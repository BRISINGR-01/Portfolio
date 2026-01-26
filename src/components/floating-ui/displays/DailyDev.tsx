import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { dailyDevBadges } from "../../../content/content";
import DailyDevCard from "../../DailyDevCard";
import FadeAnim from "../components/FadeAnim";
import Frame from "../components/Frame";

export default function DailyDev() {
	return (
		<FadeAnim key="badges-list" className="px-4">
			<h2 className="text-center">Daily Dev</h2>
			<b>Daily Dev</b> is a "social-media" styled platform for sharing articles, videos and other sources of information
			in the IT field. What I like so much about it is that I can find new technologies and learn while being motivated
			by a daily streak just as in duolingo.
			<Stack className="justify-content-between mt-3 flex-md-row">
				<Stack direction="horizontal">
					<div style={{ width: "12em" }}>
						<DailyDevCard />
					</div>
					<Col xs={3} className="align-self-start pt-2 ps-2">
						Click on the dev card to check out my profile!
					</Col>
				</Stack>
				<Stack direction="horizontal">
					<Col
						xs={6}
						className="align-self-start p-2"
						style={{
							textAlign: "end",
						}}
					>
						Here is my 2025 recap:
					</Col>
					<Frame alt="recap" size={4} src="images/daily-dev/recap 2025.png" style={{ width: "8em" }} />
				</Stack>
			</Stack>
			<div className="m-5 mb-1">And a list of the badges that I got:</div>
			<Row className="justify-content-center">
				{dailyDevBadges.map(({ title, image }, i) => (
					<Container
						key={i}
						className="m-0 m-sm-2 p-0 d-flex justify-content-center flex-column"
						style={{
							width: "min-content",
							background: "rgba(0,0,0, 0)",
							borderRadius: 40,
						}}
					>
						<Frame alt={title} src={image} size={3} style={{ height: "7em" }} />
						<Card.Body className="p-2">
							<Card.Title className="fs-6 text-center">{title}</Card.Title>
						</Card.Body>
					</Container>
				))}
			</Row>
		</FadeAnim>
	);
}
