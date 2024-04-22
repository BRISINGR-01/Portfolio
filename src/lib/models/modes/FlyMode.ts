import { easeOutQuad } from "$lib/utils/helpers";
import { ModeStrategy } from "$lib/utils/types";
import { Matrix4, Quaternion, Vector3 } from "three";
import {
  fov,
  INTERPOLATION_FACTOR,
  MAX_VELOCITY,
  VELOCITY,
} from "../world/constants";
import type World from "../world/world";

const originalValues = {
  x: new Vector3(1, 0, 0),
  y: new Vector3(0, 1, 0),
  z: new Vector3(0, 0, 1),
};

let isTurbo = false;
const velocity = 0.2;
const rotVelocity = 0.01;
const x = originalValues.x.clone();
const y = originalValues.y.clone();
const z = originalValues.z.clone();
let jawVelocity = 0;
let turbo = 0;
let pitchVelocity = 0;
let speed = 0.02;
const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();
export default class FlyMode extends ModeStrategy {
  update(world: World) {
    // console.log("x", x.x, x.y, x.z);
    // console.log("y", y.x, y.y, y.z);
    // console.log("z", z.x, z.y, z.z);
    jawVelocity *= 0.95;
    pitchVelocity *= 0.95;

    if (Math.abs(jawVelocity) > MAX_VELOCITY / 8) {
      jawVelocity = (Math.sign(jawVelocity) * MAX_VELOCITY) / 8;
    }
    if (Math.abs(pitchVelocity) > MAX_VELOCITY / 8) {
      pitchVelocity = (Math.sign(pitchVelocity) * MAX_VELOCITY) / 8;
    }

    if (character.controls.left) {
      jawVelocity += VELOCITY;
    } else if (character.controls.right) {
      jawVelocity -= VELOCITY;
    }
    if (character.controls.down) {
      pitchVelocity += VELOCITY;
    } else if (character.controls.up) {
      pitchVelocity -= VELOCITY;
    }

    x.applyAxisAngle(y, jawVelocity);
    z.applyAxisAngle(y, jawVelocity);

    x.normalize();
    y.normalize();
    z.normalize();
  }

  render(world: World) {
    // console.log(x, y, z);

    this.update(world, character);

    const rotMatrix = new Matrix4().makeBasis(x, y, z);

    const matrix = new Matrix4()
      .multiply(new Matrix4().makeTranslation(character.position))
      .multiply(rotMatrix);
    character.matrixAutoUpdate = false;
    character.matrix.copy(matrix);
    character.matrixWorldNeedsUpdate = true;

    const rotationQuaternion = new Quaternion().setFromRotationMatrix(
      rotMatrix
    );
    delayedQuaternion.slerp(rotationQuaternion, INTERPOLATION_FACTOR);

    delayedRotMatrix.identity();
    delayedRotMatrix.makeRotationFromQuaternion(delayedQuaternion);

    const cameraMatrix = new Matrix4()
      .multiply(new Matrix4().makeTranslation(character.position))
      .multiply(delayedRotMatrix)
      .multiply(new Matrix4().makeRotationX(-0.2))
      .multiply(new Matrix4().makeTranslation(0, 1, 2.5));

    world.camera.matrixAutoUpdate = false;
    world.camera.matrix.copy(cameraMatrix);
    world.camera.matrixWorldNeedsUpdate = true;
    // console.log(character.rotation.x, character.rotation.y 	);

    if (character.rotation.x !== 0) {
      if (Math.abs(character.rotation.x) < 0.05) {
        character.rotation.x = 0;
      } else {
        character.rotateX(rotVelocity / 2);
      }
    }

    if (character.controls.turbo) {
      turbo += VELOCITY;
    } else {
      turbo *= 0.9;
    }
    turbo = Math.min(Math.max(turbo, 0), 1);

    let turboSpeed = easeOutQuad(turbo) * 0.04;
    world.camera.fov = fov + turboSpeed * 900;
    world.camera.updateProjectionMatrix();

    if (character.controls.down) {
      character.position.add(z.clone().multiplyScalar(speed));

      if (character.rotation.x !== 0) {
        character.rotateX(rotVelocity);
      }
    }

    if (character.controls.up) {
      character.position.add(z.clone().multiplyScalar(-speed - turboSpeed * 4));

      character.rotateX(-rotVelocity);
      if (character.rotation.x <= -Math.PI / 2) {
        character.rotation.x = -Math.PI / 2;
      }
    }

    if (character.rotation.y !== 0) {
      if (Math.abs(character.rotation.y) < 0.05) {
        // character.rotation.y = 0;
      } else {
        // character.rotateY(rotVelocity / 2);
      }
    }

    if (character.controls.left) {
      // character.rotateY(rotVelocity);
      if (character.rotation.y >= VELOCITY) {
        character.rotation.y = VELOCITY;
      }
    }

    if (character.controls.right) {
      // character.rotateY(-rotVelocity);
      if (character.rotation.y <= -VELOCITY) {
        character.rotation.y = -VELOCITY;
      }
    }

    // if (character.controls.shift) {
    // 	// if (character.rotation.x <= -Math.PI / 2) character.rotateX(-velocity * 3);
    // }
    // if (character.controls.space) {
    // 	character.position.setY(character.position.y + velocity);
    // }
  }
}
