import { Col, Container, Image, Row } from "react-bootstrap";
import type { Book } from "../../../types";
import ClickToClose from "../components/ClickToClose";

export default function BookDetails(props: { book: Book; onClick: fn }) {
	return (
		<Container fluid className="p-0 h-100 d-flex flex-column justify-content-between">
			<Row className="p-1">
				<Col xs={12} md={4}>
					<Image
						src={`/images/book-covers/${props.book.cover}`}
						alt={props.book.title}
						fluid
						style={{
							boxShadow: "0px 0 10px 0px rgb(0 170 255 / 70%)",
							borderRadius: "15px",
							objectFit: "contain",
						}}
					/>
				</Col>

				<Col xs={12} md={8} className="pe-0 pt-1">
					<h4 className="fw-semibold mb-0">{props.book.title}</h4>
					<h6 className="mb-0" style={{ color: "#7db9bd" }}>
						{props.book.subTitle}
						<br />
						<span className="small" style={{ color: "#7db9bd" }}>
							by {props.book.author}
						</span>
					</h6>

					<p className="mt-4">"{props.book.description}"</p>
				</Col>
			</Row>
			<ClickToClose />
		</Container>
	);
}
