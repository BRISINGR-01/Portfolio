import { motion } from "framer-motion";
import { Stack } from "react-bootstrap";
import { TRANSITION } from "../../../constants";
import type { ProjectContent } from "../../../types";
import FadeAnim from "../components/FadeAnim";
import Frame from "../components/Frame";

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
								i % 2 === 1 ? "-reverse justify-content-end" : " justify-content-end"
							} gap-3`}
						>
							<span className="mt-3">{description}</span>
							<Frame alt={img} size={4} src={img} style={{ height: "10em", width: "min-content" }} />
						</motion.div>
					))}
			</Stack>
		</FadeAnim>
	);
}
