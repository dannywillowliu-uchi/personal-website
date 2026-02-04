"use client";

import { motion } from "framer-motion";

export default function MusicCorner() {
	return (
		<g id="music-corner">
			{/* Speaker/Amp */}
			<rect
				x="60"
				y="320"
				width="60"
				height="80"
				rx="4"
				fill="#3D3229"
				stroke="#2A231C"
				strokeWidth="2"
			/>
			{/* Speaker cone */}
			<circle cx="90" cy="350" r="20" fill="#2A231C" />
			<circle cx="90" cy="350" r="15" fill="#4a4a4a" />
			<circle cx="90" cy="350" r="5" fill="#2A231C" />
			{/* Tweeter */}
			<circle cx="90" cy="380" r="8" fill="#2A231C" />
			<circle cx="90" cy="380" r="5" fill="#4a4a4a" />
			{/* Record player / turntable */}
			<rect x="130" y="340" width="80" height="60" rx="4" fill="#D4B896" stroke="#8B6F4E" strokeWidth="2" />
			{/* Platter */}
			<circle cx="165" cy="370" r="22" fill="#2A231C" />
			{/* Record */}
			<motion.circle
				cx="165"
				cy="370"
				r="18"
				fill="#1a1a1a"
				animate={{ rotate: 360 }}
				transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
				style={{ transformOrigin: "165px 370px" }}
			/>
			{/* Record grooves */}
			<circle cx="165" cy="370" r="14" fill="none" stroke="#2a2a2a" strokeWidth="0.5" />
			<circle cx="165" cy="370" r="10" fill="none" stroke="#2a2a2a" strokeWidth="0.5" />
			<circle cx="165" cy="370" r="6" fill="none" stroke="#2a2a2a" strokeWidth="0.5" />
			{/* Record label */}
			<circle cx="165" cy="370" r="4" fill="#E8A87C" />
			{/* Tonearm */}
			<line x1="195" y1="350" x2="175" y2="365" stroke="#8B6F4E" strokeWidth="2" />
			<circle cx="195" cy="350" r="4" fill="#8B6F4E" />
			{/* Music notes floating */}
			<motion.g
				animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
				transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
			>
				<text x="140" y="330" fontSize="14" fill="#E8A87C">♪</text>
			</motion.g>
			<motion.g
				animate={{ y: [0, -8, 0], opacity: [0.5, 0.9, 0.5] }}
				transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
			>
				<text x="180" y="335" fontSize="12" fill="#F5D76E">♫</text>
			</motion.g>
		</g>
	);
}
