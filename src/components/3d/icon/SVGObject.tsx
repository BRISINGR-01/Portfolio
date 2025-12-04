import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import {
	BufferAttribute,
	Color,
	DoubleSide,
	ExtrudeGeometry,
	MeshPhongMaterial,
	Vector3,
	type BufferGeometry,
	type Group,
} from "three";
import { SVGLoader, type SVGResult } from "three/examples/jsm/Addons.js";
import { DEFAULT_SVG_ROTATION, HOLOGRAM_TRANSITION } from "../../../constants";
import type { ContentData } from "../../../types";
import { calculateSVGPathRenderOffset } from "../../../utils";
import { restoreMaterial, updateMaterials } from "../utils";
import HologramMaterial from "./HologramMaterial";

export default function SVGObject(props: ContentData) {
	const svg = useLoader(SVGLoader, props.icon);
	const groupRef = useRef<Group>(null);
	const materialRefs = useRef<HologramMaterial[]>([]);
	const { get } = useThree();

	const shapes = useMemo(() => createShapes(svg, materialRefs, props.icon3D.wide), [svg, props.icon3D.wide]);

	useEffect(() => {
		const time = get().clock;

		for (const material of materialRefs.current) {
			material.start(time);
		}

		const group = groupRef.current!;
		const t = setTimeout(() => restoreMaterial(group), HOLOGRAM_TRANSITION);

		return () => {
			restoreMaterial(group);
			clearTimeout(t);
		};
	}, [svg, get]);

	useFrame(({ clock }) => updateMaterials(clock, materialRefs));

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

function createShapes(data: SVGResult, materialRefs: RefObject<HologramMaterial[]>, wide?: boolean) {
	let renderOrder = 0;
	const phongMaterial = new MeshPhongMaterial({
		color: new Color(),
		side: DoubleSide,
		depthWrite: true,
	});

	return data.paths.flatMap((path) => {
		const color = new Color(path.userData!.style.fill);

		const material = new HologramMaterial(color);
		materialRefs.current.push(material);

		const originalMaterial = phongMaterial.clone();
		originalMaterial.color = new Color().setStyle(path.userData!.style.fill);

		return SVGLoader.createShapes(path).map((shape) => {
			const geometry = new ExtrudeGeometry(shape, { depth: 4 });
			geometry.computeBoundsTree();
			adjustUVs(geometry);

			renderOrder++;
			const offset = calculateSVGPathRenderOffset(renderOrder, wide);

			return (
				<mesh
					position={[offset, offset, offset]}
					geometry={geometry}
					key={renderOrder}
					material={material}
					userData={{ originalMaterial }}
				/>
			);
		});
	});
}

function adjustUVs(geometry: BufferGeometry) {
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
