import { Stack } from "react-bootstrap";
import type { Language } from "../../../types";
import ChangeAnimation from "../components/ChangeAnimation";
import IconFrame from "./IconFrame";

export default function LanguageDisplay({ language }: { language: Language }) {
	return (
		<Stack direction="horizontal" className="align-items-start" gap={4}>
			<div>
				<IconFrame id={language.id} img={language.icon ?? language.altIcon} />
			</div>

			<ChangeAnimation className="mt-4" id={language.id + "-text"}>
				{language.description}
			</ChangeAnimation>
		</Stack>
	);
}
