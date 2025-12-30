import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { Mode, type Contact, type ContentData, type Education, type Experience, type fn } from "../../types";
import Books from "./books/Books";
import Fontys from "./components/Fontys";
import HologramDisplay from "./components/HologramDisplay";
import Contacts from "./Contact";
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
	const [goBackCb, setGoBackCb] = useState<fn | null>(null);

	return (
		<AnimatePresence>
			{props.type === Mode.Info ? (
				<InfoDisplay onClick={props.close} />
			) : props.data ? (
				<HologramDisplay goBackCb={goBackCb} {...props}>
					<Content {...props} data={props.data} setGoBackCb={setGoBackCb} />
				</HologramDisplay>
			) : null}
		</AnimatePresence>
	);
}

function Content({ data, ...props }: Props & { data: ContentData; setGoBackCb: (cb: fn | null) => void }) {
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
		case Mode.Contact:
			return <Contacts data={data as Contact} />;
	}
}
