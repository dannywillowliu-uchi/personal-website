import PageTransition from "@/components/ui/PageTransition";
import BackButton from "@/components/ui/BackButton";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectCard from "@/components/ProjectCard";
import { getGitHubRepos, GitHubRepo } from "@/lib/github";

export default async function ProjectsPage() {
	let repos: GitHubRepo[] = [];
	let error: string | null = null;

	try {
		repos = await getGitHubRepos();
	} catch (e) {
		error = e instanceof Error ? e.message : "Failed to load projects";
	}

	return (
		<PageTransition className="min-h-screen bg-background">
			<BackButton />
			<main className="container mx-auto px-6 py-20">
				<h1 className="text-4xl font-bold text-foreground mb-4">My Projects</h1>
				<p className="text-foreground/70 mb-10 max-w-2xl">
					A collection of my work, fetched directly from GitHub. Click any card to view
					the repository.
				</p>

				<FeaturedProject />

				{error ? (
					<div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
						<p className="font-medium">Error loading projects</p>
						<p className="text-sm mt-1">{error}</p>
					</div>
				) : repos.length === 0 ? (
					<div className="p-6 bg-wood-light/30 rounded-lg border border-wood-dark/20 text-center">
						<p className="text-foreground/70">No projects found</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{repos.map((repo, index) => (
							<ProjectCard key={repo.name} repo={repo} index={index} />
						))}
					</div>
				)}
			</main>
		</PageTransition>
	);
}
