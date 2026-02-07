"use client";

import { motion } from "framer-motion";
import { GitHubRepo, getLanguageColor, formatDate } from "@/lib/github";

interface ProjectCardProps {
	repo: GitHubRepo;
	index: number;
}

export default function ProjectCard({ repo, index }: ProjectCardProps) {
	return (
		<motion.a
			href={repo.html_url}
			target="_blank"
			rel="noopener noreferrer"
			className="block p-6 bg-highlight rounded-lg border border-wood-light/50 hover:border-wood-dark/40 transition-colors"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.1, duration: 0.3 }}
			whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(139, 111, 78, 0.3)" }}
		>
			<div className="flex items-start justify-between gap-4 mb-3">
				<h3 className="text-lg font-semibold text-foreground truncate">
					{formatRepoName(repo.name)}
				</h3>
				{repo.stargazers_count > 0 && (
					<span className="flex items-center gap-1 text-sm text-foreground/60 shrink-0">
						<StarIcon />
						{repo.stargazers_count}
					</span>
				)}
			</div>

			<p className="text-foreground/70 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
				{repo.description || "No description available"}
			</p>

			<div className="flex items-center justify-between">
				{repo.language && (
					<span className="flex items-center gap-2 text-sm text-foreground/60">
						<span
							className="w-3 h-3 rounded-full"
							style={{ backgroundColor: getLanguageColor(repo.language) }}
						/>
						{repo.language}
					</span>
				)}
				<span className="text-xs text-foreground/50">
					Updated {formatDate(repo.updated_at)}
				</span>
			</div>
		</motion.a>
	);
}

function formatRepoName(name: string): string {
	return name
		.replace(/-/g, " ")
		.replace(/_/g, " ")
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

function StarIcon() {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="currentColor"
			stroke="currentColor"
			strokeWidth="1"
		>
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
		</svg>
	);
}
