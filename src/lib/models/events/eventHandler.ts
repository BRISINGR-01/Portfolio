import { EventType } from "../../../utils/enums";
import EventFactory from "./eventFactory";
import HoldEvent from "./holdEvent";
import KeyEvent from "./keyEvent";

const el = document.body;
export default class EventHandler {
	private events: KeyEvent[] = [];

	constructor() {
		el.addEventListener("click", (e) => {
			for (const event of this.events) {
				if (event.type === EventType.Click) event.execute();
			}
		});

		el.addEventListener("keydown", (e) => {
			for (const event of this.events) {
				if (!event.check(e)) continue;

				if (event.type === EventType.Press) {
					event.execute();
				} else if (event instanceof HoldEvent) {
					event.start();
				}
			}
		});

		el.addEventListener("keyup", (e) => {
			for (const event of this.events) {
				if (!event.check(e)) continue;

				if (event.type === EventType.Release) {
					event.execute();
				} else if (event instanceof HoldEvent) {
					event.stop();
				}
			}
		});
	}

	bindKey(key: string, mustBeCtrl: boolean = false) {
		return new EventFactory(key, mustBeCtrl, this);
	}

	addEvent(event: KeyEvent) {
		this.events.push(event);
	}

	onClick(cb: (data: { x: number; y: number }) => void) {
		el.addEventListener("click", (e) => cb({ x: e.x, y: e.y }));
	}

	executeHolding() {
		for (const event of this.events) {
			if (event instanceof HoldEvent) {
				event.execute();
			}
		}
	}
}
