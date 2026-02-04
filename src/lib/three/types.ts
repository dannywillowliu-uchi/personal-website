import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type * as THREE from "three";

export interface SceneConfig {
	container: HTMLElement;
	router: AppRouterInstance;
}

export interface InteractiveObject {
	mesh: THREE.Object3D;
	route: string;
	label: string;
	initialScale: THREE.Vector3;
	initialPosition: THREE.Vector3;
	initialRotation: THREE.Euler;
}

export interface RouteMapping {
	[objectName: string]: {
		route: string;
		external?: boolean;
	};
}

export const ROUTE_MAPPINGS: RouteMapping = {
	// Navigation buttons
	My_Work_Button: { route: "/projects" },
	About_Button: { route: "/about" },
	Contact_Button: { route: "mailto:dannywillowliu@uchicago.edu", external: true },

	// Internal pages
	Coffee: { route: "/coffee" },

	// Social links
	GitHub: { route: "https://github.com/dannywillowliu-uchi", external: true },
	YouTube: { route: "https://www.youtube.com/@dannyliu7632", external: true },
	Headphones: { route: "https://open.spotify.com/user/7j4f1rsug0ea38pk293fh1dht", external: true }, // Spotify

	// New social icons (replaced Twitter and Boba in Blender model)
	Instagram: { route: "https://www.instagram.com/dannywillowliu", external: true },
	LinkedIn: { route: "https://www.linkedin.com/in/dwliu2", external: true },
	TFT_Icon: { route: "https://tracker.gg/tft/profile/riot/dwliu%23once", external: true },
};
