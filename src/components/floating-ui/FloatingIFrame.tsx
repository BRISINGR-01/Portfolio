import React, { useEffect, useRef, useState } from "react";
import "../../css/iframe.css";

type Props = {
	links: { [key: string]: string };
	icon?: string | null;
	altIcon?: string | null;
};

const size = {
	width: window.innerWidth / 1.5,
	height: window.innerHeight / 1.5,
};

export default function FloatingIFrame({ links, icon, altIcon }: Props) {
	const [iframeSrc, setIframeSrc] = useState<string | null>(null);
	const [visible, setVisible] = useState(false);

	// floating panel position
	const [pos, setPos] = useState({ x: -200, y: -200 });
	const dragRef = useRef<{ dragging: boolean; offsetX: number; offsetY: number }>({
		dragging: false,
		offsetX: 0,
		offsetY: 0,
	});

	const panelRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setVisible(false);
				setIframeSrc(null);
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	useEffect(() => {
		function onMove(e: MouseEvent) {
			if (!dragRef.current.dragging || !panelRef.current) return;
			const x = e.clientX - dragRef.current.offsetX;
			const y = e.clientY - dragRef.current.offsetY;
			setPos({ x, y });
		}
		function onUp() {
			dragRef.current.dragging = false;
		}
		window.addEventListener("mousemove", onMove);
		window.addEventListener("mouseup", onUp);
		// touch
		function onTouchMove(e: TouchEvent) {
			if (!dragRef.current.dragging || !panelRef.current) return;
			const t = e.touches[0];
			const x = t.clientX - dragRef.current.offsetX;
			const y = t.clientY - dragRef.current.offsetY;
			setPos({ x, y });
		}
		function onTouchEnd() {
			dragRef.current.dragging = false;
		}
		window.addEventListener("touchmove", onTouchMove, { passive: false });
		window.addEventListener("touchend", onTouchEnd);
		return () => {
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseup", onUp);
			window.removeEventListener("touchmove", onTouchMove);
			window.removeEventListener("touchend", onTouchEnd);
		};
	}, []);

	function openLink(e: React.MouseEvent, url: string, label: string) {
		const isGithub = /github\.com/i.test(url) || label.toLowerCase().includes("github");
		if (!isGithub) {
			e.preventDefault();
			setIframeSrc(url);
			setVisible(true);
			// bring to center-ish
			setPos({ x: (window.innerWidth - size.width) / 2, y: (window.innerHeight - size.height) / 2 });
			return;
		}
		// non-github normal behavior: open in new tab
		// (link has target="_blank" by default below)
	}

	function startDrag(e: React.MouseEvent | React.TouchEvent) {
		const rect = panelRef.current?.getBoundingClientRect();
		let clientX = 0;
		let clientY = 0;
		if ("touches" in e && e.touches.length) {
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
		} else if ("clientX" in e) {
			clientX = (e as React.MouseEvent).clientX;
			clientY = (e as React.MouseEvent).clientY;
		}
		if (!rect) return;
		dragRef.current.dragging = true;
		dragRef.current.offsetX = clientX - rect.left;
		dragRef.current.offsetY = clientY - rect.top;
	}

	return (
		<>
			<div className="d-flex flex-wrap gap-3 mt-3">
				{Object.entries(links).map(([label, url]) => (
					<a
						key={url}
						href={url}
						target="_blank"
						rel="noreferrer"
						className="px-3 py-2 rounded-3 d-flex align-items-center gap-2 text-decoration-none"
						style={{
							background: "linear-gradient(135deg, rgba(0,162,255,0.12), rgba(0,200,255,0.06))",
							boxShadow: "0 0 12px rgba(0,180,255,0.18) inset",
							border: "1px solid rgba(0,200,255,0.18)",
							color: "#9fe6ff",
							fontSize: "0.9rem",
							transition: "transform .15s ease, box-shadow .15s ease",
						}}
						onMouseEnter={(e) => {
							(e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
							(e.currentTarget as HTMLElement).style.boxShadow =
								"0 6px 24px rgba(0,180,255,0.18), inset 0 2px 8px rgba(0,220,255,0.06)";
						}}
						onMouseLeave={(e) => {
							(e.currentTarget as HTMLElement).style.transform = "translateY(0)";
							(e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px rgba(0,180,255,0.18) inset";
						}}
						onClick={(e) => openLink(e, url, label)}
					>
						{(label === "Website" && (icon ?? altIcon)) || label === "Github" ? (
							<img
								src={label === "Website" ? icon ?? altIcon! : "/icons/other/github.svg"}
								style={{ height: "1.6em", filter: "drop-shadow(0 0 4px rgba(0,200,255,0.8))" }}
							/>
						) : (
							label
						)}
					</a>
				))}
			</div>

			{/* Floating iframe panel */}
			{visible && iframeSrc && (
				<>
					{/* backdrop */}
					<div
						onClick={() => {
							setVisible(false);
							setIframeSrc(null);
						}}
						style={{
							position: "fixed",
							inset: 0,
							background: "rgba(2,8,15,0.45)",
							backdropFilter: "blur(2px)",
							zIndex: 1040,
						}}
					/>

					<div
						ref={panelRef}
						role="dialog"
						aria-label="GitHub preview"
						className="fi-panel"
						style={{
							position: "fixed",
							left: pos.x,
							top: pos.y,
							...size,
							borderRadius: 12,
							overflow: "hidden",
							background: "linear-gradient(180deg, rgba(10,18,26,0.95), rgba(6,12,20,0.95))",
							boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 6px 30px rgba(0,120,255,0.08)",
							zIndex: 1050,
							border: "1px solid rgba(100,200,255,0.08)",
							display: "flex",
							flexDirection: "column",
						}}
					>
						{/* header (drag handle) */}
						<div
							onMouseDown={startDrag}
							onTouchStart={startDrag}
							style={{
								cursor: "grab",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								padding: "8px 10px",
								userSelect: "none",
								background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005))",
								borderBottom: "1px solid rgba(255,255,255,0.02)",
							}}
						>
							<div style={{ display: "flex", gap: 10, alignItems: "center" }}>
								<div
									style={{
										width: 10,
										height: 10,
										borderRadius: 99,
										background: "#67d8ff",
										boxShadow: "0 0 10px rgba(103, 217, 255, 1)",
									}}
								/>
								<span style={{ fontSize: 12, marginLeft: 8 }}>{new URL(iframeSrc).hostname}</span>
							</div>

							<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
								<a
									href={iframeSrc}
									target="_blank"
									rel="noreferrer"
									style={{
										color: "#9fe6ff",
										textDecoration: "none",
										fontSize: 13,
										padding: "6px 8px",
										borderRadius: 8,
										background: "rgba(0,180,255,0.06)",
									}}
								>
									Open
								</a>
								<button
									aria-label="Close preview"
									onClick={() => {
										setVisible(false);
										setIframeSrc(null);
									}}
									style={{
										border: "none",
										background: "transparent",
										color: "#bfeefe",
										fontSize: 18,
										cursor: "pointer",
										padding: 6,
										borderRadius: 6,
									}}
								>
									✕
								</button>
							</div>
						</div>

						{/* iframe */}
						<iframe
							src={iframeSrc}
							className="fi-iframe"
							sandbox="allow-scripts allow-same-origin allow-forms"
							style={{ flex: 1, background: "#071017" }}
							title="github-preview"
						/>
					</div>
				</>
			)}
		</>
	);
}
