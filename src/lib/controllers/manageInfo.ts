import { SvelteComponent } from "svelte";
import InfoTable from "../models/world/InfoTable";
import World from "../models/world/world";
import { EventType } from "../utils/enums";

export function createDisplay(el: SvelteComponent, world: World) {
  const infoTable = new InfoTable(world.eventHandler, el);

  world.eventHandler.on(EventType.OpenMenu, () => infoTable.toggle());
  return infoTable;
}
