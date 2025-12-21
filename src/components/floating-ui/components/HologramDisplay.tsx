import { motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState, type JSX } from "react";
import { Stack } from "react-bootstrap";
import { COLOR_PALETTE } from "../../../constants";
import type { fn } from "../../../types";
import ClickToClose from "./ClickToClose";
import FadeAnim from "./FadeAnim";

const clipPathId = "inner-frame-clip";

function ContentContainer(props: {
	box: DOMRect | null;
	children: React.ReactNode;
	onClick: fn;
	onSelect?: (i: number) => void;
	nrOfPages?: number;
	currentPage?: number;
}) {
	const scale = 100 / window.innerWidth;

	return (
		<div
			style={{
				position: "absolute",
				zIndex: 2,
				width: "95%",
				height: "95%",
				paddingTop: 6, // instead of top,left bc of the clipPath (Firefox is problematic with clipPath)
				paddingLeft: 4,
				clipPath: `url(#${clipPathId})`,
			}}
		>
			<FadeAnim
				style={{
					zIndex: 2,
					transform: `scale(${scale})`,
					overflow: "auto",
					transformOrigin: "0 0",
					width: `calc( 100% / ${scale})`,
					height: `calc( 100% / ${scale})`,
				}}
				transition={{ delay: 0.5 }}
				className="glow-text p-4"
				onClick={props.onClick}
			>
				<Stack className="justify-content-between">
					<div>{props.children}</div>
					<div className="ps-4 mb-3">
						<ClickToClose />
					</div>
				</Stack>
			</FadeAnim>
		</div>
	);
}

function CloseBtn(props: { onClick: fn; box: DOMRect | null }) {
	// if (!props.box) return null;

	return (
		<FadeAnim
			onClick={props.onClick}
			style={{
				position: "absolute",
				zIndex: 10,
				top: 0,
				left: 0,
				transform: "translate(-100%,-100%)",
				filter: `drop-shadow(0 0 6px ${COLOR_PALETTE.PRIMARY}) 
             drop-shadow(0 0 12px ${COLOR_PALETTE.PRIMARY})`,
			}}
		>
			<svg width="1.2em" height="1.2em" viewBox="0 0 24 24">
				<path d="M18 6L6 18M6 6l12 12" stroke={COLOR_PALETTE.PRIMARY} strokeWidth="2" strokeLinecap="round" />
			</svg>
		</FadeAnim>
	);
}

export default function HologramDisplay(props: {
	children: React.ReactNode;
	onClick: fn;
	onSelect?: (i: number) => void;
	nrOfPages?: number;
	currentPage?: number;
}) {
	const [box, setBox] = useState<DOMRect | null>(null);
	const innerFrame = useRef<SVGRectElement | null>(null);

	function updateRect() {
		if (innerFrame.current) setBox(innerFrame.current.getBoundingClientRect().toJSON());
	}

	useEffect(() => {
		if (!innerFrame.current) return;

		window.addEventListener("resize", updateRect);
		return () => window.removeEventListener("resize", updateRect);
	});

	const rectCB = useCallback((node: SVGRectElement | null) => {
		innerFrame.current = node;
		updateRect();
	}, []);

	return (
		<>
			{props.onSelect && props.nrOfPages && props.currentPage != undefined && (
				<GalleryNav onSelect={props.onSelect} nrOfPages={props.nrOfPages} currentPage={props.currentPage} />
			)}
			<AnimatedSVG>
				<svg
					onClick={props.onClick}
					style={{
						zIndex: 0,
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%,-50%)",
						width: "inherit",
						maxWidth: "calc(100vw - 2em)",
						maxHeight: "calc(100vh - 2em)",
					}}
					viewBox="0 0 100 52"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					{svg}
					<rect ref={rectCB} x="7" y="8" width="87" height="41" />
					<defs>
						<clipPath id={clipPathId}>
							<path
								d="M78.1234 49.8165H76.8265L74.0308 47.843H69.3184L69.7587 47.5139H60.9984L57.0844 45.5404H47.0873L47.5275 45.8692H33.112L33.5523 45.5404H25.2867L24.8951 45.8751H22.9895L21.4283 47.4311H16.8153L15.7418 48.5009H4.66613L4.63694 48.4483C4.46545 48.1399 4.239 47.8707 3.9642 47.6484L3.92634 47.6179V32.3196L4.81437 31.4346V25.1744L3.92634 24.2893V19.4801L3.77446 19.6392V18.6647L4.0764 18.3632L4.29145 18.5227V12.1184L4.2894 12.0654V9.17908L7.7813 5.88886L8.9122 5.8884L11.0203 3.78724H12.5815L13.1836 3.18736H15.3302L15.7706 2.52945H22.0376L21.8727 2.36492H23.1697L25.9653 4.33864H30.6775L30.2372 4.66748H38.9977L42.9117 6.64121H52.9088L52.4686 6.31214H66.8839L66.4436 6.64121H74.7092L75.1001 6.30691H77.0066L78.5678 4.751H83.1808L84.255 3.68074H95.1428L95.1729 3.72944C95.3868 4.07785 95.6807 4.38074 96.023 4.60513L96.0691 4.6354V19.8624L95.182 20.7467V27.0081L96.0691 27.8918V32.7015L96.2217 32.5418V33.5169L95.9195 33.8184L95.7047 33.6591V40.0639L95.706 40.1165V43.0025L92.2139 46.293H91.0844L88.9758 48.3941H87.4146L86.8125 48.9942H84.6659L84.2255 49.6522H77.9583L78.1234 49.8165Z"
								fill="#29ABE2"
							/>
						</clipPath>
					</defs>

					<foreignObject id="clip" width="100%" height="100%" clipPath={`url(#${clipPathId})`}>
						<div
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
								zIndex: 1,
								clipPath: `url(#${clipPathId})`,
							}}
						>
							<ContentContainer box={box} {...props} />
						</div>
						<CloseBtn onClick={props.onClick} box={box} />

						<motion.div
							transition={{ delay: 0.3, duration: 0.3 }}
							initial={{ height: 0 }}
							exit={{ height: 0, transition: { delay: 0 } }}
							animate={{ height: "100%" }}
							className="glass-morpihic hologram-bg"
							style={{ clipPath: `url(#${clipPathId})` }}
						/>
					</foreignObject>
				</svg>
			</AnimatedSVG>
		</>
	);
}

function animateChildren(node: JSX.Element) {
	if (!node) return null;

	// text nodes, unknown nodes
	if (typeof node !== "object") return node;

	const isDrawable =
		node.type === "path" ||
		node.type === "line" ||
		node.type === "polyline" ||
		node.type === "polygon" ||
		node.type === "circle" ||
		node.type === "ellipse";

	const MotionTag = isDrawable ? motion[node.type] : node.type;

	return isDrawable ? (
		<MotionTag
			key={node.key}
			{...node.props}
			variants={{
				hidden: { opacity: 0 },
				show: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
			}}
		>
			{React.Children.map(node.props?.children, animateChildren)}
		</MotionTag>
	) : (
		<MotionTag key={node.key} {...node.props}>
			{React.Children.map(node.props?.children, animateChildren)}
		</MotionTag>
	);
}

function AnimatedSVG({ children }: { children: JSX.Element }) {
	return (
		<motion.svg
			initial="hidden"
			animate="show"
			exit="exit"
			variants={{
				hidden: { opacity: 1 },
				exit: { opacity: 0, transition: { delay: 0.1 } },
				show: { transition: { staggerChildren: 0.01 /* delay between elements*/ } },
			}}
			{...children.props}
		>
			{React.Children.map(children.props.children, animateChildren)}
		</motion.svg>
	);
}

const arrowStyle: React.CSSProperties = {
	all: "unset",
	cursor: "pointer",
	fontSize: 24,
	padding: "4px 6px 0 6px",
	opacity: 0.8,
	color: "white",
};

function GalleryNav({
	onSelect,
	nrOfPages,
	currentPage,
}: {
	onSelect: (i: number) => void;
	nrOfPages: number;
	currentPage: number;
}) {
	return (
		<div
			style={{
				position: "fixed",
				left: 0,
				bottom: "1.5em",
				display: "flex",
				width: "100%",
				justifyContent: "center",
				zIndex: 10,
			}}
		>
			<div
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
				}}
				style={{
					background: "linear-gradient(90deg,#000000A0 0%, #083b6480 50%, #000000A0 100%)",
					boxShadow: "0px 0px 10px 0px " + COLOR_PALETTE.PRIMARY,
					borderRadius: 12,
					display: "flex",
					alignItems: "center",
					padding: "0 10px",
					justifyContent: "center",
					gap: 12,
				}}
			>
				<div
					className="pointer"
					onClick={() => onSelect(currentPage === 0 ? nrOfPages - 1 : currentPage - 1)}
					style={{ ...arrowStyle, color: COLOR_PALETTE.PRIMARY }}
				>
					‹
				</div>

				<div className="d-flex">
					{Array.from({ length: nrOfPages }).map((_, i) => (
						<div
							key={i}
							onClick={() => onSelect(i)}
							className="pointer"
							style={{
								padding: "0 8px",
							}}
						>
							<div
								style={{
									filter: `drop-shadow(0 0 6px ${COLOR_PALETTE.PRIMARY}) 
								drop-shadow(0 0 12px ${COLOR_PALETTE.PRIMARY})`,
									opacity: i === currentPage ? 0.7 : 0.4,
									transform: i === currentPage ? "scale(1.2)" : "scale(1)",
									width: 8,
									height: 8,
									borderRadius: "50%",
									background: COLOR_PALETTE.PRIMARY,
								}}
							/>
						</div>
					))}
				</div>

				<div
					className="pointer"
					onClick={() => onSelect(currentPage === nrOfPages - 1 ? 0 : currentPage + 1)}
					style={{ ...arrowStyle, color: COLOR_PALETTE.PRIMARY }}
				>
					›
				</div>
			</div>
		</div>
	);
}

const svg = (
	<g clipPath="url(#clip0_101_2)">
		<path
			d="M43.281 5.0985H74.1361L74.1421 5.09327L74.296 4.96173L77.2119 2.4671H98.5386V2.13803H77.0889L74.0141 4.76966H43.3601L39.4454 2.79594H26.4579L23.6623 0.822444H18.4374V1.15128H23.5574L26.353 3.12501H39.3669L43.281 5.0985Z"
			fill="#2981E2"
		/>
		<path d="M1.91608 48.9348H2.24629V15.9404H1.91608V48.9348Z" fill="#2981E2" />
		<path
			d="M1.45405 34.701L1.91608 33.9741L2.24629 33.4543L2.70832 32.7275V22.5191L2.55644 22.6784L2.47275 22.7664L2.24629 23.004L1.91608 23.3499L1.45405 23.8349V34.701Z"
			fill="#2981E2"
		/>
		<path
			d="M1.45405 50.0415H2.70832V36.4193L2.24629 37.1464L1.91608 37.6662L1.45405 38.3931V50.0415Z"
			fill="#2981E2"
		/>
		<path
			d="M70.0987 5.42757H74.2584L74.649 5.09327L74.803 4.96173L77.3339 2.79594H81.4064L80.966 2.4671L80.5263 2.13803L80.086 1.80919H76.9669L73.8912 4.4406H71.4192L70.9788 4.76966L70.5391 5.0985L70.0987 5.42757Z"
			fill="#29ABE2"
		/>
		<path d="M27.2908 2.47302H26.8949V0.708427H27.2908V2.47302Z" fill="#2981E2" />
		<path d="M26.359 0.708659V2.28368L25.9628 2.00604V0.708659H26.359Z" fill="#2981E2" />
		<path d="M25.4269 0.708659V1.63169L25.0308 1.35405V0.708659H25.4269Z" fill="#2981E2" />
		<path d="M24.4946 0.708659V0.979013L24.1079 0.708659H24.4946Z" fill="#2981E2" />
		<path d="M28.1763 2.47302H27.7802V0.708427H28.1763V2.47302Z" fill="#2981E2" />
		<path d="M29.0616 2.47302H28.6654V0.708427H29.0616V2.47302Z" fill="#2981E2" />
		<path d="M29.9469 0.885711V2.47302H29.5507V0.766464L29.9469 0.885711Z" fill="#2981E2" />
		<path d="M30.8319 1.15128V2.47302H30.436V1.03295L30.8319 1.15128Z" fill="#2981E2" />
		<path d="M31.7179 1.41777V2.47302H31.3218V1.29874L31.7179 1.41777Z" fill="#2981E2" />
		<path d="M32.6032 1.68357V2.47302H32.2071V1.56455L32.6032 1.68357Z" fill="#2981E2" />
		<path d="M33.4885 1.94938V2.47302H33.0924V1.83036L33.4885 1.94938Z" fill="#2981E2" />
		<path d="M34.3735 2.21517V2.47302H33.9777V2.09616L34.3735 2.21517Z" fill="#2981E2" />
		<path
			d="M45.7044 4.43491L39.7722 1.31605H34.1446V2.26411H34.2766V1.44758H39.7393L45.6429 4.55142L45.7044 4.43491Z"
			fill="#2981E2"
		/>
		<path d="M13.3583 1.31582H19.0976L18.4374 0.657913H13.3583V1.31582Z" fill="#2981E2" />
		<path d="M2.4114 16.5984V11.1569H1.7512V15.9404L2.4114 16.5984Z" fill="#2981E2" />
		<path
			d="M74.0748 5.09327H76.5022L78.0634 3.53737H82.6764L83.7505 2.4671L83.8258 2.392L83.7325 2.2987L83.5635 2.4671L82.6217 3.40583H78.0087L76.4474 4.96173H74.0748V5.09327Z"
			fill="#2981E2"
		/>
		<path
			d="M1.08735 9.65561L1.09122 7.80637L4.22486 4.84158L2.90468 4.67112L0 7.41108V8.8507L1.08735 9.65561Z"
			fill="#2981E2"
		/>
		<path d="M3.07343 13.0437V12.7267L2.63101 12.3976V12.7149L3.07343 13.0437Z" fill="#2981E2" />
		<path d="M3.07343 13.6563V13.3384L2.63101 13.0096V13.3272L3.07343 13.6563Z" fill="#2981E2" />
		<path d="M3.07343 14.2687V13.951L2.63101 13.622V13.9399L3.07343 14.2687Z" fill="#2981E2" />
		<path d="M3.07343 14.8811V14.5634L2.63101 14.2346V14.5523L3.07343 14.8811Z" fill="#2981E2" />
		<path d="M3.07343 15.493V15.1758L2.63101 14.847V15.164L3.07343 15.493Z" fill="#2981E2" />
		<path
			d="M3.07343 16.1054V15.7884L2.63101 15.4594V15.7766L2.78632 15.8917L2.91836 15.9903L3.07343 16.1054Z"
			fill="#2981E2"
		/>
		<path
			d="M2.4244 22.7664H2.55644V18.1627L2.91836 17.8015V15.7825H2.78632V17.7476L2.4244 18.1081V22.7664Z"
			fill="#2981E2"
		/>
		<path
			d="M7.29761 4.67545L8.4073 4.67477L10.5158 2.5736H12.0771L12.706 1.94664L10.164 1.97372L7.29761 4.67545Z"
			fill="#2981E2"
		/>
		<path
			d="M2.70308 31.8222L2.70832 31.8169L3.59612 30.9321V25.6768L2.70832 24.7921L2.6992 24.7829L2.70308 31.8222Z"
			fill="#2981E2"
		/>
		<path
			d="M76.3339 51.3592H81.5587V51.0303H76.4388L73.6431 49.0566H60.6292L56.7152 47.0829H25.86L25.8534 47.0888L25.6994 47.2206L22.7843 49.7145H1.45747V50.0433H22.9065L25.982 47.4119H56.636L60.5507 49.3854H73.5382L76.3339 51.3592Z"
			fill="#2981E2"
		/>
		<path d="M97.7491 36.2418H98.0794V3.24721H97.7491V36.2418Z" fill="#2981E2" />
		<path
			d="M97.2871 29.663L97.4397 29.5032L97.5234 29.4149L97.7491 29.1783L98.0794 28.8321L98.5414 28.3472V17.4804L98.0794 18.2075L97.7491 18.7271L97.2871 19.4541V29.663Z"
			fill="#2981E2"
		/>
		<path d="M97.2871 15.762L97.7491 15.0352L98.0794 14.5154L98.5414 13.7885V2.14008H97.2871V15.762Z" fill="#2981E2" />
		<path
			d="M60.4714 49.7145H64.7834L65.2237 49.3854L65.6634 49.0566L66.1038 48.7278H60.7079L56.7938 46.754H50.7423L51.1827 47.0829L51.6223 47.4119L52.0627 47.7408H56.5576L60.4714 49.7145Z"
			fill="#29ABE2"
		/>
		<path d="M72.7051 49.7086H73.1013V51.4734H72.7051V49.7086Z" fill="#2981E2" />
		<path d="M73.6372 51.4732V49.8982L74.0333 50.1758V51.4732H73.6372Z" fill="#2981E2" />
		<path d="M74.5692 51.4732V50.5501L74.9653 50.8278V51.4732H74.5692Z" fill="#2981E2" />
		<path d="M75.5013 51.4732V51.2028L75.8883 51.4732H75.5013Z" fill="#2981E2" />
		<path d="M71.8198 49.7086H72.216V51.4734H71.8198V49.7086Z" fill="#2981E2" />
		<path d="M70.9345 49.7086H71.3307V51.4734H70.9345V49.7086Z" fill="#2981E2" />
		<path d="M70.0493 51.2961V49.7088H70.4454V51.4154L70.0493 51.2961Z" fill="#2981E2" />
		<path d="M69.164 51.0303V49.7088H69.5601V51.1489L69.164 51.0303Z" fill="#2981E2" />
		<path d="M68.2782 50.7641V49.7088H68.6741V50.8831L68.2782 50.7641Z" fill="#2981E2" />
		<path d="M67.3929 50.4983V49.7088H67.7891V50.6173L67.3929 50.4983Z" fill="#2981E2" />
		<path d="M66.5076 50.2325V49.7088H66.9038V50.3515L66.5076 50.2325Z" fill="#2981E2" />
		<path d="M65.6224 49.9667V49.7088H66.0185V50.0857L65.6224 49.9667Z" fill="#2981E2" />
		<path
			d="M65.8515 50.8658V49.9177H65.7195V50.7342H60.2568L54.3532 47.6304L54.2917 47.7469L60.2239 50.8658H65.8515Z"
			fill="#2981E2"
		/>
		<path d="M81.5587 51.5237H86.6379V50.8658H80.8987L81.5587 51.5237Z" fill="#2981E2" />
		<path d="M97.5843 41.0245H98.2442V36.2418L97.5843 35.5839V41.0245Z" fill="#2981E2" />
		<path
			d="M16.2636 49.8829L16.4326 49.7145L17.3745 48.7762H21.9877L23.5487 47.2206H25.9213V47.0888H23.494L21.9327 48.6447H17.3197L16.2463 49.7145L16.1706 49.7901L16.2636 49.8829Z"
			fill="#2981E2"
		/>
		<path
			d="M98.9086 42.5262L98.9047 44.3755L95.771 47.3403L97.0915 47.5107L99.9959 44.7707V43.3311L98.9086 42.5262Z"
			fill="#2981E2"
		/>
		<path d="M97.3651 39.7844V39.4674L96.9227 39.1384V39.4556L97.3651 39.7844Z" fill="#2981E2" />
		<path d="M97.3651 39.172V38.8548L96.9227 38.526V38.843L97.3651 39.172Z" fill="#2981E2" />
		<path d="M97.3651 38.5594V38.2424L96.9227 37.9136V38.2306L97.3651 38.5594Z" fill="#2981E2" />
		<path d="M97.3651 37.947V37.63L96.9227 37.301V37.6182L97.3651 37.947Z" fill="#2981E2" />
		<path d="M97.3651 37.3346V37.0174L96.9227 36.6886V37.0056L97.3651 37.3346Z" fill="#2981E2" />
		<path
			d="M97.3651 36.7227V36.405L97.2098 36.2899L97.078 36.1911L96.9227 36.0759V36.3939L97.3651 36.7227Z"
			fill="#2981E2"
		/>
		<path
			d="M97.078 36.3991H97.2098V34.4347L97.5717 34.0735V29.4149H97.4397V34.0189L97.078 34.3801V36.3991Z"
			fill="#2981E2"
		/>
		<path
			d="M87.2901 50.2347L89.8322 50.2079L92.6985 47.5066H91.5888L89.4805 49.608H87.9193L87.2901 50.2347Z"
			fill="#2981E2"
		/>
		<path
			d="M97.2971 27.3987L97.293 20.3594L97.2871 20.3653L96.4 21.2495V26.5052L97.2871 27.3886L97.2971 27.3987Z"
			fill="#2981E2"
		/>
		<path d="M0.248572 41.0422V40.0669L1.20387 38.604V41.0422H0.248572Z" fill="#2981E2" />
		<path d="M0.248572 43.9212V41.4833H1.20387V43.9212H0.248572Z" fill="#29ABE2" />
		<path d="M0.248572 46.8005V44.3625H1.20387V46.8005H0.248572Z" fill="#2981E2" />
		<path d="M70.0125 4.15772L70.4714 4.44879H48.7101L49.169 4.15772H70.0125Z" fill="#29ABE2" />
		<path d="M69.2023 3.64387L69.5911 3.89033H49.5907L49.9795 3.64387H69.2023Z" fill="#29ABE2" />
		<path d="M68.5088 3.20397L68.8424 3.41561H50.3391L50.673 3.20397H68.5088Z" fill="#29ABE2" />
		<path d="M67.9086 2.82325L68.1982 3.00712H50.9836L51.2732 2.82325H67.9086Z" fill="#29ABE2" />
		<path d="M30.429 48.0899L29.9701 47.799H51.7314L51.2725 48.0899H30.429Z" fill="#29ABE2" />
		<path d="M31.2395 48.6037L30.8506 48.3573H50.8509L50.462 48.6037H31.2395Z" fill="#29ABE2" />
		<path d="M31.933 49.0436L31.5991 48.832H50.1024L49.7685 49.0436H31.933Z" fill="#29ABE2" />
		<path d="M32.5332 49.4244L32.2433 49.2405H49.4582L49.1685 49.4244H32.5332Z" fill="#29ABE2" />
		<path
			d="M19.9101 50.3724H23.0292L26.1042 47.7408H28.577L29.0173 47.4119L29.457 47.0829L29.8974 46.754H25.7377L25.3464 47.0888L25.1925 47.2205L22.6623 49.3854H18.59L19.0301 49.7145L19.4698 50.0433L19.9101 50.3724Z"
			fill="#29ABE2"
		/>
		<path
			d="M43.2023 5.42757H49.2538L48.8135 5.0985L48.3738 4.76966L47.9334 4.4406H43.4385L39.5241 2.4671H35.2128L34.7724 2.79594L34.3327 3.12501L33.8924 3.45385H39.2885L43.2023 5.42757Z"
			fill="#29ABE2"
		/>
		<path
			d="M83.8148 51.9995H90.4374L98.722 44.1932V40.8424L98.0618 40.4037L97.4018 39.9656L96.7416 39.5268V43.3432L92.5161 47.3246L89.6497 50.0258H85.1352L84.6949 50.6837L84.2552 51.3416L83.8148 51.9995Z"
			fill="#29ABE2"
		/>
		<path
			d="M3.07138 12.4727V8.65635L10.164 1.97372H14.6787L15.1188 1.31582L15.5585 0.657908L15.9989 0H9.37628L1.09099 7.80637V11.1569L1.75119 11.5957L2.4114 12.034L3.07138 12.4727Z"
			fill="#29ABE2"
		/>
		<path
			d="M78.1234 49.8165H76.8265L74.0308 47.843H69.3184L69.7587 47.5139H60.9984L57.0844 45.5404H47.0873L47.5275 45.8692H33.112L33.5523 45.5404H25.2867L24.8951 45.8751H22.9895L21.4283 47.4311H16.8153L15.7418 48.5009H4.66613L4.63694 48.4483C4.46545 48.1399 4.239 47.8707 3.9642 47.6484L3.92634 47.6179V32.3196L4.81437 31.4346V25.1744L3.92634 24.2893V19.4801L3.77446 19.6392V18.6647L4.0764 18.3632L4.29145 18.5227V12.1184L4.2894 12.0654V9.17908L7.7813 5.88886L8.9122 5.8884L11.0203 3.78724H12.5815L13.1836 3.18736H15.3302L15.7706 2.52945H22.0376L21.8727 2.36492H23.1697L25.9653 4.33864H30.6775L30.2372 4.66748H38.9977L42.9117 6.64121H52.9088L52.4686 6.31214H66.8839L66.4436 6.64121H74.7092L75.1001 6.30691H77.0066L78.5678 4.751H83.1808L84.255 3.68074H95.1428L95.1729 3.72944C95.3868 4.07785 95.6807 4.38074 96.023 4.60513L96.0691 4.6354V19.8624L95.182 20.7467V27.0081L96.0691 27.8918V32.7015L96.2217 32.5418V33.5169L95.9195 33.8184L95.7047 33.6591V40.0639L95.706 40.1165V43.0025L92.2139 46.293H91.0844L88.9758 48.3941H87.4146L86.8125 48.9942H84.6659L84.2255 49.6522H77.9583L78.1234 49.8165ZM76.8917 49.6123H77.6292L77.4643 49.4478H84.1163L84.5564 48.7899H86.7279L87.33 48.1898H88.8912L90.9998 46.0886H92.1327L95.5015 42.9142V40.1679L95.5003 40.1153V33.2529L95.8997 33.5492L96.0171 33.4322V33.052L95.8648 33.212V27.9762L94.9774 27.0926V20.6619L95.8648 19.7778V4.74463C95.533 4.51797 95.2456 4.22235 95.029 3.88464H84.3398L83.2657 4.95513H78.6527L77.0915 6.51081H75.1758L74.785 6.84511H65.8292L66.2696 6.51627H53.083L53.5234 6.84511H42.8629L38.9491 4.87161H29.6228L30.0632 4.54255H25.9003L23.1047 2.56882H22.3672L22.532 2.73336H15.88L15.4397 3.39126H13.2682L12.6664 3.99137H11.1051L8.99681 6.09208L7.86271 6.09276L4.49396 9.26692V12.0137L4.49601 12.0665V18.9287L4.09624 18.6322L3.97902 18.7491V19.1285L4.1309 18.9694V24.2047L5.01893 25.0895V31.5193L4.1309 32.4041V47.5209C4.39361 47.7405 4.61368 48.0011 4.78586 48.2965H15.6572L16.7307 47.2267H21.3437L22.9895 45.671H24.8196L25.2112 45.336H34.1669L33.7266 45.6649H46.9131L46.4727 45.336H57.1332L61.0472 47.3098H70.3733L69.933 47.6386H74.096L76.8917 49.6123Z"
			fill="#29ABE2"
		/>
	</g>
);
