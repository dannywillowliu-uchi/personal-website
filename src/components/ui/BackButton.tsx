"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function BackButton() {
	const router = useRouter();

	return (
		<motion.button
			className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 bg-wood-light text-foreground rounded-lg shadow-md hover:bg-wood-dark hover:text-highlight transition-colors z-50"
			onClick={() => router.push("/")}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: 0.2 }}
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M19 12H5M12 19l-7-7 7-7" />
			</svg>
			<span className="font-medium">Back to Room</span>
		</motion.button>
	);
}
