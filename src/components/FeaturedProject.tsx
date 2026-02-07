"use client";

import { motion } from "framer-motion";

export default function FeaturedProject() {
	return (
		<motion.a
			href="https://uchicagomarket.com"
			target="_blank"
			rel="noopener noreferrer"
			className="block mb-10 p-6 bg-highlight rounded-lg border-2 border-[#722F37]/30 hover:border-[#722F37]/60 transition-colors"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(114, 47, 55, 0.3)" }}
		>
			<div className="flex items-center gap-2 mb-2">
				<span className="px-2 py-0.5 bg-[#722F37]/15 text-[#722F37] text-xs font-medium rounded">
					Featured
				</span>
			</div>
			<h3 className="text-lg font-semibold text-foreground mb-1">
				UChicago Marketplace
			</h3>
			<p className="text-foreground/70 text-sm mb-3">
				A schoolwide marketplace for UChicago students to buy and sell — like Facebook Marketplace, but for campus.
			</p>
			<div className="flex items-center gap-4 text-sm text-foreground/50">
				<span className="flex items-center gap-2">
					<span className="w-3 h-3 rounded-full bg-[#722F37]" />
					uchicagomarket.com
				</span>
			</div>
		</motion.a>
	);
}
