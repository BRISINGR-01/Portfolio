import { motion } from "framer-motion";
import { AnimatePresence } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { TRANSITION } from "../../constants";
import "../../css/holo-gallery.css";

const w = window.innerWidth;
const h = window.innerHeight;

function layoutWindows(count: number) {
	const padX = w * 0.05;
	const padY = h * 0.05;

	const usableW = w - padX * 2;
	const usableH = h - padY * 2;

	// uniform grid generator
	function cellGrid(rows: number, cols: number) {
		const cw = usableW / cols;
		const ch = usableH / rows;

		return [...Array(rows * cols)].map((_, i) => {
			const col = i % cols;
			const row = Math.floor(i / cols);

			// base position
			let x = padX + col * cw;
			let y = padY + row * ch;

			// random offset inside the cell (safe margins)
			const rx = cw * 0.35 * Math.random();
			const ry = ch * 0.35 * Math.random();

			// random scale factor 90–110%
			const scale = 1 + Math.random() * 0.5;

			const width = cw * 0.85 * scale;
			const height = width * 0.56;

			// clamp so nothing escapes the cell
			x = Math.max(x + rx, padX);
			y = Math.max(y + ry, padY);

			return { x, y, width, height };
		});
	}

	switch (count) {
		case 1:
			return cellGrid(1, 1);

		case 2:
			return cellGrid(1, 2);

		case 3:
			return cellGrid(2, 2).slice(0, 3);

		case 4:
			return cellGrid(2, 2);

		case 5:
			return cellGrid(2, 3).slice(0, 5);

		case 6:
			return cellGrid(2, 3);

		default:
			return [];
	}
}

export default function HoloGallery({
	images,
	open,
	toggle,
}: {
	images: { title: string; src: string }[];
	open: boolean;
	toggle: () => void;
}) {
	return (
		<>
			<img
				src="icons/ui/gallery.svg"
				alt="images"
				style={{ height: "3em", width: "fit-content" }}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					toggle();
				}}
			/>
			<AnimatePresence>{open && <FloatingWindows images={images} toggle={toggle} />}</AnimatePresence>
		</>
	);
}

function FloatingWindows({ images, toggle }: { images: { title: string; src: string }[]; toggle: () => void }) {
	const [openImages, setOpenImages] = useState<({ title: string; src: string } | null)[]>([]);
	const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
	const [sizes, setSizes] = useState<{ width: number; height: number }[]>([]);

	useEffect(() => {
		const layout = layoutWindows(images.length);

		setPositions(layout);
		setSizes(layout);
		setOpenImages([...images]);
	}, [images]);

	const [current, setCurrent] = useState(0);

	const dragRefs = useRef(images.map(() => ({ dragging: false, offsetX: 0, offsetY: 0 })));
	const resizeRefs = useRef(images.map(() => ({ resizing: false, startX: 0, startY: 0, startW: 0, startH: 0 })));

	const panelRefs = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		const onMove = (e: MouseEvent) => {
			positions.forEach((_, i) => {
				if (dragRefs.current[i].dragging) {
					setPositions((prev) => {
						const next = [...prev];
						next[i] = {
							x: e.clientX - dragRefs.current[i].offsetX,
							y: e.clientY - dragRefs.current[i].offsetY,
						};
						return next;
					});
				} else if (resizeRefs.current[i].resizing) {
					setSizes((prev) => {
						const next = [...prev];
						const dx = e.clientX - resizeRefs.current[i].startX;
						const dy = e.clientY - resizeRefs.current[i].startY;
						next[i] = {
							width: Math.max(200, resizeRefs.current[i].startW + dx),
							height: Math.max(150, resizeRefs.current[i].startH + dy),
						};
						return next;
					});
				}
			});
		};

		const onUp = () => {
			dragRefs.current.forEach((r) => (r.dragging = false));
			resizeRefs.current.forEach((r) => (r.resizing = false));
		};

		window.addEventListener("mousemove", onMove);
		window.addEventListener("mouseup", onUp);
		return () => {
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseup", onUp);
		};
	}, [positions, sizes]);

	const startDrag = (e: React.MouseEvent, i: number) => {
		if (!panelRefs.current[i]) return;
		setCurrent(i);
		const rect = panelRefs.current[i].getBoundingClientRect();
		dragRefs.current[i].dragging = true;
		dragRefs.current[i].offsetX = e.clientX - rect.left;
		dragRefs.current[i].offsetY = e.clientY - rect.top;
	};

	const startResize = (e: React.MouseEvent, i: number) => {
		resizeRefs.current[i].resizing = true;
		resizeRefs.current[i].startX = e.clientX;
		resizeRefs.current[i].startY = e.clientY;
		resizeRefs.current[i].startW = sizes[i].width;
		resizeRefs.current[i].startH = sizes[i].height;
		e.stopPropagation();
	};

	const selectImage = (e: React.MouseEvent, i: number) => {
		setCurrent(i);
		e.stopPropagation();
	};

	return (
		<div
			className="hg-backdrop"
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				toggle();
			}}
		>
			{openImages.map(
				(image, i) =>
					image && (
						<motion.div
							initial={{ opacity: 0, scale: 0.2, y: h - positions[i].y }}
							animate={{
								opacity: 1,
								scale: 1,
								y: 0,
								transition: {
									type: "spring",
									stiffness: 180,
									damping: 20,
									duration: 0.1,
								},
							}}
							exit={{
								opacity: 0,
								scale: 0.2,
								y: h - positions[i].y,
								transition: TRANSITION,
							}}
							key={i}
							ref={(el) => {
								panelRefs.current[i] = el!;
							}}
							className="hg-panel"
							style={{
								left: positions[i].x,
								top: positions[i].y,
								userSelect: "none",
								width: sizes[i].width,
								height: sizes[i].height,
								zIndex: 1000 + (i === current ? 100 : i),
							}}
							onClick={(e) => selectImage(e, i)}
						>
							<div className="hg-header pointer" onMouseDown={(e) => startDrag(e, i)}>
								<span>{image.title}</span>
								<button
									className="hg-close"
									onClick={() =>
										setOpenImages((prev) => {
											prev[i] = null;

											if (prev.every((img) => !img)) toggle();

											return [...prev];
										})
									}
								>
									✕
								</button>
							</div>

							<img
								src={image.src}
								className="hg-img"
								style={{
									pointerEvents: "none",
									userSelect: "none",
								}}
								alt={`holo-${i}`}
							/>
							<div
								className="hg-resize grab"
								onMouseDown={(e) => startResize(e, i)}
								style={{
									position: "absolute",
									right: 0,
									bottom: 0,
									width: "1.2em",
									height: "1.2em",
									background: "rgba(0,180,255,0.3)",
									borderLeft: "1px solid rgba(0,255,255,0.6)",
									borderTop: "1px solid rgba(0,255,255,0.6)",
									boxShadow: "0 0 8px rgba(0,200,255,0.5) inset",
									display: "flex",
									alignItems: "center",
									userSelect: "none",
									justifyContent: "center",
								}}
							>
								<img
									src="icons/ui/resize.svg"
									alt="resize"
									style={{
										pointerEvents: "none",
										height: "1em",
										userSelect: "none",
										filter: "drop-shadow(0 0 3px #0ff)",
									}}
								/>
							</div>
						</motion.div>
					)
			)}
		</div>
	);
}
