import flags from "../../../../public/dependencies/flags.tsx";
import { languages } from "../../../content/about-me";

export default function LanguagesList() {
	return (
		<svg width="100%" viewBox={`0 0 484 ${98 * languages.length + 2}`} fill="none" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="gradient" x1="3.5" y1="67.5805" x2="480" y2="67.5805" gradientUnits="userSpaceOnUse">
					<stop offset="0" stopColor="#0F4059" stopOpacity="0.9" />
					<stop offset="0.5" stopColor="#1086c0ff" stopOpacity="0.9" />
					<stop offset="1" stopColor="#089CE6" stopOpacity="0.5" />
				</linearGradient>
			</defs>
			{languages.map((lang, i) => (
				<g key={i} transform={`translate(0, ${i * 98})`}>
					<path
						transform={`translate(0 ${i === 0 ? 0 : -30})`}
						d={i === 0 ? boxes.top : i === languages.length - 1 ? boxes.bottom : boxes.middle}
						fill="url(#gradient)"
						stroke="#00AAFF"
						strokeWidth="7"
					/>
					<text fontSize="33" x="130" y="60" fill="white">
						{lang.title}
					</text>
					<text fontSize="28" x="372" y="60" fill="white">
						{lang.level}
					</text>
					<path d="M352.5 29.2568L355.5 25.5L358.5 29.2568V69L355.5 72L352.5 69V29.2568Z" fill="#00AAFF" />
					<FlagCutMask lang={lang.id} i={i} />
					<path d="M39 74H98.5V25.905H23.5V58.7067L39 74Z" stroke="#00AAFF" strokeWidth="7" />
					<g mask={`url(#flag-cut-${lang.id})`}>
						<g transform="translate(24 25)">{flags[lang.id]}</g>
					</g>
				</g>
			))}
		</svg>
	);
}

function FlagCutMask(props: { lang: string; i: number }) {
	return (
		<mask
			id={`flag-cut-${props.lang}`}
			style={{ maskType: "luminance" }}
			maskUnits="userSpaceOnUse"
			x="24"
			y={25}
			width="75"
			height="49"
		>
			<path d="M24.5 26L99 25.5V74H39.5L24.5 59.075V26Z" fill="white" />
		</mask>
	);
}

const boxes = {
	top: "M28 97.5H452L480 126V31.5L451.5 3.5H3.5V73.5L28 97.5Z",
	middle: "M28 126.831L450.5 129.331L480 159.831V62.3305L452 32.8305H28.5L3.5 8.33051V102.831L28 126.831Z",
	bottom: "M3.5 8.33051V100.831L28.5 126.831H480V63.3305L449.5 32.8305H28.5L3.5 8.33051Z",
};
