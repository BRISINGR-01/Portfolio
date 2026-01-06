import "../../../css/frame.css";

export default function Frame({ children, size }: React.PropsWithChildren & { size: number }) {
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
				{children}
			</div>
		</div>
	);
}
