import { motion } from "framer-motion";
import type { fn } from "../../../types";

export default function BackBtn(props: { onClick: fn }) {
	return (
		<motion.img
			key="go-back"
			initial={{ opacity: 0, x: 30 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 30 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			src="icons/ui/go-back.svg"
			alt="go-back"
			onClick={props.onClick}
			className="p-2 rounded-4 z-3 pointer back-btn"
			style={{
				height: "100%",
				cursor: "pointer",
				border: "3px solid rgba(52, 144, 230, 0.8)",
				transition: ".3s",
				background: "linear-gradient(135deg, rgba(0,170,255,.35), rgba(0,255,255,.15))",
			}}
		/>
	);
}
