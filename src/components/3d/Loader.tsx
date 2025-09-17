import { Html } from "@react-three/drei";
import "../../css/loader.css";

export default function Loader() {
	return (
		<Html className="background" prepend center>
			<div className="loader" />
		</Html>
	);
}
