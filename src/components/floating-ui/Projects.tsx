import { motion } from "framer-motion";
import { useState } from "react";
import { Modal, Nav, OverlayTrigger, Stack, Tab, Tooltip } from "react-bootstrap";
import { BLUE_FILTER } from "../../constants";
import type { Experience, fn } from "../../types";
import { useIcon } from "../../utils";
import IconFrame from "./IconFrame";
import ChangeAnimation from "./components/ChangeAnimation";
import Frame from "./components/Frame";

export default function Projects({ data }: { data: Experience; close: fn }) {
	return (
		<Stack className="p-4" gap={4}>
			<Stack className="flex-lg-row" gap={4}>
				<Stack direction="horizontal" gap={4}>
					{/* Logo + timespan */}
					<Stack className="align-items-center" gap={3}>
						<IconFrame id={data.id} img={data.altIcon ?? data.icon} />

						<ChangeAnimation id={"img-meta-" + data.id}>
							<Stack
								className="align-items-center text-center px-3 py-2 rounded-3"
								style={{
									background: "#00000030",
									backdropFilter: "blur(1.2px)",
									boxShadow: "#0dcaf08c 0px 0px 4px 2px",
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
							</Stack>
						</ChangeAnimation>
					</Stack>

					{/* Text */}
					<Stack className="flex-grow-1 desc-context" gap={3}>
						<ChangeAnimation id={"content-" + data.id}>
							<h2 className="text-center m-0">{data.title}</h2>

							<Tab.Container defaultActiveKey="description">
								<Stack>
									<Tab.Content>
										<Tab.Pane eventKey="description">{data.description}</Tab.Pane>
										<Tab.Pane eventKey="context">{data.context}</Tab.Pane>
									</Tab.Content>
									<Nav variant="pills" className="mt-4">
										<Nav.Item>
											<Nav.Link eventKey="description" className="text-light fs-6">
												Description
											</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="context" className="text-light fs-6">
												Context
											</Nav.Link>
										</Nav.Item>
									</Nav>
								</Stack>
							</Tab.Container>
						</ChangeAnimation>
						<Links data={data} />
					</Stack>
				</Stack>

				<div>{data.technologies && <TechBarGraph id={data.id} data={data.technologies} />}</div>
			</Stack>

			<Images data={data} />
		</Stack>
	);
}

function Links({ data }: { data: Experience }) {
	return (
		data.links && (
			<div className="d-flex flex-wrap gap-3 mt-3">
				{data.links.map(({ src, img, title }, i) => (
					<OverlayTrigger key={i} placement="bottom" overlay={<Tooltip>{title}</Tooltip>}>
						<a
							key={src}
							href={src}
							target="_blank"
							rel="noreferrer"
							className="hover px-3 py-2 rounded-3 d-flex align-items-center gap-2 text-decoration-none"
							style={{
								background: "linear-gradient(135deg, rgba(0,162,255,0.6), rgba(8, 9, 9, 0.6))",
								boxShadow: "0 0 12px rgba(0,180,255,0.18) inset",
								border: "1px solid rgba(0,200,255,0.18)",
								color: "#9fe6ff",
								fontSize: "0.9rem",
								transition: "transform .15s ease, box-shadow .15s ease",
							}}
							onClick={(e) => e.stopPropagation()}
						>
							{img ? (
								<img
									src={img}
									style={{
										height: "1.6em",
										filter: "drop-shadow(0 0 10px rgba(233, 238, 240, 0.58))",
									}}
								/>
							) : (
								title
							)}
						</a>
					</OverlayTrigger>
				))}
			</div>
		)
	);
}

function Images({ data }: { data: Experience }) {
	const [showBigSrc, setShowBig] = useState<string | null>(null);

	return (
		<>
			<Stack gap={5}>
				{data.images &&
					data.images.map(({ src, title, description }, i) => (
						<div
							key={i}
							className={`d-flex flex-row${
								i % 2 === 1 ? "-reverse justify-content-end" : " justify-content-between"
							} gap-3`}
						>
							<div>
								<h5>{title}</h5>
								<span>{description}</span>
							</div>
							<div onClick={() => setShowBig(src)} className="hover">
								<Frame size={4}>
									{src.endsWith(".mp4") ? (
										<video src={src} controls className="show-image-small" />
									) : (
										<img src={src} alt="title" className="show-image-small" />
									)}
								</Frame>
							</div>
						</div>
					))}
			</Stack>
			<Modal show={!!showBigSrc} dialogClassName="show-image-backdrop" onHide={() => setShowBig(null)}>
				<Modal.Body className="p-0">
					<Frame size={8}>
						{showBigSrc &&
							(showBigSrc.endsWith(".mp4") ? (
								<video src={showBigSrc} controls className="show-image-small show-image-extended" />
							) : (
								<img src={showBigSrc} className="show-image-small show-image-extended" alt="title" />
							))}
					</Frame>
				</Modal.Body>
			</Modal>
		</>
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
		<Stack className="p-2" gap={2} style={{ width: "min-content", height: "min-content" }}>
			{data.map((t) => {
				const pct = Math.max(0, Math.min(100, Math.round(t.percentage)));
				const icon = icons.find((i) => i.name === t.name);

				// number of strips = proportional to pct
				const totalStrips = Math.min(10, 100 / Math.min(...data.map((d) => d.percentage)));
				const max = Math.max(...data.map((d) => d.percentage));
				const filled = Math.max(1, Math.round((pct / max) * totalStrips));

				return (
					<div className="d-flex flex-row gap-2 align-items-center" key={t.name + id}>
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
