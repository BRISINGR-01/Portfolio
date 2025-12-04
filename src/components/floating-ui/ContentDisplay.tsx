import { AnimatePresence } from "motion/react";
import type { JSX } from "react/jsx-runtime";
import { Mode, type Contact, type ContentData, type Education, type Experience, type fn } from "../../types";
import { parseTimeSpan } from "../../utils";
import Books from "./books/Books";
import Contacts from "./Contact";
import EducationDisplay from "./Education";
import Template from "./Template";

export default function ContentDisplay({ data, type, close }: { data: ContentData | null; type: Mode; close: fn }) {
	let child: JSX.Element | null = null;

	if (!data) return <AnimatePresence />;

	switch (type) {
		case Mode.Experience:
			// child = <ExperienceDisplay data={data as Experience} />;
			const expData = data as Experience;
			child = (
				<Template
					close={close}
					data={expData}
					imageCaption={
						<>
							<span className="text-center fw-bold fs-5">{expData.title}</span>
							<span className="text-nowrap fw-bold fs-6">
								{parseTimeSpan(expData.timespan[0])} - {parseTimeSpan(expData.timespan[1])}
							</span>
						</>
					}
				/>
			);
			break;
		case Mode.Education:
			switch (data.id) {
				case "books":
					child = <Books close={close} />;
					break;
				default:
					child = <EducationDisplay data={data as Education} />;
					break;
			}
			break;
		case Mode.Contact:
			child = <Contacts data={data as Contact} />;
			break;
	}

	return <AnimatePresence>{child}</AnimatePresence>;
}
