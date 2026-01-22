import type { ContentData } from "../../../types";
import Image from "../icon/Image";
import SVGObject from "../icon/SVGObject";
import Globe from "./Globe";

export default function AboutMe(props: { selectedIcon: ContentData | null }) {
	return (
		<>
			<Globe language={props.selectedIcon} />
			<SVGObject
				icon="frame/img-frame.svg"
				icon3D={{
					position: [0.21, 2.67, 0.015],
					rotation: [0, 0, 0],
					scale: 0.0015,
					wide: true,
				}}
				id=""
				title=""
			/>

			<Image
				src="images/other/me.png"
				id="me-pic"
				scale={1.5}
				position={[1, 1.5, 0]}
				rotation={[0, 0, 0]}
				ratio={0.67}
			/>
		</>
	);
}
