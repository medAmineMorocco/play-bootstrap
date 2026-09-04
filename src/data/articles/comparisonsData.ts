import type { ArticleContent } from "./types";

export const comparisonsArticles: Record<string, ArticleContent> = {
  "vs-clone": {
    slug: "vs-clone",
    title: "Git Worktree vs Git Clone: Which Should You Use?",
    keyword: "git worktree vs clone",
    tags: ["git-worktree", "git-clone", "architecture", "comparisons"],
    readTime: "7 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Git Worktrees and Git Clones both provide separate directories on disk. However, worktrees share the local object database, create instantly, save gigabytes of storage, share stashes, and prevent duplicate branch checkouts. Use worktrees for daily parallel feature work; use clones only when you need completely isolated remotes or independent credentials.",
    scenario: "Jordan needs to test a customer bug on `release/2.4`. In the past, he ran `git clone` into a new folder, waiting 4 minutes to download the 3GB repository. With `git worktree add`, the new directory was ready in 0.2 seconds.",
    lead: "Every developer eventually needs to have two branches open at the exact same time. Historically, the instinctive solution was to clone the repository again into another folder. While that works, Git worktrees are built natively into Git to make parallel checkouts instant and lightweight.",
    problem: {
      title: "The Massive Waste of Duplicate Clones",
      description: "When you run `git clone`, Git downloads and stores the entire commit history, all packfiles, and every branch ref. Clones duplicate all of this data needlessly.",
      errorSnippet: `$ git clone https://github.com/my-org/core-platform clone-2
Cloning into 'clone-2'...
Receiving objects: 100% (612,419/612,419), 3.84 GiB | done. (Took 3m 40s)`,
      internals: "Worktrees share `.git/objects/`. A worktree contains only the checked-out source files for that branch, linking back to the primary `.git/` directory via a lightweight text file.",
    },
    commands: [
      {
        label: "Create instant linked worktree",
        code: "git worktree add ../feature-branch feature-branch",
        explanation: "Opens a secondary checkout of the branch in under 1 second.",
      },
      {
        label: "Inspect shared object database",
        code: "git rev-parse --git-common-dir",
        explanation: "Outputs the shared `.git` folder used by all linked worktrees.",
      },
    ],
    steps: [
      {
        title: "Identify when to use a worktree",
        description: "Choose a worktree whenever you are working on the same remote repository and want simultaneous checkouts without duplicate downloads.",
      },
      {
        title: "Create worktree",
        command: "git worktree add ../hotfix -b fix/auth-bug main",
        description: "Instantaneous creation.",
      },
      {
        title: "Work simultaneously",
        description: "Run dev servers, edit code, and commit without affecting your primary checkout.",
      },
    ],
    comparisonTable: {
      headers: ["Metric / Feature", "Git Worktree", "Git Clone"],
      rows: [
        ["Creation Speed", "< 1 second", "Minutes (depends on repo size and network)"],
        ["Disk Usage", "Only working tree files", "Full history + working tree (Gigabytes)"],
        ["Object Sharing", "Shared locally", "Completely isolated (requires push/pull)"],
        ["Stashes", "Shared globally across worktrees", "Local to that specific clone"],
        ["Branch Collision Safety", "Guaranteed (cannot double-checkout)", "None (can cause push/rebase conflicts)"],
        ["Offline Setup", "100% offline (no internet needed)", "Requires remote network connection"],
      ],
    },
    edgeCases: [
      {
        title: "Completely untrusted third-party scripts",
        description: "If running untrusted code that might tamper with `.git/`, a separate clone or virtual machine provides an extra boundary.",
      },
    ],
    pitfalls: [
      {
        mistake: "Keeping 5 clones of a 5GB repo on a development laptop",
        consequence: "Consumes 25GB of SSD storage and requires 5 separate `git fetch` runs.",
        solution: "Use 1 primary repo and 4 lightweight worktrees.",
      },
    ],
    checks: [
      "Worktree creates in under 1 second without network traffic",
      "Commits in the worktree are visible in the main repo immediately",
    ],
    proTips: [
      "WorktreeWise lets you view and manage all active worktrees from a single visual hub, making worktrees far easier to use than juggling multiple terminal windows.",
    ],
    keyTakeaways: [
      "Worktrees are 10x faster and use 80% less disk than clones.",
      "All Git objects, stashes, and remotes are shared locally.",
      "Worktrees prevent accidental double-checkouts of the same branch.",
    ],
    image: "/images/v1.1.0/36-repository-start.png",
    imageAlt: "WorktreeWise interface comparing opening existing worktrees vs cloning a repository",
  },

  "vs-branch": {
    slug: "vs-branch",
    title: "Git Worktree vs Traditional Branch Switching: Stop Stashing",
    keyword: "git worktree vs branch",
    tags: ["git-worktree", "branch-switching", "productivity", "git-stash"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Switching branches in a single directory forces you to stash uncommitted work, triggers full compiler rebuilds, restarts dev servers, and causes editor buffer churn. Git worktrees give each branch its own directory, eliminating context switching penalties forever.",
    scenario: "Midway through a complex UI refactor with 14 modified files, an urgent production hotfix arrives. Instead of `git stash`, switching branches, rebuilding, and risking stash pop merge conflicts, the developer creates a worktree for the hotfix in 1 second, fixes it, and returns to their undisturbed main editor.",
    lead: "Branch switching has been the default workflow for Git users for decades. But in the era of heavy JavaScript compilers, TypeScript language servers, and multi-gigabyte build artifacts, repeatedly switching branches in a single directory wastes hours of engineering time.",
    problem: {
      title: "The High Cost of Branch Switching in One Directory",
      description: "When you switch branches, Git replaces thousands of files on disk. This forces TypeScript to re-index, webpack to invalidate build caches, and node_modules to mismatch.",
      errorSnippet: `$ git checkout hotfix
error: Your local changes to the following files would be overwritten by checkout:
  src/components/Table.tsx
Please commit your changes or stash them before you switch branches.`,
      internals: "A worktree provides an independent directory for the second branch. The original directory, uncommitted files, running dev server, and editor tabs remain 100% frozen in place.",
    },
    commands: [
      {
        label: "Traditional painful branch switch",
        code: "git stash -u\ngit checkout hotfix\n# fix bug and commit...\ngit checkout feature\ngit stash pop # hope for no merge conflicts!",
        explanation: "The legacy multi-step workflow fraught with risk.",
      },
      {
        label: "The Worktree way",
        code: "git worktree add ../hotfix hotfix\n# fix bug, commit, and close window. Main work never moved!",
        explanation: "Zero interruption to ongoing feature work.",
      },
    ],
    steps: [
      {
        title: "Leave your feature untouched",
        description: "Keep your editor, terminal, and running server open on `main`.",
      },
      {
        title: "Add worktree for hotfix",
        command: "git worktree add ../hotfix -b hotfix/urgent main",
        description: "Opens a fresh directory.",
      },
      {
        title: "Resolve hotfix in isolation",
        description: "Write fix, commit, and push from `../hotfix`.",
      },
      {
        title: "Remove worktree when done",
        command: "git worktree remove ../hotfix",
        description: "Cleanup takes 1 second.",
      },
    ],
    comparisonTable: {
      headers: ["Aspect", "Traditional Branch Switching", "Git Worktrees"],
      rows: [
        ["Uncommitted Work", "Must stash or commit WIP", "Untouched and frozen in place"],
        ["Dev Server State", "Crashes or requires full restart", "Stays running without interruption"],
        ["Build Cache", "Invalidated and recompiled", "Preserved per directory"],
        ["IDE Tabs & Cursor", "All open files close or reload", "Separate windows stay exactly as left"],
        ["Risk of Lost Work", "High (stash drop/pop conflicts)", "Zero (nothing is stashed)"],
      ],
    },
    edgeCases: [
      {
        title: "Quick 10-second inspection",
        description: "For reading a single commit message or viewing a diff, `git log` or `git show` is fine without a worktree.",
      },
    ],
    pitfalls: [
      {
        mistake: "Forgetting you have work stashed in a single-checkout workflow",
        consequence: "Weeks later, `git stash pop` fails with catastrophic merge conflicts.",
        solution: "Use worktrees instead of stashing.",
      },
    ],
    checks: [
      "Your ongoing feature work is never stashed or modified",
      "Dev server continues running without rebuild delay",
    ],
    proTips: [
      "Once developers adopt worktrees for hotfixes and code reviews, they almost never use `git stash` again.",
    ],
    keyTakeaways: [
      "Worktrees eliminate stash anxiety and compilation invalidation.",
      "Your running dev servers and editor buffers never get interrupted.",
      "Switching contexts is as simple as switching desktop windows.",
    ],
    image: "/images/v1.1.0/04-worktree-overview.png",
    imageAlt: "WorktreeWise overview screen showing active parallel branches without stashing",
  },

  "vs-multiple-clones": {
    slug: "vs-multiple-clones",
    title: "Git Worktrees vs Multiple Clones: Save 80% Disk Space",
    keyword: "git worktree vs multiple clones",
    tags: ["git-worktree", "monorepo", "disk-space", "performance"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Keeping 4 or 5 separate clones of a large repository consumes massive disk storage and requires tedious manual git fetches in every directory. Git worktrees share a single object store, making fetches universal and reducing disk usage by up to 80%.",
    scenario: "An engineer maintains 5 clones of a 4GB monorepo (`project-main`, `project-review`, `project-feature`, etc.). His 512GB SSD is running out of space, and he has to run `git fetch` 5 separate times every morning.",
    lead: "Many senior engineers who discovered the benefits of parallel directories adopted multiple clones years ago before worktrees matured. Today, Git worktrees provide all the concurrency of multiple clones with none of the disk waste.",
    problem: {
      title: "The Multiple Clone Tax",
      description: "5 clones of a 4GB repo = 20GB of disk space. Each clone has its own `.git/objects`, its own ref database, and its own remote tracking branches that must be fetched independently.",
      errorSnippet: `5 clones x 4GB = 20GB storage wasted
5 x git fetch origin = 5x network bandwidth and time`,
      internals: "When you run `git fetch` in any worktree, the downloaded commit objects are written to the shared `.git/objects/` store. That means ALL other worktrees see the new commits immediately!",
    },
    commands: [
      {
        label: "Fetch once, available everywhere",
        code: "git fetch origin",
        explanation: "Updates remote references across all linked worktrees simultaneously.",
      },
      {
        label: "Convert clone habit to worktrees",
        code: "git worktree add ../wt-feature feature-branch",
        explanation: "Replaces `git clone` with an instantaneous worktree.",
      },
    ],
    steps: [
      {
        title: "Audit existing clones",
        description: "Check how much disk space your multiple clones are consuming.",
        command: "du -sh ~/projects/my-repo-*",
      },
      {
        title: "Consolidate into 1 primary repository",
        description: "Choose your primary clone as the hub.",
      },
      {
        title: "Create worktrees for active features",
        command: "git worktree add ../feat-billing feat/billing",
        description: "Create lightweight worktrees instead of full clones.",
      },
      {
        title: "Safely delete redundant clones",
        description: "Reclaim tens of gigabytes of disk space.",
      },
    ],
    comparisonTable: {
      headers: ["Metric", "Multiple Clones", "Git Worktrees"],
      rows: [
        ["Disk Consumption", "Multiplied by N (5 clones = 5x)", "1x history + working trees (~80% savings)"],
        ["Fetch Overhead", "Must fetch in each clone", "Fetch once, updated everywhere"],
        ["Stashes", "Siloed per clone", "Shared globally"],
        ["Branch Safety", "Can accidentally push conflicting edits", "Git enforces single-checkout protection"],
      ],
    },
    edgeCases: [
      {
        title: "Corrupted primary repository",
        description: "Because worktrees share the primary `.git` folder, if the primary repo is deleted, worktrees lose their object store. Keep the primary repo in a stable location.",
      },
    ],
    pitfalls: [
      {
        mistake: "Deleting the primary repository directory while secondary worktrees are active",
        consequence: "Worktrees break because the shared `.git` folder disappeared.",
        solution: "Always maintain your primary repository as the permanent home.",
      },
    ],
    checks: [
      "Disk space is reclaimed",
      "`git fetch` in one directory updates remote branches across all worktrees",
    ],
    proTips: [
      "Use WorktreeWise to view all your worktrees in a single clean UI, eliminating the need to organize dozens of clone folders on disk.",
    ],
    keyTakeaways: [
      "Worktrees replace multiple clones completely.",
      "Fetch once, update everywhere.",
      "Save tens of gigabytes of disk space.",
    ],
    image: "/images/v1.1.0/36-repository-start.png",
    imageAlt: "WorktreeWise interface consolidating repository clones into clean worktrees",
  },

  "vs-stash": {
    slug: "vs-stash",
    title: "Git Worktree vs Git Stash: The End of Stash Pop Conflicts",
    keyword: "git worktree vs stash",
    tags: ["git-worktree", "git-stash", "productivity", "merge-conflicts"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "`git stash` is designed for quick temporary shelves, but using it for multitasking leads to lost untracked files, forgotten stashes, and brutal merge conflicts on `stash pop`. Git worktrees let you leave your uncommitted work exactly where it is.",
    scenario: "A developer has 12 uncommitted files and runs `git stash` to review a PR. Two days later, after several commits on main, she runs `git stash pop`. Git explodes with merge conflicts across 8 files, including untracked build artifacts that were deleted.",
    lead: "Every Git developer has experienced the dread of `git stash pop` failing with conflicts. While `git stash` is fine for quickly stashing a one-line typo fix, using it to manage parallel tasks is a recipe for lost work.",
    problem: {
      title: "Why Git Stash is Dangerous for Multitasking",
      description: "A stash is an unreferenced commit pair stored in `.git/refs/stash`. If the branch state advances while your work is stashed, popping that stash applies changes against a different commit baseline, causing merge conflicts.",
      errorSnippet: `$ git stash pop
Auto-merging src/index.ts
CONFLICT (content): Merge conflict in src/index.ts
The stash entry is kept in case you need it.`,
      internals: "Worktrees avoid this completely because your uncommitted files remain physically on disk in their original directory. No stash commits are created, and no three-way merge is required.",
    },
    commands: [
      {
        label: "Instead of git stash, add a worktree",
        code: "git worktree add ../quick-fix -b fix/urgent main",
        explanation: "Leaves your dirty working tree 100% untouched.",
      },
      {
        label: "List stashes globally",
        code: "git stash list",
        explanation: "Stashes are shared across worktrees if you ever need them.",
      },
    ],
    steps: [
      {
        title: "Leave your dirty files alone",
        description: "Don't run git stash. Simply open a terminal or WorktreeWise.",
      },
      {
        title: "Create worktree for the interruption",
        command: "git worktree add ../review -b review/pr-42 main",
        description: "Handle the PR or hotfix in the new directory.",
      },
      {
        title: "Return to your original work",
        description: "Simply switch back to your original window. Everything is exactly as you left it.",
      },
    ],
    comparisonTable: {
      headers: ["Criterion", "Git Stash", "Git Worktree"],
      rows: [
        ["State Storage", "Serialized in `.git/refs/stash`", "Real files live on disk"],
        ["Risk of Conflicts", "High (on stash pop)", "Zero (no pop required)"],
        ["Untracked Files", "Must pass `-u` or they get left behind", "Preserved natively in directory"],
        ["Dev Server Impact", "Server restarts / compiles on pop", "Server stays running smoothly"],
      ],
    },
    edgeCases: [
      {
        title: "Transferring changes between worktrees",
        description: "You CAN use stash to intentionally move WIP changes between worktrees (`git stash` in WT 1, `git stash pop` in WT 2).",
      },
    ],
    pitfalls: [
      {
        mistake: "Accumulating 20+ stashes over months ('WIP', 'WIP 2', 'save')",
        consequence: "Impossible to remember what code is in each stash.",
        solution: "Use named branches and worktrees.",
      },
    ],
    checks: [
      "Zero stashes are left lingering in `git stash list`",
      "Uncommitted work is always safe in its own folder",
    ],
    proTips: [
      "In WorktreeWise, you can see uncommitted modifications across all worktrees at a glance without ever touching git stash.",
    ],
    keyTakeaways: [
      "Git worktrees eliminate stash pop conflicts completely.",
      "Keep uncommitted work safe on disk in its original folder.",
      "Reserve `git stash` only for 10-second typo fixes.",
    ],
    image: "/images/v1.1.0/04-worktree-overview.png",
    imageAlt: "WorktreeWise interface keeping uncommitted work safe across parallel worktrees",
  },

  "vs-sparse-checkout": {
    slug: "vs-sparse-checkout",
    title: "Git Worktree vs Sparse Checkout: How They Complement Each Other",
    keyword: "git worktree vs sparse checkout",
    tags: ["sparse-checkout", "monorepo", "comparisons", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Git Worktree and Sparse Checkout solve two orthogonal problems: Worktrees manage parallel branches, while Sparse Checkout manages subsets of files. Combining both creates the ultimate monorepo development workflow.",
    scenario: "A developer in an enterprise monorepo asks: 'Should I use Git worktrees or sparse checkout to speed up my work?' The answer is: use both together!",
    lead: "Developers often confuse Git worktrees and sparse checkout because both features deal with working directory contents. However, they address entirely different dimensions of development scaling.",
    problem: {
      title: "Orthogonal Scaling Dimensions",
      description: "Worktrees scale concurrency (multiple branches at once). Sparse checkout scales repository size (reducing the number of files materialized on disk).",
      errorSnippet: `Monorepo with 100,000 files across 20 teams:
- Sparse checkout alone: Only 1 branch checked out.
- Worktree alone: 5 worktrees = 500,000 files on disk.
- Combined: 5 worktrees x 2,000 files each = 10,000 files total!`,
      internals: "Worktrees provide separate directory roots. Sparse checkout modifies each worktree's individual `.git/worktrees/<name>/info/sparse-checkout` filter.",
    },
    commands: [
      {
        label: "Combine worktree with sparse checkout",
        code: "git worktree add --no-checkout ../wt-auth -b feat/auth main\ncd ../wt-auth\ngit sparse-checkout set services/auth\ngit checkout",
        explanation: "Creates an isolated branch that materializes ONLY `services/auth`.",
      },
    ],
    steps: [
      {
        title: "Understand the distinction",
        description: "Use worktree for parallel branches; use sparse checkout for monorepo file filtering.",
      },
      {
        title: "Initialize sparse worktree",
        command: "git worktree add --no-checkout ../wt-frontend feat/frontend",
        description: "Create worktree without populating files.",
      },
      {
        title: "Apply cone patterns",
        command: "cd ../wt-frontend && git sparse-checkout set apps/frontend",
        description: "Select target directory.",
      },
      {
        title: "Checkout files",
        command: "git checkout",
        description: "Materialize only the required subset.",
      },
    ],
    comparisonTable: {
      headers: ["Feature", "Git Worktree", "Sparse Checkout"],
      rows: [
        ["Core Purpose", "Parallel branch checkouts", "File subset filtering"],
        ["What It Scales", "Workflow concurrency", "Monorepo repository size"],
        ["Directory Count", "Creates additional folders", "Limits files inside a folder"],
        ["Can They Combine?", "Yes! Perfect synergy", "Yes! Configured per worktree"],
      ],
    },
    edgeCases: [
      {
        title: "Cross-service dependencies in monorepos",
        description: "Include shared utility libraries in your sparse set (`git sparse-checkout set apps/frontend libs/shared`).",
      },
    ],
    pitfalls: [
      {
        mistake: "Assuming sparse checkout creates multiple branches",
        consequence: "Sparse checkout still operates in a single working directory.",
        solution: "Pair it with Git worktrees.",
      },
    ],
    checks: [
      "Worktree contains only specified subdirectories",
      "Other worktrees maintain their own independent sparse checkout rules",
    ],
    proTips: [
      "WorktreeWise lets you configure sparse checkout paths with visual folder checkboxes when adding a new worktree.",
    ],
    keyTakeaways: [
      "Worktrees manage branches; sparse checkout manages files.",
      "Combining both gives you lightweight parallel workspaces in massive monorepos.",
    ],
    image: "/images/v1.1.0/10-create-worktree-sparse-checkout.png",
    imageAlt: "WorktreeWise interface combining Git worktree creation with sparse checkout selection",
  },

  "vs-checkout": {
    slug: "vs-checkout",
    title: "Git Worktree vs Git Checkout: The Architectural Evolution",
    keyword: "git worktree vs checkout",
    tags: ["git-checkout", "git-worktree", "git-history", "comparisons"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "`git checkout` historically did everything: switched branches, updated files, detached HEAD, and restored files. Git worktrees modernize the workflow by decoupling checked-out branches into dedicated working trees.",
    scenario: "A junior developer asks why modern Git workflows favor `git switch` and `git worktree` over the classic Swiss-Army-knife `git checkout` command.",
    lead: "For over a decade, `git checkout` was the single most overloaded command in Git. It switched branches, modified the working directory, checked out individual files from the index, and detached HEAD. Understanding the evolution to Git worktrees provides clarity on modern Git architecture.",
    problem: {
      title: "The Overloaded Single-Checkout Paradigm",
      description: "`git checkout <branch>` mutates the current directory in-place. If uncommitted edits exist, it aborts. Worktrees decouple checkouts from a single physical path.",
      errorSnippet: `$ git checkout feature-billing
error: Your local changes to 'config.ts' would be overwritten by checkout.`,
      internals: "Git 2.5 introduced worktrees, and Git 2.23 split `git checkout` into `git switch` (for branches) and `git restore` (for files). Worktrees elevate this by allowing N concurrent active checkouts.",
    },
    commands: [
      {
        label: "Classic checkout (mutates directory)",
        code: "git checkout feature-billing",
        explanation: "Replaces files in the current folder.",
      },
      {
        label: "Modern worktree (adds parallel directory)",
        code: "git worktree add ../feature-billing feature-billing",
        explanation: "Spawns a parallel folder without altering current directory.",
      },
    ],
    steps: [
      {
        title: "Understand the workflow shift",
        description: "Instead of replacing your files in place, add a sibling worktree whenever you need to work on another branch.",
      },
      {
        title: "Adopt worktrees for multi-tasking",
        command: "git worktree add ../wt-task task-branch",
        description: "Parallelize your development.",
      },
    ],
    comparisonTable: {
      headers: ["Capability", "git checkout", "git worktree add"],
      rows: [
        ["Active Checkouts", "1 at a time", "Unlimited parallel checkouts"],
        ["Filesystem Impact", "Overwrites current folder", "Creates clean sibling folder"],
        ["Uncommitted Work", "Blocks or requires stashing", "Untouched in original folder"],
      ],
    },
    edgeCases: [
      {
        title: "Checking out a specific file from another branch",
        description: "For copying a single file from another branch, `git checkout <branch> -- <file>` or `git restore --source=<branch> <file>` is still useful.",
      },
    ],
    pitfalls: [
      {
        mistake: "Using `git checkout -f` when branch switching is blocked",
        consequence: "Permanently deletes uncommitted work.",
        solution: "Open a worktree instead.",
      },
    ],
    checks: [
      "Current working directory files remain untouched",
      "Secondary worktree is ready for development",
    ],
    proTips: [
      "Think of `git checkout` as single-tab browsing, and Git worktrees as multi-tab browsing.",
    ],
    keyTakeaways: [
      "`git checkout` mutates your directory in place.",
      "`git worktree add` creates a parallel workspace.",
      "Worktrees eliminate the risk of overwriting uncommitted work.",
    ],
    image: "/images/v1.1.0/04-worktree-overview.png",
    imageAlt: "WorktreeWise overview screen showing modern multi-worktree workflow",
  },

  "vs-git-switch": {
    slug: "vs-git-switch",
    title: "Git Worktree vs Git Switch: Clearing Up the Confusion",
    keyword: "git worktree vs git switch",
    tags: ["git-switch", "git-worktree", "cli", "comparisons"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "`git switch` moves the HEAD pointer in your current directory from one branch to another. `git worktree add` creates a second directory so both branches remain checked out at the same time. Use `switch` for quick linear progress; use `worktree` for multitasking.",
    scenario: "A developer wonders: 'Git introduced `git switch` in recent versions. Does that replace Git worktrees?' No—they solve fundamentally different problems.",
    lead: "When Git 2.23 introduced `git switch`, many developers wondered whether it made Git worktrees obsolete. In reality, `git switch` and `git worktree` are complementary tools for different development scenarios.",
    problem: {
      title: "Pointer Switching vs Directory Concurrency",
      description: "`git switch` is an in-place operation. It moves the `HEAD` pointer of your current working directory. `git worktree add` provisions an additional working directory with its own independent `HEAD`.",
      errorSnippet: `$ git switch feature-b
# Your current folder now has feature-b. Feature-a is closed!

$ git worktree add ../feature-b feature-b
# You now have BOTH feature-a AND feature-b open simultaneously!`,
      internals: "`git switch` updates `.git/HEAD`. `git worktree add` creates a new directory in `.git/worktrees/<name>/` with its own private `HEAD`.",
    },
    commands: [
      {
        label: "git switch (linear, single directory)",
        code: "git switch feature-b",
        explanation: "Changes current directory to feature-b.",
      },
      {
        label: "git worktree (concurrent, parallel directories)",
        code: "git worktree add ../feature-b feature-b",
        explanation: "Opens feature-b in parallel while keeping current directory on feature-a.",
      },
    ],
    steps: [
      {
        title: "When to use `git switch`",
        description: "Use `git switch` when you are completely finished with your current task and want to move your current folder to a new branch.",
      },
      {
        title: "When to use `git worktree`",
        description: "Use `git worktree` when you want to keep your current feature open (with running servers, open IDE tabs, and uncommitted edits) while working on another branch.",
      },
    ],
    comparisonTable: {
      headers: ["Action / Property", "git switch", "git worktree add"],
      rows: [
        ["Directory Count", "Always 1 directory", "N parallel directories"],
        ["Simultaneous Running Servers", "No (only 1 branch active)", "Yes (run servers on different ports)"],
        ["Stashing Required?", "Yes (if uncommitted edits exist)", "No (leave edits untouched)"],
        ["Best Used For", "Linear progression on 1 task", "Multitasking, PR reviews, hotfixes"],
      ],
    },
    edgeCases: [
      {
        title: "Using `git switch` inside a secondary worktree",
        description: "You CAN run `git switch` inside a worktree to change that specific worktree's branch, as long as the branch isn't checked out elsewhere.",
      },
    ],
    pitfalls: [
      {
        mistake: "Switching branches in a worktree currently running an AI agent",
        consequence: "Confuses the agent and causes files to be written to the wrong branch.",
        solution: "Keep worktrees dedicated to specific branches.",
      },
    ],
    checks: [
      "`git switch` updates `HEAD` in current directory",
      "`git worktree add` creates a second directory with its own `HEAD`",
    ],
    proTips: [
      "Think of `git switch` as channel surfing on one TV, and Git worktrees as having multiple TVs on the wall.",
    ],
    keyTakeaways: [
      "`git switch` replaces current directory contents.",
      "`git worktree add` creates an additional directory for parallel work.",
      "Use `switch` for linear tasks, `worktree` for multitasking.",
    ],
    image: "/images/v1.1.0/04-worktree-overview.png",
    imageAlt: "WorktreeWise displaying multiple parallel branch directories",
  },

  "vs-docker": {
    slug: "vs-docker",
    title: "Git Worktree vs Docker: Branch Isolation vs Process Isolation",
    keyword: "git worktree vs docker",
    tags: ["docker", "git-worktree", "devops", "comparisons"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Git Worktrees and Docker solve isolation at different layers of the software stack: Worktrees isolate Git branches and source files on disk, while Docker isolates operating system processes, runtimes, and network ports. Use them together for the ultimate development environment.",
    scenario: "A developer asks: 'If I use Docker to containerize my app, do I still need Git worktrees?' Yes! Docker handles the runtime, while worktrees handle your source code and branch multitasking.",
    lead: "Developers frequently compare Git worktrees and Docker because both tools provide 'isolation'. However, they operate at fundamentally different layers of your development environment.",
    problem: {
      title: "Filesystem Isolation vs Process Virtualization",
      description: "Docker provides Linux container virtualization (namespaces, cgroups, network stacks). Git worktrees provide Git branch and filesystem directory separation.",
      errorSnippet: `Docker alone: Runs on branch main. To test branch feature, you must stash and rebuild container.
Worktree + Docker: Worktree A runs Container A; Worktree B runs Container B in parallel!`,
      internals: "Worktrees live in your host OS filesystem. Docker bind-mounts those worktree directories into container runtimes.",
    },
    commands: [
      {
        label: "Combine Worktree + Docker",
        code: "git worktree add ../wt-feature feature-branch\ncd ../wt-feature\nCOMPOSE_PROJECT_NAME=wt-feature docker compose up -d",
        explanation: "Launches a dedicated Docker stack pointing to the worktree directory.",
      },
    ],
    steps: [
      {
        title: "Layer 1: Git Worktree",
        description: "Isolates the branch, source files, and Git commit history.",
      },
      {
        title: "Layer 2: Docker Container",
        description: "Isolates Node/Python runtimes, PostgreSQL, and Redis processes.",
      },
      {
        title: "Combine via bind mount",
        description: "Mount the worktree folder into the container to get live reload with full process isolation.",
      },
    ],
    comparisonTable: {
      headers: ["Dimension", "Git Worktree", "Docker Container"],
      rows: [
        ["Layer of Isolation", "Git branches & source code", "OS processes, kernel, & network"],
        ["Startup Time", "< 1 second", "Seconds to minutes"],
        ["Resource Overhead", "Zero CPU/RAM overhead", "Memory and CPU for container runtime"],
        ["Disk Overhead", "Only working tree files", "Docker image layers + container volumes"],
      ],
    },
    edgeCases: [
      {
        title: "File watching performance in Docker on macOS/Windows",
        description: "When bind-mounting worktree directories into Docker on macOS, use VirtioFS for optimal file watching performance.",
      },
    ],
    pitfalls: [
      {
        mistake: "Using Docker containers as a substitute for Git branches",
        consequence: "High CPU/RAM overhead without native Git ref management.",
        solution: "Use worktrees for branches and Docker for dependencies.",
      },
    ],
    checks: [
      "Worktrees manage Git source files",
      "Docker manages system runtimes and external databases",
    ],
    proTips: [
      "WorktreeWise can automatically launch Docker Compose stacks whenever a new worktree is created.",
    ],
    keyTakeaways: [
      "Worktrees isolate code; Docker isolates runtime processes.",
      "They are complementary, not competing technologies.",
      "Combine worktrees and Docker for full-stack parallel development.",
    ],
    image: "/images/v1.1.0/12-create-worktree-environment-isolation.png",
    imageAlt: "WorktreeWise interface configuring Docker container integration with Git worktrees",
  },

  "vs-dev-containers": {
    slug: "vs-dev-containers",
    title: "Git Worktrees vs VS Code Dev Containers",
    keyword: "git worktree vs dev container",
    tags: ["dev-containers", "vscode", "docker", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "VS Code Dev Containers package development tools into a reproducible Docker environment. Git Worktrees provide instantaneous parallel branch directories. Learn how to run Dev Containers *inside* Git worktrees for the best of both worlds.",
    scenario: "A team standardizes on `.devcontainer` for uniform developer tooling. Developers want to work on multiple features at once without spinning down their running dev containers.",
    lead: "VS Code Dev Containers have revolutionized onboarding by providing reproducible containerized toolchains. Combining Dev Containers with Git worktrees gives you multi-branch parallel development with 100% reproducible environments.",
    problem: {
      title: "The Single-Container Concurrency Limit",
      description: "Opening a Dev Container attaches VS Code to one directory. If you switch branches inside the container, you face the same stashing and rebuilding bottlenecks as a local checkout.",
      errorSnippet: `Dev Container: Rebuilding 14 packages after branch switch...`,
      internals: "By creating a Git worktree first and then opening that worktree in a Dev Container (`Reopen in Container`), you get an independent container instance attached to that specific branch.",
    },
    commands: [
      {
        label: "Create worktree and open in Dev Container",
        code: "git worktree add ../wt-feature feat/branch main\ncode ../wt-feature\n# In VS Code: Press F1 -> 'Dev Containers: Reopen in Container'",
        explanation: "Spawns an independent containerized environment for the worktree.",
      },
    ],
    steps: [
      {
        title: "Create worktree on host machine",
        command: "git worktree add ../wt-feature feat/branch main",
        description: "Use Git worktree on your host OS.",
      },
      {
        title: "Open worktree in VS Code",
        command: "code ../wt-feature",
        description: "Open the worktree folder.",
      },
      {
        title: "Reopen in Dev Container",
        description: "VS Code spins up an isolated container for this specific worktree.",
      },
    ],
    comparisonTable: {
      headers: ["Feature", "Dev Containers", "Git Worktrees"],
      rows: [
        ["Primary Goal", "Toolchain reproducibility", "Branch concurrency"],
        ["Execution Environment", "Inside Docker container", "Host OS filesystem"],
        ["Setup Overhead", "Docker build time (minutes)", "Instantaneous (< 1 second)"],
      ],
    },
    edgeCases: [
      {
        title: "Docker socket sharing",
        description: "If your dev container runs Docker-in-Docker, ensure socket forwarding permissions are configured in `.devcontainer/devcontainer.json`.",
      },
    ],
    pitfalls: [
      {
        mistake: "Creating Git worktrees *inside* the dev container instead of on the host",
        consequence: "Worktree files are stored in Docker overlayFS, slowing down file operations.",
        solution: "Create worktrees on the host OS and mount them into containers.",
      },
    ],
    checks: [
      "Each worktree runs in its own Dev Container instance",
      "Host files synchronize seamlessly into the container",
    ],
    proTips: [
      "WorktreeWise can trigger VS Code Dev Container launches automatically via custom workflows.",
    ],
    keyTakeaways: [
      "Worktrees and Dev Containers are natural allies.",
      "Create worktrees on the host OS, then open in Dev Containers.",
    ],
    image: "/images/v1.1.0/17-worktree-actions-editors.png",
    imageAlt: "WorktreeWise interface launching editors and containers per worktree",
  },

  "vs-codespaces": {
    slug: "vs-codespaces",
    title: "Git Worktrees vs GitHub Codespaces: Local Speed vs Cloud Compute",
    keyword: "git worktree vs codespaces",
    tags: ["codespaces", "cloud-dev", "performance", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "GitHub Codespaces provides cloud-hosted VMs with pay-per-minute billing and network latency. Git Worktrees provide instant, zero-cost, 100% offline parallel environments on your local machine. Understand the operational trade-offs.",
    scenario: "An engineering manager compares spending $15,000/year on GitHub Codespaces compute hours vs adopting Git worktrees locally for parallel branch development.",
    lead: "Remote cloud development environments like GitHub Codespaces and Gitpod offer isolated workspaces in the cloud. However, for everyday parallel feature development and code reviews, local Git worktrees are vastly faster, free, and completely offline-capable.",
    problem: {
      title: "Latency, Cost, and Offline Constraints",
      description: "Codespaces requires high-speed internet, takes 1-3 minutes to boot, and incurs hourly cloud billing costs. Git worktrees create in 0.2 seconds and cost zero dollars.",
      errorSnippet: `GitHub Codespaces: Provisioning VM... (85s) | Cloud cost: $0.36/hour
Git Worktree: Created in 0.2s | Offline | $0.00`,
      internals: "Worktrees leverage your existing CPU, RAM, and NVMe SSD storage without network roundtrips.",
    },
    commands: [
      {
        label: "Create instant local worktree",
        code: "git worktree add ../instant-branch feat/instant main",
        explanation: "Ready in 200 milliseconds, zero network required.",
      },
    ],
    steps: [
      {
        title: "Evaluate your hardware",
        description: "Modern developer laptops (Apple Silicon, Ryzen, Core i7/i9) have ample CPU and RAM to run multiple worktrees locally.",
      },
      {
        title: "Adopt worktrees for daily multitasking",
        description: "Use worktrees for PR reviews, hotfixes, and parallel features.",
      },
      {
        title: "Reserve Codespaces for edge cases",
        description: "Use Codespaces for onboarding interns with low-powered Chromebooks or testing on specialized cloud hardware.",
      },
    ],
    comparisonTable: {
      headers: ["Metric", "Git Worktrees", "GitHub Codespaces"],
      rows: [
        ["Boot Time", "< 0.5 seconds", "60 to 180 seconds"],
        ["Cost", "Free (0$)", "Pay-per-hour compute billing"],
        ["Internet Dependency", "100% Offline capable", "Requires active broadband connection"],
        ["Performance", "Native NVMe speed", "Network latency / remote VM specs"],
        ["Best Use Case", "Daily development & multi-tasking", "Instant onboarding on thin clients"],
      ],
    },
    edgeCases: [
      {
        title: "Using worktrees inside a Codespace",
        description: "You can use Git worktrees *inside* a single Codespace VM to run multiple branches without paying for multiple Codespaces instances!",
      },
    ],
    pitfalls: [
      {
        mistake: "Spinning up 4 Codespaces VMs simultaneously and forgetting to shut them down",
        consequence: "Generates hundreds of dollars in idle cloud compute bills.",
        solution: "Use local worktrees for unlimited free parallel checkouts.",
      },
    ],
    checks: [
      "Local worktrees run with zero network latency",
      "No recurring cloud bills for parallel checkouts",
    ],
    proTips: [
      "Using Git worktrees inside a single cloud VM allows running multiple parallel branches while paying for only one compute instance.",
    ],
    keyTakeaways: [
      "Git worktrees are instant, free, and work completely offline.",
      "Codespaces is valuable for thin clients but expensive for daily multitasking.",
      "Worktrees inside Codespaces save cloud compute costs.",
    ],
    image: "/images/v1.1.0/36-repository-start.png",
    imageAlt: "WorktreeWise interface managing local high-performance Git worktrees",
  },

  "vs-separate-repository": {
    slug: "vs-separate-repository",
    title: "Git Worktrees vs Splitting into Separate Repositories",
    keyword: "git worktree vs separate repository",
    tags: ["architecture", "monorepo", "polyrepo", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Before splitting a shared codebase into multiple independent repositories (polyrepo), consider using Git worktrees. Worktrees provide isolated workspaces while keeping unified commit history, atomic cross-module refactors, and simple dependency sharing.",
    scenario: "A platform team debates splitting frontend and backend into two separate GitHub repositories to allow parallel development. Adopting Git worktrees gives them independent directories while preserving their monorepo advantages.",
    lead: "Engineering teams frequently split projects into multiple repositories to escape the pain of branch switching in a single directory. However, polyrepos introduce dependency hell, version synchronization overhead, and fragmented issue tracking. Git worktrees solve the concurrency problem without breaking the monorepo.",
    problem: {
      title: "The High Cost of Polyrepo Fragmentation",
      description: "Splitting into separate repositories requires publishing private npm packages, updating multiple PRs for a single feature, and coordinating synchronized releases.",
      errorSnippet: `Polyrepo overhead:
- PR #102 in api-repo (merged)
- PR #84 in web-repo (blocked on api-repo npm release v2.4.1)
- PR #19 in types-repo (breaking change)`,
      internals: "Worktrees allow frontend and backend developers to work in dedicated directories while committing to a single unified Git history.",
    },
    commands: [
      {
        label: "Separate checkouts in a monorepo",
        code: "git worktree add ../frontend-work feat/frontend\ngit worktree add ../backend-work feat/backend",
        explanation: "Maintains independent directories on the same shared repository.",
      },
    ],
    steps: [
      {
        title: "Keep unified repository history",
        description: "Maintain atomic commits that touch both frontend and backend.",
      },
      {
        title: "Use worktrees for team isolation",
        description: "Frontend engineers work in `../frontend-wt`, backend engineers in `../backend-wt`.",
      },
      {
        title: "Enjoy unified CI/CD",
        description: "Single PR verifies end-to-end integration.",
      },
    ],
    comparisonTable: {
      headers: ["Feature", "Git Worktrees (Monorepo)", "Separate Repositories (Polyrepo)"],
      rows: [
        ["Cross-Module Refactoring", "Atomic single-commit changes", "Multi-PR coordinated releases"],
        ["Local Parallelism", "Independent worktree directories", "Separate clone folders"],
        ["Dependency Sync", "Instant local imports", "Must publish and bump package versions"],
        ["Tooling Overhead", "Single Git repo to maintain", "Multiple CI pipelines and permissions"],
      ],
    },
    edgeCases: [
      {
        title: "Strict access control boundaries",
        description: "If third-party contractors should only see frontend code and not backend code, separate repositories provide genuine permission isolation.",
      },
    ],
    pitfalls: [
      {
        mistake: "Splitting into polyrepos just to avoid Git merge conflicts",
        consequence: "Trades simple Git conflicts for complex package versioning hell.",
        solution: "Use Git worktrees with code partitioning.",
      },
    ],
    checks: [
      "Atomic commits are preserved across frontend and backend",
      "Developers enjoy independent working directories",
    ],
    proTips: [
      "WorktreeWise's multi-repository and worktree overview lets you manage both monorepo worktrees and polyrepos from a single pane of glass.",
    ],
    keyTakeaways: [
      "Don't split repos just to get separate directories.",
      "Git worktrees provide directory separation without polyrepo versioning hell.",
      "Preserve atomic cross-module refactors.",
    ],
    image: "/images/v1.1.0/04-worktree-overview.png",
    imageAlt: "WorktreeWise interface managing monorepo worktrees with unified history",
  },

  "gui-vs-cli": {
    slug: "gui-vs-cli",
    title: "Git Worktree GUI vs CLI: WorktreeWise vs Raw Terminal Commands",
    keyword: "git worktree gui vs cli",
    tags: ["gui", "cli", "worktreewise", "productivity"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "While raw Git CLI commands (`git worktree add`, `list`, `remove`, `prune`) are scriptable, remembering obscure flags (`--porcelain`, `--lock-reason`, `repair`) and tracking multiple folders manually is mentally exhausting. WorktreeWise combines visual discoverability with underlying Git safety.",
    scenario: "A developer spends 10 minutes debugging a broken worktree path using terminal commands. A teammate using WorktreeWise clicks 'Repair' and fixes the issue in 2 seconds with automatic status validation.",
    lead: "The command line is the heart of Git. But as development setups grow to include multiple parallel worktrees, AI coding agents, and complex environment configs, juggling terminal tabs becomes a major cognitive burden. A purpose-built GUI like WorktreeWise bridges the gap between raw CLI power and visual clarity.",
    problem: {
      title: "The Cognitive Load of Multi-Worktree CLI Management",
      description: "Managing 5 worktrees in CLI requires tracking directory paths, remembering branch mappings, checking uncommitted status across all folders, and running prune commands manually.",
      errorSnippet: `$ git worktree list --porcelain
worktree /Users/dev/repos/main
HEAD 04e3a1f...
branch refs/heads/main

worktree /Users/dev/repos/feat-ui
HEAD 18c42bb...
branch refs/heads/feat-ui
# Which of these folders has uncommitted changes? You have to cd into each one!`,
      internals: "WorktreeWise monitors filesystem changes and Git reflogs in the background, updating live statuses (dirty, clean, locked, prunable) in a unified visual dashboard.",
    },
    commands: [
      {
        label: "Complex CLI audit",
        code: "git worktree list --porcelain && for d in $(git worktree list --porcelain | grep 'worktree ' | cut -d' ' -f2); do git -C $d status --short; done",
        explanation: "Bash script required to see status across all worktrees in CLI.",
      },
      {
        label: "The WorktreeWise way",
        code: "# Simply look at the WorktreeWise dashboard: all statuses update in real time!",
        explanation: "Zero commands needed to see cross-worktree status.",
      },
    ],
    steps: [
      {
        title: "Visual overview",
        description: "See all active worktrees, branches, uncommitted files, and active terminals on one screen.",
      },
      {
        title: "One-click creation",
        description: "Create worktrees from HEAD, branches, tags, or commits with automatic folder naming.",
      },
      {
        title: "Automated workflows",
        description: "Run npm install, copy .env files, and launch editors automatically.",
      },
      {
        title: "Visual diff and review",
        description: "Review side-by-side diffs before merging or removing worktrees.",
      },
    ],
    comparisonTable: {
      headers: ["Capability", "WorktreeWise GUI", "Raw Git CLI"],
      rows: [
        ["Worktree Status at a Glance", "Real-time visual badges (dirty, clean, locked)", "Must run `git status` in each folder manually"],
        ["Creation Speed", "1-click with preset hooks & templates", "Type long commands with flags"],
        ["Editor & Terminal Launching", "Integrated multi-terminals & 1-click IDE open", "Manual `cd` and `code <path>`"],
        ["AI Agent Orchestration", "Manage Claude, Codex, Gemini side-by-side", "Manage multiple detached terminal tabs"],
        ["Safe Deletion & Pruning", "Visual uncommitted file preview dialog", "Easy to accidentally lose untracked files"],
      ],
    },
    edgeCases: [
      {
        title: "CI/CD and headless automation",
        description: "For headless servers and CI/CD pipelines, raw Git CLI scripts remain the best choice.",
      },
    ],
    pitfalls: [
      {
        mistake: "Relying on memory to track which branch is checked out in which folder",
        consequence: "Editing files in the wrong worktree by accident.",
        solution: "Use WorktreeWise's clear visual workspace layout.",
      },
    ],
    checks: [
      "All active worktrees and branches are visible in real time",
      "Terminal and IDE instances open with a single click",
    ],
    proTips: [
      "WorktreeWise uses native Git under the hood, so any actions you take in the GUI are 100% compatible with terminal Git commands.",
    ],
    keyTakeaways: [
      "WorktreeWise eliminates the cognitive load of juggling multiple worktree paths.",
      "Combines 1-click convenience with under-the-hood Git safety.",
      "100% compatible with your existing CLI workflows.",
    ],
    image: "/images/v1.1.0/04-worktree-overview.png",
    imageAlt: "WorktreeWise comprehensive visual interface for Git worktree management",
  },
};
