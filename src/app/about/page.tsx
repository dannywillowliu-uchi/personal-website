"use client";

import PageTransition from "@/components/ui/PageTransition";
import BackButton from "@/components/ui/BackButton";

export default function AboutPage() {
	return (
		<PageTransition className="min-h-screen bg-background">
			<BackButton />
			<main className="container mx-auto px-6 py-20">
				<h1 className="text-4xl font-bold text-foreground mb-4">About Me</h1>

				<div className="max-w-2xl space-y-8">
					<section>
						<h2 className="text-2xl font-semibold mb-4">Hi, I&apos;m Danny 👋</h2>
						<p className="text-foreground/70 leading-relaxed">
							Computer Science undergrad with a passion for building things.
							This room is my digital portfolio - a cozy space to showcase
							my projects, interests, and what I&apos;ve been up to.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-4">Skills & Technologies</h2>
						<div className="flex flex-wrap gap-2">
							{["Python", "TypeScript", "React", "Next.js", "Node.js", "SQL", "Git"].map(
								(skill) => (
									<span
										key={skill}
										className="px-3 py-1 bg-wood-light/40 rounded-full text-sm"
									>
										{skill}
									</span>
								)
							)}
						</div>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-4">Connect</h2>
						<div className="flex gap-4">
							<a
								href="https://github.com"
								target="_blank"
								rel="noopener noreferrer"
								className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-80 transition-opacity"
							>
								GitHub
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								className="px-4 py-2 bg-[#0077b5] text-white rounded-lg hover:opacity-80 transition-opacity"
							>
								LinkedIn
							</a>
						</div>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-4">Resume</h2>
						<button
							className="px-4 py-2 border border-wood-dark rounded-lg hover:bg-wood-light/20 transition-colors"
							disabled
						>
							Download CV (Coming Soon)
						</button>
					</section>
				</div>
			</main>
		</PageTransition>
	);
}
