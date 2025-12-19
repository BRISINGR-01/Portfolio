import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "../../css/iframe.css";

type Props = {
	links: { [key: string]: string };
	icon?: string | null;
	altIcon?: string | null;
};

const size = {
	width: window.innerWidth * 0.8,
	height: window.innerHeight * 0.8,
};

export default function FloatingIFrame({ links, icon, altIcon }: Props) {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<div className="d-flex flex-wrap gap-3 mt-3">
				{Object.entries(links).map(([label, url]) => (
					<a
						key={url}
						href={url}
						target="_blank"
						rel="noreferrer"
						className="hover px-3 py-2 rounded-3 d-flex align-items-center gap-2 text-decoration-none"
						style={{
							background: "linear-gradient(135deg, rgba(0,162,255,0.12), rgba(0,200,255,0.06))",
							boxShadow: "0 0 12px rgba(0,180,255,0.18) inset",
							border: "1px solid rgba(0,200,255,0.18)",
							color: "#9fe6ff",
							fontSize: "0.9rem",
							transition: "transform .15s ease, box-shadow .15s ease",
						}}
					>
						{(label === "Website" && (icon ?? altIcon)) || label === "Github" ? (
							<img
								src={label === "Website" ? icon ?? altIcon! : "/icons/other/github.svg"}
								style={{
									height: "1.6em",
									filter: "drop-shadow(0 0 4px rgba(0,200,255,0.8))",
								}}
							/>
						) : (
							label
						)}
					</a>
				))}
			</div>
			<AnimatePresence>
				{/* Floating panel */}
				{visible && (
					<>
						{/* backdrop */}
						<div
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();

								setVisible(false);
							}}
							style={{
								position: "fixed",
								inset: 0,
								background: "rgba(2,8,15,0.45)",
								backdropFilter: "blur(2px)",
								zIndex: 1040,
							}}
						/>

						<motion.div
							initial={{ opacity: 0, scale: 0.92, y: 20 }}
							exit={{ opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.1 } }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							transition={{ duration: 0.25 }}
							role="dialog"
							aria-label="Preview"
							className="fi-panel"
							style={{
								position: "fixed",
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
						></motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
