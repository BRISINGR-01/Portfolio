import { motion } from "framer-motion";
import { useState } from "react";
import { OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { COLOR_PALETTE } from "../../../constants";
import type { Experience, fn } from "../../../types";
import { useIcon } from "../../../utils";
import ChangeAnimation from "../components/ChangeAnimation";
import { ProjectContent } from "../components/ProjectDisplay";
import IconFrame from "./IconFrame";

export default function Experiences({ data }: { data: Experience; close: fn }) {
	const [showDescription, setShowDescription] = useState(true);
	return (
		<Stack className="p-5" gap={4}>
			<Stack className="flex-lg-row" gap={4}>
				<Stack direction="horizontal" gap={4}>
					{/* Logo + timespan */}
					<Stack className="align-items-center flex-shrink-0" style={{ width: "10em" }} gap={3}>
						<IconFrame id={data.id} img={data.altIcon ?? data.icon} />

						{data.project.timespan && (
							<ChangeAnimation className="w-100" id={"img-meta-" + data.id}>
								<Timespan span={data.project.timespan} />
							</ChangeAnimation>
						)}
					</Stack>

					{/* Text */}
					<Stack className="desc-context" gap={3}>
						<ChangeAnimation id={"-content-" + data.id}>
							<h2 className="text-center m-0">{data.title}</h2>
							<ChangeAnimation id={showDescription ? "1" : "0"}>
								{showDescription ? data.project.description : data.context}
							</ChangeAnimation>
							<SwitchButtons
								onSelect={(isDescription) => setShowDescription(isDescription)}
								active={showDescription ? "desc" : "ctx"}
							/>
						</ChangeAnimation>
					</Stack>
				</Stack>

				<div>{data.project.technologies && <TechBarGraph id={data.id} data={data.project.technologies} />}</div>
			</Stack>

			<ChangeAnimation className="pb-5 mb-5" id={"content-" + data.id}>
				<ProjectContent content={data.project.content} fadeAnim />
			</ChangeAnimation>
		</Stack>
	);
}

function SwitchButtons(props: { onSelect: (isDescription: boolean) => void; active: "desc" | "ctx" }) {
	const [hovered, setHovered] = useState<"desc" | "ctx" | null>(null);

	return (
		<div className="position-relative d-flex mt-3">
			<svg
				width="963"
				height="204"
				viewBox="0 0 963 204"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				style={{ height: "3em", width: "min-content" }}
			>
				<g
					onMouseEnter={() => setHovered("desc")}
					onMouseLeave={() => setHovered(null)}
					onClick={() => props.onSelect(true)}
					className={props.active === "desc" ? "" : "pointer"}
				>
					<path
						d="M487.334 0H0V150.13L53.5564 203L14.4422 144.145V16.4595H473.494V190.531L59.5741 190.531L14.4422 144.145L53.5564 203L487.334 203.001V0Z"
						fill={COLOR_PALETTE.PRIMARY}
					/>
					<path
						d="M14 16H474V193L60 191.5L14 144.5V16Z"
						style={{ transition: ".3s" }}
						fill={
							hovered === "desc"
								? props.active === "desc"
									? "#1e5b77c2"
									: "#104056c2"
								: props.active === "desc"
									? "#0a6f9d9c"
									: "#2744599c"
						}
					/>
					<path
						pathLength="100"
						style={{
							strokeDasharray: 100,
							strokeDashoffset: hovered === "desc" ? 50 : -50,
							stroke: hovered === "desc" ? "#72d2e8ff" : COLOR_PALETTE.PRIMARY,
							transition: "0.4s",
						}}
						d="M457 80.5L457 33.3901L260 33.3901"
						strokeWidth="7"
					/>
					<path
						pathLength="100"
						style={{
							strokeDasharray: 100,
							strokeDashoffset: hovered === "desc" ? -50 : 50,
							stroke: hovered === "desc" ? "#72d2e8ff" : COLOR_PALETTE.PRIMARY,
							transition: "0.4s",
						}}
						d="M252.5 174.143L67.5 174.143L31.5 138.643"
						strokeWidth="7"
					/>

					<text
						x="25%"
						y="50%"
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize="60"
						fontWeight="600"
						fill={hovered === "desc" || props.active === "desc" ? "#fff" : "#ffffff78"}
					>
						Description
					</text>
				</g>
				<g
					onMouseEnter={() => setHovered("ctx")}
					onMouseLeave={() => setHovered(null)}
					onClick={() => props.onSelect(false)}
					className={props.active === "ctx" ? "" : "pointer"}
				>
					<path
						d="M475.5 203.459H962.834V53.3292L909.278 0.459412L948.392 59.3145V187H489.34V12.9281L903.26 12.9287L948.392 59.3145L909.278 0.459412L475.5 0.458862V203.459Z"
						fill={COLOR_PALETTE.PRIMARY}
					/>
					<path
						d="M949 187H489V10L903 11.5L949 58.5V187Z"
						style={{ transition: ".3s" }}
						fill={
							hovered === "ctx"
								? props.active === "ctx"
									? "#1e5b77c2"
									: "#104056c2"
								: props.active === "ctx"
									? "#0a6e9d9c"
									: "#2744599c"
						}
					/>
					<path
						style={{
							strokeDasharray: 100,
							strokeDashoffset: hovered === "ctx" ? 50 : -50,
							transition: "stroke-dashoffset 0.4s ease-in",
							stroke: hovered === "ctx" ? "#72d2e8ff" : COLOR_PALETTE.PRIMARY,
						}}
						pathLength="100"
						d="M510.261 124.239L510.261 171.349L707.261 171.349"
						strokeWidth="7"
					/>
					<path
						style={{
							strokeDasharray: 100,
							strokeDashoffset: hovered === "ctx" ? -50 : 50,
							transition: "stroke-dashoffset 0.4s ease-in",
							stroke: hovered === "ctx" ? "#72d2e8ff" : COLOR_PALETTE.PRIMARY,
						}}
						pathLength="100"
						d="M710.334 29.3163L895.334 29.3163L931.334 64.8163"
						strokeWidth="7"
					/>

					<text
						x="75%"
						y="50%"
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize="60"
						fontWeight="600"
						fill={hovered === "ctx" || props.active === "ctx" ? "#fff" : "#ffffff78"}
					>
						Context
					</text>
				</g>
			</svg>
		</div>
	);
}

function TechBarGraph({
	data,
	id,
}: {
	data: {
		name: string;
		percentage: number; // 0..100
		icon?: string | React.ReactNode; // URL or ReactNode
	}[];
	id: string;
}) {
	const icons = useIcon();

	return (
		<Stack gap={2} style={{ width: "min-content", height: "min-content" }}>
			{data.map((t) => {
				const pct = Math.max(0, Math.min(100, Math.round(t.percentage)));
				const icon = icons.find((i) => i.name === t.name);

				// number of strips = proportional to pct
				const totalStrips = Math.min(10, Math.max(7, 100 / Math.min(...data.map((d) => d.percentage))));
				const max = Math.max(...data.map((d) => d.percentage));
				const filled = Math.max(1, Math.round((pct / max) * totalStrips));

				return (
					<div className="position-relative d-flex flex-row gap-2 align-items-center" key={t.name + id}>
						<svg
							className="h-100 w-auto position-absolute left-0 z-0"
							width="331"
							height="355"
							viewBox="0 0 331 357"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M36.5 44H265.5L291 68L293.5 297L76 295.5L36.5 242V44Z" fill="#031628" fill-opacity="0.423529" />
							<path
								d="M317 89.5L251.5 18H14L36.5 44.5H250L289.5 89.5L291 295.5H80L38 250.5L36.5 44.5L14 18L14.5 250.5L78.5 321H317V89.5Z"
								fill="#00AAFF"
							/>
							<path d="M44 239.5H-1.52588e-05L85.5 334.5V289.5L44 239.5Z" fill="#A4E1FF" />
							<path d="M246.5 0H198L331 145V93L246.5 0Z" fill="#A4E1FF" />
							<path d="M284.306 328L268.5 357H301.694L317.5 328H284.306Z" fill="#A4E1FF" />
							<path d="M239.306 328L223.5 357H256.694L272.5 328H239.306Z" fill="#A4E1FF" />
							<path d="M190.306 328L174.5 357H207.694L223.5 328H190.306Z" fill="#A4E1FF" />
						</svg>

						<div
							className="d-flex align-items-center justify-content-center pointer z-1"
							style={{
								width: "2.2em",
								height: "2.2em",
							}}
						>
							<OverlayTrigger placement="left" overlay={<Tooltip>{t.name}</Tooltip>}>
								{icon ? (
									<img
										src={icon.url}
										alt={t.name}
										style={{
											width: "60%",
											height: "60%",
											objectFit: "contain",
										}}
									/>
								) : (
									<span style={{ fontSize: 10, color: "#9fe6ff" }}>{t.name.slice(0, 2).toUpperCase()}</span>
								)}
							</OverlayTrigger>
						</div>
						<Strip count={totalStrips} value={filled} />
					</div>
				);
			})}
		</Stack>
	);
}

function Strip({ count, value }: { count: number; value: number }) {
	return (
		<div
			className="position-relative d-flex justify-content-start align-items-stretch"
			style={{
				width: 200,
				height: 14,
			}}
		>
			{Array.from({ length: count }).map((_, i) => {
				const active = i < value;

				return (
					<motion.div
						key={i}
						initial={{ opacity: 0, x: -10 }}
						animate={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							duration: 0.2,
							delay: i * 0.03,
						}}
						style={{
							height: "100%",
							width: "100%",
						}}
					>
						<motion.div
							key={i}
							initial={{ x: -10 }}
							animate={{
								x: [0, -2, 0],

								filter: ["blur(0px)", "blur(6px)", "blur(0px)"],
							}}
							transition={{
								duration: 0.5,
								delay: i * 0.03 + 1,
								times: [0, 0.5 * Math.min(i, 4), 2],
								repeat: Infinity,
								repeatDelay: 3,
							}}
							style={{
								height: "100%",
								width: "100%",
								background: active ? "linear-gradient(180deg,#67d8ff,#007df4)" : "rgba(255,255,255,0.08)",
								marginBottom: 2,
								clipPath: "polygon(15% 0, 100% 0, 85% 100%, 0 100%)",
								boxShadow: active ? "0 0 8px rgba(0,200,255,0.4) inset" : "none",
								position: "relative",
								overflow: "hidden",
							}}
						/>
					</motion.div>
				);
			})}
		</div>
	);
}

function Timespan(props: { span: string[] }) {
	return (
		<svg
			className="h-auto w-100"
			width="117"
			height="64"
			viewBox="0 0 117 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M6 6.00013L76 6.00007L84.7153 8.11281e-06L90.4307 -8.11281e-06L95.7153 4.0001L85.7153 4.00001L77 10.1174L10 10.1174V54.5002L15 60.0002H32.9856L42 64.0002H13.0971L6 56.0002V6.00013Z"
				fill="#00AAFF"
			/>
			<path
				d="M117 63.9999H47L33.5 57.9999H16.5L12.5 53.9999H33L47 59.9999H112V10.1173H80.5L86 5.99995H117V63.9999Z"
				fill="#00AAFF"
			/>
			<path d="M111.5 0H106.5L112 4H117L111.5 0Z" fill="#00AAFF" />
			<path d="M104.5 0H99.5L105 4H110L104.5 0Z" fill="#00AAFF" />
			<path d="M19 0H3L0 3.00003V14L3 21V5.00003L5 3.00003H26L19 0Z" fill="#00AAFF" />
			<path d="M95 58H107L110 55V43L107 49V53L105 55H102L95 58Z" fill="#00AAFF" />
			<path d="M107 43V47L110 41V37L107 43Z" fill="#00AAFF" />
			<path d="M100 55H87V56H91H92V57H91V58H93L100 55Z" fill="#00AAFF" />
			<path d="M77 58H90V57H86H85V56H86V55H84L77 58Z" fill="#00AAFF" />
			<path d="M107 37V41L110 35V31L107 37Z" fill="#00AAFF" />
			<path d="M107 31V35L110 29V25L107 31Z" fill="#00AAFF" />
			<path d="M49.9387 32L71.9999 31.9697L74.9999 30.4849L71.9999 29L49.9387 29.0303L46.9999 30.4849L49.9387 32Z" />
			<path d="M97.5 0H92.5L98 4H103L97.5 0Z" fill="#00AAFF" />
			<text x="50%" y="35%" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="600" fill="white">
				{props.span[0]}
			</text>
			<text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="600" fill="white">
				{props.span[1]}
			</text>
		</svg>
	);
}
