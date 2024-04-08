import { EventType } from "../../utils/enums";
import Event from "./Event";

export default class KeyEvent extends Event<KeyboardEvent> {
	key: string;
	isCtrl: boolean;

	constructor(key: string, isCtrl: boolean, type: EventType, cb: (data: KeyboardEvent) => void) {
		super(type, cb);
		this.key = key;
		this.isCtrl = isCtrl;
	}

	check(e: KeyboardEvent) {
		return this.key === e.key && e.ctrlKey === this.isCtrl;
	}
}
