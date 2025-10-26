import type { Logo3DParams } from "../../../content";
import Image from "./Image";
import SVGObject from "./SVGObject";

export default function Icon(props: Logo3DParams) {
	if (props.url.endsWith(".svg")) return <SVGObject {...props} />;

	return <Image {...props} />;
}
