import { Object3D } from "three";
import { load } from "./utils";

export default class Entity extends Object3D {
	onTickUpdate: Func | null = null;

	async load(objectName: string) {
		const res = await load(objectName);

		this.add(res.unwrap());
	}
}
