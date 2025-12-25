import { motion } from "framer-motion";
import React from "react";
import { Image, Stack } from "react-bootstrap";
import type { fn } from "../../../../types";
import CloseBtn from "./CloseBtn";

export default function ContentContainer(props: {
	box: DOMRect;
	children: React.ReactNode;
	close: fn;
	onSelect?: (i: number) => void;
	nrOfPages?: number;
	currentPage?: number;
}) {
	return (
		<motion.div
			style={{
				zIndex: 1,
				top: props.box.top + 1,
				left: props.box.left + 1,
				width: props.box.width - 2,
			}}
			animate={{
				transform: "translateY(0%)",
				opacity: 1,
				height: props.box.height - 2,
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
			className="glow-text position-absolute clip pe-5 glass-morpihic hologram-bg"
		>
			<CloseBtn onClick={props.close} />

			<div className="overflow-auto w-100 p-5 pe-0 h-100 w-100 position-relative z-2">
				<Stack className="justify-content-between h-100">
					<div>{props.children}</div>
					<Stack direction="horizontal" className="ps-4" style={{ paddingBottom: "4em" }}>
						<Image
							src={`/icons/ui/click.svg`}
							alt="click"
							style={{ filter: "opacity(0.8) blur(0.3px)", width: "auto", height: "2em" }}
						/>
						Click anywhere to close
					</Stack>
				</Stack>
			</div>
		</motion.div>
	);
}
