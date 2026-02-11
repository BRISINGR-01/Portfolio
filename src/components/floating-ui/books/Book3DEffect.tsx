import "../../../css/book3dEffect.css";

export default function Book3DEffect(props: { image: string; title: string }) {
	return (
		<div style={{ height: "70%", display: "flex" }}>
			<div className="book-3d">
				<div className="book-3d__inner">
					<img className="book-3d__cover" src={props.image} alt={props.title} />
				</div>
			</div>
		</div>
	);
}

// credit: https://codepen.io/jeongmin-kim-the-flexboxer/pen/VwVqxRO?editors=1100
