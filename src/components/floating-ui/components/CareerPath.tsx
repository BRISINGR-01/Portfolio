import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import type { fn } from "../../../types";
import { setDefaultCursor, setPointerCursor } from "../../../utils";
import ChangeAnimation from "./ChangeAnimation";

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
		info: {
			title: "Fontys",
			from: "September 2022",
			description:
				"I'm currently studying ICT at Fontys in Eindhoven. There I specialize in software and embedded systems.",
		},

		isRound: false,
		path: { pathLength: 100, d: "M197 173L197 995.5", stroke: "#8006AC", strokeWidth: "10" },
	},
	{
		info: {
			title: "Latin is Simple",
			from: "January 2022",
			description: "I developed an exercise section for a latin language learning platform",
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
		info: {
			title: "ASML",
			from: "September 2024",
			to: "February 2025",
			description:
				'My "middle" internship during my studies was at a global lithography leader, where I developed an internal tool for code analysis',
		},
		isRound: true,
		path: {
			pathLength: 100,
			d: "M222 435L241.811 456.5L241.811 539L222 560",
			stroke: "url(#paint2_linear_272_76)",
			strokeWidth: "10",
		},
	},
	{
		info: {
			title: "ICC",
			from: "February 2024",
			to: "July 2024",
			description: "During my 3rd (Open Learning style) semester I worked on a cleaning company startup's web page",
		},
		isRound: true,
		path: { pathLength: 100, d: "M197 245L197 387", stroke: "#8DD8F8", strokeWidth: "5" },
	},
	{
		info: {
			title: "TU/e premaster",
			from: "September 2025",
			to: "February 2026",
			description:
				'In preparation for an "Embedded Systems" master I attended lectures at TU/e and immersed myself into the world of electronics and microcontrollers',
		},
		isRound: true,
		path: { pathLength: 100, d: "M197 813L197 975", stroke: "#24357F", strokeWidth: "6" },
	},
	{
		info: {
			title: "SDG - Sabic",
			from: "April 2024",
			to: "July 2024",
			description:
				"I participated in the SDG Challenge, where I developed a recycling strategy and prototype for a company (Sabic)",
		},
		isRound: true,
		path: {
			pathLength: 100,
			d: "M222 273L241.811 294.5L241.811 361L222 384.5",
			stroke: "url(#paint3_linear_272_76)",
			strokeWidth: "10",
		},
	},
	{
		info: {
			title: "Glow",
			from: "February 2025",
			to: "November 2025",
			description:
				"I was part of the design/construction of two installations for one of the biggest light festivals in the world",
		},
		isRound: true,
		path: {
			pathLength: 100,
			d: "M197.001 562.5L197.001 775.5L237.5 805L237.5 858L221.5 874.5",
			stroke: "#FBFF0F",
			strokeWidth: "6",
		},
	},
	{
		info: {
			title: "SDG - Solarwatt",
			from: "April 2025",
			to: "July 2025",
			description:
				"The second time I participated in the SDG Challenge I co-developed a transparency platform, where I crafted a course (Udemy clone) for Solarwatt",
		},
		isRound: true,
		path: {
			pathLength: 100,
			d: "M222 654L241.812 675.5L241.812 743.5L222 764",
			stroke: "url(#paint4_linear_272_76)",
			strokeWidth: "10",
		},
	},
];

const rulerSize = 3;
const containerH = () => innerHeight * 0.8; // these are functions so that the val is always fresh
const graphH = () => innerHeight * 2;
const bottomPad = 12;
const shadowH = 10;
const sliderH = () => containerH() - bottomPad;
const constraint = (val: number) => {
	if (val <= 0) return 0;
	const max = sliderH();
	if (val >= max) return max;

	return val;
};

const transformToSliderY = (n: number) => (n / graphH()) * sliderH();
let previousY = 0;

export default function CareerPath() {
	const [mouse, setMouse] = useState({ x: 0, y: 0 });
	const [hovered, setHovered] = useState<number | null>(null);
	const [snappedMonth, setSnappedMonth] = useState(0);
	const [frameY, setFrameY] = useState(0);
	const [isMovingFrame, setIsMovingFrame] = useState(false);
	const timeout = useRef<number | undefined>(undefined);
	const [rulerDist, setRulerDist] = useState(24);
	const months = useMemo(
		() => [
			{ text: "July 2021", y: 0 },
			{ text: "September 2021", y: 4 * rulerDist },
			{ text: "January 2022", y: 5 * rulerDist },
			{ text: "September 2022", y: 9 * rulerDist },
			{ text: "February 2024", y: 12 * rulerDist },
			{ text: "April 2024", y: 14 * rulerDist },
			{ text: "July 2024", y: 20 * rulerDist },
			{ text: "September 2024", y: 22 * rulerDist },
			{ text: "February 2025", y: 29 * rulerDist },
			{ text: "April 2025", y: 34 * rulerDist },
			{ text: "July 2025", y: 39 * rulerDist },
			{ text: "September 2025", y: 42 * rulerDist },
			{ text: "November 2025", y: 45 * rulerDist },
			{ text: "February 2026", y: 50 * rulerDist },
		],
		[rulerDist],
	);

	const snapTo = useCallback(
		(i: number) => {
			setSnappedMonth(i);
			setFrameY(transformToSliderY(months[i].y));
		},
		[months],
	);

	const snap = useCallback(() => {
		const lowerMonthI = months.findIndex(({ y }) => frameY < transformToSliderY(y));

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

				if (
					transformToSliderY(months[lowerMonthI].y) - frameY >
					frameY - transformToSliderY(months[lowerMonthI - 1].y)
				) {
					closestMonth -= 1;
				}

				break;
		}

		snapTo(closestMonth);
		setIsMovingFrame(false);
	}, [frameY, months, snapTo]);

	useEffect(() => {
		function resize() {
			setRulerDist(Math.round(graphH() / 52));
			snap();
		}
		resize();
		window.addEventListener("resize", resize);

		return () => {
			window.removeEventListener("resize", resize);
			clearTimeout(timeout.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isMovingFrame) {
			setPointerCursor();
		} else {
			setDefaultCursor();
		}
	}, [isMovingFrame]);

	const slideOffset = (frameY / sliderH()) * (graphH() - containerH() + bottomPad);

	return (
		<div
			className="d-flex glow-text"
			style={{ height: containerH(), overflowY: "clip" }}
			onTouchStart={(e) => (previousY = e.touches[0].clientY)}
			onTouchEnd={snap}
			onTouchCancel={snap}
			onMouseLeave={snap}
			onMouseUp={snap}
			onMouseMove={useCallback(
				(e) => {
					e.preventDefault();

					if (!isMovingFrame) return;

					setFrameY((prev) => {
						const val = prev + e.movementY;

						if (val <= 0) return 0;
						const max = sliderH();
						if (val >= max) return max;

						return val;
					});
				},
				[isMovingFrame],
			)}
			onTouchMove={useCallback(
				(e) => {
					if (!isMovingFrame) return;

					setFrameY((prev) => {
						const val = prev + (e.touches[0].clientY - previousY);
						previousY = e.touches[0].clientY;

						return constraint(val);
					});
				},
				[isMovingFrame],
			)}
			onWheel={(e) => {
				setFrameY((prev) => constraint(prev + (e.deltaY > 0 ? 15 : -15)));
				if (timeout.current) clearTimeout(timeout.current);
				timeout.current = setTimeout(snap, 500);
			}}
		>
			<DisplayCard location={mouse} hovered={hovered} />
			<Ruler rulerDist={rulerDist} frameY={frameY} />
			<div
				style={{
					width: "100%",
					transform: `translate(5px, ${-slideOffset}px)`,
					transition: isMovingFrame ? "0s" : ".3s",
				}}
			>
				<div>
					{months.map(({ text, y }, i) => {
						let isHighlighted = false;
						if (hovered !== null) {
							if (data[hovered].info.from === text) isHighlighted = true;
							if (data[hovered].info.to === text) isHighlighted = true;
						}

						return (
							<div
								key={y}
								style={{
									position: "absolute",
									fontSize: snappedMonth === i || isHighlighted ? "1.2em" : "1em",
									fontWeight: snappedMonth === i || isHighlighted ? 900 : 200,
									transform: `translateY(${y}px)`,
									transition: ".1s",
									transformOrigin: "center",
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
						width: "fit-content",
						height: graphH(),
						marginLeft: "160px",
						maskImage: `linear-gradient(to bottom,transparent ${slideOffset}px, black ${slideOffset + shadowH}px, black ${slideOffset + containerH() - shadowH}px, transparent ${slideOffset + containerH()}px)`,
						opacity: 0.9,
					}}
					viewBox="130 0 250 996"
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
							onPointerMove={(e) => {
								let yOffset = 0;
								const parent = getScrollableParent();
								if (parent) {
									yOffset -= parent.getBoundingClientRect().top + parent.scrollTop;
								}

								setMouse({
									x: e.clientX,
									y: e.clientY + yOffset,
								});
							}}
						/>
					))}
					{[
						{ text: "A1", x: 220, y: 40 },
						{ text: "Latin is Simple", x: 220, y: 110 },
						{ text: "Fontys", x: 220, y: 190 },
						{ text: "ICC", x: 220, y: 250 },
						{ text: "SDG - Sabic", x: 260, y: 320 },
						{ text: "ASML", x: 260, y: 500 },
						{ text: "Glow", x: 220, y: 600 },
						{ text: "SDG - Solarwatt", x: 260, y: 700 },
						{ text: "TU/e pre-master", x: 220, y: 900 },
					].map(({ text, x, y }) => (
						<text x={x} y={y} key={y} fontSize={12} fill="white">
							{text}
						</text>
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
							<stop stopColor="#AC0606" />
							<stop offset="0.451923" stopColor="#F20404" />
							<stop offset="1" stopColor="white" />
						</linearGradient>
						<linearGradient id="paint1_linear_272_76" x1="192" y1="33" x2="192" y2="433" gradientUnits="userSpaceOnUse">
							<stop stopColor="#9E34A8" />
							<stop offset="1" stopColor="#C5953A" />
						</linearGradient>
						<linearGradient
							id="paint2_linear_272_76"
							x1="216.5"
							y1="402.5"
							x2="216.5"
							y2="574.5"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="1" stopColor="#263DB0" />
						</linearGradient>
						<linearGradient
							id="paint3_linear_272_76"
							x1="257.5"
							y1="244.5"
							x2="257.5"
							y2="416.5"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#61BA49" />
							<stop offset="0.634615" stopColor="#2FB297" />
							<stop offset="1" stopColor="#06ABD6" stopOpacity="0" />
						</linearGradient>
						<linearGradient
							id="paint4_linear_272_76"
							x1="257.5"
							y1="624"
							x2="257.5"
							y2="796"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#61BA49" />
							<stop offset="0.634615" stopColor="#2FB297" />
							<stop offset="1" stopColor="#06ABD6" stopOpacity="0" />
						</linearGradient>
					</defs>
				</svg>
			</div>
			<SnapContainer
				isMoving={isMovingFrame}
				startMoving={() => setIsMovingFrame(true)}
				frameY={frameY}
				snapTo={useCallback(
					(isUp: boolean) => {
						if (isUp) {
							snapTo(snappedMonth === 0 ? snappedMonth : snappedMonth - 1);
						} else {
							snapTo(snappedMonth === months.length - 1 ? snappedMonth : snappedMonth + 1);
						}
					},
					[months.length, snapTo, snappedMonth],
				)}
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
				opacity: props.hovered !== null ? 1 : 0,
				transition: "opacity .3s",
				top: props.location.y,
				left: props.location.x,
				transform: "translateX(-100%)",
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
						background: "linear-gradient(135deg, #062c4cff, #062c4c50)",
						backdropFilter: "blur(4px)",
						borderRadius: 0,
						color: "white",
					}}
				>
					<ChangeAnimation id={props.hovered + ""} speed={0.1}>
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
								{data[props.hovered].info.to && <span className="mx-2">—</span>}
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
					</ChangeAnimation>
				</Card>
			)}
		</div>
	);
}

function getScrollableParent() {
	return document.getElementById("scroll-container")!;
}

function Ruler({ frameY, rulerDist }: { frameY: number; rulerDist: number }) {
	const [h, setH] = useState(0);

	useEffect(() => {
		function setHeight() {
			setH(containerH() + rulerDist - (containerH() % rulerDist));
		}
		setHeight();
		window.addEventListener("resize", setHeight);
		return () => window.removeEventListener("resize", setHeight);
	}, [rulerDist]);

	return (
		<div
			className="me-3"
			style={{
				height: h,
				maskImage: `linear-gradient(to bottom,transparent 0px, black 10%, black 90%, transparent 100%)`,

				width: 12,
				filter: "drop-shadow(0px 0px 2px var(--primary))",
				background: `repeating-linear-gradient(to bottom, #fff 0px, #fff ${rulerSize}px, transparent ${rulerSize}px, transparent ${rulerDist}px) 0 ${frameY + 8}px`,
			}}
		/>
	);
}

function SnapContainer(props: { isMoving: boolean; startMoving: fn; frameY: number; snapTo: (isUp: boolean) => void }) {
	const [hovered, setHovered] = useState<"top" | "bottom" | "middle" | null>(null);

	return (
		<svg
			onMouseDown={(e) => {
				e.preventDefault();
				props.startMoving();
			}}
			onTouchMove={props.startMoving}
			style={{
				position: "absolute",
				transform: `translate(18px,calc(${props.frameY + 10}px - 50%))`,
				transition: props.isMoving ? "0s" : ".3s",
				height: "6em",
			}}
			viewBox="0 0 221 107"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g style={{ filter: hovered === "middle" ? "drop-shadow(0px 0px 2px #fff)" : "" }}>
				<path
					d="M10.25 34L97.937 34.0981L101.5 37.7997H13.813L6.14359 70.5981H13.1436L16 75L0 75L10.25 34Z"
					fill="white"
				/>
				<path
					d="M210.152 75L119.063 74.9019L115.5 71.2003H206.589L214.258 38.4019H207.258L204.402 34L220.402 34L210.152 75Z"
					fill="white"
				/>

				<path d="M92 29L100 29L106.5 35H136L140 37.5L105 37.5L99 31.937L86.5 31.9369L92 29Z" fill="white" />
				<path d="M124 79.5L116 79.5L109.5 73.5H80L76 71L111 71L117 76.5631L129.5 76.5631L124 79.5Z" fill="white" />
			</g>
			<path
				style={{ filter: hovered === "top" ? "drop-shadow(0px 0px 2px #fff)" : "" }}
				d="M189 13.6481L199.2 1L200.95 4.5H199.95L201.7 8.5H196.2L198.2 4.5H197.2L191.7 12.5428H193.2L195.7 9.5H198.7L198.7 24.5H199.7V9.5H202.7L205.2 12.5H206.7L200.95 4.5L199.2 1V4L197.7 7.5H200.2L199.2 4V1L209.2 13.5H204.2L202.2 11H200.7V25.5H197.7V13.6481V11H196.2L194.2 13.6481H189Z"
				fill="white"
			/>
			<path
				d="M189 91.8519L199.2 104.5L200.95 101H199.95L201.7 97H196.2L198.2 101H197.2L191.7 92.9572H193.2L195.7 96H198.7L198.7 81H199.7V96H202.7L205.2 93H206.7L200.95 101L199.2 104.5V101.5L197.7 98H200.2L199.2 101.5V104.5L209.2 92H204.2L202.2 94.5H200.7V80H197.7V91.8519V94.5H196.2L194.2 91.8519H189Z"
				style={{ filter: hovered === "bottom" ? "drop-shadow(0px 0px 2px #fff)" : "" }}
				fill="white"
			/>
			<path
				d="M0 28.5H220V77.5H0V28.5Z"
				className="pointer"
				onMouseEnter={() => setHovered("middle")}
				onMouseLeave={() => setHovered(null)}
				fill="#fff"
				opacity="0"
			/>
			<path
				d="M179 0H220V29H179V0Z"
				className="pointer"
				onMouseEnter={() => setHovered("top")}
				onMouseLeave={() => setHovered(null)}
				onClick={() => props.snapTo(true)}
				fill="#00FF3C"
				fillOpacity="0"
			/>
			<path
				d="M178 78H218V107H178V78Z"
				className="pointer"
				onClick={() => props.snapTo(false)}
				onMouseEnter={() => setHovered("bottom")}
				onMouseLeave={() => setHovered(null)}
				fill="black"
				fillOpacity="0"
			/>
		</svg>
	);
}
