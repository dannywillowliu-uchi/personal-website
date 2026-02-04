"use client";

export default function Desk() {
	return (
		<g id="desk">
			{/* Desk top */}
			<rect
				x="480"
				y="330"
				width="280"
				height="15"
				rx="2"
				fill="#8B6F4E"
				stroke="#6B5A42"
				strokeWidth="2"
			/>
			{/* Wood grain lines */}
			<line x1="490" y1="337" x2="750" y2="337" stroke="#7A6344" strokeWidth="1" opacity="0.5" />
			{/* Desk legs */}
			<rect x="490" y="345" width="12" height="80" fill="#8B6F4E" stroke="#6B5A42" strokeWidth="1" />
			<rect x="738" y="345" width="12" height="80" fill="#8B6F4E" stroke="#6B5A42" strokeWidth="1" />
			{/* Drawer */}
			<rect x="540" y="345" width="100" height="40" rx="2" fill="#9B7F5E" stroke="#6B5A42" strokeWidth="1" />
			<ellipse cx="590" cy="365" rx="8" ry="4" fill="#6B5A42" />
		</g>
	);
}
