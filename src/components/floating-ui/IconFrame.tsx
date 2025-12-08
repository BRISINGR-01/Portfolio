import { motion } from "framer-motion";
import { type CSSProperties } from "react";
import { BLUE_FILTER } from "../../constants";

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
		<div className="position-relative w-100">
			<motion.img
				initial={{ opacity: 0 }}
				animate={{ transition: { delay: 0.5 }, opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.4 }}
				style={{
					...middleStyle,
					width: "60%",
					maxHeight: "60%",
					zIndex: 2,
					filter: BLUE_FILTER,
				}}
				src={props.img}
				alt=""
			/>
			<motion.img
				initial={{ scale: 0.7 }}
				animate={{ transition: { delay: 0.5 }, scale: 1 }}
				exit={{ scale: 0 }}
				transition={{ duration: 0.4 }}
				src={`/images/ui/${frame}-frame.png`}
				alt=""
				style={{
					zIndex: 1,
					position: "relative",
					width: "100%",
				}}
			/>
			{frame === "square" && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ delay: 0.7, duration: 0.4 }}
					style={{
						...middleStyle,
						boxShadow: "rgba(255, 255, 255, 0.3) 0px 0px 40px 13px inset",
						height: "71%",
						width: "71%",
						zIndex: 1,
					}}
				/>
			)}
			{frame === "circle" && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ delay: 0.7, duration: 0.4 }}
						style={{
							...middleStyle,
							borderRadius: "100%",
							boxShadow: "rgba(255, 255, 255, 0.3) 0px 0px 40px 13px inset",
							height: "52%",
							width: "52%",
							zIndex: 1,
						}}
					/>
					<div
						style={{
							boxShadow: "#11202ccf 0px 0px 20px 20px",
							...middleStyle,
							zIndex: 0,
						}}
					/>
				</>
			)}
		</div>
	);
}

const middleStyle: CSSProperties = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%,-50%)",
};
