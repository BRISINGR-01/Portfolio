import { EventType } from "../../utils/enums";

export default class Event<T> {
	type: EventType;
	private cb: (data: T) => void;

	constructor(type: EventType, cb: (data: T) => void) {
		this.type = type;
		this.cb = cb;
	}

	execute(data: T) {
		this.cb(data);
	}
}
