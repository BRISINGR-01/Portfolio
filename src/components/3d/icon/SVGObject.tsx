import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
	BufferAttribute,
	Color,
	DataTexture,
	ExtrudeGeometry,
	RGBAFormat,
	ShaderMaterial,
	SRGBColorSpace,
	UnsignedByteType,
	Vector3,
} from "three";
import { SVGLoader } from "three/examples/jsm/Addons.js";
import { DEFAULT_SVG_ROTATION } from "../../../constants";
import type { ContentData } from "../../../types";
import { calculateSVGPathRenderOffset } from "../../../utils";
import HologramMaterial from "./HologramMaterial";

function fixUVs(geometry) {
	const positions = geometry.attributes.position;
	const uvs = new Float32Array(positions.count * 2);

	for (let i = 0; i < positions.count; i++) {
		const y = positions.getY(i);
		uvs[i * 2] = 0; // u can stay 0 (or set based on X for horizontal distortion)
		uvs[i * 2 + 1] = y / 200; // linear 0 → 1 along Y
	}

	geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
}

export default function SVGObject(props: ContentData) {
	const data = useLoader(SVGLoader, props.icon);
	const materialRefs = useRef<ShaderMaterial[]>([]);

	useFrame((state) => {
		// console.log(materialRefs.current.at(0)?.uniforms);
		// console.log(state.clock.elapsedTime);
		for (const material of materialRefs.current) {
			material.uniforms.time.value = state.clock.getElapsedTime();
		}
	});

	const shapes = useMemo(() => {
		let renderOrder = 0;

		return data.paths.flatMap((path) => {
			const color = new Color(path.userData!.style.fill);

			const data = new Uint8Array([color.r * 255, color.g * 255, color.b * 255, 255]);
			const texture = new DataTexture(data, 1, 1, RGBAFormat, UnsignedByteType);
			texture.needsUpdate = true;
			texture.colorSpace = SRGBColorSpace;

			const material = new HologramMaterial(color, props.icon3D.scale * 5000);
			materialRefs.current.push(material);

			return SVGLoader.createShapes(path).map((shape) => {
				const geometry = new ExtrudeGeometry(shape, { depth: 4 });
				geometry.computeBoundsTree();
				fixUVs(geometry);
				console.log(geometry);
				// geometry.setDrawRange(0, 90);
				renderOrder++;

				return (
					<mesh
						position={[0, 0, calculateSVGPathRenderOffset(renderOrder, props.icon3D.wide)]}
						geometry={geometry}
						key={renderOrder}
						material={material}
					></mesh>
				);
			});
		});
	}, [data, props.icon3D.wide, props.icon3D.scale]);

	return (
		<mesh
			name={props.id}
			scale={new Vector3(0, 0, props.icon3D.wide ? 0.01 : 0).addScalar(props.icon3D.scale)}
			rotation={new Vector3(...(props.icon3D.rotation ?? [])).add(DEFAULT_SVG_ROTATION).toArray()}
			position={props.icon3D.position}
		>
			{shapes}
		</mesh>
	);
}
