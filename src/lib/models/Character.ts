import {
  Body,
  Box,
  World as CannonWorld,
  Cylinder,
  HingeConstraint,
  Material,
  Vec3,
} from "cannon";
import {
  AnimationAction,
  AnimationMixer,
  Clock,
  Object3D,
  Vector3,
} from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import type Controls from "./Controls";
import type World from "./world/world";

const clock = new Clock();
export default class Character {
  public visual: {
    object: Object3D;
    mixer: AnimationMixer;
    animation: AnimationAction;
  };
  public physics: {
    body: Body;
    wheels: Body[];
    hinges: HingeConstraint[];
  } = {
    body: new Body(),
    wheels: [],
    hinges: [],
  };
  tireMeshes: Object3D[] = [];

  constructor(world: World, gltf: GLTF) {
    const mixer = new AnimationMixer(gltf.scene);
    const animation = mixer.clipAction(gltf.animations[0]);
    animation.play();
    this.visual = {
      object: gltf.scene,
      mixer,
      animation,
    };

    this.tireMeshes.push(this.visual.object.getObjectByName("DEFFrontWheel")!);
    this.tireMeshes.push(this.visual.object.getObjectByName("Bike_frontHub")!);
    this.tireMeshes.push(this.visual.object.getObjectByName("Bike_Fork")!);

    this.visual.object.traverse(function (node) {
      if (node.isObject3D) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    world.camera.lookAt(this.visual.object.position);
    this.visual.object.children[0].position.y = -1.45;
    this.visual.object.castShadow = true;
    world.add(this.visual.object, gltf.animations[0]);

    const vec = new Vector3();
    vec.applyQuaternion(this.visual.object.quaternion);
  }

  async loadPhysics(world: CannonWorld) {
    const bikeSize = new Vec3(1, 0.5, 0.3);
    const wheelSize = 0.48;

    this.physics.body = new Body({
      mass: 5,
      position: new Vec3(0, 1.8, 0),
      shape: new Box(bikeSize),
    });
    world.addBody(this.physics.body);

    const frontWheelBody = new Body({
      mass: 5,
      material: new Material("wheel"),
      shape: new Cylinder(wheelSize, wheelSize, bikeSize.z / 2, 400),
      angularDamping: 0.8,
    });

    const rearWheelBody = new Body({
      mass: 5,
      material: new Material("wheel"),
      shape: new Cylinder(wheelSize, wheelSize, bikeSize.z / 2, 400),
      angularDamping: 0.8,
    });

    rearWheelBody.position.set(-bikeSize.x * 2, wheelSize * 2, 0);
    frontWheelBody.position.set(bikeSize.x * 2, wheelSize * 2, 0);
    world.addBody(frontWheelBody);
    world.addBody(rearWheelBody);

    const frontHingeConstraint = new HingeConstraint(
      this.physics.body,
      frontWheelBody,
      {
        pivotA: new Vec3(
          (bikeSize.x + wheelSize) / 2 - 0.05,
          -bikeSize.y - wheelSize - 0.01,
          0
        ), // Pivot point on chassis
        axisA: new Vec3(0, 0, 1), // Rotation axis on chassis
        pivotB: new Vec3(0, 0, 0), // Pivot point on wheel
        axisB: new Vec3(0, 0, 1), // Rotation axis on wheel
      }
    );
    world.addConstraint(frontHingeConstraint);

    const rearHingeConstraint = new HingeConstraint(
      this.physics.body,
      rearWheelBody,
      {
        pivotA: new Vec3(
          -(bikeSize.x + wheelSize) / 2 + 0.05,
          -bikeSize.y - wheelSize - 0.01,
          0
        ), // Pivot point on chassis
        axisA: new Vec3(0, 0, 1), // Rotation axis on chassis
        pivotB: new Vec3(0, 0, 0), // Pivot point on wheel
        axisB: new Vec3(0, 0, 1), // Rotation axis on wheel
      }
    );
    world.addConstraint(rearHingeConstraint);

    this.physics.wheels = [frontWheelBody, rearWheelBody];
    this.physics.hinges = [frontHingeConstraint, rearHingeConstraint];
  }

  steer(goesLeft: boolean | null) {
    if (goesLeft === null) {
      this.physics.hinges[0].axisA.set(0, 0, 1);
      return;
    }
    const prev = this.physics.hinges[0].axisA.x;

    if (goesLeft ? prev >= 0.6 : prev <= -0.6) return;

    let x = prev + (goesLeft ? 0.025 : -0.025);

    this.physics.hinges[0].axisA.set(x, 0, 1);
    this.tireMeshes.forEach((tire) =>
      tire.rotateOnAxis(
        new Vector3(window.x || 0, window.y || 0, window.z || 0),
        x / 10
      )
    );
  }

  move(val: number) {
    this.physics.body.applyLocalForce(
      new Vec3(val * -3, 0, 0),
      new Vec3(0, 0, 0)
    );
  }

  update(world: World, controls: Controls) {
    this.visual.mixer.update(clock.getDelta());
    const prevPosition = this.visual.object.position.clone();

    this.visual.object.position.lerp(
      new Vector3(...this.physics.body.position.toArray()),
      0.1
    );
    this.visual.object.quaternion.set(
      this.physics.body.quaternion.x,
      this.physics.body.quaternion.y,
      this.physics.body.quaternion.z,
      this.physics.body.quaternion.w
    );

    this.visual.animation.timeScale =
      prevPosition.distanceTo(this.visual.object.position) * 10;

    const euler = new Vec3();
    this.physics.body.quaternion.toEuler(euler);
    this.physics.body.angularVelocity.x *=
      1 / (Math.PI / Math.abs(euler.x || 0.1));

    if (this.physics.body.position.y < 1.5) {
      if (Math.abs(euler.x) > 1.2 || Math.abs(euler.z) > 1.2) return;

      this.physics.body.applyLocalForce(
        new Vec3(0, 0, euler.x * -50),
        new Vec3(1, 1, 0)
      );
      this.physics.body.applyLocalForce(
        new Vec3(0, 0, euler.x * -50),
        new Vec3(-1, 1, 0)
      );
    }

    // const dir = new Vector3(-Math.PI / 2, 0, 0);
    const dir = new Vector3(-1, 0, 0);
    dir.applyQuaternion(this.visual.object.quaternion);
    dir.multiplyScalar(4);

    const cameraPos = this.visual.object.position.clone().add(dir);
    cameraPos.y = 4;

    world.camera.position.copy(cameraPos);
    world.camera.lookAt(this.visual.object.position);

    if (controls.down) {
      this.move(15);
    } else if (controls.up) {
      this.move(-15);
    }

    if (controls.left) {
      this.steer(true);
    } else if (controls.right) {
      this.steer(false);
    } else {
      this.steer(null);
    }
  }
}
