import type { fn } from "../../../types";
import FadeAnim from "../components/FadeAnim";

export default function CloseBtn(props: { onClick: fn }) {
	return (
		<FadeAnim
			onClick={props.onClick}
			className="pointer hover d-flex align-items-center"
			style={{
				height: "100%",
			}}
		>
			<svg width="1.5em" height="1.5em" fill="none" viewBox="0 0 55 71" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.49994 63.6942L14.6363 63.6942L22.1116 52.7781L14.9321 42.1942L1.49994 63.6942Z" fill="#00AAFF" />
				<path d="M1.49994 63.6942L14.6363 63.6942L22.1116 52.7781L14.9321 42.1942L1.49994 63.6942Z" fill="#00AAFF" />
				<path d="M53.9999 6.69421L40.8636 6.69423L31.6496 20.1942L38.9903 30.278L53.9999 6.69421Z" fill="#00AAFF" />
				<path d="M53.9999 6.69421L40.8636 6.69423L31.6496 20.1942L38.9903 30.278L53.9999 6.69421Z" fill="#00AAFF" />
				<path d="M14.5 6.69419L-1.01509e-05 6.69419L38.1812 63.7939L52.4999 63.6942L14.5 6.69419Z" fill="#00AAFF" />
				<path d="M14.5 6.69419L-1.01509e-05 6.69419L38.1812 63.7939L52.4999 63.6942L14.5 6.69419Z" fill="#00AAFF" />
			</svg>
		</FadeAnim>
	);
}
