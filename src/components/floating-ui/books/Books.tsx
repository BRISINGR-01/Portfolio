import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { TRANSITION } from "../../../constants";
import type { Book, fn } from "../../../types";
import FadeAnim from "../components/FadeAnim";
import BookDetails from "./BookDetails";
import BookList from "./BookList";

export default function Books(props: { setGoBackCb: (cb?: fn) => void }) {
	const [selected, setSelected] = useState<Book | null>(null);

	useEffect(() => {
		if (selected) {
			props.setGoBackCb(() => () => setSelected(null));
		} else {
			props.setGoBackCb(() => {});
		}
	}, [props, selected]);

	return (
		<FadeAnim key="books" transition={TRANSITION}>
			<AnimatePresence>
				{selected ? <BookDetails book={selected} /> : <BookList onSelect={(book) => setSelected(book)} />}
			</AnimatePresence>
		</FadeAnim>
	);
}
