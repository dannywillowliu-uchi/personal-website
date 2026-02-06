"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PageTransition from "@/components/ui/PageTransition";
import BackButton from "@/components/ui/BackButton";

const games = [
	{
		id: "snake",
		name: "Snake",
		description: "Classic snake. Eat, grow, don't hit yourself.",
		controls: "Arrow keys",
	},
	{
		id: "flappy",
		name: "Flappy Bird",
		description: "Tap to flap. Don't hit the pipes.",
		controls: "Space / Click",
	},
	{
		id: "pong",
		name: "Pong",
		description: "Beat the AI. First to 5 wins.",
		controls: "Arrow Up/Down",
	},
	{
		id: "2048",
		name: "2048",
		description: "Slide tiles. Merge to 2048.",
		controls: "Arrow keys",
	},
];

export default function GamesPage() {
	const router = useRouter();

	return (
		<PageTransition className="min-h-screen bg-[#0a0a0a]">
			<BackButton />
			<main className="container mx-auto px-6 py-20 max-w-3xl">
				{/* CRT header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold font-mono text-[#722F37] mb-2">
						ARCADE
					</h1>
					<p className="text-green-600 font-mono text-sm">
						Select a game to play
					</p>
					{/* Scanline overlay */}
					<div className="w-32 h-px bg-green-900/50 mx-auto mt-4" />
				</div>

				{/* Game grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{games.map((game, i) => (
						<motion.button
							key={game.id}
							onClick={() => router.push(`/games/${game.id}`)}
							className="group text-left p-6 border border-green-900/40 rounded-lg bg-green-950/20 hover:bg-green-950/40 hover:border-[#722F37]/60 transition-all"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 + i * 0.1 }}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<h2 className="text-xl font-mono font-bold text-green-400 group-hover:text-[#722F37] transition-colors mb-2">
								{game.name}
							</h2>
							<p className="text-sm text-green-700 mb-3">{game.description}</p>
							<span className="text-xs text-green-800 font-mono">
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
