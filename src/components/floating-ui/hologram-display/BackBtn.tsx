import { motion } from "framer-motion";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import type { fn } from "../../../types";
import { makeClickSound } from "../../../utils";

export default function BackBtn(props: { onClick: fn }) {
	return (
		<OverlayTrigger placement="bottom" delay={500} overlay={<Tooltip className="glow-text">go back</Tooltip>}>
			<motion.svg
				key="go-back"
				initial={{ opacity: 0, x: 30 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: 30 }}
				transition={{ duration: 0.2, ease: "easeOut" }}
				onClick={() => {
					makeClickSound();
					props.onClick();
				}}
				className="py-2 pointer back-btn"
				style={{
					height: "100%",
					width: "auto",
					transition: ".3s",
				}}
				viewBox="0 0 105 89"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M36.4999 39.9424V51.9424H72.4999V39.9424H36.4999Z" fill="#00AAFF" />
				<path d="M5.49988 39.9424V43.9424L21.9999 51.9424H29.4999V39.9424H5.49988Z" fill="#00AAFF" />
				<path
					d="M79.7419 32.4424L85.1409 40.1925V52.1925L65.4999 73.4422H58.4999L51.4999 81.4422H70.9999L97.1409 52.1925V40.1925L91.7419 32.4424H79.7419Z"
					fill="#00AAFF"
				/>
				<path d="M51.4999 7.3728L57 13.8728H65.4999L73.9999 24.8004H85.9999L70.9999 7.3728H51.4999Z" fill="#00AAFF" />

				<path
					id="back-frame"
					style={{
						transition: "0.3s",
					}}
					pathLength="100"
					d="M74.9999 1H39.4998L65.0001 34H1.00006L1 47.5L23.6863 59H65L39.4999 87.5H74.9999L103.5 52.5V39.5L74.9999 1Z"
					stroke="#00AAFF"
					strokeWidth="7"
					strokeDasharray="100"
					strokeDashoffset="100"
				/>
			</motion.svg>
		</OverlayTrigger>
	);
}
