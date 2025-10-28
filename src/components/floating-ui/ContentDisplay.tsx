import type { ContentData, ContentType, Education, Experience } from "../../types";
import Books from "./Books";
import EducationDisplay from "./Education";
import ExperienceDisplay from "./InternshipsAndBigProjects";

export default function ContentDisplay({ data, type }: { data: ContentData; type: ContentType }) {
	switch (type) {
		case "projects":
			return <ExperienceDisplay data={data as Experience} />;
		case "education":
			switch (data.id) {
				case "books":
					return <Books />;
				default:
					return <EducationDisplay data={data as Education} />;
			}
		default:
			return <></>;
	}
}
