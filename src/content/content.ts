import type { Book, DailyDevBadge, HTBBadge, Semester } from "../types";
import projects from "./projects";

const text = {
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
		"Make: Electronics":
			"Explores the properties and applications of discrete components that are the fundamental building blocks of circuit design. Understanding resistors, capacitors, transistors, inductors, diodes, and integrated circuit chips is essential even when using microcontrollers.",
	},
};

export const fontys = {
	img: "/icons/other/fontys.svg",
	description:
		"I study ICT (Information Communication Technology) at Fontys University of Applied Sciences in Eindhoven. This is an applied university which means that emphasis is put on practicing skills in a real life-like environment, rather than plain theory.",
	semesters: [
		{
			title: "Semester 1 - Introduction",
			description:
				"The 1st semester was introductory, so we made very basic projects which I did my best to overcomplicate",
			projects: [projects.greenhouse, projects.pizzeria],
		},
		{
			title: "Semester 2 - Professional Skills",
			description:
				"During the 2nd semester we had to make high-quality professional projects with both business needs and best practices in mind",
			projects: [projects.tsh, projects.sql],
		},
		{
			title: "Semester 3 - Open Learning",
			description:
				"I switched to a different form of education in my 3rd semester (Open Learning) which allowed me to work with real companies and no limitations",
			projects: [projects.icc, projects.portfolio],
		},
		{
			title: "Semester 4 - Academic Preparation",
			description:
				"To prepare myself for a pre-master I took academic courses as my 4th semester on top of semesters 2, 3 and 6. I took the folowing courses:",
			courses: [
				"Graph Theory",
				"Logic and Set Theory",
				"Applied Logic",
				"Linear Algebra",
				"Data Structures & Algorithms I",
				"Automata",
				"Data Science",
				"Statistics",
				"Decision Theory",
				"Functional Programming",
				"Synchronisation",
				"Data Structures & Algorithms II",
			],
			projects: [projects.firefigther, projects.sync, projects.statistics],
		},
		{
			title: "Semester 5 - Internship",
			description: projects.asml.description,
			projects: [projects.asml],
		},
		{
			title: "Semester 6 - Delta",
			description:
				'For my "advanced" semester I joined Fontys\' excellence programme Delta where I could work on more complex projects.',
			projects: [projects.glow],
		},
		{
			title: "Semester 7 - Pre-master",
			description: "As my minor I chose to do an Embedded Systems pre-master at TUe. I took the folowing courses:",
			courses: [
				"Circuits",
				"Logic and Set theory",
				"Calculus and Probability",
				"Math I",
				"Linear systems, signals and control",
				"Computational modeling",
			],
			projects: [projects.premaster],
		},
	] satisfies Semester[],
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

	{
		title: "Make: Electronics",
		subTitle: "2nd Edition",
		author: "Charles Platt",
		description: text.books["Make: Electronics"],
		cover: "Make_Electronics.webp",
		tags: ["Electronics", "Embedded Systems"],
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
	{
		image: "images/daily-dev/November 2025 Top Reader in Embedded Systems.png",
		title: "Top Reader in Embedded Systems",
	},
	{
		image: "images/daily-dev/December 2025 Top Reader in Embedded Systems.png",
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

export const other = [
	{
		id: "zelinsoft",
		title: "Zelinsoft Mentorship",
		description:
			"The lead and grounder of Zelinsoft .... asked me to make a couple of lectures to his team of students" +
			`I recently had the pleasure of mentoring a group of talented interns at Zelinsoft, where we focused on both the technical and professional aspects of professional software engineering. We dove into coding best practices, TDD, alongside essential soft skills like effective communication and teamwork. These sessions were designed to help the interns build a strong foundation for their future careers.

A big thanks to Ivan Hristov for organizing this initiative. His leadership and dedication as the founder of Zelinsoft, a startup with a clear vision for nurturing young talent, were key to making this happen. It’s great to see a company so committed to innovation and growth.

For those interested, I’ve compiled the presentations and resources into a GitHub repository: https://lnkd.in/d8JERmUc.

Excited to see where these interns go next!
Zelinsoft: https://lnkd.in/dRvtnT_M`,
		icon3D: { scale: 0.001, position: [-0.5, 0.3, -0.4], rotation: [-0.7, -0.2, 0.5], wide: true },
	},

	{
		id: "mine-the-matrix",
		// title: projects.glow.title,
		// icon: projects.glow.icon,
		// project: projects.glow,
		// context: text.glow.context,
		description: `Celebrating My 69th Place in HTB Mine the Matrix Tryout 🏆

I’m pleased to share that I achieved 69th place out of 5000 participants in the HTB Mine the Matrix tryout! 🎉

The competition covered a range of challenging areas:
 ‣ Reverse Engineering: 🔍 Analyzing and deconstructing binaries to uncover hidden elements.
 ‣ Exploitation: 💣 Identifying and leveraging vulnerabilities to gain control.
 ‣ Cryptography: 🔐 Breaking down and deciphering encrypted messages.
 ‣ Forensics: 🕵️‍♂️ Investigating data and files to retrieve critical information.
 ‣ Web Exploitation: 🌐 Finding and exploiting security weaknesses in web applications.

This experience was both demanding and rewarding, offering a great opportunity to test and expand my skills. A big thank you to the Hack The Box team for organizing such a rigorous event and to everyone who supported me along the way. 🙌

Looking forward to applying these insights and continuing to grow in the cybersecurity field. 🚀
`,
		icon3D: { scale: 0.001, position: [-0.5, 0.3, -0.4], rotation: [-0.7, -0.2, 0.5], wide: true },
	},
	{
		id: "international-week",
		description: `🌍✨ Proud to be part of Fontys' International Week and thrilled to have contributed to an amazing team project!

As a team, we've developed an innovative product that not only enhances our productivity but also promotes our health and well-being. 
🚶‍♂️💼

Our product? A smart solution that encourages us to take a break from work and go for a short walk. It locks our Trello boards and prompts us with: "Walk 20 meters to the location shown in the image and scan the QR code to unlock this task!" 🌳📱

This initiative underscores the importance of work-life balance, reminding us to step away from our desks occasionally and enjoy some fresh air and movement. 🌿💻

Thanks to my amazing teammates for their collaboration and to Fontys for facilitating this inspiring week filled with innovation and creativity! 💡👏`,
	},
];
