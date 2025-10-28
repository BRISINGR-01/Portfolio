import { motion } from "motion/react";
import { Card, Row } from "react-bootstrap";
import { TRANSITION } from "../../constants";
import { books } from "../../content";
import Book3DEffect from "./Book3DEffect";
import G_Card from "./Card";

export default function Books() {
	// const [selected, setSelected] = useState(null)

	return (
		<motion.div
			key="books"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={TRANSITION}
		>
			<G_Card
				className="justify-content-start"
				style={{
					top: "50%",
					left: "50%",
					transform: "translate(-50%,-50%)",
					maxHeight: "90vh",
					width: "80vw",
					overflow: "auto",
					background: "rgba(51, 91, 132, 0.6)",
					padding: "1rem",
					borderRadius: "1rem",
				}}
			>
				<Row className="g-3 justify-content-center">
					{books.map((book, i) => (
						<Card
							key={i}
							className="book-card-3d rounded-3 col-10 col-sm-5 col-md-3 col-lg-2 p-3"
							style={{
								background: "#335b8499",
								display: "flex",
								flexDirection: "column",
								height: "260px",
							}}
						>
							<Book3DEffect {...book} />
							<Card.Body className="mt-1 d-flex flex-column justify-content-between">
								<Card.Title className="fs-6 text-center mb-1">{book.title}</Card.Title>
							</Card.Body>
						</Card>
					))}
				</Row>
			</G_Card>
		</motion.div>
	);
}
