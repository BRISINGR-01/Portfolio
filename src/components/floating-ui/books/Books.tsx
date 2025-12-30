import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { TRANSITION } from "../../../constants";
import type { Book } from "../../../types";
import FadeAnim from "../components/FadeAnim";
import BookDetails from "./BookDetails";
import BookList from "./BookList";

export default function Books() {
	const [selected, setSelected] = useState<Book | null>(null);

	// useEffect(() => {
	// if (selected) {
	// 	setCb(() => () => setSelected(null));
	// } else {
	// setCb(null);
	// }
	// }, [setCb, selected]);

	return (
		<FadeAnim key="books" transition={TRANSITION}>
			<AnimatePresence>
				{selected ? (
					<BookDetails book={selected} onClick={() => setSelected(null)} />
				) : (
					<BookList onSelect={(book) => setSelected(book)} />
				)}
			</AnimatePresence>
		</FadeAnim>
	);
}
