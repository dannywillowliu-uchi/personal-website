"use client";

import PageTransition from "@/components/ui/PageTransition";
import BackButton from "@/components/ui/BackButton";

export default function CoffeePage() {
	return (
		<PageTransition className="min-h-screen bg-background">
			<BackButton />
			<main className="container mx-auto px-6 py-20">
				<h1 className="text-4xl font-bold text-foreground mb-4">Coffee Log</h1>
				<p className="text-foreground/70 mb-8">
					A collection of my coffee adventures and tasting notes.
				</p>

				<div className="grid gap-4 max-w-2xl">
					<div className="p-6 bg-wood-light/30 rounded-lg border border-wood-dark/20">
						<div className="flex items-center gap-4 mb-4">
							<div className="text-4xl">☕</div>
							<div>
								<h2 className="text-xl font-semibold">Ethiopian Yirgacheffe</h2>
								<p className="text-foreground/60 text-sm">Counter Culture Coffee</p>
							</div>
						</div>
						<div className="flex gap-2 mb-3">
							<span className="px-2 py-1 bg-accent-orange/20 text-accent-orange rounded text-xs">
								V60
							</span>
							<span className="px-2 py-1 bg-accent-yellow/20 text-foreground rounded text-xs">
								Light Roast
							</span>
						</div>
						<p className="text-foreground/70 text-sm">
							Bright citrus notes with floral undertones. Perfect morning pour.
						</p>
						<div className="mt-4 text-sm text-foreground/50">
							Rating: ★★★★☆
						</div>
					</div>

					<p className="text-center text-foreground/50 py-8">
						Full coffee log with Supabase integration coming in Phase 3
					</p>
				</div>
			</main>
		</PageTransition>
	);
}
