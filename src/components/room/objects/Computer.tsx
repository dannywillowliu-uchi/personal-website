"use client";

import { motion } from "framer-motion";

export default function Computer() {
	return (
		<g id="computer">
			{/* Monitor */}
			<rect
				x="520"
				y="200"
				width="120"
				height="80"
				rx="4"
				fill="#3D3229"
				stroke="#2A231C"
				strokeWidth="2"
			/>
			{/* Screen */}
			<rect x="526" y="206" width="108" height="62" rx="2" fill="#1a1a2e" />
			{/* Screen content - terminal look */}
			<motion.g
				initial={{ opacity: 0.7 }}
				animate={{ opacity: [0.7, 1, 0.7] }}
				transition={{ duration: 2, repeat: Infinity }}
			>
				<text x="532" y="222" fill="#00ff00" fontSize="8" fontFamily="monospace">
					$ ./danny --projects
				</text>
				<text x="532" y="234" fill="#00ff00" fontSize="8" fontFamily="monospace">
					Loading...
				</text>
				<rect x="532" y="240" width="4" height="10" fill="#00ff00">
					<animate
						attributeName="opacity"
						values="1;0;1"
						dur="1s"
						repeatCount="indefinite"
					/>
				</rect>
			</motion.g>
			{/* Monitor stand */}
			<rect x="565" y="280" width="30" height="8" fill="#3D3229" />
			<rect x="555" y="288" width="50" height="6" rx="2" fill="#3D3229" />
			{/* Keyboard */}
			<rect
				x="530"
				y="300"
				width="80"
				height="20"
				rx="3"
				fill="#4a4a4a"
				stroke="#3D3229"
				strokeWidth="1"
			/>
			{/* Keyboard keys hint */}
			<g fill="#5a5a5a">
				{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
					<rect key={i} x={536 + i * 7} y="305" width="5" height="4" rx="1" />
				))}
				{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
					<rect key={i + 10} x={536 + i * 7} y="311" width="5" height="4" rx="1" />
				))}
			</g>
			{/* Mouse */}
			<ellipse cx="630" cy="308" rx="10" ry="14" fill="#4a4a4a" stroke="#3D3229" strokeWidth="1" />
		</g>
	);
}
