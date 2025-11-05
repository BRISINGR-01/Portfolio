import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
	BufferAttribute,
	Color,
	DoubleSide,
	ExtrudeGeometry,
	MeshPhongMaterial,
	ShaderMaterial,
	Vector3,
	type BufferGeometry,
	type Group,
	type Mesh,
} from "three";
import { SVGLoader } from "three/examples/jsm/Addons.js";
import { DEFAULT_SVG_ROTATION, HOLOGRAM_ANIMATION_LENGTH, HOLOGRAM_SWITCH_TIME } from "../../../constants";
import type { ContentData } from "../../../types";
import { calculateSVGPathRenderOffset } from "../../../utils";
import HologramMaterial from "./HologramMaterial";

function fixUVs(geometry: BufferGeometry) {
	const positions = geometry.attributes.position;
	let minY = Infinity;
	let maxY = -Infinity;

	// find Y bounds
	for (let i = 0; i < positions.count; i++) {
		const y = positions.getY(i);
		minY = Math.min(minY, y);
		maxY = Math.max(maxY, y);
	}

	const range = maxY - minY || 1;
	const uvs = new Float32Array(positions.count * 2);

	for (let i = 0; i < positions.count; i++) {
		const y = positions.getY(i);
		const normalizedY = (y - minY) / range; // now always 0→1 across full height
		uvs[i * 2] = 0;
		uvs[i * 2 + 1] = normalizedY;
	}

	geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
}

export default function SVGObject(props: ContentData) {
	const data = useLoader(SVGLoader, props.icon);
	const groupRef = useRef<Group>(null);
	const materialRefs = useRef<ShaderMaterial[]>([]);
	const { get } = useThree();

	useFrame(({ clock }) => {
		for (const material of materialRefs.current) {
			material.uniforms.time.value = clock.getElapsedTime();
		}
	});

	useEffect(() => {
		const {
			clock: { elapsedTime },
		} = get();

		for (const material of materialRefs.current) {
			material.uniforms.animStart.value = elapsedTime;
		}

		const t = setTimeout(() => {
			groupRef.current?.traverse((mesh) => {
				(mesh as Mesh).material = mesh.userData.originalMaterial;
			});
			materialRefs.current = [];
		}, (HOLOGRAM_ANIMATION_LENGTH + HOLOGRAM_SWITCH_TIME) * 1000);

		return () => clearTimeout(t);
	}, [data, get]);

	const shapes = useMemo(() => {
		let renderOrder = 0;

		return data.paths.flatMap((path) => {
			const color = new Color(path.userData!.style.fill);

			const material = new HologramMaterial(color);
			materialRefs.current.push(material);

			const originalMaterial = new MeshPhongMaterial({
				color: new Color().setStyle(path.userData!.style.fill),
				side: DoubleSide,
				depthWrite: true,
			});

			return SVGLoader.createShapes(path).map((shape) => {
				const geometry = new ExtrudeGeometry(shape, { depth: 4 });
				geometry.computeBoundsTree();
				fixUVs(geometry);
				// geometry.setDrawRange(0, 90);
				renderOrder++;

				return (
					<mesh
						position={[0, 0, calculateSVGPathRenderOffset(renderOrder, props.icon3D.wide)]}
						geometry={geometry}
						key={renderOrder}
						material={material}
						userData={{ originalMaterial }}
					/>
				);
			});
		});
	}, [data, props.icon3D.wide]);

	return (
		<group
			ref={groupRef}
			name={props.id}
			scale={new Vector3(0, 0, props.icon3D.wide ? 0.01 : 0).addScalar(props.icon3D.scale)}
			rotation={new Vector3(...(props.icon3D.rotation ?? [])).add(DEFAULT_SVG_ROTATION).toArray()}
			position={props.icon3D.position}
		>
			{shapes}
		</group>
	);
}
