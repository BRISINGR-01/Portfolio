import { SvelteComponent } from "svelte";
import { EventType, ModeType } from "../../utils/enums";
import EventHandler from "../events/eventHandler";

export default class InfoTable {
	private eventHandler: EventHandler;
	private element: SvelteComponent;

	public isShown = false;
	constructor(eventHandler: EventHandler, element: SvelteComponent) {
		this.eventHandler = eventHandler;
		this.element = element;
		this.toggle();
	}

	toggle() {
		this.isShown = !this.isShown;
	}

	switchMode(mode: ModeType) {
		this.eventHandler.fire(EventType.SwitchMode, mode);
	}
}
