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
				<Modal.Body
					className="p-5 d-flex justify-content-center align-items-center"
					style={{ height: "100vh", width: "100vw" }}
				>
					{
						<FrameComponent src={src} alt={alt} isBig style={{ ...style }}>
							{children}
						</FrameComponent>
					}
				</Modal.Body>
			</Modal>
		</>
	);
}

function FrameComponent({
	isBig,
	style,
	src,
	alt,
}: React.PropsWithChildren & { isBig?: boolean; src: string; style: CSSProperties; alt: string }) {
	const size = isBig ? 15 : 9;

	return (
		<div className={`content cut-${isBig ? "big" : "small"}`}>
			<div className="frame">
				<img className="corner tl invert" src="/frame/l-b.svg" style={{ width: `${size}vh` }} />
				<div></div>
				<img className="corner tr invert" src="/frame/r-b.svg" style={{ width: `${size}vh` }} />

				<div></div>
				<div />
				<div></div>

				<img className="invert-h corner bl" src="/frame/r-b.svg" style={{ width: `${size}vh` }} />
				<div className="edge edge-h edge-b" />
				<img className="invert-h corner br" src="/frame/l-b.svg" style={{ width: `${size}vh` }} />
			</div>
			<div className="cut-corners" style={isBig ? { margin: "2em" } : { margin: "1.6em" }}>
				<div className="bg-black" style={{ minHeight: 0 }}>
					{isVideo(src) ? (
						<video
							src={src}
							controls
							style={{ objectFit: "contain", ...(isBig ? { width: "100%", height: "100%" } : style) }}
						/>
					) : (
						<img
							src={src}
							alt={alt}
							style={{
								objectFit: "contain",
								...(isBig ? { maxHeight: "calc(100vh - 10em)", maxWidth: "calc(100vw - 10em)" } : style),
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

function isVideo(src: string) {
	return src.endsWith(".mp4");
}
