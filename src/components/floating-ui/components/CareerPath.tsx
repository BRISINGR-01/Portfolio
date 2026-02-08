import { useCallback, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { setDefaultCursor, setPointerCursor } from "../../../utils";

const data = [
	{
		info: {
			title: "A1",
			from: "July 2021",
			to: "September 2021",
			description: "My first internship - did small tasks on a large scale web platform",
		},
		isRound: false,
		path: { pathLength: 100, d: "M197 0L197 80", stroke: "url(#paint0_linear_272_76)", strokeWidth: "10" },
	},
	{
		info: { title: "Fontys" },
		isRound: false,
		path: { pathLength: 100, d: "M197 173L197 995.5", stroke: "#8006AC", strokeWidth: "10" },
	},
	{
		info: {
			title: "Latin is Simple",
			from: "July 2021",
			to: "September 2021",
			description: "My first internship - did small tasks on a large scale web platform",
		},
		isRound: false,
		path: {
			pathLength: 100,
			d: "M197 95.5L197 125L165 179.5L165 995.5",
			stroke: "url(#paint1_linear_272_76)",
			strokeWidth: "10",
		},
	},
	{
		info: { title: "" },
		isRound: true,
		path: {
			pathLength: 100,
			d: "M222 435L241.811 456.5L241.811 539L222 560",
			stroke: "url(#paint2_linear_272_76)",
			strokeWidth: "10",
		},
	},
	{
		info: { title: "" },
		isRound: true,
		path: { pathLength: 100, d: "M197 245L197 387", stroke: "#8DD8F8", strokeWidth: "5" },
	},
	{
		info: { title: "" },
		isRound: true,
		path: { pathLength: 100, d: "M197 813L197 975", stroke: "#24357F", strokeWidth: "6" },
	},
	{
		info: { title: "" },
		isRound: true,
		path: {
			pathLength: 100,
			d: "M222 273L241.811 294.5L241.811 361L222 384.5",
			stroke: "url(#paint3_linear_272_76)",
			strokeWidth: "10",
		},
	},
	{
		info: { title: "" },
		isRound: true,
		path: {
			pathLength: 100,
			d: "M197.001 562.5L197.001 775.5L237.5 805L237.5 858L221.5 874.5",
			stroke: "#FBFF0F",
			strokeWidth: "6",
		},
	},
	{
		info: { title: "" },
		isRound: true,
		path: {
			pathLength: 100,
			d: "M222 654L241.812 675.5L241.812 743.5L222 764",
			stroke: "url(#paint4_linear_272_76)",
			strokeWidth: "10",
		},
	},
];

const months = [
	{ text: "July 2021", y: 0 },
	{ text: "September 2021", y: 90 },
	{ text: "January 2022", y: 120 },
	{ text: "September 2022", y: 210 },
	{ text: "February 2024", y: 300 },
	{ text: "April 2024", y: 360 },
	{ text: "July 2024", y: 480 },
	{ text: "September 2024", y: 540 },
	{ text: "February 2025", y: 720 },
	{ text: "April 2025", y: 840 },
	{ text: "July 2025", y: 960 },
	{ text: "September 2025", y: 1050 },
	{ text: "November 2025", y: 1140 },
	{ text: "February 2026", y: 1260 },
];

const rulerDist = 30;
const rulerSize = 3;
const max = innerHeight / 2 - 30;

const monthYPerc = months.map((m) => (max * m.y) / 1290);
export default function CareerPath() {
	const [mouse, setMouse] = useState({ x: 0, y: 0 });
	const [hovered, setHovered] = useState<number | null>(null);
	const [snappedMonth, setSnappedMonth] = useState(0);
	const [frameY, setFrameY] = useState(0);
	const [isMovingFrame, setIsMovingFrame] = useState(false);
	const [conatinerHeight, setConatinerHeight] = useState(1);

	useEffect(() => {
		if (isMovingFrame) {
			setPointerCursor();
		} else {
			setDefaultCursor();
		}
	}, [isMovingFrame]);

	const snap = useCallback(() => {
		const lowerMonthI = monthYPerc.findIndex((y) => frameY < y);

		let closestMonth = 0;
		switch (lowerMonthI) {
			case 0:
				closestMonth = 0;
				break;
			case -1:
				closestMonth = months.length - 1;
				break;
			default:
				closestMonth = lowerMonthI;

				if (monthYPerc[lowerMonthI] - frameY > frameY - monthYPerc[lowerMonthI - 1]) {
					closestMonth -= 1;
				}

				break;
		}

		setSnappedMonth(closestMonth);
		setFrameY(monthYPerc[closestMonth]);
	}, [frameY]);

	return (
		<div
			className="d-flex"
			ref={(node) => {
				if (node) setConatinerHeight(node.getBoundingClientRect().height);
			}}
			style={{ height: "50vh", overflow: "clip" }}
			onMouseLeave={() => {
				setIsMovingFrame(false);
				snap();
			}}
			onMouseUp={() => {
				setIsMovingFrame(false);
				snap();
			}}
			onMouseMove={(e) => {
				e.preventDefault();

				if (!isMovingFrame) return;

				setFrameY((prev) => {
					const val = prev + e.movementY;

					if (val <= 0) return 0;
					if (val >= max) return max;

					return val;
				});
			}}
		>
			<DisplayCard location={mouse} hovered={hovered} />
			<div
				className="me-3 mt-2"
				style={{
					height: "100%",
					width: 12,
					filter: "drop-shadow(0px 0px 2px var(--primary))",
					background: `repeating-linear-gradient(to bottom, #fff 0px, #fff ${rulerSize}px, transparent ${rulerSize}px, transparent ${rulerDist}px) 0 ${frameY + 4}px`,
				}}
			></div>
			<div
				style={{
					transform: `translateY(${(-260 * frameY) / conatinerHeight}%)`,
				}}
			>
				<div>
					{months.map(({ text, y }, i) => {
						let isHighlighted = snappedMonth === i;
						if (hovered !== null) {
							if (data[hovered].info.from === text) isHighlighted = true;
							if (data[hovered].info.to === text) isHighlighted = true;
						}

						return (
							<div
								key={y}
								style={{
									position: "absolute",
									fontSize: isHighlighted ? "1.2em" : "1em",
									fontWeight: isHighlighted ? 900 : 200,
									transform: `translateY(${y}px)`,
									transition: ".1s",
									transformOrigin: "center",
									// filter: isHighlighted ? "drop-shadow(0px 0px 2px #116)" : "",
									textDecoration: isHighlighted ? "underline" : undefined,
								}}
							>
								{text}
							</div>
						);
					})}
				</div>

				<svg
					style={{
						width: "500px",
						transform: `translateX(160px)`,
						height: "fit-content",
						opacity: 0.9,
					}}
					viewBox="130 0 387 996"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					{data.map((d, i) => (
						<path
							key={i}
							{...d.path}
							style={{
								filter: `drop-shadow(0 0 ${i === hovered ? 5 : 3}px ${i === hovered ? "#fff" : "#a1d5ff"})`,
							}}
							strokeLinecap={d.isRound ? "round" : undefined}
							onMouseEnter={() => setHovered(i)}
							onMouseLeave={() => setHovered(null)}
							onMouseMove={(e) => {
								const parent = getScrollableParent();
								setMouse({
									x: e.clientX,
									y: e.clientY - parent.getBoundingClientRect().top + parent.scrollTop,
								});
							}}
						/>
					))}

					<defs>
						<linearGradient
							id="paint0_linear_272_76"
							x1="191.5"
							y1="-15.1163"
							x2="191.5"
							y2="64.8837"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#AC0606" />
							<stop offset="0.451923" stop-color="#F20404" />
							<stop offset="1" stop-color="white" />
						</linearGradient>
						<linearGradient id="paint1_linear_272_76" x1="192" y1="33" x2="192" y2="433" gradientUnits="userSpaceOnUse">
							<stop stop-color="#9E34A8" />
							<stop offset="1" stop-color="#C5953A" />
						</linearGradient>
						<linearGradient
							id="paint2_linear_272_76"
							x1="216.5"
							y1="402.5"
							x2="216.5"
							y2="574.5"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="1" stop-color="#263DB0" />
						</linearGradient>
						<linearGradient
							id="paint3_linear_272_76"
							x1="257.5"
							y1="244.5"
							x2="257.5"
							y2="416.5"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#61BA49" />
							<stop offset="0.634615" stop-color="#2FB297" />
							<stop offset="1" stop-color="#06ABD6" stop-opacity="0" />
						</linearGradient>
						<linearGradient
							id="paint4_linear_272_76"
							x1="257.5"
							y1="624"
							x2="257.5"
							y2="796"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#61BA49" />
							<stop offset="0.634615" stop-color="#2FB297" />
							<stop offset="1" stop-color="#06ABD6" stop-opacity="0" />
						</linearGradient>
					</defs>
				</svg>
			</div>
			<img
				className="pointer"
				onMouseDown={(e) => {
					e.preventDefault();
					setIsMovingFrame(true);
				}}
				style={{
					filter: "drop-shadow(0px 0px 1px #fff)",
					position: "absolute",
					transform: `translate(15px,${frameY - 8}px)`,
				}}
				src="frame/date-frame.svg"
				alt=""
			/>
		</div>
	);
}

function DisplayCard(props: { location: { x: number; y: number }; hovered: number | null }) {
	return (
		<div
			className="position-absolute glow-text"
			style={{
				display: props.hovered !== null ? "flex" : "none",
				top: props.location.y,
				left: props.location.x,
				pointerEvents: "none",
				zIndex: 9999,
			}}
		>
			{props.hovered !== null && (
				<Card
					style={{
						width: "320px",
						boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
						border: "4px solid var(--primary)",
						background: "linear-gradient(135deg, #062d4c, transparent)",
						backdropFilter: "blur(4px)",
						borderRadius: 0,
						color: "white",
					}}
				>
					<Card.Header className="p-2 border-0">
						<Card.Title
							className="mb-0 text-center w-100"
							style={{
								fontSize: "1.25rem",
								fontWeight: "bold",
							}}
						>
							{data[props.hovered].info.title}
						</Card.Title>
						<div
							className="d-flex justify-content-center align-items-center"
							style={{
								fontSize: "0.85rem",
								fontWeight: "500",
							}}
						>
							<span>{data[props.hovered].info.from}</span>
							<span className="mx-2">—</span>
							<span>{data[props.hovered].info.to}</span>
						</div>
					</Card.Header>
					<Card.Body className="p-2">
						<Card.Text
							style={{
								fontSize: "0.95rem",
								margin: 0,
							}}
						>
							{data[props.hovered].info.description}
						</Card.Text>
					</Card.Body>
				</Card>
			)}
		</div>
	);
}

function getScrollableParent() {
	return document.getElementById("scroll-container")!;
}
