import { EventType } from "../../../utils/enums";
import EventHandler from "./eventHandler";
import HoldEvent from "./holdEvent";
import KeyEvent from "./keyEvent";

export default class EventFactory {
	private key: string;
	private mustBeCtrl: boolean;
	private handler: EventHandler;

	constructor(key: string, mustBeCtrl: boolean = false, eventHandler: EventHandler) {
		this.key = key;
		this.mustBeCtrl = mustBeCtrl;
		this.handler = eventHandler;
	}

	onPress(cb: Func) {
		this.handler.addEvent(new KeyEvent(this.key, this.mustBeCtrl, EventType.Press, cb));

		return this;
	}

	onRelease(cb: Func) {
		this.handler.addEvent(new KeyEvent(this.key, this.mustBeCtrl, EventType.Release, cb));

		return this;
	}

	onHold(cb: Func) {
		this.handler.addEvent(new HoldEvent(this.key, this.mustBeCtrl, EventType.Hold, cb));

		return this;
	}
}
