import { Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Err, Ok, Result } from "ts-results";

export async function load(name: string): Promise<Result<Object3D, Error>> {
	const loader = new GLTFLoader();

	try {
		const gltf = await loader.loadAsync(`3d-objects/${name}/scene.gltf`);

		return Ok(gltf.scene);
	} catch (err: any) {
		return Err(err);
	}
}
