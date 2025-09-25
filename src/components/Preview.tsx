import "../css/preview.css";
import DailyDevCard from "./DailyDevCard";

export default function Preview() {
	// const age = new Date().getFullYear() - 2003 - (new Date().getMonth() < 7 ? 1 : 0);

	return (
		<>
			<div
				style={{
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "black",
					flexDirection: "row",
					flexWrap: "wrap",
					overflow: "auto",
				}}
			>
				<div style={{ width: "20%", color: "white", textAlign: "right", paddingRight: "2em" }}>
					<br />
					<span>
						I’m a web developer who enjoys building websites, browser extensions, cross-platform apps, scripts, and even
						3D experiences like this portfolio (soon 😉). I like turning ideas into real projects and experimenting with
						new ways to make code useful and fun.
					</span>
					<br />
					<br />
					<h4 style={{ color: "white" }}>
						This semester I’m working on my portfolio, but in the meantime you can check out my{" "}
						<a style={{ textDecoration: "underline", color: "#b257b2" }} href="https://github.com/BRISINGR-01">
							Github
						</a>{" "}
						or{" "}
						<a
							style={{ textDecoration: "underline", color: "#b257b2" }}
							href="/files/cv.pdf"
							download="Alex Popov - CV.pdf"
						>
							CV
						</a>{" "}
						⇒
					</h4>

					<h4>And my daily.dev:</h4>
					<DailyDevCard />
				</div>

				<a href="/files/cv.pdf" download="Alex Popov - CV.pdf">
					<div className="cv-container">
						<img src="/files/CV.png" alt="cv" className="cv" />
						<img src="/files/CV.png" alt="cv" className="behind2" />
						<div className="behind">
							<img src="/files/CV.png" alt="cv" />
						</div>
					</div>
				</a>
			</div>
		</>
	);
}
