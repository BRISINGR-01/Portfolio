import { AnimatePresence } from "motion/react";
import { Mode, type Contact, type ContentData, type Education, type Experience, type fn } from "../../types";
import Books from "./books/Books";
import HologramDisplay from "./components/HologramDisplay";
import Contacts from "./Contact";
import EducationDisplay from "./Education";
import InfoDisplay from "./InfoDisplay";
import Projects from "./Projects";

type Props = {
	data: ContentData | null;
	type: Mode;
	close: fn;
	onSelect: (_: number) => void;
	nrOfPages: number;
	currentPage: number;
};

export default function ContentDisplay(props: Props) {
	return (
		<AnimatePresence>
			{props.type === Mode.Info ? (
				<InfoDisplay onClick={props.close} />
			) : props.data ? (
				<HologramDisplay {...props}>
					<Content {...props} data={props.data} />
				</HologramDisplay>
			) : null}
		</AnimatePresence>
	);
}

function Content({ data, ...props }: Props & { data: ContentData }) {
	switch (props.type) {
		case Mode.Experience: {
			const expData = data as Experience;
			return <Projects close={close} data={expData} />;
		}
		case Mode.Education:
			switch (data.id) {
				case "books":
					return <Books />;
				default:
					return <EducationDisplay data={data as Education} />;
			}
		case Mode.Contact:
			return <Contacts data={data as Contact} />;
	}
}
