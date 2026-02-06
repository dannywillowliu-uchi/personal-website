"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GameShell from "./GameShell";

const WIDTH = 500;
const HEIGHT = 400;
const PADDLE_W = 10;
const PADDLE_H = 70;
const BALL_SIZE = 10;
const PADDLE_SPEED = 5;
const BALL_SPEED = 4;
const WIN_SCORE = 5;
const AI_SPEED = 3.5;

export default function Pong() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const pausedRef = useRef(false);
	const animRef = useRef<number>(0);
	const keysRef = useRef<Set<string>>(new Set());

	const playerRef = useRef({ y: HEIGHT / 2 - PADDLE_H / 2 });
	const aiRef = useRef({ y: HEIGHT / 2 - PADDLE_H / 2 });
	const ballRef = useRef({ x: WIDTH / 2, y: HEIGHT / 2, dx: BALL_SPEED, dy: BALL_SPEED * 0.5 });
	const playerScoreRef = useRef(0);
	const aiScoreRef = useRef(0);
	const gameOverRef = useRef(false);
	const winnerRef = useRef("");

	const [score, setScore] = useState(0);

	const resetBall = useCallback((direction: number) => {
		ballRef.current = {
			x: WIDTH / 2,
			y: HEIGHT / 2,
			dx: BALL_SPEED * direction,
			dy: (Math.random() - 0.5) * BALL_SPEED,
		};
	}, []);

	const reset = useCallback(() => {
		playerRef.current = { y: HEIGHT / 2 - PADDLE_H / 2 };
		aiRef.current = { y: HEIGHT / 2 - PADDLE_H / 2 };
		playerScoreRef.current = 0;
		aiScoreRef.current = 0;
		gameOverRef.current = false;
		winnerRef.current = "";
		setScore(0);
		resetBall(1);
	}, [resetBall]);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			keysRef.current.add(e.key);
			if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
		};
		const up = (e: KeyboardEvent) => keysRef.current.delete(e.key);
		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		return () => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
		};
	}, []);

	useEffect(() => {
		const loop = () => {
			animRef.current = requestAnimationFrame(loop);
			const ctx = canvasRef.current?.getContext("2d");
			if (!ctx) return;

			if (!pausedRef.current && !gameOverRef.current) {
				// Player movement
				if (keysRef.current.has("ArrowUp")) {
					playerRef.current.y = Math.max(0, playerRef.current.y - PADDLE_SPEED);
				}
				if (keysRef.current.has("ArrowDown")) {
					playerRef.current.y = Math.min(HEIGHT - PADDLE_H, playerRef.current.y + PADDLE_SPEED);
				}

				// AI movement
				const aiCenter = aiRef.current.y + PADDLE_H / 2;
				const ballY = ballRef.current.y;
				if (aiCenter < ballY - 10) {
					aiRef.current.y = Math.min(HEIGHT - PADDLE_H, aiRef.current.y + AI_SPEED);
				} else if (aiCenter > ballY + 10) {
					aiRef.current.y = Math.max(0, aiRef.current.y - AI_SPEED);
				}

				// Ball movement
				const ball = ballRef.current;
				ball.x += ball.dx;
				ball.y += ball.dy;

				// Top/bottom bounce
				if (ball.y <= 0 || ball.y >= HEIGHT - BALL_SIZE) {
					ball.dy *= -1;
					ball.y = ball.y <= 0 ? 0 : HEIGHT - BALL_SIZE;
				}

				// Player paddle collision (left)
				const player = playerRef.current;
				if (
					ball.x <= 20 + PADDLE_W &&
					ball.x >= 20 &&
					ball.y + BALL_SIZE >= player.y &&
					ball.y <= player.y + PADDLE_H &&
					ball.dx < 0
				) {
					ball.dx = Math.abs(ball.dx) * 1.05;
					const hitPos = (ball.y + BALL_SIZE / 2 - player.y) / PADDLE_H;
					ball.dy = (hitPos - 0.5) * BALL_SPEED * 2;
				}

				// AI paddle collision (right)
				const ai = aiRef.current;
				if (
					ball.x + BALL_SIZE >= WIDTH - 20 - PADDLE_W &&
					ball.x + BALL_SIZE <= WIDTH - 20 &&
					ball.y + BALL_SIZE >= ai.y &&
					ball.y <= ai.y + PADDLE_H &&
					ball.dx > 0
				) {
					ball.dx = -Math.abs(ball.dx) * 1.05;
					const hitPos = (ball.y + BALL_SIZE / 2 - ai.y) / PADDLE_H;
					ball.dy = (hitPos - 0.5) * BALL_SPEED * 2;
				}

				// Scoring
				if (ball.x < 0) {
					aiScoreRef.current++;
					if (aiScoreRef.current >= WIN_SCORE) {
						gameOverRef.current = true;
						winnerRef.current = "AI";
					}
					resetBall(1);
				} else if (ball.x > WIDTH) {
					playerScoreRef.current++;
					setScore(playerScoreRef.current);
					if (playerScoreRef.current >= WIN_SCORE) {
						gameOverRef.current = true;
						winnerRef.current = "You";
					}
					resetBall(-1);
				}
			}

			// Draw
			ctx.fillStyle = "#0a0a0a";
			ctx.fillRect(0, 0, WIDTH, HEIGHT);

			// Center line
			ctx.setLineDash([8, 8]);
			ctx.strokeStyle = "#1a3a1a";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(WIDTH / 2, 0);
			ctx.lineTo(WIDTH / 2, HEIGHT);
			ctx.stroke();
			ctx.setLineDash([]);

			// Scores
			ctx.fillStyle = "#1a3a1a";
			ctx.font = "bold 48px monospace";
			ctx.textAlign = "center";
			ctx.fillText(playerScoreRef.current.toString(), WIDTH / 2 - 50, 60);
			ctx.fillText(aiScoreRef.current.toString(), WIDTH / 2 + 50, 60);

			// Paddles
			ctx.fillStyle = "#4ade80";
			ctx.fillRect(20, playerRef.current.y, PADDLE_W, PADDLE_H);
			ctx.fillStyle = "#722F37";
			ctx.fillRect(WIDTH - 20 - PADDLE_W, aiRef.current.y, PADDLE_W, PADDLE_H);

			// Ball
			ctx.fillStyle = "#f59e0b";
			const ball = ballRef.current;
			ctx.fillRect(ball.x, ball.y, BALL_SIZE, BALL_SIZE);

			if (gameOverRef.current) {
				ctx.fillStyle = "rgba(0,0,0,0.7)";
				ctx.fillRect(0, 0, WIDTH, HEIGHT);
				ctx.fillStyle = winnerRef.current === "You" ? "#4ade80" : "#722F37";
				ctx.font = "bold 24px monospace";
				ctx.textAlign = "center";
				ctx.fillText(`${winnerRef.current} Win${winnerRef.current === "You" ? "" : "s"}!`, WIDTH / 2, HEIGHT / 2 - 10);
				ctx.fillStyle = "#4ade80";
				ctx.font = "14px monospace";
				ctx.fillText("[R] Restart", WIDTH / 2, HEIGHT / 2 + 20);
			}
		};

		animRef.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(animRef.current);
	}, [resetBall]);

	return (
		<GameShell
			title="Pong"
			score={score}
			storageKey="pong-highscore"
			onRestart={reset}
			onPauseToggle={(p) => { pausedRef.current = p; }}
		>
			<canvas
				ref={canvasRef}
				width={WIDTH}
				height={HEIGHT}
				className="border border-green-900/50 rounded"
			/>
		</GameShell>
	);
}
