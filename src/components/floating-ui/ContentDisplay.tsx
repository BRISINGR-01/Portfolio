import { Mode, type Contact, type ContentData, type Education, type Experience } from "../../types";
import Books from "./books/Books";
import Contacts from "./Contact";
import EducationDisplay from "./Education";
import ExperienceDisplay from "./InternshipsAndBigProjects";

export default function ContentDisplay({ data, type }: { data: ContentData; type: Mode }) {
	switch (type) {
		case Mode.Experience:
			return <ExperienceDisplay data={data as Experience} />;
		case Mode.Education:
			switch (data.id) {
				case "books":
					return <Books />;
				default:
					return <EducationDisplay data={data as Education} />;
			}
		case Mode.Contact:
			return <Contacts data={data as Contact} />;
		default:
			return null;
	}
}
