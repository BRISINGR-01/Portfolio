import type Controls from "../models/Controls";
import type Entity from "../models/world/entity";
import World from "../models/world/world";
import { wait } from "./helpers";

export abstract class ModeStrategy {
  character: Entity;
  controls: Controls;
  constructor(character: Entity, controls: Controls) {
    this.character = character;
    this.controls = controls;
  }

  start(): Promise<boolean> {
    return wait(true);
  }

  stop(): Promise<boolean> {
    return wait(true);
  }

  abstract render(world: World): void;
}
