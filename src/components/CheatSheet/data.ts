export type CommandItem = {
  id: string;
  title: string;
  command: string;
  syntax?: string;
  explanation: string;
  options?: string[];
  note?: string;
  worktreeWise?: string;
  article?: { label: string; href: string };
};

export type CommandGroup = {
  id: string;
  title: string;
  description: string;
  commands: CommandItem[];
};

export const quickReference = [
  {
    task: "List worktrees",
    command: "git worktree list",
    options: ["--verbose", "--porcelain"],
    worktreeWise: "View all worktrees",
    href: "#list-worktrees",
  },
  {
    task: "Create from existing branch",
    command: "git worktree add <path> <branch>",
    options: ["--lock", "--reason <text>", "--no-checkout"],
    worktreeWise: "Create worktree",
    href: "#existing-branch",
  },
  {
    task: "Create with new branch",
    command: "git worktree add -b <branch> <path> <start-point>",
    options: ["-B <branch>", "--track", "--lock"],
    worktreeWise: "Create + new branch",
    href: "#new-branch",
  },
  {
    task: "Move",
    command: "git worktree move <worktree> <new-path>",
    options: ["--force"],
    worktreeWise: "Move",
    href: "#move-worktree",
  },
  {
    task: "Lock",
    command: "git worktree lock <worktree>",
    options: ["--reason <text>"],
    worktreeWise: "Lock",
    href: "#lock-worktree",
  },
  {
    task: "Unlock",
    command: "git worktree unlock <worktree>",
    options: ["Target by path"],
    worktreeWise: "Unlock",
    href: "#unlock-worktree",
  },
  {
    task: "Remove",
    command: "git worktree remove <worktree>",
    options: ["--force"],
    worktreeWise: "Delete",
    href: "#remove-worktree",
  },
  {
    task: "Prune stale metadata",
    command: "git worktree prune",
    options: ["--dry-run", "--verbose", "--expire <time>"],
    worktreeWise: "Prune",
    href: "#prune-worktrees",
  },
  {
    task: "Repair moved worktrees",
    command: "git worktree repair [<path>...]",
    options: ["One or more worktree paths"],
    worktreeWise: "Repair",
    href: "#repair-worktrees",
  },
] as const;

export const commandGroups: CommandGroup[] = [
  {
    id: "creating",
    title: "Creating worktrees",
    description:
      "Create a linked working directory from a branch, commit, or new branch.",
    commands: [
      {
        id: "existing-branch",
        title: "Create from an existing branch",
        command: "git worktree add ../feature-auth feature/auth",
        syntax: "git worktree add <path> <branch>",
        explanation:
          "Checks out an existing branch into a new linked working directory.",
        note: "A branch normally cannot be checked out in two worktrees at once.",
        worktreeWise: "Create worktree",
        article: {
          label: "Detailed git worktree add guide",
          href: "/git-worktree/add",
        },
      },
      {
        id: "new-branch",
        title: "Create a worktree and a new branch",
        command: "git worktree add -b feature/auth ../feature-auth main",
        syntax: "git worktree add -b <branch> <path> <start-point>",
        explanation:
          "Creates the branch from the chosen starting point and checks it out in the new worktree.",
        options: [
          "Use -B instead of -b to reset an existing branch to the start point.",
        ],
        worktreeWise: "Create worktree + new branch",
        article: {
          label: "git worktree add command tutorial",
          href: "/git-worktree/add",
        },
      },
      {
        id: "specific-commit",
        title: "Create from a specific commit",
        command: "git worktree add -b investigate-bug ../investigate a1b2c3d",
        syntax: "git worktree add -b <branch> <path> <commit>",
        explanation:
          "Starts a new branch and worktree at a specific commit, tag, or other commit-ish.",
        note: "Use a new branch when you expect to commit changes.",
        worktreeWise:
          "Create from a selected branch or reference where available",
      },
    ],
  },
  {
    id: "managing",
    title: "Managing worktrees",
    description: "Find, relocate, and protect linked working directories.",
    commands: [
      {
        id: "list-worktrees",
        title: "List worktrees",
        command: "git worktree list",
        syntax: "git worktree list [--verbose | --porcelain]",
        explanation:
          "Shows the main working tree and every linked worktree with its commit and branch.",
        options: [
          "--verbose adds annotations.",
          "--porcelain emits stable, script-friendly output.",
        ],
        worktreeWise: "View all worktrees",
        article: {
          label: "git worktree list tutorial",
          href: "/git-worktree/list",
        },
      },
      {
        id: "move-worktree",
        title: "Move a worktree",
        command: "git worktree move ../feature-auth ../worktrees/feature-auth",
        syntax: "git worktree move <worktree> <new-path>",
        explanation:
          "Moves a linked worktree and updates Git's administrative metadata.",
        note: "Use this command instead of moving the directory manually.",
        worktreeWise: "Move",
        article: {
          label: "Learn about moving worktrees safely",
          href: "/git-worktree/move",
        },
      },
      {
        id: "lock-worktree",
        title: "Lock a worktree",
        command: 'git worktree lock --reason "External drive" ../client-demo',
        syntax: "git worktree lock [--reason <string>] <worktree>",
        explanation:
          "Prevents automatic pruning of a worktree that may be temporarily unavailable.",
        worktreeWise: "Lock",
        article: {
          label: "git worktree lock tutorial",
          href: "/git-worktree/lock",
        },
      },
      {
        id: "unlock-worktree",
        title: "Unlock a worktree",
        command: "git worktree unlock ../client-demo",
        syntax: "git worktree unlock <worktree>",
        explanation:
          "Removes the administrative lock so the worktree can be pruned normally.",
        worktreeWise: "Unlock",
        article: {
          label: "git worktree unlock tutorial",
          href: "/git-worktree/unlock",
        },
      },
    ],
  },
  {
    id: "cleaning",
    title: "Cleaning worktrees",
    description:
      "Remove linked directories and clean stale administrative records safely.",
    commands: [
      {
        id: "remove-worktree",
        title: "Remove a worktree safely",
        command: "git worktree remove ../feature-auth",
        syntax: "git worktree remove <worktree>",
        explanation:
          "Removes a clean linked worktree and its administrative record.",
        note: "Commit, stash, or discard changes before removal.",
        worktreeWise: "Delete",
        article: {
          label: "Safe worktree removal guide",
          href: "/git-worktree/remove",
        },
      },
      {
        id: "prune-worktrees",
        title: "Prune stale worktree metadata",
        command: "git worktree prune --dry-run",
        syntax: "git worktree prune [--dry-run] [--verbose]",
        explanation:
          "Cleans administrative records for linked worktrees that no longer exist.",
        options: ["Run --dry-run first to preview what Git would remove."],
        worktreeWise: "Prune",
        article: {
          label: "Understand git worktree prune",
          href: "/git-worktree/prune",
        },
      },
      {
        id: "repair-worktrees",
        title: "Repair broken worktree links",
        command: "git worktree repair ../moved-worktree",
        syntax: "git worktree repair [<path>...]",
        explanation:
          "Repairs Git's administrative links after a worktree directory or the main repository was moved outside Git.",
        note: "Repair an existing moved directory; prune only when the worktree is permanently gone.",
        worktreeWise: "Repair",
        article: {
          label: "Learn how to repair a damaged worktree",
          href: "/git-worktree/repair",
        },
      },
    ],
  },
];

export const faqs = [
  [
    "What is a Git worktree?",
    "A Git worktree is an additional working directory linked to the same repository, allowing another branch or commit to be checked out without another full clone.",
  ],
  [
    "Why use Git worktrees instead of cloning a repository?",
    "Worktrees share the repository’s object database and configuration, so they use less space and make parallel branch work faster than maintaining several independent clones.",
  ],
  [
    "Can the same branch be checked out in multiple worktrees?",
    "Normally no. Git prevents the same local branch from being checked out in more than one worktree to avoid conflicting updates.",
  ],
  [
    "Do Git worktrees share the same .git repository?",
    "Yes. Linked worktrees share the main repository’s object database and most repository-level data, while each worktree keeps its own HEAD, index, and working files.",
  ],
  [
    "Where does Git store worktree metadata?",
    "The main repository stores linked-worktree administrative data under its git directory, typically in .git/worktrees/.",
  ],
  [
    "Can I manually delete a worktree directory?",
    "You can, but it leaves stale metadata. Prefer git worktree remove; if the directory is already gone, inspect and clean records with git worktree prune.",
  ],
  [
    "How do I remove a Git worktree safely?",
    "Commit or stash wanted changes, then run git worktree remove <worktree>. Git refuses normal removal when protected local changes are present.",
  ],
  [
    "What does git worktree prune do?",
    "It removes stale administrative records for linked worktrees that are no longer present. Use --dry-run to preview the cleanup.",
  ],
  [
    "What does git worktree repair do?",
    "It repairs administrative links after a linked worktree or the main repository has been moved manually.",
  ],
  [
    "Do worktrees share dependencies such as node_modules?",
    "No by default. Each worktree has its own files and typically needs its own node_modules unless you deliberately share or cache dependencies.",
  ],
  [
    "Do worktrees share environment files?",
    "Only tracked environment files appear automatically. Ignored files such as .env.local usually need to be copied, generated, or linked for each worktree.",
  ],
  [
    "How many Git worktrees can I create?",
    "Git does not impose a small fixed limit. Practical limits are disk space, tooling overhead, and how many active branches your workflow can manage clearly.",
  ],
] as const;
