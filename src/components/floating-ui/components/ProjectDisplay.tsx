import { motion } from "framer-motion";
import { useState } from "react";
import { Modal, Stack } from "react-bootstrap";
import { TRANSITION } from "../../../constants";
import type { ProjectContent } from "../../../types";
import FadeAnim from "./FadeAnim";
import Frame from "./Frame";

function isVideo(src: string) {
	return src.endsWith(".mp4");
}

export function ProjectContent({ content, fadeAnim }: { content?: ProjectContent; fadeAnim?: boolean }) {
	const [showBigSrc, setShowBig] = useState<string | null>(null);

	return (
		<FadeAnim>
			<Stack gap={5}>
				{content &&
					content.map(({ img, description }, i) => (
						<motion.div
							initial={{ y: fadeAnim ? 0 : "-100%" }}
							animate={{ y: 0, transition: { ...TRANSITION, delay: i * 0.1 } }}
							exit={{ y: fadeAnim ? 0 : "-100%" }}
							key={i}
							className={`d-flex flex-row${
								i % 2 === 1 ? "-reverse justify-content-end" : " justify-content-between"
							} gap-3`}
						>
							<span className="mt-3">{description}</span>
							<div onClick={() => setShowBig(img)} className="hover pointer">
								<Frame size={4}>
									{isVideo(img) ? (
										<video src={img} controls className="show-image-small" />
									) : (
										<img src={img} alt="title" className="show-image-small" />
									)}
								</Frame>
							</div>
						</motion.div>
					))}
			</Stack>
			<Modal
				show={!!showBigSrc}
				dialogClassName="show-image-backdrop"
				onHide={() => setShowBig(null)}
				onClick={() => setShowBig(null)}
			>
				<Modal.Body className="p-0">
					{showBigSrc && (
						<Frame size={8}>
							{isVideo(showBigSrc) ? (
								<video src={showBigSrc} controls className="show-image-small show-image-extended" />
							) : (
								<img src={showBigSrc} className="show-image-small show-image-extended" alt="title" />
							)}
						</Frame>
					)}
				</Modal.Body>
			</Modal>
		</FadeAnim>
	);
}
