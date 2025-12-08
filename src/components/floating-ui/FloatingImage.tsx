import React, { useEffect, useRef, useState } from "react";
import "../../css/holo-gallery.css";

type HoloGalleryProps = {
	images: string[];
	initialWidth?: number;
	initialHeight?: number;
	open: boolean;
	onClose?: () => void;
};

export default function HoloGallery({ images, open, onClose }: HoloGalleryProps) {
	const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

	const [positions, setPositions] = useState(
		images.map(() => ({
			x: rand(50, window.innerWidth - 300), // max width panel ~300px
			y: rand(50, window.innerHeight - 200), // max height panel ~200px
		}))
	);

	const [sizes, setSizes] = useState(
		images.map(() => ({
			width: rand(200, 280), // reasonable width
			height: rand(150, 180), // reasonable height
		}))
	);

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

	if (!open) return null;

	return (
		<div className="hg-backdrop" onClick={onClose}>
			{images.map((image, i) => (
				<div
					key={i}
					ref={(el) => (panelRefs.current[i] = el!)}
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
					<div className="hg-header" onMouseDown={(e) => startDrag(e, i)}>
						<span>Holo Gallery</span>
						<button className="hg-close" onClick={onClose}>
							✕
						</button>
					</div>

					<img
						src={image}
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
				</div>
			))}
		</div>
	);
}
