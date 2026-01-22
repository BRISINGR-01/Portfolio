import { Mode } from "../types";
import { aboutMe } from "./about-me";
import { education } from "./education";
import { experience } from "./experience";

const content = { experience, education, [Mode.AboutMe]: aboutMe };
export default content;
