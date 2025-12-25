import "../../../css/frame.css";

export default function Frame({ children, size }: React.PropsWithChildren & { size: number }) {
	return (
		<div className="content">
			<div
				className="cut-corners"
				style={{
					margin: size / 3 + "em",
				}}
			>
				{children}
			</div>
			<div className="frame">
				<img className="corner tl invert" src="/frame/l-b.svg" style={{ width: `${size}em` }} />
				<div></div>
				<img className="corner tr invert" src="/frame/r-b.svg" style={{ width: `${size}em` }} />

				<div></div>
				<div />
				<div></div>

				<img className="corner bl" src="/frame/l-b.svg" style={{ width: `${size}em` }} />
				<div className="edge edge-h edge-b" />
				<img className="corner br" src="/frame/r-b.svg" style={{ width: `${size}em` }} />
			</div>
		</div>
	);
}
