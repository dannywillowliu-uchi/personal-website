"use client";

import PageTransition from "@/components/ui/PageTransition";
import BackButton from "@/components/ui/BackButton";

export default function TerminalPage() {
	return (
		<PageTransition className="min-h-screen bg-[#1a1a2e]">
			<BackButton />
			<main className="container mx-auto px-6 py-20">
				<div className="max-w-3xl mx-auto">
					<div className="bg-[#0d0d1a] rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
						<div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
							<div className="w-3 h-3 rounded-full bg-red-500" />
							<div className="w-3 h-3 rounded-full bg-yellow-500" />
							<div className="w-3 h-3 rounded-full bg-green-500" />
							<span className="ml-4 text-gray-400 text-sm font-mono">
								danny@portfolio ~ %
							</span>
						</div>
						<div className="p-6 font-mono text-sm">
							<p className="text-[#00ff00] mb-4">
								Welcome to Danny&apos;s Terminal v1.0.0
							</p>
							<p className="text-gray-400 mb-4">
								Type &apos;help&apos; to see available commands.
							</p>
							<div className="flex items-center text-[#00ff00]">
								<span className="mr-2">$</span>
								<span className="animate-pulse">_</span>
							</div>
							<p className="text-gray-500 mt-8 text-center">
								Interactive terminal coming in Phase 2
							</p>
						</div>
					</div>
				</div>
			</main>
		</PageTransition>
	);
}
