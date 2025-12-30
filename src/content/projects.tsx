import type { Project } from "../types";

const projects = {
	a1: {
		title: "A1 Internship",
		icon: "/icons/other/A1.svg",
		timespan: ["01/07/2021", "30/09/2021"],
		description: (
			<>
				My first internship at <a href="https://www.a1.bg/">A1</a> introduced me to professional web development. I
				learnt to navigate large scale codebases and fixed various issues on both the front- and backend. The project
				was a marketing console - a tool for organizing TV channels and their content.
			</>
		),
		technologies: [
			{ name: "React", percentage: 10 },
			{ name: "Express", percentage: 65 },
			{ name: "Docker", percentage: 5 },
			{ name: "GraphQl", percentage: 20 },
		],
	},
	sdgSabic: {
		title: "SDG Challenge - Sabic",
		icon: "/images/other/SDG.png",
		github: "https://github.com/BRISINGR-01/SDG-Challenge-Game-SABIC",
		timespan: ["09/04/2024", "05/07/2024"],
		description: (
			<>
				https://www.sabic.com/ My proposal was to make a game out of recycling and let employees compete for prizes by
				winning points while using custom made plastic disposal systems
			</>
		),
		content: [
			{
				img: "images/gallery/sabic/demo.mp4",
				description:
					"With a laser-cutter and borrowed hardware I made a box with a card scanner and my phone as a screen to serve as a prototype for the disposal system.",
			},
			{
				img: "images/gallery/sabic/hardware.png",
				description:
					"This is what the hardware looks like under the hood - an ESP32 connected to an RFID/NFC reader. It can scan cards and chips (such as those on the picture) as well as the NFC of mobile phones. The scanned ID is then sent to a server which updates the screen.",
			},
			{
				img: "images/gallery/sabic/ui-2.png",
				description: "Login is possible either via credentials or QR code",
			},
			{
				img: "images/gallery/sabic/ui-3.png",
				description:
					"You can view metrics about saved water/electricity..., encouraging statistics and your position in the scoreboard.",
			},
			{
				img: "images/gallery/sabic/ui.png",
				description: "To make it more interesting you can read valuable tips in a 3D explorable area, using ThreeJS",
			},
		],
		technologies: [
			{ name: "ThreeJS", percentage: 12 },
			{ name: "Typescript", percentage: 31 },
			{ name: "React", percentage: 20 },
			{ name: "Supabase + Vercel", percentage: 7 },
			{ name: "C/C++", percentage: 10 },
			{ name: "Arduino", percentage: 10 },
		],
	},
	sdgSolarwatt: {
		title: "SDG Challenge - Solarwatt",
		icon: "/images/other/SDG-logo-2.webp",
		timespan: ["09/04/2025", "05/07/2025"],
		technologies: [
			{ name: "Typescript", percentage: 30 },
			{ name: "React", percentage: 52 },
			{ name: "Vercel", percentage: 8 },
		],
		description: (
			<>
				Together with Paulo Vieira we created a virtual educational platform called{" "}
				<a href="https://solar-trace.vercel.app/">Solartrace</a>. I made a course (similar to LinkdIn learning or Udemy)
				of our platform, which provides a certificate of completion upon finishing all lectures and questions. We were
				nominated for the finals of the SDG Challenge 2025.
			</>
		),
		github: "https://github.com/BRISINGR-01/solar-trace",
		content: [
			{
				img: "images/gallery/solarwatt/qr-code.png",
				title:
					"The QR code designed to access the platform. The idea is to print it on the solar panels, share on social media...",
				description: "",
			},
			{
				img: "images/gallery/solarwatt/video.png",
				title: "Video Lectures",
				description:
					"Example video lecture. It has most of the modern features + saving progress, but it is required to wathch the whole video to unlock the next section.",
			},
			{
				img: "images/gallery/solarwatt/text.png",
				title: "Paragraph Lectures",
				description: "Additionally there are text + pictures style lectures.",
			},
			{
				img: "images/gallery/solarwatt/quiz.png",
				title: "Quizes",
				description:
					"After every couple of lectures there are obligatory questions testing the knowledge of the reader.",
			},
			{
				img: "images/gallery/solarwatt/certificate.png",
				title: "Certificate",
				description:
					"The idea behind the certificate is for companies to show that they are concious about their choices and for emplyees that they are aware of the hidden issues in the solar panel industry.",
			},
		],
	},
	latinIsSimple: {
		title: "Latin is simple",
		icon: "/icons/other/latin-is-simple.svg",
		timespan: ["03/01/2022", "02/09/2025"],
		description: (
			<>
				My task was to redevelop the training section for{" "}
				<a href="https://www.latin-is-simple.com/">latin-is-simple.com</a>. There, students can practice translation,
				grammar and refresh their memory in any of the five trainers: "Translation", "Advenced", "Quiz", "Cards" and
				"Forms". The trainers contain rigorously tested complex question generation, pattern matching to accept various
				answers and a scoreboard system
			</>
		),
		technologies: [
			{ name: "React", percentage: 22 },
			{ name: "Bootstrap", percentage: 22 },
			{ name: "Typescript", percentage: 55 },
			{ name: "Python", percentage: 1 },
		],
	},
	icc: {
		title: "ICC",
		icon: "/icons/other/ICClogo.svg",
		timespan: ["05/02/2024", "27/07/2024"],
		description: (
			<>
				In my third semester, I worked on a project for{" "}
				<a href="https://www.linkedin.com/company/icc-the-international-cleaning-company">ICC</a> (International
				Cleaning Company) and collaborated directly with one of the founders. Since ICC is a startup, I was able to take
				on more responsibility and have a bigger impact than I would have had at larger companies like at my
				internships.
			</>
		),
		content: [
			{
				description:
					"I built a powerful, interactive statistics playground that allows employees to combine and explore all available data in virtually any conceivable way to create custom charts and insights.",
				img: "images/gallery/fontys/sem3/graph.png",
			},
			{
				description:
					"I also helped refactor the booking page, Google reCAPTCHA, turned the app into a PWA, handled Git merges, and worked on various smaller tasks.",
				img: "images/gallery/fontys/sem3/icc.png",
			},
		],
		technologies: [
			{ name: "Next JS", percentage: 7 },
			{ name: "Typescript", percentage: 45 },
			{ name: "Supabase", percentage: 13 },
			{ name: "React", percentage: 35 },
		],
	},
	asml: {
		title: "ASML Internship",
		icon: "/icons/other/ASML.svg",
		timespan: ["09/09/2024", "02/02/2025"],
		description:
			"I had the opportunity to work on a code analysis tool that generates an interactive report, helping to visualize and understand complex codebases. This project pushed me to grow technically while also giving me insight into how global-scale companies operate.",
		technologies: [
			{ name: "C/C++", percentage: 50 },
			{ name: "HTML", percentage: 10 },
			{ name: "CSS", percentage: 10 },
			{ name: "Javascript", percentage: 30 },
		],
	},
	glow: {
		title: "Glow",
		icon: "/icons/other/glow.svg",
		timespan: ["02/02/2025", "01/07/2025"],
		description: (
			<>
				I contributed to two Fontys teams for <a href="https://gloweindhoven.nl/en/">Glow</a>:{" "}
				<a href="https://deltafontysict.nl/">Delta</a> (Eindhoven) and Phoenix (Venlo). Fisrt I was part of the Delta
				team and helped with the ideation, brainstrorming and prototyping. Then I helped the Venlo team with
				construction and lightning.
			</>
		),
		content: [
			{
				img: "images/gallery/glow/Glow-demo.png",
				description: (
					<>
						With the Deltas we went through a few rounds of prototypes. For the{" "}
						<a href="https://github.com/GLOW-Delta-2025/hand-drawing-prototype">first prototype</a> we made a quick
						gesture controlled drawing animation with python, OpenCV and Cursor. The amount of fingers change the colour
						and certain gestures stop/start/change the brush.
					</>
				),
			},
			{
				description: (
					<>
						Here is another{" "}
						<a href="https://github.com/BRISINGR-01/Fontys-projects/tree/master/Brainstorm">prototype</a> I made on my
						own, this time for the final concept: The audience powers up the contraption with their ideas
						(clapping/shouting) which transfers the enrgy to the core and then explodes in light, hence the name -
						Brainstorm. This is a prototype of the conversion of sound to light.
					</>
				),
				img: "images/gallery/glow/brainstorm.mp4",
			},
			{
				description:
					"As you can see on the schematic, an Arduino UNO board uses a KY-038 microphone (which I had to tediously adjust with the potentiometer) as input and powers the LED strip directly. I didn't use a separate power source, because only 3-4 LEDs are powered at a time.",
				img: "images/gallery/glow/diagram.png",
			},
			{
				description:
					"At the end of the semester the whole team built a 1:10 scale prototype of the final contraption - it is made of a center piece, top section and 5 arms, full with LEDs as a Glow project should be.",
				img: "images/gallery/glow/prototype.jpeg",
			},
			{
				description: "As for the Phoenix, I volunteered to program and install the spotlights lightning up the scene.",
				img: "../public/images/gallery/glow/spotlights.jpeg",
			},
			{
				description:
					"What you see here is a Freekie console which I used to program the light sequence - bright yellow, gradually fading to red to die into blackness, to be reborn anew - depicting the lifecycle of a phoenix. The hardware limitations required me to be creative to create smooth animations.",
				img: "images/gallery/glow/console.jpg",
			},
			{
				description: "The final outcome. (Click to enlarge)",
				img: "images/gallery/glow/phoenix.jpg",
			},
		],
		technologies: [
			{ name: "Python", percentage: 20 },
			{ name: "Spotlights", percentage: 40 },
			{ name: "Ideation", percentage: 40 },
		],
	},
};

export default projects satisfies Record<string, Project>;
