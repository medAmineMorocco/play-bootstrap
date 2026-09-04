export interface WorktreeCommand {
  slug: string;
  command: string;
  label: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  description: string;
  path: string;
  order: number;
  syntax: string;
  worktreeWiseFeature: string;
  worktreeWiseScreenshot: string;
  worktreeWiseAlt: string;
  keyFlags: { flag: string; description: string }[];
}

export interface TutorialCluster {
  id: string;
  title: string;
  description: string;
  badge?: string;
  isSoon: boolean;
  path?: string;
  topics?: string[];
}

export const WORKTREE_COMMANDS: WorktreeCommand[] = [
  {
    slug: "add",
    command: "git worktree add",
    label: "Add",
    title: "git worktree add: Create Git Worktrees — Complete Guide",
    metaTitle: "git worktree add: Create Git Worktrees — Complete Guide | WorktreeWise",
    metaDescription:
      "Learn how to create linked Git worktrees from branches, commits, or new branches using git worktree add. Detailed syntax, flags, and workflow examples.",
    primaryKeyword: "git worktree add",
    description: "Create a linked worktree from an existing branch, commit, or new branch.",
    path: "/git-worktree/add",
    order: 1,
    syntax: "git worktree add [-b <new-branch>] <path> [<commit-ish>]",
    worktreeWiseFeature: "Create Worktree",
    worktreeWiseScreenshot: "/images/v1.1.0/13-create-worktree-from-local-branch.png",
    worktreeWiseAlt: "Create a new Git worktree from a branch in WorktreeWise",
    keyFlags: [
      { flag: "-b <new-branch>", description: "Create and checkout a new branch in the new worktree" },
      { flag: "-B <new-branch>", description: "Force create or reset the branch to the start point" },
      { flag: "--detach", description: "Checkout HEAD in a detached state (no branch attached)" },
      { flag: "--lock", description: "Lock the worktree immediately upon creation" },
      { flag: "--reason <text>", description: "Explanation string recorded with the lock" },
      { flag: "--no-checkout", description: "Suppress checkout of the working tree files" },
    ],
  },
  {
    slug: "list",
    command: "git worktree list",
    label: "List",
    title: "git worktree list: View and Inspect Git Worktrees",
    metaTitle: "git worktree list: View and Inspect Git Worktrees | WorktreeWise",
    metaDescription:
      "Master git worktree list to inspect linked directories, commit hashes, branches, and locked states. Includes standard and porcelain scripting formats.",
    primaryKeyword: "git worktree list",
    description: "View and inspect all linked worktree directories, HEAD commits, and active branches.",
    path: "/git-worktree/list",
    order: 2,
    syntax: "git worktree list [--porcelain] [-v | --verbose]",
    worktreeWiseFeature: "Worktree List & Overview",
    worktreeWiseScreenshot: "/images/v1.1.0/04-worktree-overview.png",
    worktreeWiseAlt: "Inspect all Git worktrees in the WorktreeWise dashboard",
    keyFlags: [
      { flag: "--porcelain", description: "Output in a stable, machine-readable format suitable for scripts" },
      { flag: "-v, --verbose", description: "Show additional details including annotations and lock state" },
      { flag: "-z", description: "Terminate fields with NUL character instead of newlines (porcelain mode)" },
    ],
  },
  {
    slug: "remove",
    command: "git worktree remove",
    label: "Remove",
    title: "git worktree remove: Safely Delete a Git Worktree",
    metaTitle: "git worktree remove: Safely Delete a Git Worktree | WorktreeWise",
    metaDescription:
      "Learn how to safely remove a Git worktree without deleting its branch. Protect uncommitted changes, resolve lock blockers, and use force safely.",
    primaryKeyword: "git worktree remove",
    description: "Safely delete a worktree directory and unregister its administrative record.",
    path: "/git-worktree/remove",
    order: 3,
    syntax: "git worktree remove [-f | --force] <worktree>",
    worktreeWiseFeature: "Delete Worktree",
    worktreeWiseScreenshot: "/images/v1.1.0/18b-worktree-actions-delete-options.png",
    worktreeWiseAlt: "Delete a Git worktree safely with confirmation in WorktreeWise",
    keyFlags: [
      { flag: "-f, --force", description: "Force removal even if untracked or uncommitted changes exist" },
    ],
  },
  {
    slug: "move",
    command: "git worktree move",
    label: "Move",
    title: "git worktree move: Move a Git Worktree Safely",
    metaTitle: "git worktree move: Move a Git Worktree Safely | WorktreeWise",
    metaDescription:
      "How to move or rename a Git worktree directory without breaking internal metadata pointers. Learn destination rules and repair connections.",
    primaryKeyword: "git worktree move",
    description: "Relocate a linked worktree directory and automatically update internal Git pointers.",
    path: "/git-worktree/move",
    order: 4,
    syntax: "git worktree move <worktree> <new-path>",
    worktreeWiseFeature: "Move Worktree",
    worktreeWiseScreenshot: "/images/v1.1.0/21-worktree-move.png",
    worktreeWiseAlt: "Relocate a Git worktree folder in WorktreeWise",
    keyFlags: [
      { flag: "-f, --force", description: "Force the move even if destination is locked or has issues" },
    ],
  },
  {
    slug: "lock",
    command: "git worktree lock",
    label: "Lock",
    title: "git worktree lock: Protect a Git Worktree from Pruning",
    metaTitle: "git worktree lock: Protect a Git Worktree from Pruning | WorktreeWise",
    metaDescription:
      "Protect your Git worktrees from automatic pruning. Learn git worktree lock syntax, reasons, and use cases for removable drives and long builds.",
    primaryKeyword: "git worktree lock",
    description: "Lock a worktree to prevent accidental removal or automatic pruning.",
    path: "/git-worktree/lock",
    order: 5,
    syntax: "git worktree lock [--reason <string>] <worktree>",
    worktreeWiseFeature: "Lock Worktree",
    worktreeWiseScreenshot: "/images/v1.1.0/22-worktree-lock.png",
    worktreeWiseAlt: "Lock a Git worktree against deletion in WorktreeWise",
    keyFlags: [
      { flag: "--reason <string>", description: "Record an explanation for why the worktree is locked" },
    ],
  },
  {
    slug: "unlock",
    command: "git worktree unlock",
    label: "Unlock",
    title: "git worktree unlock: Unlock a Git Worktree",
    metaTitle: "git worktree unlock: Unlock a Git Worktree | WorktreeWise",
    metaDescription:
      "Unlock previously protected Git worktrees with git worktree unlock. Restore ability to prune, move, or delete temporary development directories.",
    primaryKeyword: "git worktree unlock",
    description: "Release the lock on a worktree so it can be moved, deleted, or pruned.",
    path: "/git-worktree/unlock",
    order: 6,
    syntax: "git worktree unlock <worktree>",
    worktreeWiseFeature: "Unlock Worktree",
    worktreeWiseScreenshot: "/images/v1.1.0/42-worktree-unlock-action.png",
    worktreeWiseAlt: "Unlock action for a protected Git worktree in WorktreeWise",
    keyFlags: [],
  },
  {
    slug: "prune",
    command: "git worktree prune",
    label: "Prune",
    title: "git worktree prune: Clean Up Stale Git Worktrees",
    metaTitle: "git worktree prune: Clean Up Stale Git Worktrees | WorktreeWise",
    metaDescription:
      "Clean up stale Git worktree metadata with git worktree prune. Learn dry-run flags, expiration periods, and why orphaned records occur.",
    primaryKeyword: "git worktree prune",
    description: "Clean up stale administrative records whose worktree folders were deleted manually.",
    path: "/git-worktree/prune",
    order: 7,
    syntax: "git worktree prune [-n | --dry-run] [-v | --verbose] [--expire <time>]",
    worktreeWiseFeature: "Prune Stale Worktrees",
    worktreeWiseScreenshot: "/images/v1.1.0/25-prune-worktrees.png",
    worktreeWiseAlt: "Prune orphaned Git worktrees in WorktreeWise",
    keyFlags: [
      { flag: "-n, --dry-run", description: "Preview which stale worktrees would be pruned without deleting" },
      { flag: "-v, --verbose", description: "Report each pruned worktree administrative record" },
      { flag: "--expire <time>", description: "Only prune entries older than specified time (e.g. 2.weeks.ago)" },
    ],
  },
  {
    slug: "repair",
    command: "git worktree repair",
    label: "Repair",
    title: "git worktree repair: Fix Broken Git Worktree Links",
    metaTitle: "git worktree repair: Fix Broken Git Worktree Links | WorktreeWise",
    metaDescription:
      "Fix severed administrative links when repositories or worktrees are moved manually using git worktree repair. Practical restoration guide.",
    primaryKeyword: "git worktree repair",
    description: "Re-establish bi-directional links between the repository and moved worktrees.",
    path: "/git-worktree/repair",
    order: 8,
    syntax: "git worktree repair [<path>...]",
    worktreeWiseFeature: "Repair Damaged Worktrees",
    worktreeWiseScreenshot: "/images/v1.1.0/39-repair-worktree.png",
    worktreeWiseAlt: "Repair action for a damaged Git worktree in WorktreeWise",
    keyFlags: [
      { flag: "<path>...", description: "Optionally specify one or more worktree paths to repair" },
    ],
  },
];

export const TUTORIAL_CLUSTERS: TutorialCluster[] = [
  {
    id: "commands",
    title: "Commands",
    description: "Comprehensive guides for all 8 Git worktree commands with practical examples and diagrams.",
    isSoon: false,
    path: "/git-worktree",
    topics: ["add", "list", "remove", "move", "lock", "unlock", "prune", "repair"],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    description: "Fix branch already checked out, broken metadata, lock conflicts, and unremovable worktrees.",
    badge: "Soon",
    isSoon: true,
    topics: [
      "Branch already checked out in another worktree",
      "Cannot remove worktree with uncommitted changes",
      "Missing .git worktree directory or severed links",
      "Stale worktree administrative entries",
      "Repairing moved repository parents",
    ],
  },
  {
    id: "ai-agent",
    title: "AI Agent",
    description: "Equip Claude Code, Cursor, Codex, and Gemini CLI with dedicated isolated Git worktrees.",
    badge: "Soon",
    isSoon: true,
    topics: [
      "Claude Code + Git worktree isolation",
      "Running multi-agent parallel coding workflows",
      "Cursor agent background tasks in separate worktrees",
      "Preventing AI merge conflicts via dedicated branch trees",
    ],
  },
  {
    id: "isolation",
    title: "Isolation",
    description: "Isolate local ports, environment variables (.env), node_modules, and Docker containers across branches.",
    badge: "Soon",
    isSoon: true,
    topics: [
      "Per-worktree .env and environment variable overrides",
      "Managing duplicate ports across dev servers",
      "Docker & Docker Compose container separation",
      "Managing node_modules and build caches",
    ],
  },
  {
    id: "comparisons",
    title: "Comparisons",
    description: "Compare Git worktree with git clone, git stash, sparse checkout, and native Git GUIs.",
    badge: "Soon",
    isSoon: true,
    topics: [
      "Git worktree vs git clone (disk & memory comparison)",
      "Git worktree vs branch switching & git stash",
      "Git worktree vs sparse checkout",
      "WorktreeWise GUI vs Git CLI",
    ],
  },
];

export function getCommandBySlug(slug: string): WorktreeCommand | undefined {
  return WORKTREE_COMMANDS.find((cmd) => cmd.slug === slug);
}

export function getAdjacentCommands(slug: string): {
  prev: WorktreeCommand | null;
  next: WorktreeCommand | null;
} {
  const index = WORKTREE_COMMANDS.findIndex((cmd) => cmd.slug === slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? WORKTREE_COMMANDS[index - 1] : null,
    next: index < WORKTREE_COMMANDS.length - 1 ? WORKTREE_COMMANDS[index + 1] : null,
  };
}
