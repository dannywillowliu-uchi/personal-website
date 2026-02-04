"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { roomObjectHover } from "@/lib/animations/variants";

interface RoomObjectProps {
	children: ReactNode;
	href: string;
	label: string;
	className?: string;
}

export default function RoomObject({
	children,
	href,
	label,
	className = "",
}: RoomObjectProps) {
	const router = useRouter();

	return (
		<motion.g
			className={`room-object-glow cursor-pointer ${className}`}
			variants={roomObjectHover}
			initial="initial"
			whileHover="hover"
			whileTap="tap"
			onClick={() => router.push(href)}
			role="button"
			aria-label={label}
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					router.push(href);
				}
			}}
		>
			{children}
		</motion.g>
	);
}
