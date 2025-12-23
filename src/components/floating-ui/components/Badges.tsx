import { Card, Container, Image, Row } from "react-bootstrap";
import type { fn } from "../../../types";
import FadeAnim from "./FadeAnim";

export default function Badges(props: {
	title: string;
	badges: { image: string; title: string; description?: string }[];
	onClick: fn;
}) {
	return (
		<FadeAnim key="badges-list" onClick={props.onClick}>
			<h2 className="mt-2 text-center">{props.title}</h2>
			<Row className="m-2 justify-content-center">
				{props.badges.map(({ title, description, image }, i) => (
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
