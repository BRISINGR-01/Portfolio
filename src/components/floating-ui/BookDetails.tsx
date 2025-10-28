import { motion } from "motion/react";

import { Col, Image, Row } from "react-bootstrap";
import { TRANSITION } from "../../constants";
import type { Book } from "../../types";

export default function BookDetails(props: { book: Book; onClick: () => void }) {
	return (
		<motion.div
			key="book-details"
			className="m-3"
			initial={{ opacity: 0, filter: "blur(3px)" }}
			animate={{ opacity: 1, filter: "blur(0px)" }}
			exit={{ opacity: 0 }}
			transition={TRANSITION}
		>
			<Row className="w-100 h-100">
				<Col xs={12} md={4}>
					<Image
						src={`/images/book-covers/${props.book.cover}`}
						alt={props.book.title}
						rounded
						fluid
						style={{
							boxShadow: "0 0 5px rgba(255, 255, 255, .7), 0 0 30px rgba(79, 164, 250, 1)",
							maxHeight: "260px",
							objectFit: "cover",
						}}
					/>
				</Col>

				<Col xs={12} md={8}>
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
		</motion.div>
	);
}
