import { OverlayTrigger, Tooltip } from "react-bootstrap";
import type { fn } from "../../../types";
import { makeClickSound } from "../../../utils";
import FadeAnim from "../components/FadeAnim";

export default function CloseBtn(props: { onClick: fn }) {
	return (
		<FadeAnim
			onClick={() => {
				makeClickSound();
				props.onClick();
			}}
			className="pointer d-flex align-items-center go-back-arrow"
			style={{ height: "100%", filter: "drop-shadow(0 0 2px #000)" }}
		>
			<OverlayTrigger placement="bottom" delay={500} overlay={<Tooltip className="glow-text">close</Tooltip>}>
				<svg width="1.5em" height="1.5em" viewBox="0 0 36 33" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M6.34949 29.6045H12.4551L15.9296 24.5308L12.5926 19.6116L6.34949 29.6045Z" fill="#00AAFF" />
					<path d="M12.3917 3.11157H5.65234L23.3985 29.6509L30.0536 29.6045L12.3917 3.11157Z" fill="#00AAFF" />
					<path d="M6.34949 29.6045H12.4551L15.9296 24.5308L12.5926 19.6116L6.34949 29.6045Z" fill="#00AAFF" />
					<path d="M30.5142 3.00024H24.4085L20.9341 8.00024L24.4341 12.5002L30.5142 3.00024Z" fill="#00AAFF" />
					<path d="M12.3917 3.11157H5.65234L23.3985 29.6509L30.0536 29.6045L12.3917 3.11157Z" fill="#00AAFF" />
					<path
						id="back-frame"
						d="M13.9342 32.0001L17.9342 25.5001L21.9342 32.0001L34.4343 32.0002L24.4342 15.7381L34.4343 0.500101H23.4343L18.7491 7.0001L13.9342 0.500101L0.934204 0.5L11.9342 17.0001L1.9342 32.0001H13.9342Z"
						stroke="#00AAFF"
						style={{ transition: "0.4s" }}
						strokeWidth="2"
						pathLength="100"
						strokeDasharray="100"
						strokeDashoffset="100"
					/>
				</svg>
			</OverlayTrigger>
		</FadeAnim>
	);
}
