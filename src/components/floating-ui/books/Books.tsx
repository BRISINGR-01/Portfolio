import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { TRANSITION } from "../../../constants";
import type { Book, fn } from "../../../types";
import G_Card from "../components/G_Card";
import BookDetails from "./BookDetails";
import BookList from "./BookList";

export default function Books({ close }: { close: fn }) {
	const [selected, setSelected] = useState<Book | null>(null);

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
					height: selected ? "80vh" : "90vh",
					maxHeight: "90vh",
					width: selected ? "50vw" : "80vw",
					overflow: "auto",
					borderRadius: "1rem",
					transition: "0.15s",
				}}
				onClick={() => {
					if (selected) setSelected(null);
				}}
			>
				<AnimatePresence>
					{selected ? (
						<BookDetails book={selected} onClick={() => setSelected(null)} />
					) : (
						<BookList onSelect={(book) => setSelected(book)} onClick={close} />
					)}
				</AnimatePresence>
			</G_Card>
		</motion.div>
	);
}
