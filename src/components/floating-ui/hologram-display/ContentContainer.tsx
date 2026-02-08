import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Stack } from "react-bootstrap";
import type { fn } from "../../../types";
import BackBtn from "./BackBtn";
import CloseBtn from "./CloseBtn";

export default function ContentContainer({
	box,
	...props
}: {
	box: {
		x: DOMRect;
		frame: DOMRect;
		contentFrame: DOMRect;
	};
	children: React.ReactNode;
	close: fn;
	goBackCb?: fn;
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
			}}
			initial={{ opacity: 0, height: 0, transform: "translateY(50%)" }}
			exit={{
				opacity: 0,
				height: 0,
				transform: "translateY(50%)",
				transition: { ease: "linear" },
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
				gap={1}
			>
				<AnimatePresence>{props.goBackCb && <BackBtn onClick={props.goBackCb} />}</AnimatePresence>
				<CloseBtn onClick={props.close} />
			</Stack>

			<div id="scroll-container" className="overflow-auto w-100 h-100 w-100 position-relative z-2">
				<div
					style={{
						paddingLeft: box.contentFrame.left - box.frame.left,
						paddingTop: box.contentFrame.top - box.frame.top, // In about-me section this is checked using the id and the paddingTop, make this is the first child of "scroll-container"
						paddingBottom: box.frame.bottom - box.contentFrame.bottom,
					}}
				>
					<div className="p-2">{props.children}</div>
				</div>
			</div>
		</motion.div>
	);
}
