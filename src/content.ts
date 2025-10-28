import { Book, Education, Experience, type Content } from "./types";

const text = {
	A1: {
		description:
			"My first internship was at one of the largest telecomunication companies in Bulgaria. It was a project lead by the Belgian branch with the help of a Bulgarian team, in which I took part. Its objective was mainly structured around selecting the content for TV programs. My tasks varied between working on the front- and backend.",
		context:
			"A1 Bulgaria (previously known as Mtel or Mobiltel) is a telecommunications company in Bulgaria owned by A1 Telekom Austria Group.",
	},
	"sdg-sabic": {
		description:
			"My assigned establishment was Sabic. This is the second biggest plastic producer and a leading industry in agriculture, transportation, packaging, technology and more.",
		context:
			"The SDG (Sustainable Developement Goals) are a set of goals defined by UN (United Nations) meant to make the world a better place. The challenge is organized a coulple of times a year in different countries. The aim is to work with large companies on one or a few SDGs in order to help the company lower their emissions, improve its employees' quality of life...",
	},
	"sdg-solarwatt": {
		description:
			"Colab with Paulo Vieira. Github: https://github.com/BRISINGR-01/solar-trace. The challenge is organized a coulple of times a year in different countries. The aim is to work with large companies on one or a few SDGs in order to help the company lower their emissions, improve its employees' quality of life... My assigned establishment was Solarwatt. This is a solar panel industry. We are proud to share that our team has made it to the finals of the SDG Challenge 2025, where we partnered with Solarwatt on a project called SolarTrace. SolarTrace is a platform that helps bring more transparency to the solar energy industry. It includes an interactive map that shows how solar panel materials move through Europe and Asia, giving users a clearer view of the supply chain. My main focus was on the course and certification module. I built a simple learning path that introduces Solarwatt, its mission, and products, and at the end, users get a professional, shareable certificate automatically...",
		context:
			"The SDG (Sustainable Developement Goals) are a set of goals defined by UN (United Nations) meant to make the world a better place.",
	},
	"latin-is-simple": {
		description:
			"Owned by two Austrian graduates this language learning app has gained dozens of thousands of users over the years. It is primarily used by students learning Latin. It provides tools such as learning trainers, sentence analisys, and many more.",
		context: "",
	},
	ablanitsa: {
		description:
			'This is an ethnic diversity cooperation project with "St. Paisiy Hilendarski" School. I was offered to participate by my IT teacher at my highschool and I worked side by side with students from different grades.',
		context: "Highschool project",
	},
	icc: {
		description:
			"poster. ICC offers top-notch home and office cleaning services. It was founded by Fontys students who offered other students to work alongside them as part of thei Open Learning semester.",
		context: "",
	},
	asml: {
		description:
			"I had the opportunity to work on a code analysis tool that generates an interactive report, helping to visualize and understand complex codebases. This project pushed me to grow technically while also giving me insight into how large companies operate.",
		context: "",
	},
	"The Rust Programming Language":
		"The official book on the Rust programming language, written by the Rust development team at the Mozilla Foundation, fully updated for Rust 2018",
	"C Programming Language":
		"The complete guide to ANSI standard C language programming, written by the developers of C.",
	"The C++ Programming Language":
		"The C++ Programming Language, Fourth Edition, delivers meticulous, richly explained, and integrated coverage of the entire language—its facilities, abstraction mechanisms, standard libraries, and key design techniques. Throughout, Stroustrup presents concise, “pure C++11” examples, which have been carefully crafted to clarify both usage and program design. To promote deeper understanding, the author provides extensive cross-references, both within the book and to the ISO standard.",
	"Clean Code":
		"Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn't have to be that way.",
	"Software Architecture Patterns":
		"The success of any software application or system depends on the architecture style you use. This updated report presents several common architecture styles to guide designers and developers on how to design components and to help you determine the ways in which those components should interact.",
	"System Design Interview":
		"This book provides a step-by-step framework for how to tackle a system design question. It includes many real-world examples to illustrate the systematic approach, with detailed steps that you can follow.",
	"Design Patterns":
		"Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems. Previously undocumented, these 23 patterns allow designers to create more flexible, elegant, and ultimately reusable designs without having to rediscover the design solutions themselves.",
	Code: "Dives into the fundamental concepts of computer science, starting from basic electrical circuits to the intricate workings of modern computers. The book explores how simple ideas and technologies evolve into complex systems, making the world of computing accessible and engaging for both technical and non-technical readers.",
	Refactoring:
		"The guide to how to transform code with safe and rapid process, vital to keeping it cheap and easy to modify for future needs.",
	"Clean Coder":
		"Programmers who endure and succeed amidst swirling uncertainty and nonstop pressure share a common attribute: They care deeply about the practice of creating software. They treat it as a craft. They are professionals.",
	"Little Book Of Semaphores":
		"The Little Book of Semaphores is a textbook that introduces the principles of synchronization for concurrent programming. In most computer science curricula, synchronization is a module in an Operating Systems class.",
};

const education = [
	new Education("htb", "Hack the Box", "", "/icons/other/htb.svg", {
		scale: 0.003,
		position: [-2, 0.2, -0.05],
		rotation: [-0.6, 0.5, -0.4],
		wide: true,
	}),
	new Education("fontys", "Fontys (Academic preperation)", "", "/icons/other/fontys.svg", {
		scale: 0.0004,
		position: [1.1, 0.5, -0.4],
		rotation: [-0.15, -0.4, 0.05],
		wide: true,
	}),
	new Education("tue", "Tue (Embedded Systems Pre-master)", "", "/icons/other/tue.svg", {
		scale: 0.004,
		position: [0.4, 0.13, -0.2],
		rotation: [0.25, 0.1, 0.05],
		wide: true,
	}),
	new Education("primagen", "The Last Algorithms Course You'll Need", "", "/images/other/primeagen-icon.webp", {
		scale: 0.7,
		position: [-2, -0.1, 0.07],
		rotation: [-0.8, -0.6, -0.5],
	}),
	new Education(
		"fireship",
		"Fireship",
		"",
		"/icons/other/fireship.svg",
		{
			scale: 0.0007,
			position: [-1.53, 0.28, -0.3],
			rotation: [-0.25, 0.1, 0.05],
			wide: true,
		},
		"/icons/other/fireship-original.svg"
	),
	new Education("books", "Books", "", "/3d/books.glb", {
		scale: 1.5,
		position: [-0.4, -0.36, 0.2],
		rotation: [0, 1.5, 0],
	}),
	new Education("certificates", "Certificates", "", "/icons/other/certificate-detail.svg", {
		scale: 0.001,
		position: [-0.97, -0.03, -0.4],
		rotation: [-0.5, -0.5, 0.2],
		wide: true,
	}),
	new Education(
		"math",
		"Academic Preparation",
		"Graph Theory\
		 Logic and Set Thoery\
		 Applied Logic\
		 Linear Algebra\
		 Data Structures & Algorithms 1\
		 Automata\
		 Data Science\
		 Statistics\
		 Decision Theory\
		 Functional Programming\
		 Synchronisation\
		 Data Structures & Algorithms 2",
		"/3d/math.glb",
		{
			scale: 1.5,
			position: [2.8, 0.2, 0.25],
			rotation: [0, -1, 0],
			wide: true,
		},
		"/images/other/math.webp"
	),
];

export const books = [
	new Book(
		"The Rust Programming Language",
		"Covers Rust 2018",
		"Steve Klabnik and Carol Nichols",
		text["The Rust Programming Language"],
		"The Rust Programming Language.jpg",
		["Rust"]
	),
	new Book(
		"C Programming Language",
		"2nd Edition",
		"Brian Kernighan and Dennis Ritchie",
		text["C Programming Language"],
		"C Programming Language, 2nd Edition by Brian Kernighan.jpg",
		["C/C++"]
	),
	new Book(
		"The C++ Programming Language",
		"4th Edition",
		"Bjarne Stroustrup",
		text["The C++ Programming Language"],
		"The C++ Programming Language.jpg",
		["C/C++"]
	),
	new Book(
		"Clean Code",
		"A Handbook of Agile Software Craftsmanship",
		"Robert C. Martin",
		text["Clean Code"],
		"Clean Code by Robert C. Martin.jpg",
		["Java", "Code Quality"]
	),
	new Book(
		"Software Architecture Patterns",
		"2nd Edition",
		"Mark Richards",
		text["Software Architecture Patterns"],
		"Software Architecture Patterns.jpg",
		["Software Architecture", "Code Quality"]
	),
	new Book(
		"System Design Interview",
		"An insider's guide",
		"Alex Xu",
		text["System Design Interview"],
		"system design interview.jpg",
		["Software Architecture", "Code Quality"]
	),
	new Book(
		"Design Patterns",
		"Elements of Reusable Object-Oriented Software",
		" Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
		text["Design Patterns"],
		"design patterns.jpg",
		["Software Architecture", "Code Quality", "Design Patterns"]
	),
	new Book(
		"Code",
		"The Hidden Language of Computer Hardware and Software",
		"Charles Petzold",
		text["Code"],
		"Code: The Hidden Language of Computer Hardware and Software.jpg",
		["Embedded Systems"]
	),
	new Book(
		"Refactoring",
		"Improving the Design of Existing Code",
		"Martin Fowler, with Kent Beck",
		text["Refactoring"],
		"Refactoring.jpg",
		["Code Quality", "JavaScript"]
	),
	new Book(
		"Clean Coder",
		"A Code of Conduct for Professional Programmers",
		"Robert C. Martin",
		text["Clean Coder"],
		"Clean Coder.jpg",
		["Code Quality"]
	),
	new Book(
		"Little Book Of Semaphores",
		"The Ins and Outs of Concurrency Control and Common Mistakes",
		"Allen B. Downey",
		text["Little Book Of Semaphores"],
		"LittleBookOfSemaphores.webp",
		["Code Quality", "Concurrency"]
	),
];

const projects = [
	new Experience(
		"A1",
		"A1 Internship",
		"/icons/other/A1.svg",
		["01/07/2021", "30/09/2021"],
		text.A1.context,
		text.A1.description,
		[
			{ name: "React", percentage: 10 },
			{ name: "Express", percentage: 65 },
			{ name: "Docker", percentage: 5 },
			{ name: "GraphQl", percentage: 20 },
		],
		{ scale: 0.0015, position: [-1.4, 0.4, 0.4], rotation: [-0.3, 0, 0], wide: true }
	),
	new Experience(
		"sdg-sabic",
		"SDG Challenge - Sabic",
		"/images/SDG.png",
		["09/04/2024", "05/07/2024"],
		text["sdg-sabic"].context,
		text["sdg-sabic"].description,
		[
			{ name: "ThreeJS", percentage: 12 },
			{ name: "Typescript", percentage: 31 },
			{ name: "React", percentage: 20 },
			{ name: "Supabase + Vercel", percentage: 7 },
			{ name: "C/C++", percentage: 10 },
			{ name: "Arduino", percentage: 10 },
		],
		{ scale: 0.4, position: [-0.8, 0.14, 0.55], rotation: [0.4, 0.4, 0.4], wide: false }
	),
	new Experience(
		"sdg-solarwatt",
		"SDG Challenge - Solarwatt",
		"/images/SDG.png",
		["09/04/2025", "05/07/2025"],
		text["sdg-solarwatt"].context,
		text["sdg-solarwatt"].description,
		[
			{ name: "Typescript", percentage: 30 },
			{ name: "React", percentage: 52 },
			{ name: "Vercel", percentage: 8 },
		],
		{ scale: 0.4, position: [-0.8, 1.13, 0.55], rotation: [0.4, 0.4, 0.4], wide: false }
	),
	new Experience(
		"latin-is-simple",
		"Latin is simple",
		"/icons/other/latin-is-simple.svg",
		["03/01/2022", "02/09/2025"],
		text["latin-is-simple"].context,
		text["latin-is-simple"].description,
		[
			{ name: "React", percentage: 22 },
			{ name: "Bootstrap", percentage: 22 },
			{ name: "Typescript", percentage: 55 },
			{ name: "Python", percentage: 1 },
		],
		{ scale: 0.0015, position: [-0.2, 0.4, -0.1], rotation: [-0.2, 0.2, 0], wide: true }
	),
	new Experience(
		"ablanitsa",
		"Information club “Digital Studio”",
		"/icons/other/2aeg.svg",
		["01/10/2020", "01/06/2021"],
		text.ablanitsa.context,
		text.ablanitsa.description,
		[
			{ name: "HTML", percentage: 10 },
			{ name: "CSS", percentage: 15 },
			{ name: "Javascript", percentage: 45 },
			{ name: "ThreeJS", percentage: 20 },
			{ name: "Firebase", percentage: 10 },
		],
		{ scale: 0.005, position: [-0.5, -0.3, 0.2], rotation: [-1.5, 0, -0.5], wide: true }
	),
	new Experience(
		"icc",
		"The International Cleaning Company",
		"/icons/other/ICClogo.svg",
		["05/02/2024", "27/07/2024"],
		text.icc.context,
		text.icc.description,
		[
			{ name: "Next JS", percentage: 7 },
			{ name: "Typescript", percentage: 45 },
			{ name: "Supabase", percentage: 13 },
			{ name: "React", percentage: 35 },
		],
		{ scale: 0.001, position: [1.9, 0.45, 0.65], rotation: [-0.2, 0.2, 0], wide: true }
	),
	new Experience(
		"asml",
		"ASML Internship",
		"/icons/other/ASML.svg",
		["09/09/2024", "02/02/2025"],
		text.asml.context,
		text.asml.description,
		[
			{ name: "C/C++", percentage: 50 },
			{ name: "HTML", percentage: 10 },
			{ name: "CSS", percentage: 10 },
			{ name: "Javascript", percentage: 30 },
		],
		{ scale: 0.002, position: [0.5, 0.19, -0.4], rotation: [-0.4, -0.5, 0.2], wide: true }
	),
];

const content: Content = { education, projects };
export default content;
