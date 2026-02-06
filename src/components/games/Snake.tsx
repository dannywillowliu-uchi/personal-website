"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GameShell from "./GameShell";

const CELL = 20;
const COLS = 20;
const ROWS = 20;
const WIDTH = COLS * CELL;
const HEIGHT = ROWS * CELL;
const TICK_MS = 120;

type Point = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";

function randomFood(snake: Point[]): Point {
	let food: Point;
	do {
		food = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
	} while (snake.some((s) => s.x === food.x && s.y === food.y));
	return food;
}

export default function Snake() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const dirRef = useRef<Dir>("right");
	const nextDirRef = useRef<Dir>("right");
	const pausedRef = useRef(false);
	const gameOverRef = useRef(false);
	const snakeRef = useRef<Point[]>([
		{ x: 5, y: 10 },
		{ x: 4, y: 10 },
		{ x: 3, y: 10 },
	]);
	const foodRef = useRef<Point>(randomFood(snakeRef.current));
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(false);

	const reset = useCallback(() => {
		snakeRef.current = [
			{ x: 5, y: 10 },
			{ x: 4, y: 10 },
			{ x: 3, y: 10 },
		];
		dirRef.current = "right";
		nextDirRef.current = "right";
		foodRef.current = randomFood(snakeRef.current);
		gameOverRef.current = false;
		setGameOver(false);
		setScore(0);
	}, []);

	const draw = useCallback(() => {
		const ctx = canvasRef.current?.getContext("2d");
		if (!ctx) return;

		// Background
		ctx.fillStyle = "#0a0a0a";
		ctx.fillRect(0, 0, WIDTH, HEIGHT);

		// Grid lines
		ctx.strokeStyle = "#0f1f0f";
		ctx.lineWidth = 0.5;
		for (let x = 0; x <= COLS; x++) {
			ctx.beginPath();
			ctx.moveTo(x * CELL, 0);
			ctx.lineTo(x * CELL, HEIGHT);
			ctx.stroke();
		}
		for (let y = 0; y <= ROWS; y++) {
			ctx.beginPath();
			ctx.moveTo(0, y * CELL);
			ctx.lineTo(WIDTH, y * CELL);
			ctx.stroke();
		}

		// Food
		const food = foodRef.current;
		ctx.fillStyle = "#722F37";
		ctx.fillRect(food.x * CELL + 2, food.y * CELL + 2, CELL - 4, CELL - 4);

		// Snake
		snakeRef.current.forEach((seg, i) => {
			ctx.fillStyle = i === 0 ? "#4ade80" : "#22c55e";
			ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
		});

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
	}, []);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			const dir = dirRef.current;
			if (e.key === "ArrowUp" && dir !== "down") nextDirRef.current = "up";
			if (e.key === "ArrowDown" && dir !== "up") nextDirRef.current = "down";
			if (e.key === "ArrowLeft" && dir !== "right") nextDirRef.current = "left";
			if (e.key === "ArrowRight" && dir !== "left") nextDirRef.current = "right";
			if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
				e.preventDefault();
			}
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			if (pausedRef.current || gameOverRef.current) {
				draw();
				return;
			}

			dirRef.current = nextDirRef.current;
			const snake = snakeRef.current;
			const head = { ...snake[0] };

			switch (dirRef.current) {
				case "up": head.y--; break;
				case "down": head.y++; break;
				case "left": head.x--; break;
				case "right": head.x++; break;
			}

			// Wall collision
			if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
				gameOverRef.current = true;
				setGameOver(true);
				draw();
				return;
			}

			// Self collision
			if (snake.some((s) => s.x === head.x && s.y === head.y)) {
				gameOverRef.current = true;
				setGameOver(true);
				draw();
				return;
			}

			snake.unshift(head);

			// Eat food
			if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
				setScore((s) => s + 10);
				foodRef.current = randomFood(snake);
			} else {
				snake.pop();
			}

			draw();
		}, TICK_MS);

		return () => clearInterval(interval);
	}, [draw]);

	return (
		<GameShell
			title="Snake"
			score={score}
			storageKey="snake-highscore"
			onRestart={reset}
			onPauseToggle={(p) => { pausedRef.current = p; }}
		>
			<canvas
				ref={canvasRef}
				width={WIDTH}
				height={HEIGHT}
				className="border border-green-900/50"
			/>
		</GameShell>
	);
}
