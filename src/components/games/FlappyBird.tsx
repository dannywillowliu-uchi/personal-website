"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GameShell from "./GameShell";

const WIDTH = 400;
const HEIGHT = 500;
const BIRD_SIZE = 20;
const GRAVITY = 0.4;
const FLAP = -6.5;
const PIPE_WIDTH = 50;
const PIPE_GAP = 140;
const PIPE_SPEED = 2.5;
const PIPE_INTERVAL = 100; // frames between pipe spawns

interface Pipe {
	x: number;
	topHeight: number;
	scored: boolean;
}

export default function FlappyBird() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const pausedRef = useRef(false);
	const gameOverRef = useRef(false);
	const birdRef = useRef({ y: HEIGHT / 2, velocity: 0 });
	const pipesRef = useRef<Pipe[]>([]);
	const frameRef = useRef(0);
	const animRef = useRef<number>(0);
	const [score, setScore] = useState(0);
	const scoreRef = useRef(0);
	const startedRef = useRef(false);

	const flap = useCallback(() => {
		if (gameOverRef.current) return;
		if (!startedRef.current) startedRef.current = true;
		birdRef.current.velocity = FLAP;
	}, []);

	const reset = useCallback(() => {
		birdRef.current = { y: HEIGHT / 2, velocity: 0 };
		pipesRef.current = [];
		frameRef.current = 0;
		scoreRef.current = 0;
		gameOverRef.current = false;
		startedRef.current = false;
		setScore(0);
	}, []);

	// Input handlers
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === " " && e.target === document.body) {
				// Only flap if not pause key (GameShell handles pause on space)
				// We'll use click/tap and ArrowUp for flap instead
			}
			if (e.key === "ArrowUp") {
				e.preventDefault();
				flap();
			}
		};
		const handleClick = (e: MouseEvent) => {
			const canvas = canvasRef.current;
			if (canvas && canvas.contains(e.target as Node)) {
				flap();
			}
		};
		const handleTouch = (e: TouchEvent) => {
			const canvas = canvasRef.current;
			if (canvas && canvas.contains(e.target as Node)) {
				e.preventDefault();
				flap();
			}
		};
		window.addEventListener("keydown", handleKey);
		window.addEventListener("click", handleClick);
		window.addEventListener("touchstart", handleTouch, { passive: false });
		return () => {
			window.removeEventListener("keydown", handleKey);
			window.removeEventListener("click", handleClick);
			window.removeEventListener("touchstart", handleTouch);
		};
	}, [flap]);

	useEffect(() => {
		const loop = () => {
			animRef.current = requestAnimationFrame(loop);
			const ctx = canvasRef.current?.getContext("2d");
			if (!ctx) return;

			// Background
			ctx.fillStyle = "#0a0a0a";
			ctx.fillRect(0, 0, WIDTH, HEIGHT);

			if (!startedRef.current) {
				// Start screen
				ctx.fillStyle = "#4ade80";
				ctx.font = "16px monospace";
				ctx.textAlign = "center";
				ctx.fillText("Click or press Up to start", WIDTH / 2, HEIGHT / 2 + 40);

				// Draw bird
				ctx.fillStyle = "#f59e0b";
				const bird = birdRef.current;
				ctx.fillRect(80 - BIRD_SIZE / 2, bird.y - BIRD_SIZE / 2, BIRD_SIZE, BIRD_SIZE);
				return;
			}

			if (!pausedRef.current && !gameOverRef.current) {
				// Update bird
				const bird = birdRef.current;
				bird.velocity += GRAVITY;
				bird.y += bird.velocity;

				// Spawn pipes
				frameRef.current++;
				if (frameRef.current % PIPE_INTERVAL === 0) {
					const minTop = 60;
					const maxTop = HEIGHT - PIPE_GAP - 60;
					const topHeight = Math.random() * (maxTop - minTop) + minTop;
					pipesRef.current.push({ x: WIDTH, topHeight, scored: false });
				}

				// Update pipes
				pipesRef.current = pipesRef.current.filter((p) => p.x + PIPE_WIDTH > -10);
				for (const pipe of pipesRef.current) {
					pipe.x -= PIPE_SPEED;

					// Score
					if (!pipe.scored && pipe.x + PIPE_WIDTH < 80) {
						pipe.scored = true;
						scoreRef.current++;
						setScore(scoreRef.current);
					}

					// Collision
					const birdLeft = 80 - BIRD_SIZE / 2;
					const birdRight = 80 + BIRD_SIZE / 2;
					const birdTop = bird.y - BIRD_SIZE / 2;
					const birdBottom = bird.y + BIRD_SIZE / 2;

					if (birdRight > pipe.x && birdLeft < pipe.x + PIPE_WIDTH) {
						if (birdTop < pipe.topHeight || birdBottom > pipe.topHeight + PIPE_GAP) {
							gameOverRef.current = true;
						}
					}
				}

				// Floor/ceiling collision
				if (bird.y + BIRD_SIZE / 2 > HEIGHT || bird.y - BIRD_SIZE / 2 < 0) {
					gameOverRef.current = true;
				}
			}

			// Draw pipes
			ctx.fillStyle = "#22c55e";
			for (const pipe of pipesRef.current) {
				// Top pipe
				ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
				// Bottom pipe
				ctx.fillRect(pipe.x, pipe.topHeight + PIPE_GAP, PIPE_WIDTH, HEIGHT - pipe.topHeight - PIPE_GAP);
			}

			// Draw bird
			ctx.fillStyle = gameOverRef.current ? "#ef4444" : "#f59e0b";
			const bird = birdRef.current;
			ctx.fillRect(80 - BIRD_SIZE / 2, bird.y - BIRD_SIZE / 2, BIRD_SIZE, BIRD_SIZE);

			// Game over
			if (gameOverRef.current) {
				ctx.fillStyle = "rgba(0,0,0,0.7)";
				ctx.fillRect(0, 0, WIDTH, HEIGHT);
				ctx.fillStyle = "#722F37";
				ctx.font = "bold 24px monospace";
				ctx.textAlign = "center";
				ctx.fillText("GAME OVER", WIDTH / 2, HEIGHT / 2 - 10);
				ctx.fillStyle = "#4ade80";
				ctx.font = "14px monospace";
				ctx.fillText("[R] Restart", WIDTH / 2, HEIGHT / 2 + 20);
			}
		};

		animRef.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(animRef.current);
	}, []);

	return (
		<GameShell
			title="Flappy Bird"
			score={score}
			storageKey="flappy-highscore"
			onRestart={reset}
			onPauseToggle={(p) => { pausedRef.current = p; }}
		>
			<canvas
				ref={canvasRef}
				width={WIDTH}
				height={HEIGHT}
				className="border border-green-900/50 cursor-pointer"
			/>
		</GameShell>
	);
}
