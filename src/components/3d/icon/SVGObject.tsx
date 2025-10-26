import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { Color, DoubleSide, ExtrudeGeometry, MeshPhongMaterial, Vector3 } from "three";
import { SVGLoader } from "three/examples/jsm/Addons.js";
import { DEFAULT_SVG_ROTATION } from "../../../constants";
import type { ContentData } from "../../../types";
import { calculateSVGPathRenderOffset } from "../../../utils";

export default function SVGObject(props: ContentData) {
	const data = useLoader(SVGLoader, props.icon);

	const shapes = useMemo(() => {
		let renderOrder = 0;

		return data.paths.flatMap((path) => {
			const material = new MeshPhongMaterial({
				// transparent: true,
				// opacity: 0.5,
				// color: new Color().setStyle(COLOR_PALETTE.PRIMARY),
				color: new Color().setStyle(path.userData!.style.fill),
				side: DoubleSide,
				depthWrite: true,
			});
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			// const holoMaterial = new MeshPhongMaterial({
			// 	color: new Color().setStyle("#57c7ff"),
			// 	opacity: 0.6,
			// 	transparent: true,
			// 	side: DoubleSide,
			// 	depthWrite: true,
			// });
			material.polygonOffset = true;
			material.polygonOffsetFactor = 1;
			// material.emissive = new Color(0x00aaff);
			// material.emissiveIntensity = 1.5;

			return SVGLoader.createShapes(path).map((shape) => {
				const geometry = new ExtrudeGeometry(shape, {
					depth: 4,
					// bevelEnabled: true,
				});
				geometry.computeBoundsTree();

				renderOrder++;

				return (
					<mesh
						position={[0, 0, calculateSVGPathRenderOffset(renderOrder, props.icon3D.wide)]}
						geometry={geometry}
						key={renderOrder}
						material={material}
					/>
				);
			});
		});
	}, [data, props.icon3D.wide]);

	const r = props.icon3D.rotation ?? [0, 0, 0];

	return (
		<mesh
			name={props.id}
			scale={new Vector3(0, 0, props.icon3D.wide ? 0.01 : 0).addScalar(props.icon3D.scale)}
			rotation={new Vector3(...r).add(DEFAULT_SVG_ROTATION).toArray()}
			position={props.icon3D.position}
		>
			{shapes}
		</mesh>
	);
}
