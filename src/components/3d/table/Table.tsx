import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Color, Mesh, type Object3D, type ShaderMaterial } from "three";
import { COLOR_PALETTE, HOLOGRAM_ANIMATION_LENGTH, HOLOGRAM_SWITCH_TIME, TABLE_DELAY } from "../../../constants";
import { fixGLTFDepth } from "../../../utils";
import Delay from "../../Delay";
import HologramMaterial from "../icon/HologramMaterial";
import TableControls from "./TableControls";

function toggleVisibility(obj: Object3D) {
	obj.traverse((mesh) => {
		if (mesh instanceof Mesh) mesh.material.opacity = !mesh.material.opacity;
	});
}

export default function Table({ text }: { text: string | null }) {
	const { scene } = useGLTF("/3d/table.glb");
	const { get } = useThree();
	const materialRefs = useRef<ShaderMaterial[]>([]);

	useFrame(({ clock }) => {
		for (const material of materialRefs.current) {
			material.uniforms.time.value = clock.getElapsedTime();
		}
	});

	useEffect(() => {
		toggleVisibility(scene);
		fixGLTFDepth(scene);

		let t: number;

		function restore() {
			materialRefs.current = [];
			scene.traverse((mesh) => {
				if (mesh instanceof Mesh) mesh.material = mesh.userData.originalMaterial;
			});
		}

		t = setTimeout(() => {
			toggleVisibility(scene);

			const time = get().clock.elapsedTime;
			scene.traverse((mesh) => {
				if (!(mesh instanceof Mesh)) return;

				mesh.userData.originalMaterial = mesh.material;

				const material = new HologramMaterial(new Color(COLOR_PALETTE.PRIMARY), 200);
				mesh.material = material;
				material.uniforms.animStart.value = time;
				materialRefs.current.push(material);

				t = setTimeout(restore, (HOLOGRAM_ANIMATION_LENGTH + HOLOGRAM_SWITCH_TIME) * 1000);
			});
		}, TABLE_DELAY * 1000);

		return () => {
			restore();
			clearTimeout(t);
		};
	}, [get, scene]);

	return (
		<group>
			<Delay time={TABLE_DELAY}>
				<TableControls text={text} />
			</Delay>
			<primitive object={scene} scale={40} position={[0, -2, 0]} />
		</group>
	);
}
