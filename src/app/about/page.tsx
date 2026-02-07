"use client";

import PageTransition from "@/components/ui/PageTransition";
import BackButton from "@/components/ui/BackButton";

const interests = [
	"High-Performance Computing",
	"GPU Optimization & Benchmarking",
	"AI Infrastructure & Serving",
	"Agentic Orchestration",
	"MCP Servers & Tooling",
	"Quantitative Trading Systems",
	"Developer Automation",
];

const skills: Record<string, string[]> = {
	Languages: ["Python", "C", "SQL", "Bash", "JavaScript", "TypeScript", "x86 Assembly", "LaTeX"],
	"ML/AI": ["PyTorch", "TensorFlow", "Transformers", "LLMs", "RAG", "NLP", "Prompt Engineering"],
	Infrastructure: ["AWS", "Docker", "Kubernetes", "PostgreSQL", "ChromaDB", "CUDA", "ROCm", "Wafer", "Git"],
	Research: ["Statistical Modeling", "Data Analysis", "Experiment Design", "GPU Profiling"],
};

export default function AboutPage() {
	return (
		<PageTransition className="min-h-screen bg-background">
			<BackButton />
			<main className="container mx-auto px-6 py-20">
				<h1 className="text-4xl font-bold text-foreground mb-4">About Me</h1>

				<div className="max-w-2xl space-y-8">
					<section>
						<p className="text-foreground/70 leading-relaxed">
							I&apos;m Danny, a Computer Science student at the University of Chicago
							(Class of 2027). From the Bay (San Ramon), I&apos;m interested in making
							systems faster, smarter, and more autonomous.
						</p>
						<p className="text-foreground/70 leading-relaxed mt-4">
							Most of my work sits at the intersection of high-performance computing
							and AI — benchmarking GPU clusters, optimizing tensor offloading for
							large model serving, and building agentic systems that coordinate
							complex workflows. I also build MCP servers, trading bots, and
							whatever else catches my attention.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-4">Interests</h2>
						<div className="flex flex-wrap gap-2">
							{interests.map((interest) => (
								<span
									key={interest}
									className="px-3 py-1 bg-[#722F37]/15 border border-[#722F37]/30 rounded-full text-sm text-foreground/80"
								>
									{interest}
								</span>
							))}
						</div>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-4">Skills</h2>
						<div className="space-y-3">
							{Object.entries(skills).map(([category, items]) => (
								<div key={category}>
									<span className="text-sm font-medium text-foreground/50">{category}</span>
									<div className="flex flex-wrap gap-2 mt-1">
										{items.map((skill) => (
											<span
												key={skill}
												className="px-3 py-1 bg-wood-light/40 rounded-full text-sm"
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-4">Connect</h2>
						<div className="flex flex-wrap gap-4">
							<a
								href="https://uchicagomarket.com"
								target="_blank"
								rel="noopener noreferrer"
								className="px-4 py-2 bg-[#722F37] text-white rounded-lg hover:opacity-80 transition-opacity"
							>
								UChicago Marketplace
							</a>
							<a
								href="https://github.com/dannywillowliu-uchi"
								target="_blank"
								rel="noopener noreferrer"
								className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-80 transition-opacity"
							>
								GitHub
							</a>
							<a
								href="https://www.linkedin.com/in/dwliu2"
								target="_blank"
								rel="noopener noreferrer"
								className="px-4 py-2 bg-[#0077b5] text-white rounded-lg hover:opacity-80 transition-opacity"
							>
								LinkedIn
							</a>
							<a
								href="mailto:dannywillowliu@uchicago.edu"
								className="px-4 py-2 border border-foreground/30 rounded-lg hover:bg-foreground/10 transition-colors"
							>
								Email
							</a>
						</div>
					</section>
				</div>
			</main>
		</PageTransition>
	);
}
