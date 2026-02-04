import Room from "@/components/room/Room";

export default function Home() {
	return (
		<main className="min-h-screen bg-background flex flex-col items-center justify-center">
			<header className="text-center mb-4 pt-8">
				<h1 className="text-3xl font-bold text-foreground">Danny&apos;s Room</h1>
				<p className="text-foreground/70 mt-2">Click on objects to explore</p>
			</header>
			<Room />
		</main>
	);
}
