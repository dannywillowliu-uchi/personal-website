"use client";

import PageTransition from "@/components/ui/PageTransition";
import BackButton from "@/components/ui/BackButton";

export default function RacingPage() {
	return (
		<PageTransition className="min-h-screen bg-background">
			<BackButton />
			<main className="container mx-auto px-6 py-20">
				<h1 className="text-4xl font-bold text-foreground mb-4">Sim Racing</h1>
				<p className="text-foreground/70 mb-8">
					My virtual racing adventures and setup.
				</p>

				<div className="max-w-3xl space-y-6">
					<div className="p-6 bg-wood-light/30 rounded-lg border border-wood-dark/20">
						<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
							<span className="text-2xl">🏎️</span>
							Racing Clips
						</h2>
						<div className="aspect-video bg-foreground/5 rounded-lg flex items-center justify-center">
							<p className="text-foreground/50">
								YouTube embed carousel coming in Phase 5
							</p>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-4">
						<div className="p-6 bg-wood-light/30 rounded-lg border border-wood-dark/20">
							<h3 className="font-semibold mb-3">Current Setup</h3>
							<ul className="space-y-2 text-sm text-foreground/70">
								<li>• Wheel: TBD</li>
								<li>• Pedals: TBD</li>
								<li>• Rig: TBD</li>
							</ul>
						</div>
						<div className="p-6 bg-wood-light/30 rounded-lg border border-wood-dark/20">
							<h3 className="font-semibold mb-3">Games</h3>
							<ul className="space-y-2 text-sm text-foreground/70">
								<li>• iRacing</li>
								<li>• Assetto Corsa Competizione</li>
								<li>• F1 Series</li>
							</ul>
						</div>
					</div>
				</div>
			</main>
		</PageTransition>
	);
}
