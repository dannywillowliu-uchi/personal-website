"use client";

import { motion } from "framer-motion";
import RoomObject from "./RoomObject";
import Window from "./objects/Window";
import Bookshelf from "./objects/Bookshelf";
import MusicCorner from "./objects/MusicCorner";
import GamingSetup from "./objects/GamingSetup";
import Desk from "./objects/Desk";
import Computer from "./objects/Computer";
import CoffeeMug from "./objects/CoffeeMug";

export default function Room() {
	return (
		<div className="w-full h-full flex items-center justify-center p-4">
			<svg
				viewBox="0 0 800 500"
				className="w-full max-w-4xl h-auto"
				role="img"
				aria-label="Danny's interactive room"
			>
				{/* Room background */}
				<rect x="0" y="0" width="800" height="500" fill="#F5F0E6" />

				{/* Wall */}
				<rect x="30" y="50" width="740" height="380" fill="#FDF8F0" stroke="#D4B896" strokeWidth="3" />

				{/* Floor */}
				<rect x="30" y="430" width="740" height="50" fill="#D4B896" />
				{/* Floor boards */}
				<line x1="30" y1="445" x2="770" y2="445" stroke="#C4A886" strokeWidth="1" />
				<line x1="30" y1="460" x2="770" y2="460" stroke="#C4A886" strokeWidth="1" />
				{/* Vertical floor board lines */}
				{[100, 200, 300, 400, 500, 600, 700].map((x) => (
					<line key={x} x1={x} y1="430" x2={x} y2="480" stroke="#C4A886" strokeWidth="1" />
				))}

				{/* Rug under desk */}
				<ellipse cx="580" cy="445" rx="140" ry="25" fill="#E8A87C" opacity="0.6" />
				<ellipse cx="580" cy="445" rx="120" ry="20" fill="#D4B896" opacity="0.5" />

				{/* Static decorative elements */}
				<Desk />

				{/* Clickable objects */}
				<RoomObject href="/about" label="Window - Social links and about">
					<Window />
				</RoomObject>

				<RoomObject href="/about" label="Bookshelf - About me and resume">
					<Bookshelf />
				</RoomObject>

				<RoomObject href="/music" label="Music corner - Spotify integration">
					<MusicCorner />
				</RoomObject>

				<RoomObject href="/racing" label="Gaming setup - Sim racing content">
					<GamingSetup />
				</RoomObject>

				<RoomObject href="/projects" label="Computer - Projects and terminal">
					<Computer />
				</RoomObject>

				<RoomObject href="/coffee" label="Coffee mug - Coffee log">
					<CoffeeMug />
				</RoomObject>

				{/* Ambient floating particles */}
				<motion.g opacity="0.3">
					{[
						{ cx: 150, cy: 200, delay: 0 },
						{ cx: 450, cy: 150, delay: 1 },
						{ cx: 650, cy: 180, delay: 2 },
						{ cx: 300, cy: 280, delay: 0.5 },
						{ cx: 550, cy: 120, delay: 1.5 },
					].map((particle, i) => (
						<motion.circle
							key={i}
							cx={particle.cx}
							cy={particle.cy}
							r="2"
							fill="#F5D76E"
							animate={{
								y: [0, -20, 0],
								opacity: [0.2, 0.5, 0.2],
							}}
							transition={{
								duration: 6,
								repeat: Infinity,
								delay: particle.delay,
								ease: "easeInOut",
							}}
						/>
					))}
				</motion.g>

				{/* Light rays from window */}
				<motion.g
					opacity="0.1"
					animate={{ opacity: [0.08, 0.12, 0.08] }}
					transition={{ duration: 8, repeat: Infinity }}
				>
					<polygon points="190,260 400,400 400,430 60,430 60,260" fill="#F5D76E" />
				</motion.g>
			</svg>
		</div>
	);
}
