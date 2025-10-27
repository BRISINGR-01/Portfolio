import type { ContentData } from "../../../types";
import GLB from "./GLB";
import Image from "./Image";
import SVGObject from "./SVGObject";

export default function Icon(props: ContentData) {
	if (props.icon.endsWith(".svg")) return <SVGObject {...props} />;
	if (props.icon.endsWith(".glb")) return <GLB {...props} />;

	return <Image {...props} />;
}
