import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { Mode, type ContentData, type Education, type Experience, type fn } from "../../../types";
import Books from "../books/Books";
import Fontys from "../components/Fontys";
import HologramDisplay from "../hologram-display/HologramDisplay";
import AboutMe from "./AboutMe";
import EducationDisplay from "./Education";
import Experiences from "./Experiences";
import InfoDisplay from "./InfoDisplay";

type Props = {
	data: ContentData | null;
	type: Mode;
	close: fn;
	goBack?: fn;
	onSelect: (_: number) => void;
	nrOfPages: number;
	currentPage: number;
};

export default function ContentDisplay(props: Props) {
	const [goBackCb, setGoBackCb] = useState<fn | undefined>(undefined);

	return (
		<AnimatePresence>
			{props.type === Mode.Info ? (
				<InfoDisplay onClick={props.close} />
			) : props.data ? (
				<HologramDisplay
					goBackCb={goBackCb}
					close={props.close}
					{...(props.type === Mode.AboutMe
						? { nrOfPages: undefined, onSelect: undefined, currentPage: undefined }
						: props)}
				>
					<Content {...props} data={props.data} setGoBackCb={setGoBackCb} />
				</HologramDisplay>
			) : null}
		</AnimatePresence>
	);
}

function Content({ data, ...props }: Props & { data: ContentData; setGoBackCb: (cb?: fn) => void }) {
	switch (props.type) {
		case Mode.Experience: {
			const expData = data as Experience;
			return <Experiences close={close} data={expData} />;
		}
		case Mode.Education:
			switch (data.id) {
				case "fontys":
					return <Fontys setGoBackCb={props.setGoBackCb} />;
				case "books":
					return <Books />;
				default:
					return <EducationDisplay data={data as Education} />;
			}
		case Mode.AboutMe:
			return <AboutMe />;
	}
}
