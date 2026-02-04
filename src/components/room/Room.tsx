"use client";

import { motion } from "framer-motion";
import RoomObject from "./RoomObject";

export default function Room() {
	return (
		<div className="w-full h-full flex items-center justify-center p-4">
			<svg
				viewBox="0 0 800 600"
				className="w-full max-w-4xl h-auto"
				role="img"
				aria-label="Danny's interactive room"
			>
				<defs>
					{/* Gradients for depth */}
					<linearGradient id="wallLeft" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#E8E0D0" />
						<stop offset="100%" stopColor="#F5EFE5" />
					</linearGradient>
					<linearGradient id="wallRight" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#F5EFE5" />
						<stop offset="100%" stopColor="#EDE5D5" />
					</linearGradient>
					<linearGradient id="floor" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#D4B896" />
						<stop offset="100%" stopColor="#C4A886" />
					</linearGradient>
					<linearGradient id="woodTop" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#A67C52" />
						<stop offset="100%" stopColor="#8B6F4E" />
					</linearGradient>
					<linearGradient id="woodSide" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#7A5F42" />
						<stop offset="100%" stopColor="#6B5238" />
					</linearGradient>
					<linearGradient id="screenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#2a3a4a" />
						<stop offset="100%" stopColor="#1a2a3a" />
					</linearGradient>
				</defs>

				{/* Room structure - isometric walls and floor */}
				{/* Back left wall */}
				<polygon
					points="100,150 400,50 400,350 100,450"
					fill="url(#wallLeft)"
					stroke="#D4C8B8"
					strokeWidth="2"
				/>
				{/* Back right wall */}
				<polygon
					points="400,50 700,150 700,450 400,350"
					fill="url(#wallRight)"
					stroke="#D4C8B8"
					strokeWidth="2"
				/>
				{/* Floor */}
				<polygon
					points="100,450 400,350 700,450 400,550"
					fill="url(#floor)"
					stroke="#C4A886"
					strokeWidth="2"
				/>

				{/* Floor pattern lines */}
				<g stroke="#C4A886" strokeWidth="1" opacity="0.5">
					<line x1="175" y1="425" x2="475" y2="525" />
					<line x1="250" y1="400" x2="550" y2="500" />
					<line x1="325" y1="375" x2="625" y2="475" />
					<line x1="250" y1="475" x2="550" y2="375" />
					<line x1="325" y1="500" x2="625" y2="400" />
				</g>

				{/* Window on left wall */}
				<RoomObject href="/about" label="Window - Social links">
					<g id="window">
						{/* Window frame */}
						<polygon
							points="150,200 300,160 300,320 150,360"
							fill="#8B6F4E"
							stroke="#6B5238"
							strokeWidth="3"
						/>
						{/* Window glass - sky */}
						<polygon
							points="165,215 285,180 285,305 165,340"
							fill="#87CEEB"
						/>
						{/* Window divider vertical */}
						<line x1="225" y1="197" x2="225" y2="323" stroke="#8B6F4E" strokeWidth="4" />
						{/* Window divider horizontal */}
						<line x1="165" y1="278" x2="285" y2="243" stroke="#8B6F4E" strokeWidth="4" />
						{/* Sun */}
						<motion.circle
							cx="260"
							cy="200"
							r="15"
							fill="#F5D76E"
							animate={{ opacity: [0.9, 1, 0.9] }}
							transition={{ duration: 3, repeat: Infinity }}
						/>
						{/* Clouds */}
						<motion.g
							animate={{ x: [0, 5, 0] }}
							transition={{ duration: 15, repeat: Infinity }}
						>
							<ellipse cx="200" cy="220" rx="12" ry="6" fill="white" opacity="0.8" />
							<ellipse cx="210" cy="218" rx="8" ry="5" fill="white" opacity="0.8" />
						</motion.g>
						{/* Window sill */}
						<polygon
							points="145,360 305,318 315,328 155,370"
							fill="#A67C52"
							stroke="#6B5238"
							strokeWidth="1"
						/>
						{/* Small plant */}
						<ellipse cx="200" cy="338" rx="15" ry="8" fill="#E8A87C" />
						<ellipse cx="200" cy="332" rx="10" ry="8" fill="#4a7c59" />
						<ellipse cx="195" cy="328" rx="6" ry="5" fill="#5a8c69" />
						<ellipse cx="205" cy="330" rx="5" ry="4" fill="#5a8c69" />
					</g>
				</RoomObject>

				{/* Bookshelf on right wall */}
				<RoomObject href="/about" label="Bookshelf - About me">
					<g id="bookshelf">
						{/* Shelf back */}
						<polygon
							points="520,180 620,210 620,380 520,350"
							fill="#7A5F42"
						/>
						{/* Shelf left side */}
						<polygon
							points="500,190 520,180 520,350 500,360"
							fill="#6B5238"
						/>
						{/* Shelf top */}
						<polygon
							points="500,190 520,180 620,210 600,220"
							fill="url(#woodTop)"
						/>
						{/* Shelves */}
						<polygon points="505,250 600,275 600,280 505,255" fill="#8B6F4E" />
						<polygon points="505,310 600,335 600,340 505,315" fill="#8B6F4E" />
						{/* Books top shelf */}
						<rect x="510" y="200" width="12" height="45" fill="#E8A87C" transform="skewY(5)" />
						<rect x="524" y="202" width="10" height="42" fill="#3D5A80" transform="skewY(5)" />
						<rect x="536" y="198" width="14" height="48" fill="#98C1D9" transform="skewY(5)" />
						<rect x="552" y="201" width="11" height="44" fill="#EE6C4D" transform="skewY(5)" />
						<rect x="565" y="199" width="13" height="46" fill="#293241" transform="skewY(5)" />
						{/* Books middle shelf */}
						<rect x="510" y="258" width="15" height="48" fill="#F5D76E" transform="skewY(5)" />
						<rect x="527" y="260" width="12" height="45" fill="#4a7c59" transform="skewY(5)" />
						<rect x="541" y="257" width="10" height="50" fill="#8B6F4E" transform="skewY(5)" />
						<rect x="553" y="259" width="14" height="47" fill="#c0392b" transform="skewY(5)" />
						{/* Bottom shelf items */}
						<rect x="510" y="320" width="25" height="32" fill="#D4B896" transform="skewY(5)" stroke="#8B6F4E" strokeWidth="1" />
						<rect x="545" y="318" width="20" height="35" fill="#3D3229" transform="skewY(5)" />
					</g>
				</RoomObject>

				{/* Desk with computer and coffee */}
				<g id="desk-area">
					{/* Desk */}
					{/* Desk top */}
					<polygon
						points="280,380 450,340 550,390 380,430"
						fill="url(#woodTop)"
						stroke="#6B5238"
						strokeWidth="2"
					/>
					{/* Desk front */}
					<polygon
						points="280,380 380,430 380,480 280,430"
						fill="url(#woodSide)"
						stroke="#6B5238"
						strokeWidth="1"
					/>
					{/* Desk right side */}
					<polygon
						points="380,430 550,390 550,440 380,480"
						fill="#8B6F4E"
						stroke="#6B5238"
						strokeWidth="1"
					/>
					{/* Desk drawer */}
					<polygon
						points="300,395 360,415 360,455 300,435"
						fill="#9B7F5E"
						stroke="#6B5238"
						strokeWidth="1"
					/>
					<ellipse cx="330" cy="425" rx="6" ry="3" fill="#6B5238" />
					{/* Desk legs */}
					<polygon points="290,430 300,428 300,490 290,492" fill="#6B5238" />
					<polygon points="370,475 380,473 380,535 370,537" fill="#6B5238" />
					<polygon points="530,435 540,433 540,495 530,497" fill="#7A5F42" />

					{/* Computer - clickable */}
					<RoomObject href="/projects" label="Computer - Projects">
						<g id="computer">
							{/* Monitor back/base */}
							<polygon
								points="340,290 430,265 430,340 340,365"
								fill="#2A231C"
								stroke="#1a1a1a"
								strokeWidth="2"
							/>
							{/* Screen */}
							<polygon
								points="348,298 422,275 422,332 348,355"
								fill="url(#screenGlow)"
							/>
							{/* Terminal text on screen */}
							<motion.g
								initial={{ opacity: 0.8 }}
								animate={{ opacity: [0.8, 1, 0.8] }}
								transition={{ duration: 2, repeat: Infinity }}
							>
								<text x="355" y="310" fill="#00ff00" fontSize="7" fontFamily="monospace">
									$ ls projects/
								</text>
								<text x="355" y="322" fill="#00ff00" fontSize="6" fontFamily="monospace">
									web/ cli/ api/
								</text>
								<text x="355" y="334" fill="#00ff00" fontSize="7" fontFamily="monospace">
									$ _
								</text>
							</motion.g>
							{/* Monitor stand */}
							<polygon
								points="375,365 395,360 400,375 380,380"
								fill="#3D3229"
							/>
							<polygon
								points="365,378 405,368 410,372 370,382"
								fill="#2A231C"
							/>
							{/* Keyboard */}
							<polygon
								points="360,385 440,365 450,375 370,395"
								fill="#3D3229"
								stroke="#2A231C"
								strokeWidth="1"
							/>
							{/* Keyboard keys suggestion */}
							<g fill="#4a4a4a">
								{[0, 1, 2, 3, 4, 5].map((i) => (
									<polygon
										key={i}
										points={`${370 + i * 12},390 ${378 + i * 12},388 ${380 + i * 12},391 ${372 + i * 12},393`}
									/>
								))}
							</g>
							{/* Mouse */}
							<ellipse cx="465" cy="378" rx="8" ry="12" fill="#3D3229" transform="rotate(-15 465 378)" />
						</g>
					</RoomObject>

					{/* Coffee mug - clickable */}
					<RoomObject href="/coffee" label="Coffee mug - Coffee log">
						<g id="coffee">
							{/* Mug body */}
							<ellipse cx="490" cy="365" rx="18" ry="10" fill="#D4B896" />
							<path
								d="M 472 365 L 474 395 Q 474 405 490 405 Q 506 405 506 395 L 508 365"
								fill="#D4B896"
								stroke="#8B6F4E"
								strokeWidth="1"
							/>
							{/* Mug handle */}
							<path
								d="M 506 372 Q 522 372 522 385 Q 522 398 506 398"
								fill="none"
								stroke="#8B6F4E"
								strokeWidth="4"
								strokeLinecap="round"
							/>
							{/* Coffee surface */}
							<ellipse cx="490" cy="368" rx="14" ry="7" fill="#5C4033" />
							{/* Steam */}
							<motion.g
								animate={{
									opacity: [0.3, 0.7, 0.3],
									y: [0, -8, 0],
								}}
								transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
							>
								<path d="M 482 358 Q 478 348 482 340" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
								<path d="M 490 355 Q 494 345 490 337" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
								<path d="M 498 358 Q 502 348 498 340" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
							</motion.g>
						</g>
					</RoomObject>
				</g>

				{/* Music corner - record player on small table */}
				<RoomObject href="/music" label="Music corner - Spotify">
					<g id="music">
						{/* Small side table */}
						<polygon points="130,420 200,400 240,420 170,440" fill="url(#woodTop)" stroke="#6B5238" strokeWidth="1" />
						<polygon points="130,420 170,440 170,480 130,460" fill="url(#woodSide)" />
						<polygon points="170,440 240,420 240,460 170,480" fill="#8B6F4E" />
						{/* Record player base */}
						<polygon points="145,400 210,385 235,400 170,415" fill="#3D3229" stroke="#2A231C" strokeWidth="1" />
						{/* Platter */}
						<ellipse cx="180" cy="395" rx="25" ry="12" fill="#1a1a1a" />
						{/* Record */}
						<motion.ellipse
							cx="180"
							cy="395"
							rx="20"
							ry="10"
							fill="#111"
							animate={{ rotate: 360 }}
							transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
							style={{ transformOrigin: "180px 395px" }}
						/>
						{/* Record grooves */}
						<ellipse cx="180" cy="395" rx="15" ry="7" fill="none" stroke="#222" strokeWidth="0.5" />
						<ellipse cx="180" cy="395" rx="10" ry="5" fill="none" stroke="#222" strokeWidth="0.5" />
						{/* Record label */}
						<ellipse cx="180" cy="395" rx="5" ry="2.5" fill="#E8A87C" />
						{/* Tonearm */}
						<line x1="215" y1="385" x2="195" y2="392" stroke="#8B6F4E" strokeWidth="2" />
						<circle cx="215" cy="385" r="3" fill="#8B6F4E" />
						{/* Music notes */}
						<motion.text
							x="160"
							y="375"
							fontSize="14"
							fill="#E8A87C"
							animate={{ y: [375, 365, 375], opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 2, repeat: Infinity }}
						>
							♪
						</motion.text>
						<motion.text
							x="200"
							y="370"
							fontSize="12"
							fill="#F5D76E"
							animate={{ y: [370, 362, 370], opacity: [0.4, 0.9, 0.4] }}
							transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
						>
							♫
						</motion.text>
					</g>
				</RoomObject>

				{/* Gaming/Racing setup */}
				<RoomObject href="/racing" label="Racing setup - Sim racing">
					<g id="racing">
						{/* Racing chair */}
						<polygon points="580,350 620,340 630,345 590,355" fill="#1a1a1a" />
						<polygon points="580,350 590,355 590,420 580,425" fill="#2A231C" />
						<polygon points="590,355 630,345 630,410 590,420" fill="#1a1a1a" />
						{/* Chair back */}
						<polygon points="583,310 623,300 630,345 590,355" fill="#2A231C" stroke="#1a1a1a" strokeWidth="1" />
						{/* Red racing stripes */}
						<polygon points="595,315 605,312 608,348 598,351" fill="#c0392b" />
						<polygon points="612,310 620,308 622,343 614,345" fill="#c0392b" />
						{/* Headrest */}
						<polygon points="590,290 620,283 625,305 595,312" fill="#2A231C" />
						{/* Wheel stand */}
						<polygon points="630,360 660,350 662,410 632,420" fill="#4a4a4a" />
						{/* Steering wheel */}
						<ellipse cx="648" cy="355" rx="22" ry="18" fill="none" stroke="#2A231C" strokeWidth="5" />
						<ellipse cx="648" cy="355" rx="16" ry="12" fill="none" stroke="#1a1a1a" strokeWidth="2" />
						<ellipse cx="648" cy="355" rx="6" ry="4" fill="#2A231C" />
						{/* Wheel button */}
						<motion.ellipse
							cx="644"
							cy="350"
							rx="2"
							ry="1.5"
							fill="#c0392b"
							animate={{ opacity: [0.6, 1, 0.6] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						/>
						{/* Small monitor */}
						<polygon points="665,300 710,290 710,340 665,350" fill="#2A231C" stroke="#1a1a1a" strokeWidth="1" />
						<polygon points="670,305 705,296 705,334 670,343" fill="#1a2a3a" />
						{/* Racing game on screen */}
						<polygon points="675,315 700,310 700,330 675,335" fill="#2a4a3a" />
						<path d="M 677 328 L 687 318 L 698 328" stroke="#444" strokeWidth="1" fill="none" />
						{/* Monitor stand */}
						<polygon points="683,350 693,348 695,365 685,367" fill="#4a4a4a" />
					</g>
				</RoomObject>

				{/* Ambient light from window */}
				<motion.polygon
					points="145,360 400,350 380,480 100,450"
					fill="#F5D76E"
					opacity="0.05"
					animate={{ opacity: [0.03, 0.07, 0.03] }}
					transition={{ duration: 6, repeat: Infinity }}
				/>

				{/* Floating dust particles */}
				<motion.g opacity="0.4">
					{[
						{ cx: 200, cy: 280, delay: 0 },
						{ cx: 350, cy: 220, delay: 1 },
						{ cx: 500, cy: 260, delay: 2 },
						{ cx: 280, cy: 320, delay: 0.5 },
						{ cx: 450, cy: 180, delay: 1.5 },
						{ cx: 600, cy: 300, delay: 2.5 },
					].map((p, i) => (
						<motion.circle
							key={i}
							cx={p.cx}
							cy={p.cy}
							r="1.5"
							fill="#F5D76E"
							animate={{
								y: [0, -15, 0],
								opacity: [0.2, 0.6, 0.2],
							}}
							transition={{
								duration: 5,
								repeat: Infinity,
								delay: p.delay,
								ease: "easeInOut",
							}}
						/>
					))}
				</motion.g>
			</svg>
		</div>
	);
}
