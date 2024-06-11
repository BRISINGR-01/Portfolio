import { Vec3, type Body } from "cannon";
import { Vector3, type Object3D } from "three";

export function easeOutQuad(x: number) {
  return 1 - (1 - x) * (1 - x);
}

export function wait<T>(val: T) {
  return new Promise<T>((resolve) => resolve(val));
}

export function convert<
  T extends Vector3 | Vec3,
  R = T extends Vector3 ? Vec3 : Vector3
>(vec: T): R {
  if (vec instanceof Vector3) {
    return new Vector3(vec.x, vec.y, vec.z) as R;
  } else {
    return new Vec3(vec.x, vec.y, vec.z) as R;
  }
}

export function sync(visual: Object3D, body: Body) {
  visual.position.lerp(new Vector3(...body.position.toArray()), 0.8);
  visual.quaternion.set(
    body.quaternion.x,
    body.quaternion.y,
    body.quaternion.z,
    body.quaternion.w
  );
}
