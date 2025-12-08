import { motion } from "framer-motion";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BLUE_FILTER } from "../../constants";
import type { Experience, fn } from "../../types";
import { useIcon } from "../../utils";
import HologramDisplay from "./components/HologramDisplay";
import FloatingIFrame from "./FloatingIFrame";
import HoloGallery from "./FloatingImage";
import IconFrame from "./IconFrame";

export default function Template({
	data,
	...props
}: {
	data: Experience;
	imageCaption?: React.JSX.Element;
	close: fn;
}) {
	return (
		<HologramDisplay onClick={props.close}>
			<div className="d-flex p-4 gap-4 flex-column">
				<div className="d-flex gap-4">
					{/* Left column – Company logo + timeline */}
					<div className="d-flex flex-column align-items-center gap-3">
						<IconFrame id={data.id} img={data.altIcon ?? data.icon} />

						{/* Timespan pill */}
						<div
							className="d-flex flex-column align-items-center text-center px-3 py-2 rounded-3"
							style={{
								background: "rgba(255, 255, 255, 0.03)",
								backdropFilter: "blur(1.2px)",
								boxShadow: "0 0 9px 3px #2b8ab994",
							}}
						>
							<span className="fw-bold">{data.timespan[0]}</span>
							<div
								style={{
									height: "2px",
									width: "30px",
									background: "linear-gradient(90deg,#68e4ff,#008cff)",
								}}
							/>
							<span className="fw-bold mt-1">{data.timespan[1]}</span>
						</div>

						{/* Context short line */}
						{/* <small className="opacity-75 text-center">{data.context}</small> */}
					</div>

					{/* Right content block */}
					<div className="flex-grow-1 d-flex flex-column gap-3">
						<h2 className="text-center m-0">{data.title}</h2>

						<p className="m-0 opacity-90">{data.description}</p>

						{data.links && <FloatingIFrame links={data.links!} {...data} />}
						{data.images && <HoloGallery open images={data.images} />}
					</div>
				</div>
				<div>{data.technologies && <TechBarGraph data={data.technologies} />}</div>
			</div>
		</HologramDisplay>
	);
}

function TechBarGraph({
	data,
}: {
	data: {
		name: string;
		percentage: number; // 0..100
		icon?: string | React.ReactNode; // URL or ReactNode
	}[];
}) {
	const icons = useIcon();

	return (
		<div className="d-flex flex-column p-2 gap-2" style={{ width: "min-content", height: "min-content" }}>
			{data.map((t) => {
				const pct = Math.max(0, Math.min(100, Math.round(t.percentage)));
				const icon = icons.find((i) => i.name === t.name);

				// number of strips = proportional to pct
				const totalStrips = 100 / Math.min(...data.map((d) => d.percentage));
				const filled = Math.round((pct / 100) * totalStrips);

				return (
					<div className="d-flex flex-row gap-2 align-items-center" key={t.name}>
						<div
							className="d-flex align-items-center justify-content-center pointer"
							style={{
								width: "2.2em",
								height: "2.2em",
								borderRadius: 10,
								background: "linear-gradient(135deg, rgb(255 255 255 / 28%), rgb(0 0 0 / 14%))",
								boxShadow: "0 4px 12px rgba(0,160,255,0.18)",
							}}
						>
							<OverlayTrigger placement="left" overlay={<Tooltip>{t.name}</Tooltip>}>
								{icon ? (
									<img
										src={icon.url}
										alt={t.name}
										style={{
											width: "60%",
											filter: BLUE_FILTER,
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
		</div>
	);
}

function Strip({ count, value }: { count: number; value: number }) {
	return (
		<div
			className="position-relative d-flex justify-content-start align-items-stretch"
			style={{
				width: 260,
				height: 14,
			}}
		>
			{Array.from({ length: count }).map((_, i) => {
				const active = i < value;

				return (
					<motion.div
						key={i}
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.2, delay: i * 0.03 + 1 }}
						style={{
							// height: `${100 / count}%`, // <— FIX
							height: "100%",
							width: "100%",
							background: active ? "linear-gradient(180deg,#67d8ff,#007df4)" : "rgba(255,255,255,0.08)",
							marginBottom: 2,
							clipPath: "polygon(15% 0, 100% 0, 85% 100%, 0 100%)",
							boxShadow: active ? "0 0 8px rgba(0,200,255,0.4) inset" : "none",
						}}
					/>
				);
			})}
		</div>
	);
}
