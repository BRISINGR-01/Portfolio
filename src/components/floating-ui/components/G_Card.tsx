import React from "react";

export enum Position {
	TopLeft,
	TopRight,
	BottomLeft,
	BottomRight,
	Center,
}

function getStyle(pos?: Position) {
	switch (pos) {
		case Position.TopLeft:
			return { top: 0, left: 0 };
		case Position.TopRight:
			return { top: 0, right: 0 };
		case Position.BottomRight:
			return { bottom: 0, right: 0 };
		case Position.BottomLeft:
			return { bottom: 0, left: 0 };
		case Position.Center:
			return { top: "50%", left: "50%", transform: "translate(-50%,-50%)" };
		default:
			return {};
	}
}

export default function G_Card(
	props: { position?: Position } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
	return (
		<>
			<div
				{...props}
				style={{ ...getStyle(props.position), ...props.style }}
				className={`g-card glass-morpihic text-light p-3 position-absolute align-self-center ${props.className}`}
			>
				{props.children}
			</div>
		</>
	);
}
