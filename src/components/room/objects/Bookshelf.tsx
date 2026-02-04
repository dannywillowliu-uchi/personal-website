"use client";

export default function Bookshelf() {
	return (
		<g id="bookshelf">
			{/* Bookshelf frame */}
			<rect
				x="650"
				y="80"
				width="120"
				height="200"
				rx="2"
				fill="#8B6F4E"
				stroke="#6B5A42"
				strokeWidth="3"
			/>
			{/* Shelves */}
			<rect x="655" y="140" width="110" height="6" fill="#6B5A42" />
			<rect x="655" y="200" width="110" height="6" fill="#6B5A42" />
			{/* Top shelf books */}
			<rect x="665" y="95" width="15" height="40" fill="#E8A87C" rx="1" />
			<rect x="682" y="100" width="12" height="35" fill="#3D3229" rx="1" />
			<rect x="696" y="92" width="18" height="43" fill="#4a7c59" rx="1" />
			<rect x="716" y="98" width="14" height="37" fill="#F5D76E" rx="1" />
			<rect x="732" y="95" width="16" height="40" fill="#87CEEB" rx="1" />
			{/* Middle shelf books */}
			<rect x="665" y="150" width="20" height="45" fill="#c0392b" rx="1" />
			<rect x="687" y="155" width="14" height="40" fill="#D4B896" rx="1" />
			<rect x="703" y="148" width="16" height="47" fill="#8e44ad" rx="1" />
			<rect x="721" y="152" width="12" height="43" fill="#2c3e50" rx="1" />
			<rect x="735" y="155" width="18" height="40" fill="#e67e22" rx="1" />
			{/* Bottom shelf - decorative items */}
			<rect x="665" y="210" width="25" height="60" fill="#E8A87C" rx="1" />
			<rect x="692" y="220" width="18" height="50" fill="#3D3229" rx="1" />
			{/* Small photo frame */}
			<rect x="715" y="230" width="30" height="40" fill="#D4B896" stroke="#8B6F4E" strokeWidth="2" />
			<rect x="720" y="235" width="20" height="25" fill="#87CEEB" />
		</g>
	);
}
