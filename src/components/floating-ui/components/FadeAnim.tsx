import { motion, type HTMLMotionProps } from "framer-motion";
import type React from "react";
import { TRANSITION } from "../../../constants";

export default function FadeAnim(props: React.PropsWithChildren & HTMLMotionProps<"div"> & { noExit?: boolean }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={props.noExit ? undefined : { opacity: 0 }}
			transition={TRANSITION}
			{...props}
		>
			{props.children}
		</motion.div>
	);
}
