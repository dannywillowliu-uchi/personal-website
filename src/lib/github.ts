export interface GitHubRepo {
	name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	stargazers_count: number;
	updated_at: string;
	topics: string[];
	fork: boolean;
}

const GITHUB_USERNAME = "dannywillowliu-uchi";
const REPOS_TO_EXCLUDE = [
	"personal-website",
	"apple-health-dashboard",
	"Agentic-CS2-Trade-Up-Float-Arbitrage",
	"bloombee-batch-inferencing",
	"petals-bloombee-testing",
	"prosperity3",
	"mlp_asset_pricing",
	"fast-ai-dupe",
	"git-tutorial",
];

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
	const response = await fetch(
		`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
		{
			headers: {
				Accept: "application/vnd.github.v3+json",
			},
			next: { revalidate: 3600 }, // ISR: revalidate every hour
		}
	);

	if (!response.ok) {
		throw new Error(`GitHub API error: ${response.status}`);
	}

	const repos: GitHubRepo[] = await response.json();

	// Filter out excluded repos and forks, sort by updated date
	return repos
		.filter((repo) => !repo.fork && !REPOS_TO_EXCLUDE.includes(repo.name))
		.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
}

// Language colors based on GitHub's linguist
export const languageColors: Record<string, string> = {
	TypeScript: "#3178c6",
	JavaScript: "#f1e05a",
	Python: "#3572A5",
	Rust: "#dea584",
	Go: "#00ADD8",
	Java: "#b07219",
	"C++": "#f34b7d",
	C: "#555555",
	Ruby: "#701516",
	PHP: "#4F5D95",
	Swift: "#ffac45",
	Kotlin: "#A97BFF",
	HTML: "#e34c26",
	CSS: "#563d7c",
	Shell: "#89e051",
	Jupyter: "#DA5B0B",
	"Jupyter Notebook": "#DA5B0B",
};

export function getLanguageColor(language: string | null): string {
	if (!language) return "#6b7280"; // gray-500
	return languageColors[language] || "#6b7280";
}

export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffTime = Math.abs(now.getTime() - date.getTime());
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays === 0) return "Today";
	if (diffDays === 1) return "Yesterday";
	if (diffDays < 7) return `${diffDays} days ago`;
	if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
	if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
	return `${Math.floor(diffDays / 365)} years ago`;
}
