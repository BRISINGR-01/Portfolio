import Link from "../components/floating-ui/components/Link";
import type { Project } from "../types";

const projects = {
	a1: {
		title: "A1 Internship",
		icon: "/icons/other/A1.svg",
		timespan: ["01/07/2021", "30/09/2021"],
		description: (
			<>
				My first internship at <Link url="https://www.a1.bg/">A1</Link> introduced me to professional web development. I
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
				img: "images/gallery/sabic/present.jpeg",
				description: "We even presented the demo at the SDG fair in Utrecht.",
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
				<Link url="https://solar-trace.vercel.app/">Solartrace</Link>. I made a course (similar to LinkdIn learning or
				Udemy) of our platform, which provides a certificate of completion upon finishing all lectures and questions. We
				were nominated for the finals of the SDG Challenge 2025.
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
			{
				img: "images/gallery/solarwatt/group.jpeg",
				description:
					"We presented our solution in Utrecht at the SDG fair in Utrecht. This was our group with Paulo Vieira on my right - he developed the platform with me.",
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
				<Link url="https://www.latin-is-simple.com/">latin-is-simple.com</Link>. There, students can practice
				translation, grammar and refresh their memory in any of the five trainers: "Translation", "Advenced", "Quiz",
				"Cards" and "Forms". The trainers contain rigorously tested complex question generation, pattern matching to
				accept various answers and a scoreboard system
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
				<Link url="https://www.linkedin.com/company/icc-the-international-cleaning-company">ICC</Link> (International
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
			'My "medewerkerstage" ("middle internship") was at ASML - a global leader in lythography. They develop the machines used by Intel and Samsung, just to name a few, to make their microchips.',
		technologies: [
			{ name: "C/C++", percentage: 50 },
			{ name: "HTML", percentage: 10 },
			{ name: "CSS", percentage: 10 },
			{ name: "Javascript", percentage: 30 },
		],
		content: [
			{
				img: "images/other/ASML-report.png",
				description:
					"My task was to make a code analysis tool that generates an interactive report, helping to visualize and understand complex codebases. This project pushed me to grow technically while also giving me insight into how global-scale companies operate. Due to security limitations I had to create a bundler from scratch, recreate the company UI style and more.",
			},
		],
	},
	glow: {
		title: "Glow",
		icon: "/icons/other/glow.svg",
		timespan: ["02/02/2025", "01/07/2025"],
		description: (
			<>
				I contributed to two Fontys teams for <Link url="https://gloweindhoven.nl/en/">Glow</Link>:{" "}
				<Link url="https://deltafontysict.nl/">Delta</Link> (Eindhoven) and Phoenix (Venlo). Fisrt I was part of the
				Delta team and helped with the ideation, brainstrorming and prototyping. Then I helped the Venlo team with
				construction and lightning.
			</>
		),
		content: [
			{
				img: "images/gallery/glow/Glow-demo.png",
				description: (
					<>
						With the Deltas we went through a few rounds of prototypes. For the{" "}
						<Link url="https://github.com/GLOW-Delta-2025/hand-drawing-prototype">first prototype</Link> we made a quick
						gesture controlled drawing animation with python, OpenCV and Cursor. The amount of fingers change the colour
						and certain gestures stop/start/change the brush.
					</>
				),
			},
			{
				description: (
					<>
						Here is another{" "}
						<Link url="https://github.com/BRISINGR-01/Fontys-projects/tree/master/Brainstorm">prototype</Link> I made on
						my own, this time for the final concept: The audience powers up the contraption with their ideas
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
	v2g: {
		title: "Vehicle 2 Grid",
		github: "https://github.com/V2G-Fontys",
		content: [
			{
				description:
					"One of the first projects was a greenhouse measurement system with an Arduino and a RichShield for humidity, temperature and sunlight readings.",
				img: "images/gallery/fontys/sem1/graph.png",
			},
		],
	},
	greenhouse: {
		title: "Greenhouse",
		github: "https://github.com/BRISINGR-01/Fontys-projects/tree/master/Greenhouse",
		content: [
			{
				description:
					"One of the first projects was a greenhouse measurement system with an Arduino and a RichShield for humidity, temperature and sunlight readings.",
				img: "images/gallery/fontys/sem1/graph.png",
			},
			{
				description:
					"I decided to make it more interesting with a thermometer animation and automatically generated dummy data.",
				img: "images/gallery/fontys/sem1/termometers.png",
			},
		],
	},
	pizzeria: {
		title: "Pizzeria website",
		github: "https://github.com/BRISINGR-01/Fontys-projects/tree/master/Pizzeria%20website",
		content: [
			{
				description:
					"The first group project was a pizzeria website where you can order and keep track of a fake oven (Arduino with buttons).",
				img: "images/gallery/fontys/sem1/menu.png",
			},
			{
				description: "Complete with authentication, okayish design and live updates from the oven via a websocket",
				img: "images/gallery/fontys/sem1/admin.png",
			},
			{
				description: "Also if you forget/change your password you can renew it via email.",
				img: "images/gallery/fontys/sem1/login.png",
			},
		],
	},
	tsh: {
		title: "Event Manager",
		github: "https://github.com/BRISINGR-01/Event-Manager-TSH/tree/84e5a940329e8965d555d0e67fa34f1c98ca3dae",
		content: [
			{
				description:
					"My personal project was an event management desktop app (WinForms) and website (.NET) for the place where I lived (TSH). The main focus was on best practices for a scalable professional product with the proper documentation and user testing. The most important features include:",
				img: "images/gallery/fontys/sem2/tsh.png",
			},
			{
				description: "Layered architecture, authentication middleware, unit tests, design patterns, email service",
				img: "images/gallery/fontys/sem2/login.png",
			},
			{
				description:
					"Complete error handling, Azure hosted database (MySQL), CI/CD pipeline which updates a docker hub image, rate limiter and more.",
				img: "images/gallery/fontys/sem2/error.png",
			},
		],
	},
	sql: {
		title: "SQL ORM",
		github: "https://github.com/BRISINGR-01/Basic-SQL-Query-Builder",
		content: [
			{
				description:
					"We were not allowed to use ORMs, which meant that we have to write SQL queries in strings with no type checking and tons of boilerplate code. I couldn't stand it, so I implemented my own library in C# to make SQL queries with type checks and object construction. Basically one can make a simple select statement like on the picture with basic qsl features such as where, order, limit... and recieve a single/list instance(s) of a class containing the data. I ended up using it on all my personal and group projects for two semesters.",
				img: "images/gallery/fontys/sem2/sql.png",
			},
		],
	},
	portfolio: {
		title: "Personal Portfolio",
		content: [
			{
				description:
					"This is the first iteration of my this portfolio. I was inspired by 3D ones like Bruno Simon's and initially tried to create one with a moving character. The first draft included flying with different modes (testing it was quite fun).",
				img: "images/gallery/fontys/sem3/wings.png",
			},
			{
				description: (
					<>
						In the second version the user can ride a bike and explore a world with my achievements inspired by{" "}
						<Link url="https://bruno-simon.com/">Bruno Simon's</Link>. The bike had automatic balancing engineered from
						scratch and could jump, so it was possible to do quite cool tricks. However I decided that for a portfolio a
						more content-centered design was appropriate instead of a video game.
					</>
				),
				img: "images/gallery/fontys/sem3/physics.png",
			},
		],
	},
	firefigther: {
		title: "Firefighter game - Reinforcment Learning",
		github: "https://github.com/BRISINGR-01/Firefighter-Game/",
		content: [
			{
				description:
					"Reinfircment learning in short is letting a bot play a game (or any scenario) many many times teaching it how to behave. To make it a bit prettier I built a fully featured playable game where a firefighter saves a cat from the flames.",
				img: "images/gallery/fontys/sem4/fire-demo.png",
			},
			{
				description: (
					<>
						The game itself was made from scratch using pygame and freely available pixel art - I built the mechanics,
						animations, design and controls. You can give it a try{" "}
						<Link url="https://firefighter-game-deth-on-81184.web.app/">here</Link>.
					</>
				),
				img: "images/gallery/fontys/sem4/fire-end.png",
			},
			{
				description:
					"Making the game was fun enough for me to try to add automatically generated levels and explorable map (check the top right corner of the pic for the minimap).",
				img: "images/gallery/fontys/sem4/tiles.png",
			},
		],
		technologies: [{ name: "Python", percentage: 100 }],
	},
	statistics: {
		title: "Research paper",
		github: "https://github.com/BRISINGR-01/Maths/tree/main/Statistics",
		content: [
			{
				description:
					'For the Statistics course I wrote a paper on the correlation of correlation between developer experience and open source contributions using data from the "Stack Overflow Developer Survey 2025"',
				img: "images/gallery/fontys/sem4/graph.png",
			},
		],
		technologies: [{ name: "Rust", percentage: 100 }],
	},
	sync: {
		title: "Synchronization project",
		github: "https://github.com/BRISINGR-01/Maths/tree/main/Synchronisation",
		content: [
			{
				description:
					"With a friend we developed and researched a synchronization scenario about a laundromat where we had to prevent deadlocks and other possible issues via mytexes and semaphores.",
				img: "images/gallery/fontys/sem4/sync.png",
			},
		],
		technologies: [{ name: "Python", percentage: 100 }],
	},
	premaster: {
		title: "Projects made during my pre-master",
		github: "https://github.com/BRISINGR-01/song-plaque",
		content: [
			{
				description: "There was a practical side to the Circuits course where we built purely analog audio filters.",
				img: "images/gallery/fontys/sem6/lab.jpg",
			},
			{
				description: "With an ESP-32, a LED strip and a laser cutter I made this song plaque.",
				img: "images/gallery/fontys/sem6/song-plaque.png",
			},
			{
				description:
					"I recycled LEDs from trash to create this measuring cups box which lights up when the lid is opened.",
				img: "images/gallery/fontys/sem6/box.png",
			},
		],
		technologies: [{ name: "Arduino", percentage: 100 }],
	},
};

export default projects satisfies Record<string, Project>;
