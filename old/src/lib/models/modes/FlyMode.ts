import { Matrix4, Quaternion, Vector3 } from "three";
import { easeOutQuad } from "../../utils/helpers";
import { ModeStrategy } from "../../utils/types";
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
    jawVelocity *= 0.95;
    pitchVelocity *= 0.95;

    if (Math.abs(jawVelocity) > MAX_VELOCITY / 8) {
      jawVelocity = (Math.sign(jawVelocity) * MAX_VELOCITY) / 8;
    }
    if (Math.abs(pitchVelocity) > MAX_VELOCITY / 8) {
      pitchVelocity = (Math.sign(pitchVelocity) * MAX_VELOCITY) / 8;
    }

    if (this.controls.left) {
      jawVelocity += VELOCITY;
    } else if (this.controls.right) {
      jawVelocity -= VELOCITY;
    }
    if (this.controls.down) {
      pitchVelocity += VELOCITY;
    } else if (this.controls.up) {
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

    this.update(world);

    const rotMatrix = new Matrix4().makeBasis(x, y, z);

    const matrix = new Matrix4()
      .multiply(new Matrix4().makeTranslation(this.character.position))
      .multiply(rotMatrix);
    this.character.matrixAutoUpdate = false;
    this.character.matrix.copy(matrix);
    this.character.matrixWorldNeedsUpdate = true;

    const rotationQuaternion = new Quaternion().setFromRotationMatrix(
      rotMatrix
    );
    delayedQuaternion.slerp(rotationQuaternion, INTERPOLATION_FACTOR);

    delayedRotMatrix.identity();
    delayedRotMatrix.makeRotationFromQuaternion(delayedQuaternion);

    const cameraMatrix = new Matrix4()
      .multiply(new Matrix4().makeTranslation(this.character.position))
      .multiply(delayedRotMatrix)
      .multiply(new Matrix4().makeRotationX(-0.2))
      .multiply(new Matrix4().makeTranslation(0, 1, 2.5));

    world.camera.matrixAutoUpdate = false;
    world.camera.matrix.copy(cameraMatrix);
    world.camera.matrixWorldNeedsUpdate = true;
    // console.log(this.character.rotation.x, this.character.rotation.y 	);

    if (this.character.rotation.x !== 0) {
      if (Math.abs(this.character.rotation.x) < 0.05) {
        this.character.rotation.x = 0;
      } else {
        this.character.rotateX(rotVelocity / 2);
      }
    }

    if (this.controls.turbo) {
      turbo += VELOCITY;
    } else {
      turbo *= 0.9;
    }
    turbo = Math.min(Math.max(turbo, 0), 1);

    let turboSpeed = easeOutQuad(turbo) * 0.04;
    world.camera.fov = fov + turboSpeed * 900;
    world.camera.updateProjectionMatrix();

    if (this.controls.down) {
      this.character.position.add(z.clone().multiplyScalar(speed));

      if (this.character.rotation.x !== 0) {
        this.character.rotateX(rotVelocity);
      }
    }

    if (this.controls.up) {
      this.character.position.add(
        z.clone().multiplyScalar(-speed - turboSpeed * 4)
      );

      this.character.rotateX(-rotVelocity);
      if (this.character.rotation.x <= -Math.PI / 2) {
        this.character.rotation.x = -Math.PI / 2;
      }
    }

    if (this.character.rotation.y !== 0) {
      if (Math.abs(this.character.rotation.y) < 0.05) {
        // this.character.rotation.y = 0;
      } else {
        // this.character.rotateY(rotVelocity / 2);
      }
    }

    if (this.controls.left) {
      // this.character.rotateY(rotVelocity);
      if (this.character.rotation.y >= VELOCITY) {
        this.character.rotation.y = VELOCITY;
      }
    }

    if (this.controls.right) {
      // this.character.rotateY(-rotVelocity);
      if (this.character.rotation.y <= -VELOCITY) {
        this.character.rotation.y = -VELOCITY;
      }
    }

    // if (this.controls.shift) {
    // 	// if (this.character.rotation.x <= -Math.PI / 2) this.character.rotateX(-velocity * 3);
    // }
    // if (this.controls.space) {
    // 	this.character.position.setY(this.character.position.y + velocity);
    // }
  }
}
