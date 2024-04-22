import { ModeStrategy } from "$lib/utils/types";
import { wait } from "../../utils/helpers";
import World from "../world/world";

export default class ModeDecorator extends ModeStrategy {
  child: ModeStrategy;
  finish: (val: boolean) => void;
  private isReady: () => Promise<boolean>;

  constructor(child: ModeStrategy) {
    super(child.character, child.controls);
    this.child = child;
    this.finish = () => false;
    this.isReady = () => wait(false);
  }

  start() {
    this.isReady = () => this.child.start();

    return new Promise<boolean>((resolve) => {
      this.finish = resolve;
    });
  }

  stop() {
    this.isReady = () => this.child.stop();

    return new Promise<boolean>((resolve) => {
      this.finish = resolve;
    });
  }

  render(world: World) {
    this.isReady().then((isReady) => {
      if (isReady) {
        this.finish(true);
      } else {
        this.child.render(world);
      }
    });
  }
}
