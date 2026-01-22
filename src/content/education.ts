import type { Education } from "../types";

export const education: Education[] = [
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
	// {
	// 	id: "tue",
	// 	title: "Tue (Embedded Systems Pre-master)",
	// 	description: "",
	// 	icon: "/icons/other/tue.svg",
	// 	icon3D: {
	// 		scale: 0.004,
	// 		position: [0.4, 0.13, -0.2],
	// 		rotation: [0.25, 0.1, 0.05],
	// 		wide: true,
	// 	},
	// },
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
