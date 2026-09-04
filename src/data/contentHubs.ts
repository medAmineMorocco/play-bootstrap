export type HubKey = "troubleshooting" | "ai-agents" | "isolation" | "comparisons";

export type HubArticle = {
  title: string;
  slug: string;
  keyword: string;
  href: string;
};

export type ContentHub = {
  key: HubKey;
  label: string;
  title: string;
  description: string;
  href: string;
  eyebrow: string;
  articles: HubArticle[];
};

const rows = (items: [string, string, string][], base: string): HubArticle[] =>
  items.map(([title, slug, keyword]) => ({ title, slug, keyword, href: `${base}/${slug}` }));

export const contentHubs: Record<HubKey, ContentHub> = {
  troubleshooting: {
    key: "troubleshooting",
    label: "Troubleshooting",
    title: "Git Worktree Troubleshooting: Common Errors and Fixes",
    description: "Diagnose broken paths, locked worktrees, stale metadata, detached HEAD states, pruning surprises, and branch checkout conflicts.",
    href: "/git-worktree/troubleshooting",
    eyebrow: "Diagnose and recover",
    articles: rows([
      ["Branch already checked out", "branch-already-checked-out", "git worktree branch already checked out"],
      ["Worktree cannot be removed", "cannot-remove-worktree", "git worktree remove not working"],
      ["Worktree is not a Git repository", "not-a-git-repository", "git worktree not a git repository"],
      ["Missing worktree directory", "missing-worktree-directory", "git worktree missing directory"],
      ["Worktree path is invalid", "invalid-worktree-path", "git worktree invalid path"],
      ["Worktree is stale", "stale-worktree", "stale git worktree"],
      ["Worktree is pruneable", "pruneable-worktree", "git worktree pruneable"],
      ["Worktree was moved manually", "moved-worktree", "moved git worktree"],
      ["Repair a broken worktree", "broken-worktree", "broken git worktree"],
      ["Cannot delete branch because of worktree", "delete-branch-used-by-worktree", "branch used by worktree"],
      ["Worktree locked and cannot remove", "locked-worktree", "git worktree locked"],
      ["Worktree missing after prune", "worktree-pruned", "git worktree prune removed worktree"],
      ["Detached HEAD in worktree", "detached-head", "git worktree detached head"],
      ["Worktree metadata corrupted", "corrupted-metadata", "git worktree corrupted"],
      [".git file points to wrong path", "wrong-gitdir-path", "git worktree gitdir wrong path"],
    ], "/git-worktree/troubleshooting"),
  },
  "ai-agents": {
    key: "ai-agents",
    label: "AI Agents",
    title: "Git Worktrees for AI Coding Agents",
    description: "Give every coding agent an isolated branch and working directory, run agents in parallel, and review or integrate their changes safely.",
    href: "/ai-agents/git-worktrees",
    eyebrow: "Parallel AI development",
    articles: rows([
      ["Claude Code + worktrees", "claude-code-worktrees", "claude code worktrees"],
      ["Codex + worktrees", "codex-worktrees", "codex git worktrees"],
      ["Cursor + worktrees", "cursor-worktrees", "cursor git worktrees"],
      ["Gemini CLI + worktrees", "gemini-cli-worktrees", "gemini cli worktrees"],
      ["OpenCode + worktrees", "opencode-worktrees", "opencode git worktrees"],
      ["Multiple agents on one repository", "multiple-agents-same-repository", "multiple ai agents same repository"],
      ["Parallel coding agents", "parallel-coding-agents", "parallel coding agents"],
      ["One worktree per AI agent", "one-worktree-per-agent", "one worktree per ai agent"],
      ["Isolate AI coding agents", "worktree-isolation", "ai agent isolation git"],
      ["Avoid merge conflicts between agents", "avoid-agent-merge-conflicts", "ai agents merge conflicts"],
      ["Share changes between agent worktrees", "share-changes-between-worktrees", "share changes git worktrees"],
      ["Review AI-generated code using worktrees", "review-ai-code-with-worktrees", "review ai code git worktree"],
      ["Parallel feature development with agents", "parallel-feature-development", "parallel ai development"],
      ["Git worktrees vs clones for AI agents", "worktrees-vs-clones", "worktrees vs clones ai agents"],
    ], "/ai-agents"),
  },
  isolation: {
    key: "isolation",
    label: "Isolation",
    title: "Git Worktree Environment Isolation",
    description: "Separate ports, environment files, databases, dependencies, containers, caches, and tool configuration for reliable parallel worktrees.",
    href: "/git-worktree/environment-isolation",
    eyebrow: "Independent development environments",
    articles: rows([
      ["Separate .env per worktree", "env-files", "git worktree env"],
      ["Different ports per worktree", "ports", "git worktree different ports"],
      ["Docker with worktrees", "docker", "git worktree docker"],
      ["Docker Compose with worktrees", "docker-compose", "git worktree docker compose"],
      ["Database per worktree", "databases", "git worktree database"],
      ["PostgreSQL per worktree", "postgresql", "git worktree postgresql"],
      ["MySQL per worktree", "mysql", "git worktree mysql"],
      ["Redis isolation", "redis", "git worktree redis"],
      ["node_modules in worktrees", "node-modules", "git worktree node_modules"],
      ["Share node_modules", "share-node-modules", "share node_modules between worktrees"],
      ["pnpm with worktrees", "pnpm", "pnpm git worktree"],
      ["npm with worktrees", "npm", "npm git worktree"],
      ["Yarn with worktrees", "yarn", "yarn git worktree"],
      ["Python virtualenv per worktree", "python-virtualenv", "git worktree virtualenv"],
      ["Maven with worktrees", "maven", "maven git worktree"],
      ["Gradle with worktrees", "gradle", "gradle git worktree"],
      ["Cache isolation", "cache-isolation", "git worktree cache"],
      ["Per-worktree Git config", "per-worktree-config", "git worktree config"],
      ["Sparse checkout per worktree", "sparse-checkout", "git worktree sparse checkout"],
    ], "/git-worktree"),
  },
  comparisons: {
    key: "comparisons",
    label: "Comparisons",
    title: "Git Worktree Comparisons",
    description: "Compare worktrees with clones, branch switching, stash, sparse checkout, containers, hosted environments, and GUI or CLI workflows.",
    href: "/git-worktree/comparisons",
    eyebrow: "Choose the right workflow",
    articles: rows([
      ["Worktree vs clone", "vs-clone", "git worktree vs clone"],
      ["Worktree vs branch switching", "vs-branch", "git worktree vs branch"],
      ["Worktrees vs multiple clones", "vs-multiple-clones", "git worktree vs multiple clones"],
      ["Worktree vs stash", "vs-stash", "git worktree vs stash"],
      ["Worktree vs sparse checkout", "vs-sparse-checkout", "git worktree vs sparse checkout"],
      ["Worktree vs checkout", "vs-checkout", "git worktree vs checkout"],
      ["Worktree vs switch", "vs-git-switch", "git worktree vs git switch"],
      ["Worktree vs Docker", "vs-docker", "git worktree vs docker"],
      ["Worktree vs dev containers", "vs-dev-containers", "git worktree vs dev container"],
      ["Worktree vs Codespaces", "vs-codespaces", "git worktree vs codespaces"],
      ["Worktree vs separate repository", "vs-separate-repository", "git worktree vs separate repository"],
      ["Worktree GUI vs CLI", "gui-vs-cli", "git worktree gui vs cli"],
    ], "/git-worktree"),
  },
};

export const gitWorktreeArticles = [...contentHubs.isolation.articles, ...contentHubs.comparisons.articles];

export function findArticle(hub: ContentHub, slug: string) {
  return hub.articles.find((article) => article.slug === slug);
}
