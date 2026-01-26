import { Card, Container, Image, Row } from "react-bootstrap";
import { htbBadges } from "../../../content/content";
import FadeAnim from "../components/FadeAnim";

export default function HTB() {
	return (
		<FadeAnim key="badges-list" className="p-2">
			<h2 className="text-center">Hack The Box</h2>
			<b>Hack The Box</b> is an educational platform for learning cyber security which taught me about low-level
			protocols, security, network infrastructure, Linux, tools and more. It provides the opportunity and guidance to
			break into machines or gain knowledge in a more academical manner. It is perhaps my favourite platform of the
			kind. Below are the badges of the modules that I have completed:
			<Row className="m-2 justify-content-center">
				{htbBadges.map(({ title, description, image }, i) => (
					<Container
						key={i}
						className="m-0 m-sm-2 p-0 d-flex justify-content-center flex-column"
						style={{
							width: "min-content",
							background: "rgba(0,0,0, 0)",
							borderRadius: 40,
						}}
					>
						<Image
							src={image}
							alt={title}
							style={{
								height: "160px",
								objectFit: "contain",
								width: "min-content",
							}}
						/>
						<Card.Body className="p-2">
							<Card.Title className="fs-6 text-center">
								{title}
								<div className="small" style={{ color: "#7db9bd" }}>
									{description}
								</div>
							</Card.Title>
						</Card.Body>
					</Container>
				))}
			</Row>
		</FadeAnim>
	);
}
