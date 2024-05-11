import {
  AnimationMixer,
  Clock,
  Group,
  Vector3,
  type AnimationAction,
} from "three";
import type Controls from "./Controls";
import { load } from "./world/utils";
import type World from "./world/world";

const clock = new Clock();

const velocity = new Vector3();
const direction = new Vector3();
const cyclistOffset = new Vector3(3, -2, 0);

export default class Character extends Group {
  private animation: AnimationAction;

  constructor(object: Group, animation: AnimationAction) {
    super();
    this.add(object);
    this.animation = animation;
  }

  static async load(world: World) {
    const cyclistGltf = await load("cyclist", "glb");
    const character = cyclistGltf.scene;

    character.traverse(function (node) {
      if (node.isObject3D) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    character.position.copy(cyclistOffset);
    world.camera.lookAt(character.position);

    const mixer = new AnimationMixer(character);
    const animation = mixer.clipAction(cyclistGltf.animations[0]);
    animation.play();
    world.onRender(() => mixer.update(clock.getDelta()));
    world.add(character, cyclistGltf.animations[0]);

    return new Character(character, animation);
  }

  update(world: World, controls: Controls) {
    velocity.multiplyScalar(0.95);

    direction.x = Number(controls.right) - Number(controls.left);
    direction.y = Number(controls.space) - Number(controls.shift);
    direction.z = Number(controls.up) - Number(controls.down);
    direction.normalize(); // this ensures consistent movements in all directions

    velocity.x += direction.x / 20;
    velocity.y += direction.y / 20;
    velocity.z += direction.z / 20;

    // world.controls.moveRight(velocity.x);
    // world.controls.moveForward(velocity.z);
    world.camera.position.y += velocity.y;
    this.position.y += velocity.y;

    this.animation.timeScale = velocity.x + velocity.z;
  }
}
