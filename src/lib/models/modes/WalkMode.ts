import { Vector3 } from "three";
import { ModeStrategy } from "../../utils/types";
import World from "../world/world";

let prevTime = performance.now();
const velocity = new Vector3();
const direction = new Vector3();

export default class WalkMode extends ModeStrategy {
  render(world: World) {
    if (!world.controls.isLocked) return;

    velocity.multiplyScalar(0.95);

    direction.x = Number(this.controls.right) - Number(this.controls.left);
    direction.y = Number(this.controls.space) - Number(this.controls.shift);
    direction.z = Number(this.controls.up) - Number(this.controls.down);
    direction.normalize(); // this ensures consistent movements in all directions

    velocity.x += direction.x / 200;
    velocity.y += direction.y / 200;
    velocity.z += direction.z / 200;

    world.controls.moveRight(velocity.x);
    world.controls.moveForward(velocity.z);
    world.controls.getObject().position.y += velocity.y;

    this.character.position
      .copy(world.controls.getObject().position)
      .add(new Vector3(0, -1, -1));
  }
}
