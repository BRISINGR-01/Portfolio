import KeyEvent from "./keyEvent";

export default class HoldEvent extends KeyEvent {
  private isOngoing = false;

  start() {
    this.isOngoing = true;
  }

  stop() {
    this.isOngoing = false;
  }

  execute(e: KeyboardEvent) {
    if (this.isOngoing) super.execute(e);
  }
}
