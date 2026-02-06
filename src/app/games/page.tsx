"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PageTransition from "@/components/ui/PageTransition";

const games = [
	{ id: "snake", name: "Snake", controls: "Arrow keys" },
	{ id: "flappy", name: "Flappy Bird", controls: "Space / Click" },
	{ id: "pong", name: "Pong", controls: "Arrow Up/Down" },
	{ id: "2048", name: "2048", controls: "Arrow keys" },
];

export default function GamesPage() {
	const router = useRouter();

	return (
		<PageTransition className="min-h-screen bg-[#0a0a0a] font-mono">
			<motion.button
				className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 bg-green-950/40 border border-green-900/50 text-green-400 text-sm hover:bg-green-950/60 hover:text-green-300 transition-colors z-50"
				onClick={() => router.push("/")}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.2 }}
			>
				[ESC] Back to Room
			</motion.button>
			<main className="container mx-auto px-6 py-20 max-w-3xl">
				<div className="text-center mb-12">
					<p className="text-green-600 text-sm">
						Select a game to play
					</p>
					<div className="w-32 h-px bg-green-900/50 mx-auto mt-4" />
				</div>

				{/* Game grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{games.map((game, i) => (
						<motion.button
							key={game.id}
							onClick={() => router.push(`/games/${game.id}`)}
							className="group text-left p-6 border border-green-900/40 bg-green-950/20 hover:bg-green-950/40 hover:border-[#722F37]/60 transition-all"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 + i * 0.1 }}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<h2 className="text-xl text-green-400 group-hover:text-[#722F37] transition-colors mb-2">
								{game.name}
							</h2>
							<span className="text-xs text-green-800">
								[{game.controls}]
							</span>
						</motion.button>
					))}
				</div>

				{/* Scanline effect */}
				<div
					className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
					style={{
						backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.1) 2px, rgba(0,255,0,0.1) 4px)",
					}}
				/>
			</main>
		</PageTransition>
	);
}
