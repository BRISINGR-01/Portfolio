import { Vec3 } from "cannon";
import { Vector3 } from "three";

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
