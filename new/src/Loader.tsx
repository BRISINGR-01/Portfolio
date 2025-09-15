import { Html } from "@react-three/drei";
import "./loader.css";

export default function Loader() {
	return (
		<Html className="background" prepend center>
			<div className="loader" />
		</Html>
	);
}
