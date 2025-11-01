import { Image, Row } from "react-bootstrap";

export default function ClickToClose() {
	return (
		<Row className="w-100 align-items-center p-0">
			<Image
				src={`/icons/ui/click.svg`}
				alt="click"
				style={{ filter: "opacity(0.8) blur(0.3px)", width: "auto", height: "2em" }}
			/>
			Click anywhere to close
		</Row>
	);
}
