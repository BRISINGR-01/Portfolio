import { Image, Stack } from "react-bootstrap";
import type { Book, fn } from "../../../types";
import FadeAnim from "../components/FadeAnim";
import Frame from "../components/Frame";

export default function BookDetails(props: { book: Book; onClick: fn }) {
	return (
		<FadeAnim onClick={props.onClick} className="p-5">
			<Stack className="justify-content-between" gap={5}>
				<Stack direction="horizontal" gap={4} className="align-items-start">
					<div className="col-4 col-md-3">
						<Frame size={3}>
							<Image
								src={`/images/book-covers/${props.book.cover}`}
								alt={props.book.title}
								fluid
								style={{
									boxShadow: "0px 0 10px 0px rgb(0 170 255 / 70%)",
									borderRadius: "15px",
									objectFit: "contain",
								}}
							/>
						</Frame>
					</div>

					<div className="col-8 col-xs-12 pe-0 pt-1">
						<h4 className="fw-semibold mb-0">{props.book.title}</h4>
						<h6 className="mb-0" style={{ color: "#7db9bd" }}>
							{props.book.subTitle}
							<br />
							<span className="small" style={{ color: "#7db9bd" }}>
								by {props.book.author}
							</span>
						</h6>

						<p className="mt-4">"{props.book.description}"</p>
					</div>
				</Stack>
				<Stack direction="horizontal">
					<Image
						src={`/icons/ui/click.svg`}
						alt="click"
						style={{ filter: "opacity(0.8) blur(0.3px)", width: "auto", height: "2em" }}
					/>
					Click anywhere to go back
				</Stack>
			</Stack>
		</FadeAnim>
	);
}
