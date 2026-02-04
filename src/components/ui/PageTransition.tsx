"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { pageTransition } from "@/lib/animations/variants";

interface PageTransitionProps {
	children: ReactNode;
	className?: string;
}

export default function PageTransition({ children, className = "" }: PageTransitionProps) {
	return (
		<motion.div
			className={className}
			variants={pageTransition}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			{children}
		</motion.div>
	);
}
