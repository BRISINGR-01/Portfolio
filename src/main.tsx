import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Emergency from "./components/Emergency";

import { KeyboardControls } from "@react-three/drei";
import "bootstrap/dist/css/bootstrap.min.css";
import { lazy } from "react";
import Portfolio3D from "./components/3d/Portfolio3D";
import { controlsMap } from "./constants";
import "./css/index.css";

const Preview = lazy(() => import("./components/Preview"));

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route
				index
				element={
					<KeyboardControls map={controlsMap}>
						<Portfolio3D />
						{/* <ContentDisplay close={() => {}} data={content.experience[1]} type={Mode.Experience}></ContentDisplay> */}
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
	</BrowserRouter>
);
