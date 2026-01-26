import type { Education } from "../types";

export const education: Education[] = [
	{
		id: "books",
		title: "Books",
		description: "Books that I have read",
		icon: "/3d/books.glb",
		icon3D: {
			scale: 1.5,
			position: [-0.7, -0.36, 0.2],
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
			position: [1.6, -0.03, 0.37],
			rotation: [-0.5, 0.153, -0.053],
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
			position: [-0.12, 0.5, -0.4],
			rotation: [-0.25, -0.3, 0.05],
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
			position: [-1.5, 0.05, -0.5],
			rotation: [-0.526, -0.427, -0.186],
			wide: true,
		},
	},
	{
		id: "daily-dev",
		title: "Daily Dev",
		description: "",
		icon: "/icons/other/daily-dev.svg",
		icon3D: {
			position: [-1.1, -0.355, 0.87],
			rotation: [-1.41, -0.064, -2.89],
			scale: 0.001,
			wide: true,
		},
	},
];
