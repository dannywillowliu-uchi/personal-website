"use client";

import { useCallback, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface GameShellProps {
	title: string;
	score: number;
	storageKey: string;
	onRestart: () => void;
	onPauseToggle: (paused: boolean) => void;
	children: ReactNode;
}

export default function GameShell({
	title,
	score,
	storageKey,
	onRestart,
	onPauseToggle,
	children,
}: GameShellProps) {
	const router = useRouter();
	const [paused, setPaused] = useState(false);
	const [highScore, setHighScore] = useState(0);

	useEffect(() => {
		const stored = localStorage.getItem(storageKey);
		if (stored) setHighScore(parseInt(stored, 10));
	}, [storageKey]);

	useEffect(() => {
		if (score > highScore) {
			setHighScore(score);
			localStorage.setItem(storageKey, score.toString());
		}
	}, [score, highScore, storageKey]);

	const togglePause = useCallback(() => {
		setPaused((prev) => {
			const next = !prev;
			onPauseToggle(next);
			return next;
		});
	}, [onPauseToggle]);

	const handleRestart = useCallback(() => {
		setPaused(false);
		onPauseToggle(false);
		onRestart();
	}, [onRestart, onPauseToggle]);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === " " && e.target === document.body) {
				e.preventDefault();
				togglePause();
			}
			if (e.key === "r" || e.key === "R") {
				handleRestart();
			}
			if (e.key === "Escape") {
				router.push("/games");
			}
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [togglePause, handleRestart, router]);

	return (
		<motion.div
			className="min-h-screen bg-[#0a0a0a] text-green-400 font-mono flex flex-col"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			{/* Header */}
			<div className="flex items-center justify-between px-4 py-3 border-b border-green-900/50">
				<button
					onClick={() => router.push("/games")}
					className="text-sm text-green-600 hover:text-green-400 transition-colors"
				>
					[ESC] Menu
				</button>
				<h1 className="text-lg font-bold text-[#722F37]">{title}</h1>
				<div className="flex gap-4 text-sm">
					<span>Score: {score}</span>
					<span className="text-green-600">Hi: {highScore}</span>
				</div>
			</div>

			{/* Game area */}
			<div className="flex-1 flex items-center justify-center relative">
				{children}
				{paused && (
					<div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
						<div className="text-center">
							<p className="text-2xl mb-4">PAUSED</p>
							<p className="text-sm text-green-600">[SPACE] Resume | [R] Restart | [ESC] Menu</p>
						</div>
					</div>
				)}
			</div>

			{/* Footer controls */}
			<div className="flex items-center justify-center gap-6 px-4 py-2 border-t border-green-900/50 text-xs text-green-700">
				<span>[SPACE] Pause</span>
				<span>[R] Restart</span>
				<span>[ESC] Menu</span>
			</div>
		</motion.div>
	);
}
