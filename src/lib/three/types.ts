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
	My_Work_Button: { route: "/projects" },
	About_Button: { route: "/about" },
	Contact_Button: { route: "/about" },
	Coffee: { route: "/coffee" },
	Boba: { route: "/coffee" },
	GitHub: { route: "https://github.com/dannywillowliu", external: true },
	YouTube: { route: "/racing" },
	Twitter: { route: "https://twitter.com", external: true },
	Headphones: { route: "/music" },
};
