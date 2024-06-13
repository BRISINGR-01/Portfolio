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
import { sync } from "../utils/helpers";
import type Controls from "./Controls";
import type World from "./world/world";

const clock = new Clock();
let velocity = 0,
  duration = 0;

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
  tireMesh: Object3D;

  constructor(world: World, gltf: GLTF) {
    const mixer = new AnimationMixer(gltf.scene);
    const animation = mixer.clipAction(gltf.animations[0]);
    animation.play();
    animation.timeScale = 0;
    duration = animation.getClip().duration;

    this.visual = {
      object: gltf.scene,
      mixer,
      animation,
    };

    this.visual.object.traverse(function (node) {
      if (node.isObject3D) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    const mesh = this.visual.object.getObjectByName("DEFFrontWheel")!;
    mesh.removeFromParent();
    world.add(mesh);
    this.tireMesh = mesh;

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
      shape: new Cylinder(wheelSize, wheelSize, 0.005, 400),
      angularDamping: 0.95,
    });

    const rearWheelBody = new Body({
      mass: 5,
      material: new Material("wheel"),
      shape: new Cylinder(wheelSize, wheelSize, 0.005, 400),
      angularDamping: 0.95,
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

  steer(goesRight: boolean | null) {
    if (goesRight === null) {
      this.physics.hinges[0].axisA.set(0, 0, 1);
      return;
    }
    const prev = this.physics.hinges[0].axisA.x;

    const steerTreshold = 0.2;
    if (goesRight ? prev >= steerTreshold : prev <= -steerTreshold) return;

    let x = prev + (goesRight ? 1 : -1) * 0.008;

    this.physics.hinges[0].axisA.set(x, 0, -0.5);
  }

  move(val: number) {
    this.physics.body.applyLocalForce(new Vec3(val, 0, 0), new Vec3(0, 0, 0));
  }

  update(world: World, controls: Controls) {
    velocity *= 0.95;
    this.visual.mixer.update(clock.getDelta());

    this.visual.animation.time += velocity;
    if (this.visual.animation.time > duration) {
      this.visual.animation.time = 0;
    } else if (this.visual.animation.time < 0) {
      this.visual.animation.time = duration;
    }

    sync(this.visual.object, this.physics.body);
    sync(this.tireMesh, this.physics.wheels[0]);

    const bikeRotation = new Vec3();
    this.physics.body.quaternion.toEuler(bikeRotation);
    this.physics.body.angularVelocity.x = 0;

    if (this.physics.body.position.y < 1.5) {
      if (Math.abs(bikeRotation.x) + Math.abs(bikeRotation.z) > 0.2) return;

      const force = new Vec3(
        -2,
        0,
        Math.sign(bikeRotation.x) * (bikeRotation.x * 10) ** 2 * -100
      );

      this.physics.body.applyLocalForce(
        force,
        new Vec3(bikeRotation.x > 0 ? -1 : 1, 1, 0)
      );
    }

    const dir = new Vector3(-1, 0, 1);
    dir.applyQuaternion(this.visual.object.quaternion);
    dir.multiplyScalar(4);

    const cameraPos = this.visual.object.position.clone().add(dir);
    cameraPos.y = 3;

    world.camera.position.copy(cameraPos);
    world.camera.lookAt(this.visual.object.position);

    if (controls.down) {
      velocity += -0.001;
      this.move(-50);
    } else if (controls.up) {
      this.move(50);
      velocity += 0.001;
    }

    if (controls.left) {
      this.steer(false);
    } else if (controls.right) {
      this.steer(true);
    } else {
      this.steer(null);
    }
  }
}
