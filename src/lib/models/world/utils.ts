import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export async function load(name: string) {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(`3d-objects/${name}/scene.gltf`);

  return gltf.scene;
}
