"use client";

import PageTransition from "@/components/ui/PageTransition";
import BackButton from "@/components/ui/BackButton";

export default function ProjectsPage() {
	return (
		<PageTransition className="min-h-screen bg-background">
			<BackButton />
			<main className="container mx-auto px-6 py-20">
				<h1 className="text-4xl font-bold text-foreground mb-8">Projects</h1>
				<p className="text-foreground/70 mb-8">
					Welcome to my digital workspace. Browse my projects or try the terminal.
				</p>
				<div className="grid md:grid-cols-2 gap-6">
					<div className="p-6 bg-wood-light/30 rounded-lg border border-wood-dark/20">
						<h2 className="text-xl font-semibold mb-2">Project Grid</h2>
						<p className="text-foreground/60">Coming soon - project cards with GitHub stats</p>
					</div>
					<a
						href="/terminal"
						className="p-6 bg-[#1a1a2e] rounded-lg border border-wood-dark/20 hover:border-accent-yellow transition-colors"
					>
						<h2 className="text-xl font-semibold mb-2 text-[#00ff00] font-mono">
							./terminal
						</h2>
						<p className="text-gray-400 font-mono text-sm">
							$ Interactive command line experience
						</p>
					</a>
				</div>
			</main>
		</PageTransition>
	);
}
