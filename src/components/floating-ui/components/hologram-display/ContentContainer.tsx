import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Stack } from "react-bootstrap";
import type { fn } from "../../../../types";
import BackBtn from "../BackBtn";
import CloseBtn from "./CloseBtn";

export default function ContentContainer({
	box,
	...props
}: {
	box: {
		x: DOMRect;
		frame: DOMRect;
	};
	children: React.ReactNode;
	close: fn;
	goBackCb: fn | null;
	onSelect?: (i: number) => void;
	nrOfPages?: number;
	currentPage?: number;
}) {
	return (
		<motion.div
			style={{
				zIndex: 1,
				top: box.frame.top + 1,
				left: box.frame.left + 1,
				width: box.frame.width - 2,
				paddingRight: "5vw",
			}}
			animate={{
				transform: "translateY(0%)",
				opacity: 1,
				height: box.frame.height - 2,
				// transition: { duration: 0.5, delay: 0.5 },
			}}
			initial={{ opacity: 0, height: 0, transform: "translateY(50%)" }}
			exit={{
				opacity: 0,
				height: 0,
				transform: "translateY(50%)",
				transition: {
					ease: "linear",
				},
			}}
			className="glow-text position-absolute clip glass-morpihic hologram-bg"
		>
			<Stack
				direction="horizontal"
				style={{
					position: "absolute",
					zIndex: 10,
					top: box.x.top - box.frame.top,
					left: box.x.left - box.frame.left,
					transform: "translateX(-50%)",
					height: "2.5em",
				}}
				gap={2}
			>
				<AnimatePresence>{props.goBackCb && <BackBtn onClick={props.goBackCb} />}</AnimatePresence>
				<CloseBtn onClick={props.close} />
			</Stack>

			<div className="overflow-auto w-100 p-5 pe-0 h-100 w-100 position-relative z-2">
				<div className="w-100 h-100 p-0">{props.children}</div>
			</div>
		</motion.div>
	);
}
