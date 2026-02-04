"use client";

import { motion } from "framer-motion";

export default function CoffeeMug() {
	return (
		<g id="coffee-mug">
			{/* Mug body */}
			<path
				d="M 660 285 L 655 320 Q 655 330 665 330 L 695 330 Q 705 330 705 320 L 700 285 Z"
				fill="#D4B896"
				stroke="#8B6F4E"
				strokeWidth="2"
			/>
			{/* Mug handle */}
			<path
				d="M 700 295 Q 720 295 720 307 Q 720 320 700 320"
				fill="none"
				stroke="#8B6F4E"
				strokeWidth="4"
				strokeLinecap="round"
			/>
			{/* Coffee inside */}
			<ellipse cx="677" cy="290" rx="18" ry="4" fill="#5C4033" />
			{/* Steam */}
			<motion.g
				initial={{ opacity: 0.4 }}
				animate={{
					opacity: [0.4, 0.8, 0.4],
					y: [0, -5, 0],
				}}
				transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
			>
				<path
					d="M 665 280 Q 660 270 665 260"
					fill="none"
					stroke="#FFFEF5"
					strokeWidth="2"
					strokeLinecap="round"
					opacity="0.6"
				/>
				<path
					d="M 677 278 Q 682 268 677 258"
					fill="none"
					stroke="#FFFEF5"
					strokeWidth="2"
					strokeLinecap="round"
					opacity="0.6"
				/>
				<path
					d="M 689 280 Q 694 270 689 260"
					fill="none"
					stroke="#FFFEF5"
					strokeWidth="2"
					strokeLinecap="round"
					opacity="0.6"
				/>
			</motion.g>
		</g>
	);
}
