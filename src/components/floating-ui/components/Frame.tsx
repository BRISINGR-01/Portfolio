import { useState, type CSSProperties } from "react";
import { Modal } from "react-bootstrap";
import "../../../css/frame.css";

export default function Frame({
	children,
	size,
	notExpandable,
	src,
	style,
	alt,
}: React.PropsWithChildren & {
	size: number;
	src: string;
	notExpandable?: boolean;
	style?: CSSProperties;
	alt: string;
}) {
	const [showBig, setShowBig] = useState(false);

	return (
		<>
			<div
				onClick={() => setShowBig(true)}
				className="hover pointer"
				style={{ width: "fit-content", height: "fit-content" }}
			>
				<FrameComponent
					src={src}
					alt={alt}
					size={size}
					style={{
						minWidth: `${size + 2}em`,
						minHeight: `${size + 2}em`,
						width: "min-content",
						height: "min-content",
						...style,
					}}
				>
					{children}
				</FrameComponent>
			</div>
			<Modal
				show={!notExpandable && !!showBig}
				dialogClassName="show-image-backdrop"
				onHide={() => setShowBig(false)}
				onClick={() => setShowBig(false)}
			>
				<Modal.Body className="p-5">
					{
						<FrameComponent
							src={src}
							alt={alt}
							size={10}
							style={{ ...style, width: "fit-content", height: "80vh", maxHeight: "80vh", maxWidth: "80vw" }}
						>
							{children}
						</FrameComponent>
					}
				</Modal.Body>
			</Modal>
		</>
	);
}

function FrameComponent({
	size,
	style,
	src,
	alt,
}: React.PropsWithChildren & { size: number; src: string; style: CSSProperties; alt: string }) {
	return (
		<div className="content">
			<div className="frame">
				<img className="corner tl invert" src="/frame/l-b.svg" style={{ width: `${size}em` }} />
				<div></div>
				<img className="corner tr invert" src="/frame/r-b.svg" style={{ width: `${size}em` }} />

				<div></div>
				<div />
				<div></div>

				<img className="invert-h corner bl" src="/frame/r-b.svg" style={{ width: `${size}em` }} />
				<div className="edge edge-h edge-b" />
				<img className="invert-h corner br" src="/frame/l-b.svg" style={{ width: `${size}em` }} />
			</div>
			<div
				className="cut-corners"
				style={{
					margin: size / 3 + "em",
				}}
			>
				{isVideo(src) ? (
					<video src={src} controls style={style} />
				) : (
					<img src={src} alt={alt} style={{ objectFit: "contain", ...style }} />
				)}
			</div>
		</div>
	);
}

function isVideo(src: string) {
	return src.endsWith(".mp4");
}
