"use client";

import dynamic from "next/dynamic";

const Room3D = dynamic(() => import("@/components/room/Room3D"), {
	ssr: false,
	loading: () => (
		<div className="absolute inset-0 flex items-center justify-center bg-[#D9CAD1]">
			<div className="text-center">
				<div className="inline-block w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
				<p className="text-white/70">Loading room...</p>
			</div>
		</div>
	),
});

export default function Home() {
	return (
		<main className="h-screen bg-[#D9CAD1] flex flex-col overflow-hidden">
			<div className="flex-1 relative min-h-0">
				<Room3D />
			</div>
			<footer className="absolute bottom-2 left-0 right-0 text-center text-sm text-gray-500/70">
				Based on{" "}
				<a
					href="https://github.com/andrewwoan/sooahs-room-folio"
					target="_blank"
					rel="noopener noreferrer"
					className="underline hover:text-gray-600"
				>
					sooah&apos;s room folio
				</a>{" "}
				by Andrew Woan (MIT)
			</footer>
		</main>
	);
}
