import { motion } from "framer-motion";
import { BLUE_FILTER } from "../../constants";
import ChangeAnimation from "./components/ChangeAnimation";
import FadeAnim from "./components/FadeAnim";

type Props = { img: string };

export default function IconFrame(props: Props & { id: string }) {
	let frame: string | null = null;

	switch (props.id) {
		case "asml":
			frame = "long";
			break;
		case "sdg-solarwatt":
		case "sdg-sabic":
			frame = "circle";
			break;
		default:
			frame = "square";
			break;
	}

	return (
		<div
			className="position-relative"
			style={{
				width: props.id === "asml" ? "12em" : "100%",
			}}
		>
			<motion.div
				className="w-100 h-100 position-absolute top-0 left-0 z-2"
				initial={{ opacity: 0 }}
				animate={{ transition: { delay: 0.8 }, opacity: 1 }}
				transition={{ duration: 0.4 }}
			>
				<ChangeAnimation id={props.id + "logo"} className="w-100 h-100">
					<img
						src={props.img}
						alt="logo"
						className="centered"
						style={{
							width: "60%",
							maxHeight: "60%",
							zIndex: 2,
							filter: BLUE_FILTER,
						}}
					/>
				</ChangeAnimation>
			</motion.div>
			<motion.div
				initial={{ scale: 0.7 }}
				animate={{ transition: { delay: 0.8 }, scale: 1 }}
				transition={{ duration: 0.4 }}
				style={{
					zIndex: 1,
					position: "relative",
					width: "100%",
				}}
			>
				<ChangeAnimation id={props.id + "frame"} className="w-100 h-100">
					<img src={`/images/ui/${frame}-frame.png`} alt="frame" width="100%" />
				</ChangeAnimation>
			</motion.div>
			<FadeAnim
				transition={{ delay: 0.7, duration: 0.4 }}
				noExit
				className="centered"
				style={{
					height: "71%",
					width: "71%",
					zIndex: 1,
				}}
			>
				<ChangeAnimation id={props.id + "shadow"} className="w-100 h-100">
					<div
						className="w-100 h-100"
						style={{
							background: "var(--dark)",
							borderRadius: frame !== "circle" ? 0 : "100%",
							display: frame === "long" ? "none" : undefined,
						}}
					/>
				</ChangeAnimation>
			</FadeAnim>
		</div>
	);
}
