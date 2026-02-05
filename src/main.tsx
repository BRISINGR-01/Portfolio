import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Emergency from "./components/Emergency";

import { KeyboardControls, Loader } from "@react-three/drei";
import "bootstrap/dist/css/bootstrap.min.css";
import { lazy, Suspense } from "react";
import Portfolio3D from "./components/3d/Portfolio3D";
import ContentDisplay from "./components/floating-ui/displays/ContentDisplay";
import { controlsMap } from "./constants";
import content from "./content/index";
import "./css/index.css";
import { Mode } from "./types";

const Preview = lazy(() => import("./components/Preview"));

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route
				index
				element={
					<KeyboardControls map={controlsMap}>
						<Suspense fallback={<Loader />}>{/* <Portfolio3D /> */}</Suspense>
						<Debug />
					</KeyboardControls>
				}
			/>
			<Route
				index
				path="demo"
				element={
					<KeyboardControls map={controlsMap}>
						<Portfolio3D />
					</KeyboardControls>
				}
			/>
			<Route index path="preview" element={<Preview />} />
			<Route path="em" element={<Emergency />} />
		</Routes>
	</BrowserRouter>,
);

function Debug() {
	return <ContentDisplay close={() => {}} data={content.experience.at(-1)} type={Mode.Experience} />;
}
