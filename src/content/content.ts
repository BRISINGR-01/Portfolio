import type { Book, Certificate, DailyDevBadge, HTBBadge, Semester } from "../types";
import projects from "./projects";
import { Tags } from "./tags";

const text = {
	books: {
		"The Rust Programming Language":
			"The official book on the Rust programming language, written by the Rust development team at the Mozilla Foundation, fully updated for Rust 2018",
		"C Programming Language":
			"The complete guide to ANSI standard C language programming, written by the developers of C.",
		"The C++ Programming Language":
			"The C++ Programming Language, Fourth Edition, delivers meticulous, richly explained, and integrated coverage of the entire language—its facilities, abstraction mechanisms, standard libraries, and key design techniques. Throughout, Stroustrup presents concise, “pure C++11” examples, which have been carefully crafted to clarify both usage and program design. To promote deeper understanding, the author provides extensive cross-references, both within the book and to the ISO standard.",
		"Clean Code":
			"Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn't have to be that way.",
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
		image: "images/book-covers/The Rust Programming Language.jpg",
		tags: [Tags.Rust],
	},
	{
		title: "C Programming Language",
		subTitle: "2nd Edition",
		author: "Brian Kernighan and Dennis Ritchie",
		description: text.books["C Programming Language"],
		image: "images/book-covers/C Programming Language, 2nd Edition by Brian Kernighan.jpg",
		tags: [Tags["C/C++"]],
	},
	{
		title: "The C++ Programming Language",
		subTitle: "4th Edition",
		author: "Bjarne Stroustrup",
		description: text.books["The C++ Programming Language"],
		image: "images/book-covers/The C__ Programming Language.jpg",
		tags: [Tags["C/C++"]],
	},
	{
		title: "Clean Code",
		subTitle: "A Handbook of Agile Software Craftsmanship",
		author: "Robert C. Martin",
		description: text.books["Clean Code"],
		image: "images/book-covers/Clean Code by Robert C. Martin.jpg",
		tags: [Tags["Code Quality"]],
	},
	{
		title: "Software Architecture Patterns",
		subTitle: "2nd Edition",
		author: "Mark Richards",
		description: text.books["Software Architecture Patterns"],
		image: "images/book-covers/Software Architecture Patterns.jpg",
		tags: [Tags["Software Architecture"], Tags["Code Quality"]],
	},
	{
		title: "System Design Interview",
		subTitle: "An insider's guide",
		author: "Alex Xu",
		description: text.books["System Design Interview"],
		image: "images/book-covers/system design interview.jpg",
		tags: [Tags["Software Architecture"], Tags["Code Quality"]],
	},
	{
		title: "Design Patterns",
		subTitle: "Elements of Reusable Object-Oriented Software",
		author: " Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
		description: text.books["Design Patterns"],
		image: "images/book-covers/design patterns.jpg",
		tags: [Tags["Software Architecture"], Tags["Code Quality"], Tags["Design Patterns"]],
	},
	{
		title: "Code",
		subTitle: "The Hidden Language of Computer Hardware and Software",
		author: "Charles Petzold",
		description: text.books["Code"],
		image: "images/book-covers/Code: The Hidden Language of Computer Hardware and Software.jpg",
		tags: [Tags["Embedded Systems"]],
	},
	{
		title: "Refactoring",
		subTitle: "Improving the Design of Existing Code",
		author: "Martin Fowler, with Kent Beck",
		description: text.books["Refactoring"],
		image: "images/book-covers/Refactoring.jpg",
		tags: [Tags["Code Quality"], Tags["JS/TS"]],
	},
	{
		title: "Clean Coder",
		subTitle: "A Code of Conduct for Professional Programmers",
		author: "Robert C. Martin",
		description: text.books["Clean Coder"],
		image: "images/book-covers/Clean Coder.jpg",
		tags: [Tags["Code Quality"]],
	},
	{
		title: "Little Book Of Semaphores",
		subTitle: "The Ins and Outs of Concurrency Control and Common Mistakes",
		author: "Allen B. Downey",
		description: text.books["Little Book Of Semaphores"],
		image: "images/book-covers/LittleBookOfSemaphores.webp",
		tags: [Tags["Code Quality"], Tags.Concurrency],
	},

	{
		title: "Make: Electronics",
		subTitle: "2nd Edition",
		author: "Charles Platt",
		description: text.books["Make: Electronics"],
		image: "images/book-covers/Make_Electronics.webp",
		tags: [Tags["Embedded Systems"]],
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
		tags: [Tags.Linux],
	},
	{
		title: "Everything is connected",
		description: "Introduction to Networking module completed",
	},
	{
		title: "Your request is my demand",
		description: "Web Requests module completed",
		tags: [Tags.Web],
	},
	{
		title: "Playing with the mess",
		description: "JavaScript Deobfuscation module completed",
		tags: [Tags.Web, Tags["JS/TS"]],
	},
	{
		title: "Out of bounds",
		description: "Stack-Based Buffer Overflows on Linux x86 module completed",
		tags: [Tags.Linux],
	},
	{
		title: "Crawl, walk, run",
		description: "Windows Fundamentals module completed",
	},
	{
		title: "Developer",
		description: "Introduction to Web Applications module completed",
		tags: [Tags.Web],
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
].map((el) => ({
	...el,
	image: `/images/hack-the-box/${el.title.replace(/\s/g, "-").toLowerCase()}.webp`,
	tags: [Tags.Cybersecurity].concat(el.tags ?? []),
}));

export const dailyDevBadges: DailyDevBadge[] = [
	{
		tags: [Tags.Linux],
		image: "images/daily-dev/February 2025 Top Reader in UNIX.png",
		title: "Top Reader in UNIX",
	},
	{
		tags: [Tags.Linux],
		image: "images/daily-dev/January 2025 Top Reader in Shell.png",
		title: "Top Reader in Shell",
	},
	{
		tags: [Tags["Embedded Systems"]],
		image: "images/daily-dev/October 2025 Top Reader in Embedded Systems.png",
		title: "Top Reader in Embedded Systems",
	},
	{
		tags: [Tags["Embedded Systems"]],
		image: "images/daily-dev/November 2025 Top Reader in Embedded Systems.png",
		title: "Top Reader in Embedded Systems",
	},
	{
		tags: [Tags["Embedded Systems"]],
		image: "images/daily-dev/December 2025 Top Reader in Embedded Systems.png",
		title: "Top Reader in Embedded Systems",
	},
];

export const certificates: Certificate[] = [
	{
		title: "Neo4j Certified Professional",
		image: "images/certificates/Neo4j Certified Professional.jpeg",
		company: "Neo4j",
		subCertificates: [
			{
				title: "Neo4j Fundamentals",
				image: "images/certificates/Neo4j Fundamentals.jpeg",
				tags: [Tags.Database, Tags.Neo4j],
			},
			{
				title: "Cypher Fundamentals",
				image: "images/certificates/Cypher Fundamentals.jpeg",
				tags: [Tags.Database, Tags.Cypher],
			},
			{
				title: "Intermediate Cypher Queries",
				image: "images/certificates/Intermediate Cypher Queries.jpeg",
				tags: [Tags.Database, Tags.Cypher],
			},
			{
				title: "Graph Data Modeling Fundamentals",
				image: "images/certificates/Graph Data Modeling Fundamentals.jpeg",
				tags: [Tags.Database, Tags.Neo4j],
			},
			{
				title: "Importing CSV data into Neo4j",
				image: "images/certificates/Importing CSV data into Neo4j.jpeg",
				tags: [Tags.Database, Tags.Neo4j],
			},
			{
				title: "Building Neo4j Applications with Go",
				image: "images/certificates/Building Neo4j Applications with Go.jpeg",
				tags: [Tags.Database, Tags.Neo4j, Tags.Go],
			},
		],
		tags: [Tags.Database, Tags.Neo4j, Tags.Cypher, Tags.Go, Tags["Code Quality"]],
	},
	{
		title: "Learning Linux Command Line",
		image: "images/certificates/Learning Linux Command Line.jpeg",
		tags: [Tags.Linux, Tags["Linux Administration"]],
	},
	{
		title: "Getting Started with Linux",
		image: "images/certificates/Getting Started with Linux.jpeg",
		tags: [Tags.Linux, Tags["Linux Administration"]],
		company: "Linux",
		subCertificates: [
			{
				title: "Introduction to Linux",
				image: "images/certificates/Introduction to Linux.jpeg",
				tags: [Tags.Linux],
			},
			{
				title: "Linux: Overview and Installation",
				image: "images/certificates/Linux: Overview and Installation.jpeg",
				tags: [Tags.Linux],
			},
			{
				title: "Linux: Files and Permissions",
				image: "images/certificates/Linux: Files and Permissions.jpeg",
				tags: [Tags.Linux],
			},
		],
	},
	{
		title: "Ubuntu Linux Professional Certificate by Canonical",
		image: "images/certificates/Ubuntu Linux Professional Certificate by Canonical.jpeg",
		company: "Canonical",
		subCertificates: [
			{
				title: "Ubuntu Linux: Operating System Basics",
				image: "images/certificates/Ubuntu Linux: Operating System Basics.jpeg",
				tags: [Tags.Linux, Tags["Linux Administration"], Tags.Ubuntu],
			},
			{
				title: "Ubuntu Linux: Storage Management",
				image: "images/certificates/Ubuntu Linux: Storage Management.jpeg",
				tags: [Tags["Linux Administration"], Tags.Ubuntu, Tags.Linux],
			},
			{
				title: "Ubuntu Linux: User and Group Management",
				image: "images/certificates/Ubuntu Linux: User and Group Management.jpeg",
				tags: [Tags["Linux Administration"], Tags.Ubuntu, Tags.Linux],
			},
		],
		tags: [Tags.Linux, Tags["Linux Administration"], Tags.Ubuntu],
	},
	{
		title: "Prepare for the Red Hat Certified System Administrator (EX200) Exam",
		image: "images/certificates/Prepare for the Red Hat Certified System Administrator (EX200) Exam.jpeg",
		company: "Red Hat",
		tags: [Tags["Red Hat"], Tags.Linux],
		subCertificates: [
			{
				title: "Red Hat Certified System Administrator (EX200) Cert Prep: 1 Deploy, Configure, and Manage",
				image:
					"images/certificates/Red Hat Certified System Administrator (EX200) Cert Prep: 1 Deploy, Configure, and Manage.jpeg",
				tags: [Tags["Linux Administration"], Tags["Red Hat"], Tags.Linux],
			},
			{
				title: "Red Hat Certified System Administrator (EX200) Cert Prep: 2 File Access, Storage, and Security",
				image:
					"images/certificates/Red Hat Certified System Administrator (EX200) Cert Prep: 2 File Access, Storage, and Security.jpeg",
				tags: [Tags["Linux Administration"], Tags["Red Hat"], Tags.Linux],
			},
		],
	},
	{
		title: "Linux: Network Configuration",
		image: "images/certificates/Linux: Network Configuration.jpeg",
		tags: [Tags["Linux Administration"], Tags.Linux],
	},
	{
		title: "Advanced Linux: The Linux Kernel (2020)",
		image: "images/certificates/Advanced Linux: The Linux Kernel (2020).jpeg",
		tags: [Tags.Linux],
	},
	{
		title: "IoT Foundations: Operating Systems Fundamentals",
		image: "images/certificates/IoT Foundations: Operating Systems Fundamentals.jpeg",
		tags: [Tags.IOT, Tags["Embedded Systems"]],
	},
	{
		title: "Raspberry Pi Essential Training",
		image: "images/certificates/Raspberry Pi Essential Training.jpeg",
		tags: [Tags["Embedded Systems"], Tags.IOT],
	},
	{
		title: "IoT Foundations: Fundamentals",
		image: "images/certificates/IoT Foundations: Fundamentals.jpeg",
		tags: [Tags.IOT, Tags["Embedded Systems"]],
	},
	{
		title: "Troubleshooting Slow Network with Wireshark",
		image: "images/certificates/Troubleshooting Slow Network with Wireshark.png",
		tags: [Tags.Cybersecurity],
	},
	{
		title: "Go Essentials: Concurrency, Connectivity, and High-Performance Apps",
		image: "images/certificates/Go Essentials: Concurrency, Connectivity, and High-Performance Apps.jpeg",
		tags: [Tags.Go, Tags.Concurrency, Tags["Code Quality"]],
	},
	{
		title: "Master C++",
		image: "images/certificates/Master C__.jpeg",
		company: "C++",
		tags: [Tags["C/C++"], Tags.Concurrency, Tags["Code Quality"], Tags["Design Patterns"], Tags["Code Quality"]],
		subCertificates: [
			{
				title: "Complete Guide to C++ Programming Foundations",
				image: "icons/other/certificate-detail.svg",
				tags: [Tags["C/C++"]],
			},
			{
				title: "Parallel and Concurrent Programming with C++ Part 1",
				image: "icons/other/certificate-detail.svg",
				tags: [Tags.Concurrency, Tags["C/C++"]],
			},
			{
				title: "Parallel and Concurrent Programming with C++ Part 2",
				image: "images/certificates/Parallel and Concurrent Programming with C__ Part 2.jpeg",
				tags: [Tags.Concurrency, Tags["C/C++"]],
			},
			{
				title: "Test-Driven Development in C++",
				image: "images/certificates/Test-Driven Development in C__.jpeg",
				tags: [Tags["C/C++"]],
			},
			{
				title: "C++ Design Patterns: Behavioral",
				image: "images/certificates/C__ Design Patterns: Behavioral.jpeg",
				tags: [Tags["Design Patterns"], Tags["Code Quality"], Tags["C/C++"]],
			},
			{
				title: "C++ Design Patterns: Creational",
				image: "images/certificates/C__ Design Patterns: Creational.jpeg",
				tags: [Tags["Code Quality"], Tags["Design Patterns"], Tags["C/C++"]],
			},
			{
				title: "C++ Development: Advanced Concepts, Lambda Expressions, and Best Practices",
				image: "images/certificates/C__ Development: Advanced Concepts, Lambda Expressions, and Best Practices.jpeg",
				tags: [Tags["C/C++"]],
			},
		],
	},

	{
		title: "C++ Programming Professional Certificate by OpenEDG C++ Institute",
		image: "images/certificates/C__ Programming Professional Certificate by OpenEDG C__ Institute.jpeg",
		company: "OpenEDG",
		subCertificates: [
			{
				title: "C++ Design Patterns: Structural",
				image: "images/certificates/C__ Design Patterns: Structural.jpeg",
				tags: [Tags["Code Quality"], Tags["Design Patterns"], Tags["C/C++"]],
			},
			{
				title: "C++ Development: Advanced Concepts, Lambda Expressions, and Best Practices",
				image: "images/certificates/C__ Development: Advanced Concepts, Lambda Expressions, and Best Practices.jpeg",
				tags: [Tags["C/C++"]],
			},
			{
				title: "C++ Essential Training",
				image: "images/certificates/C__ Essential Training.jpeg",
				tags: [Tags["C/C++"]],
			},
		],
		tags: [Tags["Code Quality"], Tags["C/C++"]],
	},
	{
		title: "C++ Standard Template Library",
		image: "images/certificates/C__ Standard Template Library.jpeg",
		tags: [Tags["C/C++"]],
	},

	{
		title: "Docker Foundations Professional Certificate",
		image: "images/certificates/Docker Foundations Professional Certificate.jpeg",
		company: "Docker",
		subCertificates: [
			{
				title: "Learning Docker",
				image: "images/certificates/Learning Docker.jpeg",
				tags: [Tags.Docker],
			},
			{
				title: "Docker: Your First Project",
				image: "images/certificates/Docker: Your First Project.jpeg",
				tags: [Tags.Docker],
			},
			{
				title: "Learning Docker Compose",
				image: "images/certificates/Learning Docker Compose.jpeg",
				tags: [Tags.Docker],
			},
		],
		tags: [Tags.Docker],
	},
	{
		title: "JavaScript Foundations Professional Certificate by Mozilla",
		image: "images/certificates/JavaScript Foundations Professional Certificate by Mozilla.jpeg",
		tags: [Tags.Web, Tags["JS/TS"], Tags["Code Quality"]],
		company: "Mozilla",
		subCertificates: [
			{
				title: "JavaScript Essential Training",
				image: "images/certificates/JavaScript Essential Training.jpeg",
				tags: [Tags["JS/TS"]],
			},
			{
				title: "Learning the JavaScript Language",
				image: "images/certificates/Learning the JavaScript Language.jpeg",
				tags: [Tags["JS/TS"]],
			},
		],
	},
	{
		title: "Advanced TypeScript Concepts",
		image: "images/certificates/Advanced TypeScript Concepts.jpeg",
		tags: [Tags.Web, Tags.TypeScript, Tags["Code Quality"]],
	},
	{
		title: "Kubernetes: Native Tools (2018)",
		image: "images/certificates/Kubernetes: Native Tools (2018).jpeg",
		tags: [Tags.Kubernetes],
	},
	{
		title: "Learning Kubernetes",
		image: "images/certificates/Learning Kubernetes.jpeg",
		tags: [Tags.Kubernetes],
	},
	{
		title: "Kubernetes: Your First Project",
		image: "images/certificates/Kubernetes: Your First Project.jpeg",
		tags: [Tags.Kubernetes],
	},

	{
		title: "Hands-on JavaScript for Ethical Hacking",
		image: "images/certificates/Hands-on JavaScript for Ethical Hacking.png",
		tags: [Tags.Cybersecurity, Tags["JS/TS"]],
	},

	{
		title: "NodeJS - The Complete Guide (MVC, REST, APIs, GraphQl)",
		image: "icons/other/certificate-detail.svg",
		tags: [Tags["JS/TS"], Tags.NodeJS, Tags.React, Tags.Web],
	},
];

export const other = [
	{
		id: "zelinsoft",
		title: "Zelinsoft Mentorship",
		description:
			"The lead and grounder of Zelinsoft .... asked me to make a couple of lectures to his team of students" +
			`I recently had the pleasure of mentoring a group of talented interns at Zelinsoft, where we focused on both the technical and professional aspects of professional software engineering. We dove into coding best practices, TDD, alongside essential soft skills like effective communication and teamwork. These sessions were designed to help the interns build a strong foundation for their future careers.

A big thanks to Ivan Hristov for organizing this initiative. His leadership and dedication as the founder of Zelinsoft, a startup with a clear vision for nurturing young talent, were key to making this happen. It's great to see a company so committed to innovation and growth.

For those interested, I've compiled the presentations and resources into a GitHub repository: https://lnkd.in/d8JERmUc.

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

I'm pleased to share that I achieved 69th place out of 5000 participants in the HTB Mine the Matrix tryout! 🎉

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
