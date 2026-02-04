"use client";

import PageTransition from "@/components/ui/PageTransition";
import BackButton from "@/components/ui/BackButton";

export default function MusicPage() {
	return (
		<PageTransition className="min-h-screen bg-background">
			<BackButton />
			<main className="container mx-auto px-6 py-20">
				<h1 className="text-4xl font-bold text-foreground mb-4">Music Corner</h1>
				<p className="text-foreground/70 mb-8">
					What I&apos;ve been listening to lately.
				</p>

				<div className="max-w-2xl space-y-6">
					<div className="p-6 bg-wood-light/30 rounded-lg border border-wood-dark/20">
						<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
							<span className="text-2xl">🎵</span>
							Currently Playing
						</h2>
						<div className="flex items-center gap-4">
							<div className="w-16 h-16 bg-foreground/10 rounded flex items-center justify-center">
								<span className="text-2xl">🎧</span>
							</div>
							<div>
								<p className="font-medium">Not playing</p>
								<p className="text-foreground/60 text-sm">
									Spotify integration coming in Phase 4
								</p>
							</div>
						</div>
					</div>

					<div className="p-6 bg-wood-light/30 rounded-lg border border-wood-dark/20">
						<h2 className="text-xl font-semibold mb-4">Top Tracks</h2>
						<p className="text-foreground/50">
							Connect with Spotify to see listening stats
						</p>
					</div>
				</div>
			</main>
		</PageTransition>
	);
}
