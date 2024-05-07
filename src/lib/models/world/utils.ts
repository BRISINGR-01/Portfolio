import { LoadingManager } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loadingManager = new LoadingManager();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
dracoLoader.preload();
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);

export async function load(name: string, type?: "gltf" | "glb") {
  let gltf;
  switch (type) {
    case "glb":
      gltf = await gltfLoader.loadAsync(`3d-objects/${name}/scene.glb`);
      break;
    default:
    case "gltf":
      gltf = await gltfLoader.loadAsync(`3d-objects/${name}/scene.gltf`);
      break;
  }

  return gltf;
}
