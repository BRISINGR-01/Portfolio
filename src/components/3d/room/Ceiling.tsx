import { useMemo } from "react";
import * as THREE from "three";
import { COLOR_PALETTE, ROOM } from "../../../constants";

export default function Ceiling() {
	const planeGeometry = useMemo(() => {
		const geom = new THREE.PlaneGeometry(ROOM.WIDTH, ROOM.WIDTH, 40, 40);

		for (let i = 0; i < geom.attributes.position.count; i++) {
			geom.attributes.position.setX(i, geom.attributes.position.getX(i) + (Math.random() - 0.5) * 0.1);
			geom.attributes.position.setY(i, geom.attributes.position.getY(i) + (Math.random() - 0.5) * 0.1);
			geom.attributes.position.setZ(i, geom.attributes.position.getZ(i) + (Math.random() - 0.5) * 0.2);
		}
		geom.computeVertexNormals();

		return geom;
	}, []);

	return (
		<group position={[0, ROOM.HEIGHT + 0.05 + 2 * ROOM.OFFSET, 0]} rotation={[-Math.PI / 2, 0, 0]}>
			{/* <mesh geometry={planeGeometry}>
				<meshPhysicalMaterial
					side={THREE.BackSide} // show both faces
					flatShading // faceted normals per triangle
					metalness={1} // fully metallic
					roughness={0.05} // almost perfectly smooth
					reflectivity={1} // strong specular
					clearcoat={1} // glossy clear layer
					clearcoatRoughness={0.05} // slight blur for realism
					color="#5879b1" // base tint
				/>
			</mesh> */}
			<mesh geometry={planeGeometry} position={[0, 0, -0.1]}>
				<meshStandardMaterial color={COLOR_PALETTE.PRIMARY} wireframe />
			</mesh>
		</group>
	);
}
