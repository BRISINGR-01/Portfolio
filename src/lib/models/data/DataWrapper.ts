import allData from "../../utils/data.json";

export interface Section {
  name: string;
  type: string;
  image?: string;
  timespan?: string[];
  description: string;
  connections: DataEntity[];
}

interface DataEntity {
  type: string;
  value: string;
  image?: string;
}

export default class DataWrapper {
  data: {
    resources: DataEntity[];
    entities: DataEntity[];
  } = { resources: [], entities: [] };
  sections: Section[];
  constructor() {
    this.data = allData;
    this.sections = allData.sections.map((section) => ({
      ...section,
      connections: section.connections.map(
        (connection) =>
          allData.entities.find((entity) => entity.value === connection)!
      ),
    }));
  }

  get languages() {
    return this.data.entities.filter((el) => el.type === "spoken-language");
  }
}
