import type { ContentType, Education, WorkingExperience } from "../../content";
import EducationDisplay from "./Education";
import ExperienceDisplay from "./InternshipsAndBigProjects";

export default function ContentDisplay({ data, type }: { data: unknown; type: ContentType }) {
	switch (type) {
		case "projects":
			return <ExperienceDisplay data={data as WorkingExperience} />;
		case "education":
			return <EducationDisplay data={data as Education} />;
		default:
			return <></>;
	}
}
