import { motion } from "motion/react";
import type { CSSProperties } from "react";

export default function ChangeAnimation(props: {
	id: string;
	children: React.ReactNode;
	style?: CSSProperties;
	className?: string;
	speed?: number;
}) {
	return (
		<motion.div
			key={props.id}
			style={props.style}
			className={props.className}
			initial={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
			animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
			exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
			transition={{ duration: props.speed ?? 0.3 }}
		>
			{props.children}
		</motion.div>
	);
}
