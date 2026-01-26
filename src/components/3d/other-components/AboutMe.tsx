import type { ContentData } from "../../../types";
import Globe from "./Globe";

export default function AboutMe(props: { selectedIcon: ContentData | null }) {
	return (
		<>
			<Globe language={props.selectedIcon} />
		</>
	);
}
