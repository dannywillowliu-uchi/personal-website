"use client";

import { motion } from "framer-motion";

export default function Window() {
	return (
		<g id="window">
			{/* Window frame */}
			<rect
				x="60"
				y="80"
				width="140"
				height="180"
				rx="4"
				fill="#D4B896"
				stroke="#8B6F4E"
				strokeWidth="4"
			/>
			{/* Window glass - sky gradient feel */}
			<rect x="70" y="90" width="120" height="160" fill="#87CEEB" />
			{/* Clouds */}
			<motion.g
				animate={{ x: [0, 10, 0] }}
				transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
			>
				<ellipse cx="100" cy="120" rx="20" ry="10" fill="white" opacity="0.8" />
				<ellipse cx="115" cy="118" rx="15" ry="8" fill="white" opacity="0.8" />
				<ellipse cx="160" cy="140" rx="18" ry="8" fill="white" opacity="0.7" />
			</motion.g>
			{/* Sun */}
			<motion.circle
				cx="170"
				cy="105"
				r="15"
				fill="#F5D76E"
				initial={{ opacity: 0.9 }}
				animate={{ opacity: [0.9, 1, 0.9] }}
				transition={{ duration: 4, repeat: Infinity }}
			/>
			{/* Sun rays */}
			<g stroke="#F5D76E" strokeWidth="2" opacity="0.6">
				<line x1="170" y1="85" x2="170" y2="78" />
				<line x1="185" y1="90" x2="190" y2="85" />
				<line x1="150" y1="105" x2="143" y2="105" />
			</g>
			{/* Window dividers */}
			<line x1="130" y1="90" x2="130" y2="250" stroke="#D4B896" strokeWidth="6" />
			<line x1="70" y1="170" x2="190" y2="170" stroke="#D4B896" strokeWidth="6" />
			{/* Window sill */}
			<rect x="55" y="260" width="150" height="12" rx="2" fill="#8B6F4E" />
			{/* Small plant on sill */}
			<rect x="95" y="248" width="30" height="14" rx="3" fill="#E8A87C" />
			<ellipse cx="110" cy="248" rx="12" ry="8" fill="#4a7c59" />
			<ellipse cx="105" cy="245" rx="8" ry="6" fill="#5a8c69" />
			<ellipse cx="115" cy="246" rx="7" ry="5" fill="#5a8c69" />
		</g>
	);
}
