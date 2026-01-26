import { motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState, type JSX } from "react";
import type { fn } from "../../../types";
import ContentContainer from "./ContentContainer";
import GalleryNav from "./GalleryNav";
import { svg } from "./svg";

export default function HologramDisplay(props: {
	children: React.ReactNode;
	close: fn;
	goBackCb?: fn;
	onSelect?: (i: number) => void;
	nrOfPages?: number;
	currentPage?: number;
}) {
	const [boxes, setBoxes] = useState<{
		x: DOMRect | null;
		frame: DOMRect | null;
		contentFrame: DOMRect | null;
	}>({ frame: null, contentFrame: null, x: null });
	const contentFrameRef = useRef<SVGSVGElement | null>(null);
	const frameRef = useRef<SVGSVGElement | null>(null);
	const XposRef = useRef<SVGSVGElement | null>(null);

	function update() {
		setBoxes({
			contentFrame: contentFrameRef.current ? contentFrameRef.current.getBoundingClientRect().toJSON() : null,
			frame: frameRef.current ? frameRef.current.getBoundingClientRect().toJSON() : null,
			x: XposRef.current ? XposRef.current.getBoundingClientRect().toJSON() : null,
		});
	}

	useEffect(() => {
		if (!frameRef.current) return;

		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	});

	return (
		<>
			<div className="position-absolute w-100 h-100 top-0 left-0 z-0" onClick={props.close} />

			{props.onSelect && props.nrOfPages && props.currentPage != undefined && (
				<GalleryNav onSelect={props.onSelect} nrOfPages={props.nrOfPages} currentPage={props.currentPage} />
			)}

			{boxes.frame && boxes.x && (
				<ContentContainer
					box={
						boxes as {
							x: DOMRect;
							frame: DOMRect;
							contentFrame: DOMRect;
							backBtn: DOMRect;
						}
					}
					{...props}
				/>
			)}

			<AnimatedSVG onClick={props.close}>
				{svg}
				<foreignObject ref={useRegisterRef(frameRef, update)} width="100%" height="100%" />
				<rect ref={useRegisterRef(XposRef, update)} x="90" y="6" width="1" height="1" />
				<rect ref={useRegisterRef(contentFrameRef, update)} x="5" y="7" width="90" height="39" />
			</AnimatedSVG>
		</>
	);
}

function useRegisterRef(ref: React.RefObject<SVGElement | null>, update: fn) {
	return useCallback((node: SVGElement | null) => {
		ref.current = node;
		update();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
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

function AnimatedSVG(props: { children: JSX.Element[]; onClick: fn }) {
	return (
		<motion.svg
			onClick={props.onClick}
			initial="hidden"
			animate="show"
			exit="exit"
			variants={{
				hidden: { opacity: 1 },
				exit: { opacity: 0, transition: { delay: 0.1 } },
				show: { transition: { staggerChildren: 0.01 /* delay between elements*/ } },
			}}
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
			{React.Children.map(props.children, animateChildren)}
		</motion.svg>
	);
}
