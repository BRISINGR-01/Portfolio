import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Emergency from "./components/Emergency";
import PortfolioPlain from "./components/PortforlioPlain";
import Preview from "./components/Preview";

import "bootstrap/dist/css/bootstrap.min.css";
import Portfolio3D from "./components/3d/Portfolio3D";
import "./css/index.css";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route index element={import.meta.env.DEV ? <Portfolio3D /> : <Preview />} />
			<Route index path="demo" element={<Portfolio3D />} />
			<Route index path="preview" element={<Preview />} />
			<Route path="em" element={<Emergency />} />
			<Route path="plain" element={<PortfolioPlain />} />
		</Routes>
	</BrowserRouter>
);
