"use client";

import { motion } from "framer-motion";

export default function GamingSetup() {
	return (
		<g id="gaming-setup">
			{/* Racing seat */}
			<path
				d="M 280 340 Q 260 340 260 370 L 260 420 Q 260 430 270 430 L 330 430 Q 340 430 340 420 L 340 370 Q 340 340 320 340 Z"
				fill="#3D3229"
				stroke="#2A231C"
				strokeWidth="2"
			/>
			{/* Seat padding */}
			<path
				d="M 275 350 Q 270 350 270 365 L 270 410 Q 270 415 275 415 L 325 415 Q 330 415 330 410 L 330 365 Q 330 350 325 350 Z"
				fill="#1a1a1a"
			/>
			{/* Red racing stripes */}
			<rect x="285" y="355" width="8" height="55" fill="#c0392b" rx="2" />
			<rect x="307" y="355" width="8" height="55" fill="#c0392b" rx="2" />
			{/* Headrest */}
			<rect x="280" y="310" width="40" height="35" rx="5" fill="#3D3229" stroke="#2A231C" strokeWidth="2" />
			<rect x="285" y="315" width="30" height="25" rx="3" fill="#1a1a1a" />
			{/* Steering wheel stand */}
			<rect x="350" y="360" width="8" height="60" fill="#4a4a4a" />
			<rect x="340" y="420" width="28" height="8" fill="#4a4a4a" rx="2" />
			{/* Steering wheel */}
			<circle cx="354" cy="350" r="28" fill="none" stroke="#3D3229" strokeWidth="6" />
			<circle cx="354" cy="350" r="22" fill="none" stroke="#1a1a1a" strokeWidth="3" />
			{/* Wheel center */}
			<circle cx="354" cy="350" r="10" fill="#3D3229" />
			{/* Wheel buttons */}
			<motion.circle
				cx="348"
				cy="344"
				r="3"
				fill="#c0392b"
				animate={{ opacity: [0.7, 1, 0.7] }}
				transition={{ duration: 1.5, repeat: Infinity }}
			/>
			<circle cx="360" cy="344" r="3" fill="#27ae60" />
			{/* Monitor on wheel stand */}
			<rect x="400" y="300" width="70" height="50" rx="3" fill="#3D3229" stroke="#2A231C" strokeWidth="2" />
			<rect x="405" y="305" width="60" height="38" fill="#1a1a2e" />
			{/* Racing game on screen */}
			<rect x="408" y="308" width="54" height="32" fill="#2a4a2a" />
			<path d="M 410 335 L 430 320 L 460 335" stroke="#555" strokeWidth="2" fill="none" />
			<rect x="425" y="322" width="8" height="12" fill="#c0392b" />
			{/* Monitor stand */}
			<rect x="430" y="350" width="10" height="15" fill="#4a4a4a" />
			<rect x="420" y="365" width="30" height="5" rx="2" fill="#4a4a4a" />
			{/* Pedals hint */}
			<rect x="280" y="435" width="60" height="15" rx="2" fill="#4a4a4a" />
			<rect x="285" y="438" width="15" height="8" rx="1" fill="#3D3229" />
			<rect x="305" y="438" width="15" height="8" rx="1" fill="#3D3229" />
			<rect x="325" y="438" width="10" height="8" rx="1" fill="#3D3229" />
		</g>
	);
}
