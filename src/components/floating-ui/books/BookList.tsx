import { Suspense } from "react";
import { Row, Stack } from "react-bootstrap";
import { books } from "../../../content/content";
import type { Book } from "../../../types";
import Loader from "../../3d/other-components/Loader";
import FadeAnim from "../components/FadeAnim";
import Book3DEffect from "./Book3DEffect";

export default function BookList(props: { onSelect: (book: Book) => void }) {
	return (
		<FadeAnim key="book-list">
			<h4 className="text-center mt-2">Technical books that I have read</h4>
			<Row className="justify-content-center">
				{books.map((book, i) => (
					<div
						key={i}
						className="book-card-3d rounded-3 pointer col-10 col-sm-5 col-md-4 col-lg-3 m-2 py-3"
						onClick={(e) => {
							e.stopPropagation();
							props.onSelect(book);
						}}
					>
						<Suspense fallback={<Loader />}>
							<Book3DEffect {...book} />
						</Suspense>
						<Stack className="mt-1 justify-content-between">
							<div className="fs-6 text-center mt-3">{book.title}</div>
						</Stack>
					</div>
				))}
			</Row>
		</FadeAnim>
	);
}
