import { ModeType } from "../../utils/enums";

export default class Context {
	controls = { a: false, s: false, w: false, d: false, r: false, shift: false };
	ModeState: ModeType = ModeType.Idle;
}
