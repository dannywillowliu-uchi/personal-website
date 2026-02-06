"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GameShell from "./GameShell";

const SIZE = 4;
const CELL_SIZE = 90;
const GAP = 8;
const BOARD_SIZE = SIZE * CELL_SIZE + (SIZE + 1) * GAP;

type Board = number[][];

const TILE_COLORS: Record<number, { bg: string; fg: string }> = {
	0:    { bg: "#1a2e1a", fg: "transparent" },
	2:    { bg: "#2d4a2d", fg: "#a3e635" },
	4:    { bg: "#365e36", fg: "#a3e635" },
	8:    { bg: "#b45309", fg: "#fff" },
	16:   { bg: "#c2410c", fg: "#fff" },
	32:   { bg: "#dc2626", fg: "#fff" },
	64:   { bg: "#722F37", fg: "#fff" },
	128:  { bg: "#eab308", fg: "#fff" },
	256:  { bg: "#ca8a04", fg: "#fff" },
	512:  { bg: "#a16207", fg: "#fff" },
	1024: { bg: "#854d0e", fg: "#fff" },
	2048: { bg: "#4ade80", fg: "#0a0a0a" },
};

function createEmpty(): Board {
	return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function addRandom(board: Board): Board {
	const empty: [number, number][] = [];
	for (let r = 0; r < SIZE; r++) {
		for (let c = 0; c < SIZE; c++) {
			if (board[r][c] === 0) empty.push([r, c]);
		}
	}
	if (empty.length === 0) return board;
	const [r, c] = empty[Math.floor(Math.random() * empty.length)];
	const newBoard = board.map((row) => [...row]);
	newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
	return newBoard;
}

function slideRow(row: number[]): { result: number[]; mergeScore: number } {
	const filtered = row.filter((v) => v !== 0);
	const result: number[] = [];
	let mergeScore = 0;
	let i = 0;
	while (i < filtered.length) {
		if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
			const merged = filtered[i] * 2;
			result.push(merged);
			mergeScore += merged;
			i += 2;
		} else {
			result.push(filtered[i]);
			i++;
		}
	}
	while (result.length < SIZE) result.push(0);
	return { result, mergeScore };
}

function rotateBoard(board: Board): Board {
	const n = board.length;
	const rotated = createEmpty();
	for (let r = 0; r < n; r++) {
		for (let c = 0; c < n; c++) {
			rotated[c][n - 1 - r] = board[r][c];
		}
	}
	return rotated;
}

function move(board: Board, direction: "left" | "right" | "up" | "down"): { board: Board; score: number; moved: boolean } {
	let b = board.map((r) => [...r]);
	let rotations = 0;

	switch (direction) {
		case "left": rotations = 0; break;
		case "down": rotations = 1; break;
		case "right": rotations = 2; break;
		case "up": rotations = 3; break;
	}

	for (let i = 0; i < rotations; i++) b = rotateBoard(b);

	let totalScore = 0;
	const newBoard = createEmpty();
	for (let r = 0; r < SIZE; r++) {
		const { result, mergeScore } = slideRow(b[r]);
		newBoard[r] = result;
		totalScore += mergeScore;
	}

	let result = newBoard;
	for (let i = 0; i < (4 - rotations) % 4; i++) result = rotateBoard(result);

	const moved = JSON.stringify(board) !== JSON.stringify(result);
	return { board: result, score: totalScore, moved };
}

function canMove(board: Board): boolean {
	for (let r = 0; r < SIZE; r++) {
		for (let c = 0; c < SIZE; c++) {
			if (board[r][c] === 0) return true;
			if (c + 1 < SIZE && board[r][c] === board[r][c + 1]) return true;
			if (r + 1 < SIZE && board[r][c] === board[r + 1][c]) return true;
		}
	}
	return false;
}

function initBoard(): Board {
	return addRandom(addRandom(createEmpty()));
}

export default function Game2048() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const boardRef = useRef<Board>(initBoard());
	const [score, setScore] = useState(0);
	const scoreRef = useRef(0);
	const gameOverRef = useRef(false);
	const [, forceUpdate] = useState(0);

	const draw = useCallback(() => {
		const ctx = canvasRef.current?.getContext("2d");
		if (!ctx) return;

		ctx.fillStyle = "#0a0a0a";
		ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);

		const board = boardRef.current;
		for (let r = 0; r < SIZE; r++) {
			for (let c = 0; c < SIZE; c++) {
				const val = board[r][c];
				const x = GAP + c * (CELL_SIZE + GAP);
				const y = GAP + r * (CELL_SIZE + GAP);

				const colors = TILE_COLORS[val] || TILE_COLORS[2048];
				ctx.fillStyle = colors.bg;
				ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

				if (val > 0) {
					ctx.fillStyle = colors.fg;
					ctx.font = val >= 1024 ? "bold 24px monospace" : "bold 32px monospace";
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillText(val.toString(), x + CELL_SIZE / 2, y + CELL_SIZE / 2);
				}
			}
		}

		if (gameOverRef.current) {
			ctx.fillStyle = "rgba(0,0,0,0.7)";
			ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);
			ctx.fillStyle = "#722F37";
			ctx.font = "bold 24px monospace";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("GAME OVER", BOARD_SIZE / 2, BOARD_SIZE / 2 - 10);
			ctx.fillStyle = "#4ade80";
			ctx.font = "14px monospace";
			ctx.fillText("[R] Restart", BOARD_SIZE / 2, BOARD_SIZE / 2 + 20);
		}
	}, []);

	const reset = useCallback(() => {
		boardRef.current = initBoard();
		scoreRef.current = 0;
		gameOverRef.current = false;
		setScore(0);
		forceUpdate((n) => n + 1);
	}, []);

	useEffect(() => {
		draw();
	});

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (gameOverRef.current) return;

			let dir: "left" | "right" | "up" | "down" | null = null;
			if (e.key === "ArrowLeft") dir = "left";
			if (e.key === "ArrowRight") dir = "right";
			if (e.key === "ArrowUp") dir = "up";
			if (e.key === "ArrowDown") dir = "down";

			if (!dir) return;
			e.preventDefault();

			const { board, score: moveScore, moved } = move(boardRef.current, dir);
			if (!moved) return;

			boardRef.current = addRandom(board);
			scoreRef.current += moveScore;
			setScore(scoreRef.current);

			if (!canMove(boardRef.current)) {
				gameOverRef.current = true;
			}

			forceUpdate((n) => n + 1);
		};

		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, []);

	return (
		<GameShell
			title="2048"
			score={score}
			storageKey="2048-highscore"
			onRestart={reset}
			onPauseToggle={() => {}}
		>
			<canvas
				ref={canvasRef}
				width={BOARD_SIZE}
				height={BOARD_SIZE}
				className="border border-green-900/50"
			/>
		</GameShell>
	);
}
