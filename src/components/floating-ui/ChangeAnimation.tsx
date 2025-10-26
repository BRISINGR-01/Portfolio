import { motion } from "motion/react";

export default function ChangeAnimation(props: { id: string; children: React.JSX.Element | React.JSX.Element[] }) {
	return (
		<motion.span
			key={props.id}
			initial={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
			animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
			exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
		>
			{props.children}
		</motion.span>
	);
}
