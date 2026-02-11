import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Emergency from "./components/Emergency";

import { KeyboardControls, Loader } from "@react-three/drei";
import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense } from "react";
import Portfolio3D from "./components/3d/Portfolio3D";
import ContentDisplay from "./components/floating-ui/displays/ContentDisplay";
import { controlsMap } from "./constants";
import { education } from "./content/education";
import "./css/index.css";
import { Mode } from "./types";

const isDebug = 0;

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route
				index
				element={
					<KeyboardControls map={controlsMap}>
						{isDebug ? <Debug /> : <Suspense fallback={<Loader />}>{<Portfolio3D />}</Suspense>}
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
			<Route path="em" element={<Emergency />} />
		</Routes>
	</BrowserRouter>,
);

function Debug() {
	return (
		<ContentDisplay
			close={() => {}}
			currentPage={0}
			data={education[1]}
			nrOfPages={1}
			onSelect={() => {}}
			type={Mode.Tags}
		/>
	);
}
