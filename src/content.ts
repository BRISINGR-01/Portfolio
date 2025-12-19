import type { Book, Contact, DailyDevBadge, Education, Experience, HTBBadge, Language } from "./types";
import { prettifyTitle } from "./utils";

const sdgContext =
	"The SDG (Sustainable Developement Goals) are a set of goals defined by UN meant to make the world a better place. A challenge is regularly organized where groups of students work with companies on lowering their emissions, improving their employees' quality of life...";

const text = {
	A1: {
		context:
			"A1 Bulgaria (previously known as Mtel or Mobiltel) is one of the biggest telecommunications company in Bulgaria owned by A1 Telekom Austria Group.",
		description:
			"My first internship introduced me to professional web development. I learnt to navigate large scale codebases and fixed various issues on both the front- and backend. The project was a marketing console - a tool for organizing TV channels and their content.",
	},
	"sdg-sabic": {
		context:
			"Sabic is the second largest plastic producer and a leading industry in packaging, technology and more. For my first SDG Challenge I worked on a gamified recycling initiative for their new office in Amsterdam.",
		description:
			"My proposal was to make a game out of recycling and let employees compete for prizes by winning points while using custom made plastic disposal systems",
	},
	"sdg-solarwatt": {
		context:
			"For my second SDG Challenge I colaborated with Paulo Vieira on creating a transparency platform for Solarwatt - a lead in solar panels, energy storage and more in Germany and the Netherlands.",
		description:
			"I created a virtual course (imagine LinkdIn learning or Udemy) of our platform, which provides a certificate of completion upon finishing all lectures and questions. We were nominated for the finals of the SDG Challenge 2025.",
	},
	"latin-is-simple": {
		context:
			"Created by two Austrian graduates this language learning app has gained dozens of thousands of users over the years. It is arguably the most advanced Latin-learning platform. It provides tools such as trainers, sentence analisys, and many more. URL: https://www.latin-is-simple.com/",
		description:
			'My task was to redevelop the training section. There, students can practice translation, grammar and refresh their memory in any of the five trainers: "Translation", "Advenced", "Quiz", "Cards" and "Forms". The trainers contain rigorously tested complex question generation, pattern matching to accept various answers and a scoreboard system',
	},
	ablanitsa: {
		context:
			'This is an ethnic diversity cooperation project between my highschool II English Language Highschool "Thomas Jefferson" and "St. Paisiy Hilendarski" School.',
		description:
			"My IT teacher offered me to participate in this extracurricular project, which was my first real rpogramming endeavor. I created and deployed a website portraying the customs and displaying in 3d cultural clothings of different ethnicities in Bulgaria.",
	},
	icc: {
		context:
			"ICC offers top-notch home and office cleaning services. It was founded by Fontys students who allowed other students to work alongside them as a semester project, which I joined for my 3rd semester.",
		description:
			"I worked closely with one of the founders of the company to create interactive statistics and display of bookings as well as refactor the booking form. As it was a start-up it allowed me to contribute more than I could to big companies like A1 and ASML.",
	},
	asml: {
		context:
			"ASML is a global leader in lithography technology, enabling chipmakers to create microchips that are more powerful, faster and energy efficient. They create the machines used by companies like Intel to produce high-quality chips.",
		description:
			"I had the opportunity to work on a code analysis tool that generates an interactive report, helping to visualize and understand complex codebases. This project pushed me to grow technically while also giving me insight into how global-scale companies operate.",
	},
	glow: {
		context:
			"Glow is a light festival in Eindhoven, which gathers around 800,000 visitors once a year to illuminate the sky and buildings, showcase professional and student-made attractions and push the limits of creativity",
		description: "Ever since the first time I visited Glow I wanted to ",
	},
	books: {
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
	},
};

const education: Education[] = [
	{
		id: "books",
		title: "Books",
		description: "Books that I have read",
		icon: "/3d/books.glb",
		icon3D: {
			scale: 1.5,
			position: [-0.4, -0.36, 0.2],
			rotation: [0, 1.5, 0],
		},
	},
	{
		id: "certificates",
		title: "Certificates",
		description: "",
		icon: "/icons/other/certificate-detail.svg",
		icon3D: {
			scale: 0.001,
			position: [-0.97, -0.03, -0.4],
			rotation: [-0.5, -0.5, 0.2],
			wide: true,
		},
	},
	{
		id: "fireship",
		title: "Fireship",
		description: "",
		icon: "/icons/other/fireship.svg",
		icon3D: {
			scale: 0.0007,
			position: [-1.53, 0.28, -0.3],
			rotation: [-0.25, 0.1, 0.05],
			wide: true,
		},
		altIcon: "/icons/other/fireship-original.svg",
	},
	{
		id: "tue",
		title: "Tue (Embedded Systems Pre-master)",
		description: "",
		icon: "/icons/other/tue.svg",
		icon3D: {
			scale: 0.004,
			position: [0.4, 0.13, -0.2],
			rotation: [0.25, 0.1, 0.05],
			wide: true,
		},
	},
	{
		id: "fontys",
		title: "Fontys (Academic preperation)",
		description: "",
		icon: "/icons/other/fontys.svg",
		icon3D: {
			scale: 0.006,
			position: [1.52, 0.54, -0.5],
			rotation: [-0.25, -0.6, 0.15],
			wide: true,
		},
	},
	{
		id: "htb",
		title: "Hack the Box",
		description: "",
		icon: "/icons/other/htb.svg",
		icon3D: {
			scale: 0.003,
			position: [-2, 0.2, -0.05],
			rotation: [-0.6, 0.5, -0.4],
			wide: true,
		},
	},
	{
		id: "primagen",
		title: "The Last Algorithms Course You'll Need",
		description: "",
		icon: "/images/other/primeagen-icon.webp",
		icon3D: {
			scale: 0.7,
			position: [-2, -0.1, 0.07],
			rotation: [-0.8, -0.6, -0.5],
		},
	},
	{
		id: "math",
		title: "Academic Preparation",
		description:
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
		icon: "/3d/math.glb",
		icon3D: {
			scale: 1.5,
			position: [2.8, 0.2, 0.25],
			rotation: [0, -1, 0],
			wide: true,
		},
		altIcon: "/images/other/math.webp",
	},
	{
		id: "daily-dev",
		title: "Daily Dev",
		description: "",
		icon: "/icons/other/daily-dev.svg",
		icon3D: {
			position: [-1.8, -0.2, 0.07],
			rotation: [-1.35, 0.1, 0.05],
			scale: 0.001,
			wide: true,
		},
	},
];

export const fontys = {
	semesters: [
		{
			github: "https://github.com/BRISINGR-01/Fontys-projects/tree/master/Greenhouse",
		},
	],
};

export const books: Book[] = [
	{
		title: "The Rust Programming Language",
		subTitle: "Covers Rust 2018",
		author: "Steve Klabnik and Carol Nichols",
		description: text.books["The Rust Programming Language"],
		cover: "The Rust Programming Language.jpg",
		tags: ["Rust"],
	},
	{
		title: "C Programming Language",
		subTitle: "2nd Edition",
		author: "Brian Kernighan and Dennis Ritchie",
		description: text.books["C Programming Language"],
		cover: "C Programming Language, 2nd Edition by Brian Kernighan.jpg",
		tags: ["C/C++"],
	},
	{
		title: "The C++ Programming Language",
		subTitle: "4th Edition",
		author: "Bjarne Stroustrup",
		description: text.books["The C++ Programming Language"],
		cover: "The C++ Programming Language.jpg",
		tags: ["C/C++"],
	},
	{
		title: "Clean Code",
		subTitle: "A Handbook of Agile Software Craftsmanship",
		author: "Robert C. Martin",
		description: text.books["Clean Code"],
		cover: "Clean Code by Robert C. Martin.jpg",
		tags: ["Java", "Code Quality"],
	},
	{
		title: "Software Architecture Patterns",
		subTitle: "2nd Edition",
		author: "Mark Richards",
		description: text.books["Software Architecture Patterns"],
		cover: "Software Architecture Patterns.jpg",
		tags: ["Software Architecture", "Code Quality"],
	},
	{
		title: "System Design Interview",
		subTitle: "An insider's guide",
		author: "Alex Xu",
		description: text.books["System Design Interview"],
		cover: "system design interview.jpg",
		tags: ["Software Architecture", "Code Quality"],
	},
	{
		title: "Design Patterns",
		subTitle: "Elements of Reusable Object-Oriented Software",
		author: " Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
		description: text.books["Design Patterns"],
		cover: "design patterns.jpg",
		tags: ["Software Architecture", "Code Quality", "Design Patterns"],
	},
	{
		title: "Code",
		subTitle: "The Hidden Language of Computer Hardware and Software",
		author: "Charles Petzold",
		description: text.books["Code"],
		cover: "Code: The Hidden Language of Computer Hardware and Software.jpg",
		tags: ["Embedded Systems"],
	},
	{
		title: "Refactoring",
		subTitle: "Improving the Design of Existing Code",
		author: "Martin Fowler, with Kent Beck",
		description: text.books["Refactoring"],
		cover: "Refactoring.jpg",
		tags: ["Code Quality", "JavaScript"],
	},
	{
		title: "Clean Coder",
		subTitle: "A Code of Conduct for Professional Programmers",
		author: "Robert C. Martin",
		description: text.books["Clean Coder"],
		cover: "Clean Coder.jpg",
		tags: ["Code Quality"],
	},
	{
		title: "Little Book Of Semaphores",
		subTitle: "The Ins and Outs of Concurrency Control and Common Mistakes",
		author: "Allen B. Downey",
		description: text.books["Little Book Of Semaphores"],
		cover: "LittleBookOfSemaphores.webp",
		tags: ["Code Quality", "Concurrency"],
	},
];

export const htbBadges: HTBBadge[] = [
	{
		title: "Academician",
		description: "Introduction to Academy module completed",
	},
	{
		title: "Our favorite seabird",
		description: "Linux Fundamentals module completed",
	},
	{
		title: "Everything is connected",
		description: "Introduction to Networking module completed",
	},
	{
		title: "Your request is my demand",
		description: "Web Requests module completed",
	},
	{
		title: "Playing with the mess",
		description: "JavaScript Deobfuscation module completed",
	},
	{
		title: "Out of bounds",
		description: "Stack-Based Buffer Overflows on Linux x86 module completed",
	},
	{
		title: "Crawl, walk, run",
		description: "Windows Fundamentals module completed",
	},
	{
		title: "Developer",
		description: "Introduction to Web Applications module completed",
	},
	{
		title: "An apple a day...",
		description: "MacOS Fundamentals module completed",
	},
	{
		title: "First things first",
		description: "Operating System Fundamentals path completed",
	},
	{
		title: "Unwavering User",
		description: "Awarded when you achieve your first weekly streak",
	},
	{
		title: "The hunt is on",
		description: "Cracking into Hack the Box path completed",
	},
	{
		title: "Lurk in the packets",
		description: "Intro to Network Traffic Analysis module completed",
	},
	{
		title: "Philomath",
		description: "Learning Process module completed",
	},
].map((el) => ({ ...el, image: `/images/hack-the-box/${el.title.replace(/\s/g, "-").toLowerCase()}.webp` }));

export const dailyDevBadges: DailyDevBadge[] = [
	{ image: "images/daily-dev/February 2025 Top Reader in UNIX.png", title: "Top Reader in UNIX" },
	{ image: "images/daily-dev/January 2025 Top Reader in Shell.png", title: "Top Reader in Shell" },
	{
		image: "images/daily-dev/October 2025 Top Reader in Embedded Systems.png",
		title: "Top Reader in Embedded Systems",
	},
];

export const certificates = [
	{
		name: "NodeJS - The Complete Guide (MVC, REST, APIs, GraphQl)",
		tags: ["javaScript", "node", "react"],
	},
	{
		name: "Learning Linux Command Line",
		tags: ["Linux", "Linux System Administration", "CLI"],
	},
	{
		name: "Linux: Files and Permissions",
		tags: ["Linux"],
	},
	{
		name: "Ubuntu Linux Professional Certificate by Canonical",
		company: "Canonical",
		subCertificates: ["Ubuntu Linux: Operating System Basics", "Ubuntu Linux: Storage Management"],
		tags: ["Linux", "Linux System Administration", "Ubuntu", "User Management", "CLI"],
	},
	{
		name: "Ubuntu Linux: User and Group Management",
		tags: ["Linux System Administration", "Ubuntu", "Linux", "User Management"],
	},
	{
		name: "Ubuntu Linux: Operating System Basics",
		tags: ["Linux", "Linux System Administration", "Ubuntu"],
	},
	{
		name: "Ubuntu Linux: Storage Management",
		tags: ["Storage Management", "Linux System Administration", "Ubuntu", "Linux"],
	},
	{
		name: "Getting Started with Linux",
		tags: ["Linux", "Linux System Administration"],
		subCertificates: ["Introduction to Linux", "Linux: Overview and Installation", "Linux: Files and Permissions"],
	},
	{
		name: "Introduction to Linux",
		tags: ["Linux"],
	},
	{
		name: "IoT Foundations: Operating Systems Fundamentals",
		tags: ["Internet of Things (IoT)"],
	},
	{
		name: "Linux: Overview and Installation",
		tags: ["Linux"],
	},
	{
		name: "Prepare for the Red Hat Certified System Administrator (EX200) Exam",
		tags: ["Red Hat", "Linux"],
		subCertificates: [
			"Red Hat Certified System Administrator (EX200) Cert Prep: 1 Deploy, Co nfigure, and Manage",
			"Red Hat Certified System Administrator (EX200) Cert Prep: 2 File Access, Storage, and Security",
		],
	},
	{
		name: "Red Hat Certified System Administrator (EX200) Cert Prep: 1 Deploy, Configure, and Manage",
		tags: ["System Administration", "Red Hat", "Linux"],
	},
	{
		name: "Red Hat Certified System Administrator (EX200) Cert Prep: 2 File Access, Storage, and Security",
		tags: ["Linux System Administration", "Red Hat", "Linux"],
	},
	{
		name: "Linux: Network Configuration",
		tags: ["Linux Network Administration", "Linux"],
	},
	{
		name: "Go Essentials: Concurrency, Connectivity, and High-Performance Apps",
		tags: ["Go (Programming Language)", "Code Quality"],
	},
	{
		name: "Master C++",
		tags: [
			"C++",
			"Concurrent Programming",
			"Parallel Programming",
			"Test-Driven Development",
			"Data Structures",
			"Software Design Patterns",
			"Code Quality",
		],
		subCertificates: [
			"Complete Guide to C++ Programming Foundations",
			"Parallel and Concurrent Programming with C++ Part 1",
			"Parallel and Concurrent Programming with C++ Part 2",
			"Test-Driven Development in C++",
			"C++ Design Patterns: Behavioral",
			"C++ Design Patterns: Creational",
			"C++ Development: Advanced Concepts, Lambda Expressions, and Best Practices",
		],
	},
	{
		name: "Complete Guide to C++ Programming Foundations",
		tags: ["C++"],
	},
	{
		name: "Parallel and Concurrent Programming with C++ Part 2",
		tags: ["Concurrent Programming", "C++", "Parallel Programming"],
	},
	{
		name: "Advanced Linux: The Linux Kernel (2020)",
		tags: ["Linux Kernel", "Linux"],
	},
	{
		name: "C++ Design Patterns: Behavioral",
		tags: ["Software Design Patterns", "Data Structures", "C++"],
	},
	{
		name: "C++ Design Patterns: Creational",
		tags: ["Data Structures", "Software Design Patterns", "C++"],
	},
	{
		name: "C++ Programming Professional Certificate by OpenEDG C++ Institute",
		company: "OpenEDG",
		subCertificates: [
			"C++ Design Patterns: Structural",
			"C++ Development: Advanced Concepts, Lambda Expressions, and Best Practices",
			"C++ Essential Training",
		],
		tags: ["Data Structures", "C++"],
	},
	{
		name: "C++ Design Patterns: Structural",
		tags: ["Data Structures", "Software Design Patterns", "C++"],
	},
	{
		name: "C++ Development: Advanced Concepts, Lambda Expressions, and Best Practices",
		tags: ["C++"],
	},
	{
		name: "C++ Essential Training",
		tags: ["C++"],
	},
	{
		name: "C++ Standard Template Library",
		tags: ["C++"],
	},
	{
		name: "Parallel and Concurrent Programming with C++ Part 1",
		tags: ["Concurrent Programming", "Parallel Programming", "C++"],
	},
	{
		name: "Test-Driven Development in C++",
		tags: ["Test-Driven Development", "C++"],
	},
	{
		name: "Docker Foundations Professional Certificate",
		company: "Docker",
		subCertificates: ["Learning Docker", "Docker: Your First Project", "Learning Docker Compose"],
		tags: ["Containerization", "Docker"],
	},
	{
		name: "Learning Docker",
		tags: ["Docker"],
	},
	{
		name: "Docker: Your First Project",
		tags: ["Docker"],
	},
	{
		name: "Learning Docker Compose",
		tags: ["Docker"],
	},
	{
		name: "JavaScript Foundations Professional Certificate by Mozilla",
		tags: ["Web Development", "JavaScript", "Code Quality"],
		company: "Mozilla",
		subCertificates: ["JavaScript Essential Training", "Learning the JavaScript Language"],
	},
	{
		name: "JavaScript Essential Training",
		tags: ["JavaScript"],
	},
	{
		name: "Learning the JavaScript Language",
		tags: ["JavaScript"],
	},
	{
		name: "Advanced TypeScript Concepts",
		tags: ["Web Development", "Front-End Development", "TypeScript", "Code Quality"],
	},
	{
		name: "Kubernetes: Native Tools (2018)",
		tags: ["Kubernetes"],
	},
	{
		name: "Learning Kubernetes",
		tags: ["Kubernetes"],
	},
	{
		name: "Kubernetes: Your First Project",
		tags: ["Kubernetes"],
	},
	{
		name: "Raspberry Pi Essential Training",
		tags: ["Raspberry Pi", "Internet of Things (IoT)", "Embedded Systems"],
	},
	{
		name: "IoT Foundations: Fundamentals",
		tags: ["Internet of Things (IoT)", "Embedded Systems"],
	},
	{
		name: "Hands-on JavaScript for Ethical Hacking",
		ext: "png",
		tags: ["Ethical Hacking", "Cybersecurity", "JavaScript"],
	},
	{
		name: "Troubleshooting Slow Network with Wireshark",
		ext: "png",
		tags: ["Ethical Hacking", "Cybersecurity", "Network Security", "Wireshark"],
	},
	{
		name: "Neo4j Certified Professional",
		company: "Neo4j",
		subCertificates: [
			"Neo4j Fundamentals",
			"Cypher Fundamentals",
			"Intermediate Cypher Queries",
			"Graph Data Modeling Fundamentals",
			"Importing CSV data into Neo4j",
			"Intermediate Cypher Queries",
			"Building Neo4j Applications with Go",
		],
		tags: ["Databases", "Neo4j", "Cypher", "Go (Programming Language)", "Code Quality"],
	},
	{
		name: "Neo4j Fundamentals",
		tags: ["Databases", "Neo4j"],
	},
	{
		name: "Cypher Fundamentals",
		tags: ["Databases", "Cypher"],
	},
	{
		name: "Intermediate Cypher Queries",
		tags: ["Databases", "Cypher"],
	},
	{
		name: "Graph Data Modeling Fundamentals",
		tags: ["Databases", "Neo4j"],
	},
	{
		name: "Importing CSV data into Neo4j",
		tags: ["Databases", "Neo4j"],
	},
	{
		name: "Building Neo4j Applications with Go",
		tags: ["Databases", "Neo4j", "Go (Programming Language)"],
	},
];

const experience: Experience[] = [
	{
		id: "A1",
		title: "A1 Internship",
		icon: "/icons/other/A1.svg",
		timespan: ["01/07/2021", "30/09/2021"],
		context: text.A1.context,
		description: text.A1.description,
		links: { Website: "https://www.a1.bg/" },
		icon3D: { scale: 0.0015, position: [-1.7, 0.39, 0.4], rotation: [-0.3, 0, 0.1], wide: true },
		technologies: [
			{ name: "React", percentage: 10 },
			{ name: "Express", percentage: 65 },
			{ name: "Docker", percentage: 5 },
			{ name: "GraphQl", percentage: 20 },
		],
	},
	{
		id: "sdg-sabic",
		title: "SDG Challenge - Sabic",
		icon: "/images/other/SDG.png",
		timespan: ["09/04/2024", "05/07/2024"],
		context: text["sdg-sabic"].context,
		links: { Github: "https://github.com/BRISINGR-01/SDG-Challenge-Game-SABIC", Website: "https://www.sabic.com/" },
		description: text["sdg-sabic"].description,
		images: [
			{
				title: "The final product",
				src: "images/gallery/sabic/demo.mp4",
				description:
					"With a laser-cutter and borrowed hardware I made a box with a card scanner and my phone as a screen to serve as a prototype for the disposal system.",
			},
			{
				title: "Plain hardware",
				src: "images/gallery/sabic/hardware.png",
				description:
					"This is what the hardware looks like under the hood - an ESP32 connected to an RFID/NFC reader. It can scan cards and chips (such as those on the picture) as well as the NFC of mobile phones. The scanned ID is then sent to a server which updates the screen.",
			},
			{
				title: "Login",
				src: "images/gallery/sabic/ui-2.png",
				description: "Login is possible either via credentials or QR code",
			},
			{
				title: "Progress screen",
				src: "images/gallery/sabic/ui-3.png",
				description:
					"You can view metrics about saved water/electricity..., encouraging statistics and your position in the scoreboard.",
			},
			{
				title: "3D display",
				src: "images/gallery/sabic/ui.png",
				description: "To make it more interesting you can read valuable tips in a 3D explorable area, using ThreeJS",
			},
		],
		icon3D: { scale: 0.4, position: [-0.9, 0.04, 0.27], rotation: [0.8, 0.3, 0.3], wide: false },
		technologies: [
			{ name: "ThreeJS", percentage: 12 },
			{ name: "Typescript", percentage: 31 },
			{ name: "React", percentage: 20 },
			{ name: "Supabase + Vercel", percentage: 7 },
			{ name: "C/C++", percentage: 10 },
			{ name: "Arduino", percentage: 10 },
		],
	},
	{
		id: "sdg-solarwatt",
		title: "SDG Challenge - Solarwatt",
		icon: "/images/other/SDG-logo-2.webp",
		links: {
			Github: "https://github.com/BRISINGR-01/solar-trace",
			Website: "https://www.solarwatt.com/",
			Solartrace: "https://solar-trace.vercel.app/",
		},
		timespan: ["09/04/2025", "05/07/2025"],
		context: text["sdg-solarwatt"].context,
		description: text["sdg-solarwatt"].description,
		icon3D: { scale: 0.4, position: [-1.78, -0.1, 0.65], rotation: [-0.9, -1.1, 0.8], wide: false },
		images: [
			{
				src: "images/gallery/solarwatt/qr-code.png",
				title: "The QR code designed to access the platform",
				description: "",
			},
			{
				src: "images/gallery/solarwatt/video.png",
				title: "Video Lectures",
				description:
					"Example video lecture. It has most of the modern features + saving progress, but it is required to wathch the whole video to unlock the next section.",
			},
			{
				src: "images/gallery/solarwatt/text.png",
				title: "Paragraph Lectures",
				description: "Additionally there are text + pictures style lectures.",
			},
			{
				src: "images/gallery/solarwatt/quiz.png",
				title: "Quizes",
				description:
					"After every couple of lectures there are obligatory questions testing the knowledge of the reader.",
			},
			{
				src: "images/gallery/solarwatt/certificate.png",
				title: "Certificate",
				description:
					"The idea behind the certificate is for companies to show that they are concious about their choices and for emplyees that they are aware of the hidden issues in the solar panel industry.",
			},
		],
		technologies: [
			{ name: "Typescript", percentage: 30 },
			{ name: "React", percentage: 52 },
			{ name: "Vercel", percentage: 8 },
		],
	},
	{
		id: "latin-is-simple",
		title: "Latin is simple",
		icon: "/icons/other/latin-is-simple.svg",
		timespan: ["03/01/2022", "02/09/2025"],
		context: text["latin-is-simple"].context,
		description: text["latin-is-simple"].description,
		links: { Website: "https://www.latin-is-simple.com/" },
		icon3D: { scale: 0.0015, position: [-0.2, 0.4, -0.1], rotation: [-0.2, 0.2, 0], wide: true },
		technologies: [
			{ name: "React", percentage: 22 },
			{ name: "Bootstrap", percentage: 22 },
			{ name: "Typescript", percentage: 55 },
			{ name: "Python", percentage: 1 },
		],
	},
	{
		id: "ablanitsa",
		title: "Information club “Digital Studio”",
		links: { Github: "https://github.com/BRISINGR-01/Ablanitsa" },
		icon: "/icons/other/2aeg.svg",
		timespan: ["01/10/2020", "01/06/2021"],
		context: text.ablanitsa.context,
		description: text.ablanitsa.description,
		icon3D: { scale: 0.005, position: [-0.5, -0.3, 0.2], rotation: [-1.5, 0, -0.5], wide: true },
		technologies: [
			{ name: "HTML", percentage: 10 },
			{ name: "CSS", percentage: 15 },
			{ name: "Javascript", percentage: 45 },
			{ name: "ThreeJS", percentage: 20 },
			{ name: "Firebase", percentage: 10 },
		],
	},
	{
		id: "icc",
		title: "The International Cleaning Company",
		icon: "/icons/other/ICClogo.svg",
		timespan: ["05/02/2024", "27/07/2024"],
		context: text.icc.context,
		description: text.icc.description,
		links: {
			LinkdIn: "https://www.linkedin.com/company/icc-the-international-cleaning-company/about/",
			Website: "http://theinternationalcleaningcompany.com/",
		},
		icon3D: { scale: 0.001, position: [1.9, 0.45, 0.65], rotation: [-0.2, 0.2, 0], wide: true },
		technologies: [
			{ name: "Next JS", percentage: 7 },
			{ name: "Typescript", percentage: 45 },
			{ name: "Supabase", percentage: 13 },
			{ name: "React", percentage: 35 },
		],
	},
	{
		id: "asml",
		title: "ASML Internship",
		icon: "/icons/other/ASML.svg",
		timespan: ["09/09/2024", "02/02/2025"],
		context: text.asml.context,
		description: text.asml.description,
		links: { Website: "https://www.asml.com/en" },
		icon3D: { scale: 0.002, position: [0.5, 0.19, -0.4], rotation: [-0.4, -0.5, 0.2], wide: true },
		technologies: [
			{ name: "C/C++", percentage: 50 },
			{ name: "HTML", percentage: 10 },
			{ name: "CSS", percentage: 10 },
			{ name: "Javascript", percentage: 30 },
		],
	},
	{
		id: "glow",
		title: "Glow",
		icon: "/icons/other/glow.svg",
		timespan: ["02/02/2025", "01/07/2025"],
		links: {
			"Github - Brainstorm": "https://github.com/BRISINGR-01/Fontys-projects/tree/master/Brainstorm",
			"Github - Hand Drawing": "https://github.com/GLOW-Delta-2025/hand-drawing-prototype",
		},
		context: text.glow.context,
		description: text.glow.description,
		icon3D: { scale: 0.001, position: [-0.5, 0.3, -0.2], rotation: [-0.7, -0.2, 0.5], wide: true },
	},
];

const contacts: Contact[] = [
	{
		id: "gmail",
		title: "Gmail",
		icon: "icons/other/gmail.svg",
		address: "alexander.popov233@gmail.com",
		url: "mailto:alexander.popov233@gmail.com",
		icon3D: {
			position: [0.49, 0.574, 0.2],
			rotation: [0.1, 0, 0],
			scale: 0.009,
			wide: true,
		},
	},
	{
		id: "github",
		title: "Github",
		icon: "icons/other/github.svg",
		address: "BRISINGR-01",
		url: "https://github.com/BRISINGR-01",
		icon3D: {
			position: [0, 0.25, 0.1],
			rotation: [-0.15, 0, 0.05],
			scale: 0.003,
			wide: true,
		},
	},
	{
		id: "gitlab",
		title: "Gitlab",
		icon: "icons/other/gitlab.svg",
		address: "BRISINGR-01",
		url: "https://gitlab.com/BRISINGR-01",
		icon3D: {
			position: [0.319, -0.038, 0.159],
			rotation: [-0.441, -0.208, -0.505],
			scale: 0.005,
			wide: true,
		},
	},
	{
		id: "linkedin",
		title: "LinkedIn",
		icon: "icons/other/linkedin.svg",
		address: "alexander-popov-61126825a",
		url: "https://www.linkedin.com/in/alexander-popov-61126825a/",
		icon3D: {
			position: [-0.502, 0.172, 0.319],
			rotation: [0.143, 0.408, 0.028],
			scale: 0.004,
			wide: true,
		},
	},
	{
		id: "x",
		title: "X",
		icon: "icons/other/x.svg",
		address: "AlexPopov233",
		url: "https://twitter.com/AlexPopov233",
		icon3D: {
			position: [-1.61, -0.36, 0.7],
			rotation: [-1.6, 0.0, -0.5],
			scale: 0.0012,
			wide: true,
		},
	},
	{
		id: "instagram",
		title: "Instagram",
		icon: "images/other/instagram.png",
		address: "@alexan6451",
		url: "https://www.instagram.com/alexan6451/",
		icon3D: {
			position: [-0.712, -0.13, 0.304],
			rotation: [2.14, 0.61, 4.33],
			scale: 0.3,
			wide: true,
		},
	},
	{
		id: "whatsapp",
		title: "Whatsapp",
		icon: "icons/other/whatsapp.svg",
		address: "+31620429868",
		url: "tel:+31620429868",
		icon3D: {
			position: [1.682, 0.204, 0.064],
			rotation: [0.4, -0.6, 0],
			scale: 0.0016,
			wide: true,
		},
	},
];

const languages: Language[] = [
	{ id: "bulgarian", iso: "bul" },
	{ id: "dutch", iso: "nld" },
	{ id: "english", iso: "eng" },
	{ id: "french", iso: "fra" },
	{ id: "german", iso: "deu" },
	{ id: "italian", iso: "ita" },
	{ id: "portuguese", iso: "por" },
	{ id: "spanish", iso: "spa" },
	// {id: "russian", iso: "rus"},
].map(({ id, iso }, i, total) => {
	i -= (total.length - 1) / 2;

	return {
		id,
		title: prettifyTitle(id),
		icon: `/icons/languages/${id}.svg`,
		iso,
		icon3D: {
			position: [i * 0.7 - 0.3, 0, 0.6] as [number, number, number],
			rotation: [-Math.PI / 5, 0, 0] as [number, number, number],
			scale: 0.015,
			wide: true,
		},
	};
});

const content = { experience, education, contacts, languages };
export default content;
