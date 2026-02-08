import { useState } from "react";
import { OverlayTrigger, Stack, Tooltip } from "react-bootstrap";

export default function Link(props: React.PropsWithChildren & { url: string; hoverText?: string; download?: boolean }) {
	const [isHoverred, setIsHovered] = useState(false);
	return (
		<OverlayTrigger
			show={props.hoverText ? undefined : false}
			delay={500}
			overlay={<Tooltip className="glow-text">{props.hoverText}</Tooltip>}
		>
			<Stack
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className="align-items-center hover"
				style={{ width: "min-content", flex: 0 }}
				gap={1}
			>
				<a href={props.url} target="_blank" download={props.download}>
					{props.children}
				</a>
				<div
					style={{
						background: "white",
						height: "2px",
						width: isHoverred ? "90%" : "0%",
						boxShadow: isHoverred ? "0 0 3px 1px var(--primary)" : "",
						borderRadius: "10px",
						transition: ".3s",
					}}
				/>
			</Stack>
		</OverlayTrigger>
	);
}
export function GithubLink(props: { url: string }) {
	return (
		<Link hoverText="github" url={props.url}>
			<img
				alt="github"
				src="icons/other/github-outline.svg"
				style={{ height: "2rem", filter: "drop-shadow(0px 0px 3px #00aaff)" }}
			/>
		</Link>
	);
}

export function TextLink(props: React.PropsWithChildren & { url: string }) {
	return (
		<a href={props.url} target="_blank">
			{props.children}
		</a>
	);
}
