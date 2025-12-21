import { TRANSITION } from "../../constants.ts";
import type { Contact } from "../../types";
import ChangeAnimation from "./components/ChangeAnimation.tsx";
import FadeAnim from "./components/FadeAnim.tsx";
import G_Card, { Position } from "./components/G_Card.tsx";

export default function Contacts({ data }: { data: Contact }) {
	return (
		<FadeAnim key="icon" transition={TRANSITION}>
			<G_Card position={Position.TopRight} className="m-4">
				<ChangeAnimation id={data.id} className="p-3">
					<img src={data.icon} className="w-100 mb-3" style={{ height: "10vh", objectFit: "contain" }} />
					<div className="w-100 text-center fw-bold fs-5">{data.title}</div>
					<a href={data.url} className="pointer w-100 text-center fw-bold fs-5">
						{data.address} <img src="icons/ui/open-link.svg" alt="" style={{ height: "1em" }} />
					</a>
				</ChangeAnimation>
			</G_Card>
		</FadeAnim>
	);
}
