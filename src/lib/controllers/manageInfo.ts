import InfoTable from "$lib/models/world/InfoTable";
import World from "$lib/models/world/world";

export function createDisplay(el: HTMLElement, world: World) {
	const infoTable = new InfoTable(el);
	world.add(infoTable);
	// infoTable.rotation.copy(world.camera.rotation);
	infoTable.position.set(-3, 4, -3);
	// infoTable.position.addScaledVector(world.camera.position, -3);
	// infoTable.position.addScalar(-3);
}
