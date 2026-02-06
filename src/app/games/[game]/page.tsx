"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const Snake = dynamic(() => import("@/components/games/Snake"), { ssr: false });
const FlappyBird = dynamic(() => import("@/components/games/FlappyBird"), { ssr: false });
const Pong = dynamic(() => import("@/components/games/Pong"), { ssr: false });
const Game2048 = dynamic(() => import("@/components/games/Game2048"), { ssr: false });

const gameMap: Record<string, React.ComponentType> = {
	snake: Snake,
	flappy: FlappyBird,
	pong: Pong,
	"2048": Game2048,
};

export default function GamePage() {
	const params = useParams();
	const router = useRouter();
	const gameId = params.game as string;
	const GameComponent = gameMap[gameId];

	useEffect(() => {
		if (!GameComponent) {
			router.push("/games");
		}
	}, [GameComponent, router]);

	if (!GameComponent) return null;

	return <GameComponent />;
}
