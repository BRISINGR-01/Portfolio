import { motion } from "motion/react";
import { Card, Container, Image, Row } from "react-bootstrap";
import { TRANSITION } from "../../constants";
import { htbBadges } from "../../content";
import G_Card from "./G_Card";

export default function HTBBadges(props: { onClick: () => void }) {
	return (
		<motion.div
			key="badges-list"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={TRANSITION}
		>
			<G_Card
				className="m-4 top-0 justify-content-start"
				onClick={props.onClick}
				style={{
					width: "calc(100% - 3rem)",
					height: "calc(100% - 3rem)",
				}}
			>
				<Row className="w-100 align-items-center">
					<Image
						src={`/icons/ui/click.svg`}
						alt="click"
						style={{ filter: "opacity(0.8) blur(0.3px)", width: "auto", height: "2em" }}
					/>
					Click anywhere to close
				</Row>
				<h2>Hack The Box Academy Badges</h2>
				<Row className="m-2 justify-content-center">
					{htbBadges.map(({ title, description }, i) => (
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
								src={`/images/hack-the-box/${title.replace(/\s/g, "-").toLowerCase()}.webp`}
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
			</G_Card>
		</motion.div>
	);
}
