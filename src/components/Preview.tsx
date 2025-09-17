import "../css/preview.css";

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
				<div style={{ width: "20%", color: "white", textAlign: "right" }}>
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
						<a
							style={{ textDecoration: "underline", color: "#b257b2" }}
							href="/files/cv.pdf"
							download="Alex Popov - CV.pdf"
						>
							CV
						</a>{" "}
						⇒
					</h4>

					<br />
					<div
						className="badge-base LI-profile-badge card"
						data-locale="en_US"
						data-size="large"
						data-theme="light"
						data-type="HORIZONTAL"
						data-vanity="alexander-popov-61126825a"
						data-version="v1"
					>
						<a
							className="badge-base__link LI-simple-link"
							href="https://nl.linkedin.com/in/alexander-popov-61126825a?trk=profile-badge"
						></a>
					</div>

					<script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript" />
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
