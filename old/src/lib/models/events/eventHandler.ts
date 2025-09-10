import { EventType } from "../../utils/enums";
import Event from "./Event";
import EventFactory from "./eventFactory";
import HoldEvent from "./holdEvent";
import KeyEvent from "./keyEvent";

const el = document.body;
export default class EventHandler {
  private events: Event<any>[] = [];

  constructor() {
    el.addEventListener("click", (e) => {
      for (const event of this.events) {
        if (event.type === EventType.Click) event.execute(e);
      }
    });

    el.addEventListener("keydown", (e) => {
      for (const event of this.events) {
        if (!(event instanceof KeyEvent) || !event.check(e)) continue;

        if (event.type === EventType.Press) {
          event.execute(e);
        } else if (event instanceof HoldEvent) {
          event.start();
        }
      }
    });

    el.addEventListener("keyup", (e) => {
      for (const event of this.events) {
        if (!(event instanceof KeyEvent) || !event.check(e)) continue;

        if (event.type === EventType.Release) {
          event.execute(e);
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

  on<T extends EventType>(type: T, cb: (data: any) => void) {
    this.events.push(new Event<any>(type, cb));
  }

  fire(type: EventType, data: any) {
    for (const event of this.events) {
      if (event.type === type) event.execute(data);
    }
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
