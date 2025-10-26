import type { ContentData } from "../../../types";
import Image from "./Image";
import SVGObject from "./SVGObject";

export default function Icon(props: ContentData) {
	if (props.icon.endsWith(".svg")) return <SVGObject {...props} />;

	return <Image {...props} />;
}
