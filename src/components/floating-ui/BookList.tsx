import { motion } from "motion/react";
import { Card, Row } from "react-bootstrap";
import { TRANSITION } from "../../constants";
import { books } from "../../content";
import type { Book } from "../../types";
import Book3DEffect from "./Book3DEffect";

export default function BookList(props: { onSelect: (book: Book) => void }) {
	return (
		<motion.div
			key="book-list"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={TRANSITION}
		>
			<Row className="g-3 justify-content-center">
				{books.map((book, i) => (
					<Card
						key={i}
						className="book-card-3d rounded-3 col-10 col-sm-5 col-md-3 col-lg-2"
						style={{
							background: "#335b8499",
							display: "flex",
							flexDirection: "column",
							height: "260px",
						}}
						onClick={() => props.onSelect(book)}
					>
						<Book3DEffect {...book} />
						<Card.Body className="mt-1 d-flex flex-column justify-content-between">
							<Card.Title className="fs-6 text-center mb-1">{book.title}</Card.Title>
						</Card.Body>
					</Card>
				))}
			</Row>
		</motion.div>
	);
}
