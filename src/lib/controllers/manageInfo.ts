import InfoTable from "$lib/models/world/InfoTable";
import World from "$lib/models/world/world";
import { SvelteComponent } from "svelte";
import { EventType } from "../utils/enums";

export function createDisplay(el: SvelteComponent, world: World) {
	const infoTable = new InfoTable(world.eventHandler, el);

	world.eventHandler.on(EventType.OpenMenu, () => infoTable.toggle());
	return infoTable;
}
