import KeyEvent from "./keyEvent";

export default class HoldEvent extends KeyEvent {
	private isOngoing = false;

	start() {
		this.isOngoing = true;
	}

	stop() {
		this.isOngoing = false;
	}

	execute() {
		if (this.isOngoing) super.execute();
	}
}
