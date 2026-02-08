"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Room3D() {
	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<{ dispose: () => void } | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (!containerRef.current) return;

		let isMounted = true;

		const initScene = async () => {
			const { ThreeScene } = await import("@/lib/three/ThreeScene");

			if (!isMounted || !containerRef.current) return;

			sceneRef.current = new ThreeScene({
				container: containerRef.current,
				router,
				onLoadComplete: () => {
					if (isMounted) {
						setIsLoading(false);
					}
				},
			});
		};

		initScene();

		return () => {
			isMounted = false;
			if (sceneRef.current) {
				sceneRef.current.dispose();
				sceneRef.current = null;
			}
		};
	}, [router]);

	return (
		<div className="absolute inset-0">
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-[#C5CCBE] z-10">
					<div className="text-center">
						<div className="inline-block w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
						<p className="text-white/70">Loading room...</p>
					</div>
				</div>
			)}
			<div
				ref={containerRef}
				className="absolute inset-0"
			/>
		</div>
	);
}
