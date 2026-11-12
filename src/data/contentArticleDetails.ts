import type { HubArticle, HubKey } from "./contentHubs";
import type { ArticleContent } from "./articles/types";
import { troubleshootingArticles } from "./articles/troubleshootingData";
import { aiAgentsArticles } from "./articles/aiAgentsData";
import { isolationArticles } from "./articles/isolationData";
import { comparisonsArticles } from "./articles/comparisonsData";

export type { ArticleContent as ArticleDetails };

const defaultAiAgentWorkflow: ArticleContent["worktreewiseWorkflow"] = {
  title: "Create in WorktreeWise, then connect the agent",
  description: "WorktreeWise can create a named branch and Git worktree first. Import that existing folder into the AI agent's project or workspace picker, or open the worktree's terminal and launch the agent from there.",
  steps: [
    {
      title: "Create the worktree in WorktreeWise",
      description: "Choose the repository, base branch, task name, and optional agent profile. WorktreeWise creates the isolated folder without switching your active checkout.",
    },
    {
      title: "Import the existing worktree into the agent",
      description: "In the agent's project or workspace flow, add the WorktreeWise-created folder. For a CLI agent, open that folder in a terminal and start the agent there so it inherits the correct working directory.",
    },
    {
      title: "Run multiple worktrees at the same time",
      description: "Create one WorktreeWise worktree per task and keep each agent session attached to its own path and branch. You can continue coding in your primary checkout while the parallel tasks run.",
    },
    {
      title: "Review everything from one place",
      description: "Use WorktreeWise to compare status and diffs across the active worktrees, then merge the approved branch or remove the disposable checkout.",
    },
  ],
  note: "Some AI agents, including Codex and Cursor, also provide native task-scoped worktree modes. WorktreeWise complements those features by letting you create, name, import, and manage multiple existing worktrees across different agents from one visual inventory.",
};

const articlesByHub: Record<HubKey, Record<string, ArticleContent>> = {
  troubleshooting: troubleshootingArticles,
  "ai-agents": aiAgentsArticles,
  isolation: isolationArticles,
  comparisons: comparisonsArticles,
};

export function getArticleDetails(hubKey: HubKey, article: HubArticle): ArticleContent {
  const match = articlesByHub[hubKey]?.[article.slug];
  if (match) {
    if (hubKey === "ai-agents" && !match.worktreewiseWorkflow) {
      return { ...match, worktreewiseWorkflow: defaultAiAgentWorkflow };
    }
    return match;
  }

  // Fallback if an unexpected slug is requested
  return {
    slug: article.slug,
    title: article.title,
    keyword: article.keyword,
    tags: ["git", "worktree", hubKey],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: `${article.title} is best managed with isolated Git worktrees. Separate your branches, protect uncommitted work, and verify Git state.`,
    scenario: `A developer needs to handle ${article.title.toLowerCase()} in a busy repository without losing uncommitted progress or corrupting branch state.`,
    lead: `Managing ${article.title.toLowerCase()} effectively requires an understanding of Git's worktree architecture, filesystem boundaries, and clean workflow patterns.`,
    problem: {
      title: `Understanding ${article.title}`,
      description: `Issues with ${article.title.toLowerCase()} typically stem from mismatches between Git's administrative metadata and the filesystem.`,
      internals: "Git tracks each worktree in `.git/worktrees/<name>/`. Pointers must stay synchronized with the working directory.",
    },
    commands: [
      {
        label: "Inspect state",
        code: "git worktree list --porcelain\ngit status --short",
        explanation: "Check the active worktree registry and working tree cleanliness.",
      },
    ],
    steps: [
      {
        title: "Diagnose active state",
        description: "Verify which branch and directory are affected.",
        command: "git worktree list",
      },
      {
        title: "Execute resolution",
        description: "Apply the non-destructive Git command.",
      },
    ],
    pitfalls: [
      {
        mistake: "Deleting directories outside of Git",
        consequence: "Leaves dangling registrations in `.git/worktrees/`.",
        solution: "Use `git worktree remove` or follow up with `git worktree prune`.",
      },
    ],
    checks: [
      "Worktree directory and branch are synchronized",
      "Git status executes without errors",
    ],
    proTips: [
      "Use WorktreeWise to visualize your worktrees and avoid manual CLI syntax errors.",
    ],
    worktreewiseWorkflow: hubKey === "ai-agents" ? defaultAiAgentWorkflow : undefined,
    keyTakeaways: [
      "Always inspect with `git worktree list` before making destructive changes.",
      "Worktrees keep parallel development safe and clean.",
    ],
    image: "/images/v1.2.0/dashboard.png",
    imageAlt: "WorktreeWise overview interface",
  };
}
