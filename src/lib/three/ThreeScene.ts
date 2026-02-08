import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ROUTE_MAPPINGS } from "./types";
import {
	smokeVertexShader,
	smokeFragmentShader,
	themeVertexShader,
	themeFragmentShader,
} from "./shaders";

interface SceneConfig {
	container: HTMLElement;
	router: AppRouterInstance;
	onLoadComplete?: () => void;
}

export class ThreeScene {
	private container: HTMLElement;
	private router: AppRouterInstance;
	private scene!: THREE.Scene;
	private camera!: THREE.PerspectiveCamera;
	private renderer!: THREE.WebGLRenderer;
	private controls!: OrbitControls;
	private clock!: THREE.Clock;
	private animationId: number | null = null;

	// Loaders
	private textureLoader!: THREE.TextureLoader;
	private dracoLoader!: DRACOLoader;
	private gltfLoader!: GLTFLoader;

	// Loaded textures
	private loadedTextures: {
		day: Record<string, THREE.Texture>;
		night: Record<string, THREE.Texture>;
	} = { day: {}, night: {} };

	// Materials
	private roomMaterials: Record<string, THREE.ShaderMaterial> = {};
	private glassMaterial!: THREE.MeshPhysicalMaterial;
	private smokeMaterial!: THREE.ShaderMaterial;

	// Interactive objects
	private raycasterObjects: THREE.Object3D[] = [];
	private hitboxToObjectMap: Map<THREE.Object3D, THREE.Object3D> = new Map();
	private currentHoveredObject: THREE.Object3D | null = null;

	// Social icon Groups (multi-primitive meshes from GLTF)
	private socialIconGroups: Set<THREE.Object3D> = new Set();

	// Raycaster
	private raycaster: THREE.Raycaster;
	private pointer: THREE.Vector2;

	// Animated objects
	private xAxisFans: THREE.Mesh[] = [];
	private yAxisFans: THREE.Mesh[] = [];
	private fish: THREE.Mesh | null = null;
	private chairTop: THREE.Mesh | null = null;
	private smoke: THREE.Mesh | null = null;
	private hourHand: THREE.Mesh | null = null;
	private minuteHand: THREE.Mesh | null = null;

	// Intro animation objects
	private introObjects: Record<string, THREE.Object3D> = {};

	// State
	private isDisposed = false;
	private onLoadComplete?: () => void;

	constructor(config: SceneConfig) {
		this.container = config.container;
		this.router = config.router;
		this.onLoadComplete = config.onLoadComplete;

		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color("#C5CCBE");

		this.clock = new THREE.Clock();
		this.raycaster = new THREE.Raycaster();
		this.pointer = new THREE.Vector2();

		this.textureLoader = new THREE.TextureLoader();
		this.dracoLoader = new DRACOLoader();
		this.dracoLoader.setDecoderPath("/draco/");
		this.gltfLoader = new GLTFLoader();
		this.gltfLoader.setDRACOLoader(this.dracoLoader);

		this.setupRenderer();
		this.setupCamera();
		this.setupControls();
		this.setupLighting();
		this.loadTextures();
		this.setupMaterials();
		this.loadModel();
		this.setupEventListeners();
		this.animate();
	}

	private setupRenderer(): void {
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.container.appendChild(this.renderer.domElement);
	}

	private setupCamera(): void {
		const aspect = this.container.clientWidth / this.container.clientHeight;
		this.camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 200);

		// Set camera position based on screen size
		if (window.innerWidth < 768) {
			this.camera.position.set(29.57, 14.02, 31.37);
		} else {
			this.camera.position.set(17.49, 9.11, 17.85);
		}
	}

	private setupControls(): void {
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);

		// Distance limits
		this.controls.minDistance = 5;
		this.controls.maxDistance = 45;

		// Angle constraints
		this.controls.minPolarAngle = 0;
		this.controls.maxPolarAngle = Math.PI / 2;
		this.controls.minAzimuthAngle = 0;
		this.controls.maxAzimuthAngle = Math.PI / 2;

		// Damping for smooth feel
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.05;

		// Disable panning
		this.controls.enablePan = false;

		// Set target
		if (window.innerWidth < 768) {
			this.controls.target.set(-0.08, 3.31, -0.74);
		} else {
			this.controls.target.set(0.46, 1.97, -0.83);
		}

		this.controls.update();
	}

	private setupLighting(): void {
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		this.scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(5, 10, 7.5);
		this.scene.add(directionalLight);
	}

	private loadTextures(): void {
		const v = "v=4";
		const textureMap = {
			First: {
				day: `/textures/room/day/first_texture_set_day.webp?${v}`,
				night: `/textures/room/night/first_texture_set_night.webp?${v}`,
			},
			Second: {
				day: `/textures/room/day/second_texture_set_day.webp?${v}`,
				night: `/textures/room/night/second_texture_set_night.webp?${v}`,
			},
			Third: {
				day: `/textures/room/day/third_texture_set_day.webp?${v}`,
				night: `/textures/room/night/third_texture_set_night.webp?${v}`,
			},
			Fourth: {
				day: `/textures/room/day/fourth_texture_set_day.webp?${v}`,
				night: `/textures/room/night/fourth_texture_set_night.webp?${v}`,
			},
		};

		Object.entries(textureMap).forEach(([key, paths]) => {
			const dayTexture = this.textureLoader.load(paths.day);
			dayTexture.flipY = false;
			dayTexture.colorSpace = THREE.SRGBColorSpace;
			dayTexture.minFilter = THREE.LinearFilter;
			dayTexture.magFilter = THREE.LinearFilter;
			this.loadedTextures.day[key] = dayTexture;

			const nightTexture = this.textureLoader.load(paths.night);
			nightTexture.flipY = false;
			nightTexture.colorSpace = THREE.SRGBColorSpace;
			nightTexture.minFilter = THREE.LinearFilter;
			nightTexture.magFilter = THREE.LinearFilter;
			this.loadedTextures.night[key] = nightTexture;
		});
	}

	private setupMaterials(): void {
		// Environment map for glass
		const environmentMap = new THREE.CubeTextureLoader()
			.setPath("/textures/skybox/")
			.load(["px.webp", "nx.webp", "py.webp", "ny.webp", "pz.webp", "nz.webp"]);

		// Glass material
		this.glassMaterial = new THREE.MeshPhysicalMaterial({
			transmission: 1,
			opacity: 1,
			color: 0xfbfbfb,
			metalness: 0,
			roughness: 0,
			ior: 3,
			thickness: 0.01,
			specularIntensity: 1,
			envMap: environmentMap,
			envMapIntensity: 1,
			depthWrite: false,
			specularColor: new THREE.Color(0xfbfbfb),
		});

		// Room materials with shader for day/night transition
		["First", "Second", "Third", "Fourth"].forEach((key, index) => {
			this.roomMaterials[key] = new THREE.ShaderMaterial({
				uniforms: {
					uDayTexture1: { value: this.loadedTextures.day.First },
					uNightTexture1: { value: this.loadedTextures.night.First },
					uDayTexture2: { value: this.loadedTextures.day.Second },
					uNightTexture2: { value: this.loadedTextures.night.Second },
					uDayTexture3: { value: this.loadedTextures.day.Third },
					uNightTexture3: { value: this.loadedTextures.night.Third },
					uDayTexture4: { value: this.loadedTextures.day.Fourth },
					uNightTexture4: { value: this.loadedTextures.night.Fourth },
					uMixRatio: { value: 0 },
					uTextureSet: { value: index + 1 },
				},
				vertexShader: themeVertexShader,
				fragmentShader: themeFragmentShader,
			});
		});

		// Smoke material
		const perlinTexture = this.textureLoader.load("/shaders/perlin.png");
		perlinTexture.wrapS = THREE.RepeatWrapping;
		perlinTexture.wrapT = THREE.RepeatWrapping;

		this.smokeMaterial = new THREE.ShaderMaterial({
			vertexShader: smokeVertexShader,
			fragmentShader: smokeFragmentShader,
			uniforms: {
				uTime: { value: 0 },
				uPerlinTexture: { value: perlinTexture },
			},
			side: THREE.DoubleSide,
			transparent: true,
			depthWrite: false,
		});
	}

	private loadModel(): void {
		this.gltfLoader.load("/models/Room_Portfolio_Modified.glb?v=13", (glb) => {
			if (this.isDisposed) return;

			let coffeePosition: THREE.Vector3 | null = null;
			let tftMesh: THREE.Mesh | null = null as THREE.Mesh | null;
			let socialBackingMaterial: THREE.Material | null = null as THREE.Material | null;
			const socialNames = ["GitHub", "YouTube", "Instagram", "LinkedIn"];

			glb.scene.traverse((child) => {
				// Detect social icon Groups (multi-primitive meshes from GLTF export)
				// Each icon has 2 materials (backing + icon face), which GLTF exports as
				// a Group with 2 child Meshes. We animate the Group so both move together.
				const isSocialGroup = child.type === "Group" &&
					socialNames.some((sn) => child.name.includes(sn));

				if (isSocialGroup) {
					this.socialIconGroups.add(child);
					child.userData.initialScale = child.scale.clone();
					child.userData.initialPosition = child.position.clone();
					child.userData.initialRotation = child.rotation.clone();
					return;
				}

				if (!(child instanceof THREE.Mesh)) return;

				const isChildOfSocialIcon = child.parent != null &&
					this.socialIconGroups.has(child.parent);

				this.setupMeshUserData(child);
				if (!isChildOfSocialIcon) {
					this.processSpecialMeshes(child);
				}

				if (child.name.includes("Coffee")) {
					coffeePosition = child.position.clone();
				}

				this.applyMaterial(child);

				if (child.name.includes("TFT_Icon")) {
					tftMesh = child;
				}
				if (!socialBackingMaterial && isChildOfSocialIcon) {
					const mat = Array.isArray(child.material) ? child.material[0] : child.material;
					if (mat instanceof THREE.Material && mat.name.includes("Backing")) {
						socialBackingMaterial = mat;
					}
				}

				if (!isChildOfSocialIcon) {
					this.setupInteractivity(child);
				}

				// Screen mesh: make it clickable even without "Raycaster" in the name
				if (child.name === "Screen") {
					child.userData.initialScale = child.scale.clone();
					child.userData.initialPosition = child.position.clone();
					child.userData.initialRotation = child.rotation.clone();
					this.raycasterObjects.push(child);
					this.hitboxToObjectMap.set(child, child);
				}
			});

			// Setup interactivity for social icon Groups (one hitbox per Group)
			for (const group of this.socialIconGroups) {
				this.setupGroupInteractivity(group);
			}

			// Create backing tile for TFT icon (matching social icon style)
			if (tftMesh) {
				tftMesh.updateWorldMatrix(true, false);
				const worldPos = new THREE.Vector3();
				const worldQuat = new THREE.Quaternion();
				tftMesh.getWorldPosition(worldPos);
				tftMesh.getWorldQuaternion(worldQuat);

				const backingMat = socialBackingMaterial
					? socialBackingMaterial.clone()
					: new THREE.MeshBasicMaterial({ color: 0xF0EDE4 });
				if ("side" in backingMat) {
					backingMat.side = THREE.DoubleSide;
				}
				const backing = new THREE.Mesh(
					new THREE.PlaneGeometry(0.55, 0.55),
					backingMat,
				);
				backing.position.copy(worldPos);
				backing.quaternion.copy(worldQuat);
				// Offset slightly behind the icon
				const backDir = new THREE.Vector3(0, 0, -1).applyQuaternion(worldQuat);
				backing.position.add(backDir.multiplyScalar(0.01));
				backing.name = "TFT_Backing";
				glb.scene.add(backing);
			}

			// Setup smoke
			this.setupSmoke(coffeePosition);

			this.scene.add(glb.scene);

			// The "Second" wall mesh was accidentally deleted from the modified Blender model.
			// Load it from the original GLB and clip exterior geometry to avoid artifacts.
			const roomBox = new THREE.Box3();
			glb.scene.traverse((child) => {
				if (child instanceof THREE.Mesh && ["First", "Third", "Fourth"].includes(child.name)) {
					roomBox.expandByObject(child);
				}
			});
			this.loadMissingSecondMesh(roomBox);

			// Play intro animation
			this.playIntroAnimation();

			this.onLoadComplete?.();
		});
	}

	private loadMissingSecondMesh(roomBox: THREE.Box3): void {
		this.gltfLoader.load("/models/Room_Portfolio.glb", (glb) => {
			if (this.isDisposed) return;

			glb.scene.traverse((child) => {
				if (!(child instanceof THREE.Mesh) || child.name !== "Second") return;

				// Bake the mesh's world transform into the geometry so we can
				// compare vertex positions directly against the world-space roomBox.
				child.updateWorldMatrix(true, false);
				child.geometry.applyMatrix4(child.matrixWorld);

				const pos = child.geometry.getAttribute("position");
				const uv = child.geometry.getAttribute("uv");
				const index = child.geometry.getIndex();

				const newPos: number[] = [];
				const newUv: number[] = [];
				const centroid = new THREE.Vector3();

				const addTri = (a: number, b: number, c: number) => {
					centroid.set(
						(pos.getX(a) + pos.getX(b) + pos.getX(c)) / 3,
						(pos.getY(a) + pos.getY(b) + pos.getY(c)) / 3,
						(pos.getZ(a) + pos.getZ(b) + pos.getZ(c)) / 3,
					);
					if (!roomBox.containsPoint(centroid)) return;
					for (const idx of [a, b, c]) {
						newPos.push(pos.getX(idx), pos.getY(idx), pos.getZ(idx));
						if (uv) newUv.push(uv.getX(idx), uv.getY(idx));
					}
				};

				if (index) {
					for (let i = 0; i < index.count; i += 3) {
						addTri(index.getX(i), index.getX(i + 1), index.getX(i + 2));
					}
				} else {
					for (let i = 0; i < pos.count; i += 3) {
						addTri(i, i + 1, i + 2);
					}
				}

				const clipped = new THREE.BufferGeometry();
				clipped.setAttribute("position", new THREE.Float32BufferAttribute(newPos, 3));
				if (uv && newUv.length) {
					clipped.setAttribute("uv", new THREE.Float32BufferAttribute(newUv, 2));
				}

				// Geometry is already in world space, so the mesh sits at origin
				const mesh = new THREE.Mesh(clipped, this.roomMaterials["Second"]);
				this.scene.add(mesh);
			});
		});
	}

	private setupMeshUserData(child: THREE.Mesh): void {
		if (child.name.includes("Hover") || child.name.includes("Key")) {
			child.userData.initialScale = child.scale.clone();
			child.userData.initialPosition = child.position.clone();
			child.userData.initialRotation = child.rotation.clone();
		}
	}

	private processSpecialMeshes(child: THREE.Mesh): void {
		if (child.name.includes("Fish_Fourth")) {
			this.fish = child;
			child.position.x += 0.04;
			child.position.z -= 0.03;
			child.userData.initialPosition = child.position.clone();
		}

		if (child.name.includes("Chair_Top")) {
			this.chairTop = child;
			child.userData.initialRotation = child.rotation.clone();
		}

		if (child.name.includes("Hour_Hand")) {
			this.hourHand = child;
			child.userData.initialRotation = child.rotation.clone();
		}

		if (child.name.includes("Minute_Hand")) {
			this.minuteHand = child;
			child.userData.initialRotation = child.rotation.clone();
		}

		if (child.name.includes("Fan")) {
			if (child.name.includes("Fan_2") || child.name.includes("Fan_4")) {
				this.xAxisFans.push(child);
			} else {
				this.yAxisFans.push(child);
			}
		}

		// Position TFT icon on the windowsill
		if (child.name.includes("TFT_Icon")) {
			child.position.y -= 0.45;
			child.position.z -= 0.05;
		}

		// Store intro animation objects
		// TFT_Icon is here (not in setupGroupInteractivity) because it's a single-material
		// mesh after removing the ceramic backing, so GLTF loads it as a Mesh, not a Group.
		const introNames = [
			"Hanging_Plank_1", "Hanging_Plank_2", "My_Work_Button", "About_Button",
			"Contact_Button", "TFT_Icon",
		];

		for (const name of introNames) {
			if (child.name.includes(name)) {
				this.introObjects[name] = child;
				break;
			}
		}
	}

	private applyMaterial(child: THREE.Mesh): void {
		if (child.name.includes("Water")) {
			child.material = new THREE.MeshBasicMaterial({
				color: 0x6B9EB5,
				transparent: true,
				opacity: 0.4,
				depthWrite: false,
			});
		} else if (child.name.includes("Glass")) {
			child.material = this.glassMaterial;
		} else if (child.name.includes("Bubble")) {
			child.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
		} else {
			// Social icons should keep their original materials from the GLB
			const socialIcons = ["Instagram", "LinkedIn", "TFT_Icon", "YouTube", "GitHub"];
			const isSocialIcon = socialIcons.some((icon) => child.name.includes(icon));
			if (isSocialIcon) {
				return; // Keep the material from the GLB
			}

			["First", "Second", "Third", "Fourth"].forEach((key) => {
				if (child.name.includes(key)) {
					child.material = this.roomMaterials[key];
				}
			});
		}
	}

	private setupInteractivity(child: THREE.Mesh): void {
		if (!child.name.includes("Raycaster")) return;

		// Store initial scale for hover effects
		if (!child.userData.initialScale) {
			child.userData.initialScale = child.scale.clone();
		}
		if (!child.userData.initialPosition) {
			child.userData.initialPosition = child.position.clone();
		}
		if (!child.userData.initialRotation) {
			child.userData.initialRotation = child.rotation.clone();
		}

		const hitbox = this.createHitbox(child);
		if (hitbox !== child) {
			this.scene.add(hitbox);
		}
		this.raycasterObjects.push(hitbox);
		this.hitboxToObjectMap.set(hitbox, child);
	}

	private setupGroupInteractivity(group: THREE.Object3D): void {
		const box = new THREE.Box3().setFromObject(group);
		const size = box.getSize(new THREE.Vector3());
		const center = box.getCenter(new THREE.Vector3());

		const hitboxGeometry = new THREE.BoxGeometry(
			size.x * 1.1,
			size.y * 1.75,
			size.z * 1.1
		);

		const hitboxMaterial = new THREE.MeshBasicMaterial({
			transparent: true,
			opacity: 0,
			visible: false,
		});

		const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
		hitbox.position.copy(center);
		hitbox.name = group.name + "_Hitbox";

		this.scene.add(hitbox);
		this.raycasterObjects.push(hitbox);
		this.hitboxToObjectMap.set(hitbox, group);

		// Store as intro animation object
		const introSocialNames = ["GitHub", "YouTube", "Instagram", "LinkedIn"];
		for (const name of introSocialNames) {
			if (group.name.includes(name)) {
				this.introObjects[name] = group;
				break;
			}
		}
	}

	private createHitbox(originalObject: THREE.Mesh): THREE.Object3D {
		const useOriginal = ["Bulb", "Cactus", "Kirby"].some((name) =>
			originalObject.name.includes(name)
		);

		if (useOriginal) {
			originalObject.userData.originalObject = originalObject;
			return originalObject;
		}

		const box = new THREE.Box3().setFromObject(originalObject);
		const size = box.getSize(new THREE.Vector3());
		const center = box.getCenter(new THREE.Vector3());

		const hitboxGeometry = new THREE.BoxGeometry(
			size.x * 1.1,
			size.y * 1.75,
			size.z * 1.1
		);

		const hitboxMaterial = new THREE.MeshBasicMaterial({
			transparent: true,
			opacity: 0,
			visible: false,
		});

		const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
		hitbox.position.copy(center);
		hitbox.name = originalObject.name + "_Hitbox";
		hitbox.userData.originalObject = originalObject;

		if (originalObject.name.includes("Headphones")) {
			hitbox.rotation.y = Math.PI / 4;
		}

		return hitbox;
	}

	private setupSmoke(coffeePosition: THREE.Vector3 | null): void {
		const smokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 64);
		smokeGeometry.translate(0, 0.5, 0);
		smokeGeometry.scale(0.33, 1, 0.33);

		this.smoke = new THREE.Mesh(smokeGeometry, this.smokeMaterial);

		if (coffeePosition) {
			this.smoke.position.set(
				coffeePosition.x,
				coffeePosition.y + 0.2,
				coffeePosition.z
			);
		} else {
			this.smoke.position.y = 1.83;
		}

		this.scene.add(this.smoke);
	}

	private playIntroAnimation(): void {
		// Directly animate all intro objects to scale 1
		let delay = 0;
		const allNames = [
			"Hanging_Plank_1", "Hanging_Plank_2",
			"My_Work_Button", "About_Button", "Contact_Button",
			"GitHub", "YouTube", "Instagram", "LinkedIn", "TFT_Icon"
		];

		allNames.forEach((name) => {
			const obj = this.introObjects[name];
			if (obj) {
				gsap.to(obj.scale, {
					x: 1,
					y: 1,
					z: 1,
					duration: 0.6,
					delay: delay,
					ease: "back.out(1.5)",
				});
				delay += 0.1;
			}
		});
	}

	private setupEventListeners(): void {
		window.addEventListener("resize", this.handleResize);
		window.addEventListener("mousemove", this.handleMouseMove);
		window.addEventListener("click", this.handleClick);
		window.addEventListener("touchstart", this.handleTouchStart, { passive: false });
		window.addEventListener("touchend", this.handleTouchEnd, { passive: false });
	}

	private handleResize = (): void => {
		if (this.isDisposed) return;

		const width = this.container.clientWidth;
		const height = this.container.clientHeight;

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(width, height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	};

	private handleMouseMove = (e: MouseEvent): void => {
		if (this.isDisposed) return;
		this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
		this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
	};

	private handleTouchStart = (e: TouchEvent): void => {
		if (this.isDisposed) return;
		this.pointer.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
		this.pointer.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
	};

	private handleTouchEnd = (e: TouchEvent): void => {
		if (this.isDisposed) return;
		e.preventDefault();
		this.handleInteraction();
	};

	private handleClick = (): void => {
		if (this.isDisposed) return;
		this.handleInteraction();
	};

	private handleInteraction(): void {
		this.raycaster.setFromCamera(this.pointer, this.camera);
		const intersects = this.raycaster.intersectObjects(this.raycasterObjects);

		if (intersects.length === 0) return;

		const hitbox = intersects[0].object;
		const object = this.hitboxToObjectMap.get(hitbox);
		if (!object) return;

		// Find matching route
		for (const [key, mapping] of Object.entries(ROUTE_MAPPINGS)) {
			if (object.name.includes(key)) {
				if (mapping.external) {
					if (mapping.route.startsWith("mailto:")) {
						window.location.href = mapping.route;
					} else {
						window.open(mapping.route, "_blank", "noopener,noreferrer");
					}
				} else {
					this.router.push(mapping.route);
				}
				return;
			}
		}
	}

	private playHoverAnimation(objectHitbox: THREE.Object3D, isHovering: boolean): void {
		const object = this.hitboxToObjectMap.get(objectHitbox);
		if (!object) return;

		gsap.killTweensOf(object.scale);
		gsap.killTweensOf(object.rotation);
		gsap.killTweensOf(object.position);

		let scale = 1.4;
		if (object.name.includes("Fish")) scale = 1.2;

		// Scale smoke with coffee
		if (object.name.includes("Coffee") && this.smoke) {
			gsap.killTweensOf(this.smoke.scale);
			gsap.to(this.smoke.scale, {
				x: isHovering ? 1.4 : 1,
				y: isHovering ? 1.4 : 1,
				z: isHovering ? 1.4 : 1,
				duration: isHovering ? 0.5 : 0.3,
				ease: "back.out(2)",
			});
		}

		if (isHovering) {
			gsap.to(object.scale, {
				x: object.userData.initialScale.x * scale,
				y: object.userData.initialScale.y * scale,
				z: object.userData.initialScale.z * scale,
				duration: 0.5,
				ease: "back.out(2)",
			});

			// Rotation animations for buttons
			if (object.name.includes("About_Button")) {
				gsap.to(object.rotation, {
					x: object.userData.initialRotation.x - Math.PI / 10,
					duration: 0.5,
					ease: "back.out(2)",
				});
			} else if (
				object.name.includes("Contact_Button") ||
				object.name.includes("My_Work_Button") ||
				object.name.includes("GitHub") ||
				object.name.includes("YouTube") ||
				object.name.includes("Instagram") ||
				object.name.includes("LinkedIn") ||
				object.name.includes("TFT_Icon")
			) {
				gsap.to(object.rotation, {
					x: object.userData.initialRotation.x + Math.PI / 10,
					duration: 0.5,
					ease: "back.out(2)",
				});
			}

			// Position animations
			if (object.name.includes("Name_Letter")) {
				gsap.to(object.position, {
					y: object.userData.initialPosition.y + 0.2,
					duration: 0.5,
					ease: "back.out(2)",
				});
			}
		} else {
			gsap.to(object.scale, {
				x: object.userData.initialScale.x,
				y: object.userData.initialScale.y,
				z: object.userData.initialScale.z,
				duration: 0.3,
				ease: "back.out(2)",
			});

			// Reset rotation
			if (
				object.name.includes("About_Button") ||
				object.name.includes("Contact_Button") ||
				object.name.includes("My_Work_Button") ||
				object.name.includes("GitHub") ||
				object.name.includes("YouTube") ||
				object.name.includes("Instagram") ||
				object.name.includes("LinkedIn") ||
				object.name.includes("TFT_Icon")
			) {
				gsap.to(object.rotation, {
					x: object.userData.initialRotation.x,
					duration: 0.3,
					ease: "back.out(2)",
				});
			}

			// Reset position
			if (object.name.includes("Name_Letter")) {
				gsap.to(object.position, {
					y: object.userData.initialPosition.y,
					duration: 0.3,
					ease: "back.out(2)",
				});
			}
		}
	}

	private updateClockHands(): void {
		if (!this.hourHand || !this.minuteHand) return;

		const now = new Date();
		const hours = now.getHours() % 12;
		const minutes = now.getMinutes();
		const seconds = now.getSeconds();

		const minuteAngle = (minutes + seconds / 60) * ((Math.PI * 2) / 60);
		const hourAngle = (hours + minutes / 60) * ((Math.PI * 2) / 12);

		this.minuteHand.rotation.x = -minuteAngle;
		this.hourHand.rotation.x = -hourAngle;
	}

	private animate = (timestamp: number = 0): void => {
		if (this.isDisposed) return;

		this.animationId = requestAnimationFrame(this.animate);

		const elapsedTime = this.clock.getElapsedTime();

		// Update smoke shader
		this.smokeMaterial.uniforms.uTime.value = elapsedTime;

		// Update controls
		this.controls.update();

		// Update clock hands
		this.updateClockHands();

		// Fan animations
		this.xAxisFans.forEach((fan) => {
			fan.rotation.x -= 0.04;
		});
		this.yAxisFans.forEach((fan) => {
			fan.rotation.y -= 0.04;
		});

		// Chair rotation
		if (this.chairTop) {
			const time = timestamp * 0.001;
			const baseAmplitude = Math.PI / 8;
			const rotationOffset =
				baseAmplitude * Math.sin(time * 0.5) * (1 - Math.abs(Math.sin(time * 0.5)) * 0.3);
			this.chairTop.rotation.y = this.chairTop.userData.initialRotation.y + rotationOffset;
		}

		// Fish animation
		if (this.fish) {
			const time = timestamp * 0.0015;
			const amplitude = 0.12;
			const position = amplitude * Math.sin(time) * (1 - Math.abs(Math.sin(time)) * 0.1);
			this.fish.position.y = this.fish.userData.initialPosition.y + position;
		}

		// Raycaster hover detection
		this.raycaster.setFromCamera(this.pointer, this.camera);
		const intersects = this.raycaster.intersectObjects(this.raycasterObjects);

		if (intersects.length > 0) {
			const currentIntersect = intersects[0].object;

			if (currentIntersect.name.includes("Hover")) {
				if (currentIntersect !== this.currentHoveredObject) {
					if (this.currentHoveredObject) {
						this.playHoverAnimation(this.currentHoveredObject, false);
					}
					this.currentHoveredObject = currentIntersect;
					this.playHoverAnimation(currentIntersect, true);
				}
			}

			if (currentIntersect.name.includes("Pointer") || currentIntersect.name === "Screen") {
				document.body.style.cursor = "pointer";
			} else {
				document.body.style.cursor = "default";
			}
		} else {
			if (this.currentHoveredObject) {
				this.playHoverAnimation(this.currentHoveredObject, false);
				this.currentHoveredObject = null;
			}
			document.body.style.cursor = "default";
		}

		this.renderer.render(this.scene, this.camera);
	};

	public dispose(): void {
		this.isDisposed = true;

		if (this.animationId !== null) {
			cancelAnimationFrame(this.animationId);
		}

		window.removeEventListener("resize", this.handleResize);
		window.removeEventListener("mousemove", this.handleMouseMove);
		window.removeEventListener("click", this.handleClick);
		window.removeEventListener("touchstart", this.handleTouchStart);
		window.removeEventListener("touchend", this.handleTouchEnd);

		this.controls.dispose();
		this.dracoLoader.dispose();

		this.scene.traverse((object) => {
			if (object instanceof THREE.Mesh) {
				object.geometry.dispose();
				if (Array.isArray(object.material)) {
					object.material.forEach((m) => m.dispose());
				} else {
					object.material.dispose();
				}
			}
		});

		this.renderer.dispose();

		if (this.renderer.domElement.parentNode) {
			this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
		}
	}
}
