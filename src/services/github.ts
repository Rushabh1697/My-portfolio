export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

export async function fetchRepositories(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    const data: GitHubRepo[] = await response.json();
    
    // Filter out forks, provide fallback description
    return data.filter(repo => !repo.fork).map(repo => ({
      ...repo,
      description: repo.description || "Project repository."
    }));
  } catch (error) {
    console.error("Failed to fetch GitHub repositories:", error);
    return [];
  }
}
