import { EventType } from "../../../utils/enums";

export default class KeyEvent {
	key: string;
	isCtrl: boolean;
	type: EventType;
	private cb: Func;

	constructor(key: string, isCtrl: boolean, type: EventType, cb: Func) {
		this.key = key;
		this.isCtrl = isCtrl;
		this.type = type;
		this.cb = cb;
	}

	check(e: KeyboardEvent) {
		return this.key === e.key && e.ctrlKey === this.isCtrl;
	}

	execute() {
		this.cb();
	}
}
