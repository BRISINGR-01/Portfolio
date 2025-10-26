import type { ContentType, Education, Experience } from "../../types";
import EducationDisplay from "./Education";
import ExperienceDisplay from "./InternshipsAndBigProjects";

export default function ContentDisplay({ data, type }: { data: unknown; type: ContentType }) {
	switch (type) {
		case "projects":
			return <ExperienceDisplay data={data as Experience} />;
		case "education":
			return <EducationDisplay data={data as Education} />;
		default:
			return <></>;
	}
}
