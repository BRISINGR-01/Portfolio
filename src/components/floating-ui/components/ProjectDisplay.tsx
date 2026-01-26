import { motion } from "framer-motion";
import { Stack } from "react-bootstrap";
import { TRANSITION } from "../../../constants";
import type { ProjectContent } from "../../../types";
import FadeAnim from "./FadeAnim";
import Frame from "./Frame";

export function ProjectContent({ content, fadeAnim }: { content?: ProjectContent; fadeAnim?: boolean }) {
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
							<Frame size={4} src={img} style={{ height: "10em", width: "min-content" }} />
						</motion.div>
					))}
			</Stack>
		</FadeAnim>
	);
}
