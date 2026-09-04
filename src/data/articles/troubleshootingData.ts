import type { ArticleContent } from "./types";

export const troubleshootingArticles: Record<string, ArticleContent> = {
  "branch-already-checked-out": {
    slug: "branch-already-checked-out",
    title: "How to Fix 'fatal: branch is already checked out' in Git Worktrees",
    keyword: "git worktree branch already checked out",
    tags: ["git", "troubleshooting", "git-internals", "worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Git prevents the same local branch from being checked out simultaneously in multiple working trees to prevent reflog and index corruption. Run `git worktree list --porcelain` to locate the active worktree, then either switch that worktree to another branch, detach its HEAD, or create a new branch pointer.",
    scenario: "Maya is heads-down in a sprint when an urgent production bug report lands. She attempts to spawn a fresh worktree for `hotfix/login-crash`, but Git immediately aborts: `fatal: 'hotfix/login-crash' is already checked out at 'c:/projects/api-hotfix'`. She opened that worktree two days ago and forgot about it.",
    lead: "One of Git's most fundamental safety guarantees is that two working trees cannot point to the same active branch reference at the same time. While this safeguard protects your commits from devastating split-brain index corruption, it frequently catches developers off guard when managing multiple parallel worktrees.",
    problem: {
      title: "Why Git Refuses Multiple Checkouts of the Same Branch",
      description: "When you execute `git checkout <branch>` or `git worktree add <path> <branch>`, Git verifies that no other registered worktree in `.git/worktrees/` holds a lock on that branch reference. If another worktree is currently tracking that branch, Git throws a fatal error.",
      errorSnippet: `$ git worktree add ../hotfix-login hotfix/login-crash
fatal: 'hotfix/login-crash' is already checked out at '/Users/dev/repos/api-secondary'`,
      internals: "Under the hood, each worktree has its own dedicated `HEAD` file located inside `.git/worktrees/<worktree-name>/HEAD`. When `HEAD` is symbolic (e.g. `ref: refs/heads/hotfix/login-crash`), Git inspects every registered worktree metadata folder during any branch-switching operation. If two independent working trees were allowed to advance the same ref simultaneously, commits made in worktree A would overwrite the uncommitted staging area and reflog history in worktree B.",
    },
    commands: [
      {
        label: "Locate the blocking worktree",
        code: "git worktree list --porcelain",
        explanation: "Inspects all registered worktrees and prints machine-readable paths, HEAD commits, and linked branch names.",
      },
      {
        label: "Option A: Free the branch by switching the other worktree",
        code: "git -C /path/to/other-worktree switch --detach\ngit worktree add ../new-worktree hotfix/login-crash",
        explanation: "Detaches HEAD in the old worktree so the branch reference becomes free to bind elsewhere.",
      },
      {
        label: "Option B: Branch off the existing commit",
        code: "git worktree add -b hotfix/login-crash-v2 ../hotfix-v2 hotfix/login-crash",
        explanation: "Creates a new branch pointing to the exact same commit without violating the single-checkout rule.",
      },
    ],
    steps: [
      {
        title: "Identify which worktree currently owns the branch",
        description: "Run Git's porcelain inspection command to reveal the exact filesystem path where the target branch is currently active.",
        command: "git worktree list",
        output: `/repos/main              04e3a1f [main]
/repos/api-secondary     7b19dc2 [hotfix/login-crash]
/repos/feature-billing   18c42bb [feature/billing]`,
        tip: "Notice `/repos/api-secondary` is holding `[hotfix/login-crash]`.",
      },
      {
        title: "Decide whether to navigate or reassign",
        description: "If you just need to continue working on that branch, you don't need a new worktree—simply switch into the existing directory. If you want to move the branch to your new worktree, detach or switch the old one first.",
        command: "git -C /repos/api-secondary switch main",
        output: "Switched to branch 'main'",
        tip: "Now `hotfix/login-crash` is no longer bound to `/repos/api-secondary`.",
      },
      {
        title: "Create your desired worktree cleanly",
        description: "Now that the branch reference is released, the worktree add command will succeed instantly.",
        command: "git worktree add ../hotfix-login hotfix/login-crash",
        output: `Preparing worktree (checking out 'hotfix/login-crash')
HEAD is now at 7b19dc2 fix: null pointer on login token`,
      },
      {
        title: "Verify the new worktree topology",
        description: "Run `git worktree list` to confirm that the new path is properly linked and the branch is checked out safely.",
        command: "git worktree list",
        output: `/repos/main              04e3a1f [main]
/repos/api-secondary     04e3a1f [main]
/repos/hotfix-login      7b19dc2 [hotfix/login-crash]`,
      },
    ],
    edgeCases: [
      {
        title: "The worktree folder was already deleted from disk",
        description: "If someone deleted the directory without using `git worktree remove`, Git still remembers it in `.git/worktrees/`. Run prune to clean up the ghost registration.",
        command: "git worktree prune -v",
      },
      {
        title: "You genuinely need two checkouts of the exact same code",
        description: "Use a detached HEAD in the second worktree. Detached HEADs are anonymous and never trigger branch collision errors.",
        command: "git worktree add --detach ../experiment-dir hotfix/login-crash",
      },
    ],
    pitfalls: [
      {
        mistake: "Manually deleting the directory from your OS file explorer",
        consequence: "Leaves dangling administrative records in `.git/worktrees/`, keeping the branch permanently locked.",
        solution: "Always use `git worktree remove <path>` or run `git worktree prune` after manual file moves.",
      },
      {
        mistake: "Forcing branch checkout with third-party tools",
        consequence: "Corrupts Git's internal index file and leads to silent merge collisions.",
        solution: "Detach the old worktree's HEAD or create a distinct feature branch.",
      },
    ],
    checks: [
      "Running `git worktree list` displays the branch bound to exactly one location",
      "`git status` inside the target worktree reports 'On branch <branch_name>'",
      "No dangling worktrees exist in `git worktree list --porcelain`",
    ],
    proTips: [
      "In WorktreeWise, branch availability is validated dynamically in the UI so you can see which worktree holds a branch before creating collisions.",
      "If you frequently test hotfixes against master, adopt the naming convention `hotfix/<name>-review` for temporary exploratory checkouts.",
    ],
    keyTakeaways: [
      "Git strictly enforces 1 active branch = 1 worktree to prevent commit and staging area collisions.",
      "`git worktree list` shows you which directory owns the branch in seconds.",
      "Detached worktrees (`--detach`) allow read-only or exploratory builds of any branch without locking the branch name.",
    ],
    image: "/images/v1.1.0/08-create-worktree-configured.png",
    imageAlt: "WorktreeWise interface creating and configuring a new Git worktree",
  },

  "cannot-remove-worktree": {
    slug: "cannot-remove-worktree",
    title: "Fixing 'fatal: contains modified or untracked files' on git worktree remove",
    keyword: "git worktree remove not working",
    tags: ["git", "troubleshooting", "cli", "worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Git refuses to remove a worktree containing untracked files, uncommitted edits, or ignored build artifacts to prevent catastrophic data loss. Inspect with `git status --short`, stash or commit your changes, or pass `-f` / `--force` only when you are 100% certain the files are disposable.",
    scenario: "Noah finishes a frontend revamp and triggers `git worktree remove ../feature-ui`. Instead of cleaning up, Git throws: `fatal: '/repos/feature-ui' contains modified or untracked files, use --force to delete it`. Noah isn't sure whether those untracked files are temporary test logs or uncommitted production configs.",
    lead: "When you tell Git to remove a worktree, it does not simply delete a record in a database—it removes the physical directory from your filesystem. To prevent you from accidentally vaporizing hours of uncommitted work, Git performs an aggressive dirty-check before touching anything.",
    problem: {
      title: "Why Git Refuses to Delete the Worktree Directory",
      description: "A worktree is considered 'dirty' if there are staged changes, unstaged modifications, untracked files, or submodules with uncommitted changes. Even a single newly created `.log` or `.env.local` file will trip the safety circuit.",
      errorSnippet: `$ git worktree remove ../feature-ui
fatal: '../feature-ui' contains modified or untracked files, use --force to delete it`,
      internals: "Before deleting a directory, Git inspects the worktree's private index located at `.git/worktrees/<name>/index` against the working tree state using `lstat()` calls. If any inode timestamp or file hash disagrees, or if entries exist that are untracked by the index, the command aborts before performing any filesystem unlink operations.",
    },
    commands: [
      {
        label: "Check what is preventing removal",
        code: "git -C ../feature-ui status --short -uall",
        explanation: "Shows all untracked (`??`) and modified (`M`) files inside the worktree directory.",
      },
      {
        label: "Safe removal after stash",
        code: "git -C ../feature-ui stash -u\ngit worktree remove ../feature-ui",
        explanation: "Stashes all modifications including untracked files into the repository stash before deleting the directory.",
      },
      {
        label: "Forced removal (irreversible)",
        code: "git worktree remove -f ../feature-ui",
        explanation: "Bypasses the dirty check and deletes the worktree and all untracked files immediately.",
      },
    ],
    steps: [
      {
        title: "Inspect untracked and modified files",
        description: "Never blindly append `-f` until you know what files Git is trying to protect. Run status with untracked mode set to all.",
        command: "git -C ../feature-ui status --short -uall",
        output: ` M src/config.ts
?? .env.local
?? test-output.json`,
      },
      {
        title: "Preserve valuable work if needed",
        description: "If `.env.local` or `src/config.ts` contains valuable configuration or edits, commit them to the branch or save them to the global stash with untracked files included.",
        command: "git -C ../feature-ui stash push -u -m 'wip before worktree cleanup'",
        output: "Saved working directory and index state On feature-ui: wip before worktree cleanup",
      },
      {
        title: "Execute the clean removal",
        description: "Now that the working directory is clean, run the remove command from your main repository.",
        command: "git worktree remove ../feature-ui",
        output: "",
        tip: "Notice no error message: the directory is deleted and Git's administrative metadata is retired.",
      },
      {
        title: "Confirm removal from Git's registry",
        description: "Run `git worktree list` to confirm that the entry has been purged from `.git/worktrees/`.",
        command: "git worktree list",
        output: `/repos/main    04e3a1f [main]`,
      },
    ],
    edgeCases: [
      {
        title: "Locked files on Windows (EPERM / EBUSY)",
        description: "On Windows, running language servers (VS Code, IntelliJ, ESLint) or active terminal prompts hold file locks on the folder. Close the editor or terminal before running remove.",
        command: "taskkill /F /IM node.exe",
      },
      {
        title: "Ignored files triggering removal errors",
        description: "In older Git versions, ignored files (like `node_modules`) occasionally blocked removal. Pass `--force` twice (`-f -f`) or delete `node_modules` first.",
        command: "git worktree remove -f ../feature-ui",
      },
    ],
    pitfalls: [
      {
        mistake: "Using `rm -rf` / `rmdir /s /q` instead of `git worktree remove`",
        consequence: "The directory disappears, but Git's metadata in `.git/worktrees/` remains behind, creating a 'ghost' locked branch.",
        solution: "Always use `git worktree remove`. If you already deleted the folder, run `git worktree prune`.",
      },
      {
        mistake: "Forgetting that `-f` permanently deletes untracked files",
        consequence: "Local environment files, private API keys, and unpushed scratch scripts are gone forever.",
        solution: "Always inspect with `status -uall` first.",
      },
    ],
    checks: [
      "The directory `../feature-ui` no longer exists on disk",
      "`git worktree list` does not show the retired path",
      "The branch `feature-ui` still exists in `git branch` (removal only deletes the working directory, not your commits)",
    ],
    proTips: [
      "WorktreeWise shows a preview dialog of all uncommitted and untracked files before confirming worktree deletion, preventing accidental data loss.",
      "Worktree removal does NOT delete the Git branch. You can safely recreate the worktree at any time from the same branch.",
    ],
    keyTakeaways: [
      "Git blocks worktree removal to protect uncommitted code and untracked files.",
      "Use `git -C <path> status -uall` to audit files before choosing between stash or force-delete.",
      "Never delete worktree folders via OS file managers without following up with `git worktree prune`.",
    ],
    image: "/images/v1.1.0/18b-worktree-actions-delete-options.png",
    imageAlt: "WorktreeWise worktree delete options dialog showing safe cleanup choices",
  },

  "not-a-git-repository": {
    slug: "not-a-git-repository",
    title: "Resolving 'fatal: not a git repository' in a Linked Git Worktree",
    keyword: "git worktree not a git repository",
    tags: ["git", "troubleshooting", "gitdir", "worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Linked worktrees contain a special `.git` file (not a folder) that points back to the main repository's `.git/worktrees/<name>` directory. If the main repo or worktree was moved, renamed, or restored from backup, this link breaks. Fix it by editing the `.git` pointer file or running `git worktree repair`.",
    scenario: "An engineer copies their development directory to a new NVMe drive (`D:\\Projects` to `E:\\Projects`). When opening their secondary worktree in terminal and typing `git status`, Git responds: `fatal: not a git repository (or any of the parent directories): .git`.",
    lead: "Unlike the primary checkout which contains a `.git/` folder holding the entire object database and reflog, a secondary Git worktree only contains a single text file named `.git`. If the pointer path inside that text file becomes invalid, Git fails to recognize the entire folder as a repository.",
    problem: {
      title: "How the `.git` Pointer File Breaks",
      description: "When you inspect `.git` in a worktree, you'll see a single line: `gitdir: /path/to/main/.git/worktrees/<id>`. If the main repository is relocated, the worktree folder is renamed, or disk drive letters change on Windows, the stored absolute path points into the void.",
      errorSnippet: `$ cd /projects/feature-billing
$ git status
fatal: not a git repository (or any of the parent directories): .git`,
      internals: "Git worktree links are strictly bidirectional. The worktree contains `.git` pointing to `.git/worktrees/<id>/gitdir`. Inside `.git/worktrees/<id>/`, there is a file named `gitdir` pointing right back to the worktree's `.git` file, plus a `commondir` pointing to the main `.git/` directory. When either path breaks, Git's discovery algorithm (`setup_git_directory_gently`) aborts.",
    },
    commands: [
      {
        label: "Check the contents of the worktree's .git file",
        code: "cat .git",
        explanation: "Reads the pointer line to see what invalid or stale path Git is currently trying to follow.",
      },
      {
        label: "Repair automatically from the main repository",
        code: "git worktree repair /path/to/broken-worktree",
        explanation: "Recomputes and rewrites both sides of the bidirectional pointer link.",
      },
      {
        label: "Manual fix by updating .git file directly",
        code: "echo \"gitdir: /new/path/to/main/.git/worktrees/feature-billing\" > .git",
        explanation: "Directly restores the correct gitdir reference when automated tools cannot locate the main repository.",
      },
    ],
    steps: [
      {
        title: "Verify whether .git is a file or a folder",
        description: "Open the broken worktree directory and inspect the `.git` entry.",
        command: "ls -la .git",
        output: "-rw-r--r-- 1 dev staff 64 Sep 5 10:15 .git",
        tip: "If `.git` is a file with a size of ~60 bytes, it is a valid linked worktree pointer structure.",
      },
      {
        title: "Print the current stale pointer path",
        description: "Inspect where the pointer file thinks the main repository lives.",
        command: "cat .git",
        output: "gitdir: /old/drive/projects/my-repo/.git/worktrees/feature-billing",
        tip: "Notice the path points to `/old/drive/`, which no longer exists.",
      },
      {
        title: "Run git worktree repair from the main repository",
        description: "Navigate to the main repository where the primary `.git/` folder resides, and run repair pointing to the broken worktree directory.",
        command: "git worktree repair /new/drive/projects/my-repo-billing",
        output: "repair worktree: /new/drive/projects/my-repo-billing",
      },
      {
        title: "Confirm git status functions normally again",
        description: "Switch back into the worktree directory and test Git commands.",
        command: "git -C /new/drive/projects/my-repo-billing status",
        output: `On branch feature-billing
Your branch is up to date with 'origin/feature-billing'.
nothing to commit, working tree clean`,
      },
    ],
    edgeCases: [
      {
        title: "Windows drive letter reassignment (C: to D:)",
        description: "On Windows, USB drives or partition resizes change drive letters. Run `git worktree repair` from the new root, or use relative paths if supported.",
        command: "git worktree repair D:\\Projects\\my-worktree",
      },
      {
        title: "Main repository .git/worktrees/ folder was deleted",
        description: "If the administrative folder inside `.git/worktrees/` was accidentally wiped, the worktree cannot be repaired. Commit your changes as a patch, delete the worktree, and create a fresh one.",
        command: "git diff > ../my-changes.patch",
      },
    ],
    pitfalls: [
      {
        mistake: "Running `git init` inside the broken worktree directory",
        consequence: "Creates a nested second repository, overwriting the `.git` pointer and severing the link to the main project history.",
        solution: "Never run `git init` inside an existing worktree. Use `git worktree repair`.",
      },
      {
        mistake: "Copy-pasting worktrees across network drives without repairing",
        consequence: "Network share paths differ between host machines, causing all Git operations to fail for other developers.",
        solution: "Keep worktrees on local fast NVMe storage and repair paths after machine migrations.",
      },
    ],
    checks: [
      "The `.git` file points to an existing directory inside `.git/worktrees/`",
      "`git rev-parse --is-inside-work-tree` returns `true`",
      "`git log -n 1` shows the latest commit correctly",
    ],
    proTips: [
      "Git 2.30+ introduced `git worktree repair`, which automatically resolves both forward and backward pointer breakages in a single command.",
      "WorktreeWise automatically detects broken worktree links on startup and offers a one-click repair dialog.",
    ],
    keyTakeaways: [
      "Linked worktrees use a `.git` text pointer file, not a full `.git/` folder.",
      "Moving folders or changing drive letters invalidates the stored absolute path.",
      "`git worktree repair <path>` is the fastest and safest fix.",
    ],
    image: "/images/v1.1.0/39-repair-worktree.png",
    imageAlt: "WorktreeWise Repair Worktree dialog resolving broken directory links",
  },

  "missing-worktree-directory": {
    slug: "missing-worktree-directory",
    title: "Handling Missing Worktree Directories in Git",
    keyword: "git worktree missing directory",
    tags: ["git", "troubleshooting", "prune", "worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "When a worktree directory is deleted outside Git (via File Explorer, Finder, or `rm -rf`), Git continues to track it as an active checkout. This prevents other checkouts of its branch. Clean up the zombie record using `git worktree prune --dry-run` followed by `git worktree prune`.",
    scenario: "A teammate deletes a temporary worktree folder using macOS Finder. Later, when trying to delete the merged feature branch, Git refuses because it still considers the branch actively checked out in the deleted path.",
    lead: "Git does not continuously monitor your filesystem in the background. If a folder is deleted through your desktop environment or terminal without telling Git, the administrative records inside `.git/worktrees/` remain active. Git considers the worktree alive—just missing from disk.",
    problem: {
      title: "Ghost Worktrees and Branch Locks",
      description: "When you run `git worktree list`, missing folders appear marked as `prunable` or missing. Even though the files are gone, the branch attached to that worktree cannot be deleted, checked out elsewhere, or re-created until Git prunes its record.",
      errorSnippet: `$ git worktree list
/repos/main           04e3a1f [main]
/repos/feature-login  18c42bb [feature-login] (prunable)

$ git branch -d feature-login
error: Cannot delete branch 'feature-login' checked out at '/repos/feature-login'`,
      internals: "Git stores the registered worktree in `.git/worktrees/<name>/`. Because the branch reference in `.git/refs/heads/` is still bound to the worktree's `HEAD`, any command that modifies the branch fails with a safety lock until the administrative folder is pruned.",
    },
    commands: [
      {
        label: "Check for missing and prunable worktrees",
        code: "git worktree list -v",
        explanation: "Shows all registered worktrees and flags missing ones with (prunable).",
      },
      {
        label: "Preview what will be pruned",
        code: "git worktree prune --dry-run --verbose",
        explanation: "Lists the exact metadata folders that will be deleted without touching real data.",
      },
      {
        label: "Clean up missing worktrees",
        code: "git worktree prune -v",
        explanation: "Safely removes administrative records for directories that no longer exist on disk.",
      },
    ],
    steps: [
      {
        title: "List worktrees to find missing entries",
        description: "Run the verbose list command to identify which directory was deleted.",
        command: "git worktree list -v",
        output: `/repos/main           04e3a1f [main]
/repos/feature-login  18c42bb [feature-login] prunable (gitdir points to non-existent location)`,
      },
      {
        title: "Dry run the prune command",
        description: "Always verify what Git plans to prune to avoid accidentally retiring locked or temporarily unmounted drives.",
        command: "git worktree prune --dry-run -v",
        output: "Removing worktrees/feature-login: gitdir points to non-existent location",
      },
      {
        title: "Execute the prune operation",
        description: "Run `git worktree prune` to purge the orphaned administrative metadata.",
        command: "git worktree prune -v",
        output: "Removing worktrees/feature-login",
      },
      {
        title: "Verify the branch is now unlocked",
        description: "Confirm that the branch can now be safely checked out or deleted.",
        command: "git branch -d feature-login",
        output: "Deleted branch feature-login (was 18c42bb).",
      },
    ],
    edgeCases: [
      {
        title: "Worktree directory is on an unmounted external drive",
        description: "If your worktree resides on a flash drive or external SSD that is unplugged, pruning will permanently retire its registration. Lock external worktrees before disconnecting them!",
        command: "git worktree lock --reason 'external drive' /media/ssd/worktree",
      },
    ],
    pitfalls: [
      {
        mistake: "Manually deleting folders inside `.git/worktrees/`",
        consequence: "Risk deleting active metadata, causing corrupted repository states.",
        solution: "Always let `git worktree prune` handle cleanup.",
      },
    ],
    checks: [
      "`git worktree list` displays only existing filesystem paths",
      "The associated branch is released and can be deleted or checked out elsewhere",
    ],
    proTips: [
      "WorktreeWise periodically audits worktree paths and highlights missing directories with an intuitive prune action right in the sidebar.",
    ],
    keyTakeaways: [
      "Deleting a worktree folder manually leaves behind an active Git registration.",
      "`git worktree prune` synchronizes Git's metadata with reality.",
      "Lock worktrees on removable drives to prevent accidental pruning.",
    ],
    image: "/images/v1.1.0/25-prune-worktrees.png",
    imageAlt: "WorktreeWise Prune Worktrees interface showing prunable entries",
  },

  "invalid-worktree-path": {
    slug: "invalid-worktree-path",
    title: "How to Fix Invalid Worktree Path Errors in Git",
    keyword: "git worktree invalid path",
    tags: ["git", "troubleshooting", "paths", "cli"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Invalid worktree path errors occur when directory paths contain unsupported characters, exceed OS path length limitations (MAX_PATH on Windows), or conflict with existing files. Use `git worktree move` or configure `core.longpaths true`.",
    scenario: "On a Windows workstation with deeply nested monorepo folder hierarchies, creating a worktree fails with `fatal: could not create worktree: Invalid path`. The destination path exceeds Windows' 260-character limit.",
    lead: "Path validation in Git is governed by operating system constraints, filesystem capabilities, and Git's internal sanitization rules. Understanding how paths are validated prevents frustrating checkout failures across multi-platform teams.",
    problem: {
      title: "Root Causes of Invalid Worktree Paths",
      description: "Invalid path errors arise from three main causes: exceeding OS path length limits, using illegal filesystem characters (such as `:`, `?`, `*` on Windows), or targeting a directory that already contains non-empty files.",
      errorSnippet: `$ git worktree add ../feature:auth feature/auth
fatal: 'feature:auth' is not a valid path

$ git worktree add C:\\Very\\Deep\\Path...
fatal: could not create worktree: Path too long`,
      internals: "Git checks paths using platform-specific filesystem APIs (`CreateFileW` on Windows, `open()` on POSIX). By default on Windows, paths longer than 260 characters trigger `ERROR_PATH_NOT_FOUND` unless Git's long-path support is explicitly enabled.",
    },
    commands: [
      {
        label: "Enable long path support on Windows",
        code: "git config --system core.longpaths true",
        explanation: "Allows Git to bypass the legacy 260-character MAX_PATH limit on Windows 10/11.",
      },
      {
        label: "Move an existing worktree to a valid short path",
        code: "git worktree move ../bad-path ../wt-auth",
        explanation: "Safely relocates the worktree and updates all Git internal pointers.",
      },
    ],
    steps: [
      {
        title: "Sanitize the target directory name",
        description: "Avoid special characters (`:`, `*`, `?`, `\"`, `<`, `>`, `|`) and spaces in directory names.",
        command: "git worktree add ../wt-auth feature/auth",
        output: "Preparing worktree (checking out 'feature/auth')",
      },
      {
        title: "Relocate deeply nested paths",
        description: "Place your worktree sibling directories close to the root drive (e.g. `C:\\dev\\wt-auth` instead of deep user directories).",
        command: "git worktree add C:/dev/wt-auth feature/auth",
      },
      {
        title: "Repair if the folder was already moved",
        description: "If you renamed a folder manually to fix its name, run repair.",
        command: "git worktree repair C:/dev/wt-auth",
        output: "repair worktree: C:/dev/wt-auth",
      },
    ],
    edgeCases: [
      {
        title: "Case sensitivity differences (macOS/Windows vs Linux)",
        description: "Creating `wt-auth` and `WT-AUTH` works on Linux but collides on default macOS and Windows filesystems.",
        command: "git config core.ignorecase true",
      },
    ],
    pitfalls: [
      {
        mistake: "Creating worktrees inside the primary working tree directory",
        consequence: "The nested worktree appears as an untracked directory in the parent repo, causing nested git status chaos.",
        solution: "Always create worktrees as sibling directories (`../worktree-name`) or in a dedicated parallel folder.",
      },
    ],
    checks: [
      "The path contains only alphanumeric characters, dashes, and underscores",
      "Path length is under 200 characters or `core.longpaths` is enabled",
    ],
    proTips: [
      "Establish a consistent workspace layout such as `~/projects/<repo>-worktrees/<branch>` to keep paths clean and organized.",
    ],
    keyTakeaways: [
      "Keep worktree directories as siblings of the main repository.",
      "Enable `git config core.longpaths true` on Windows machines.",
      "Never nest worktree directories inside another working tree.",
    ],
    image: "/images/v1.1.0/21-worktree-move.png",
    imageAlt: "WorktreeWise Move Worktree interface safely updating directory paths",
  },

  "stale-worktree": {
    slug: "stale-worktree",
    title: "How to Detect and Clean Up Stale Git Worktrees",
    keyword: "stale git worktree",
    tags: ["git", "troubleshooting", "maintenance", "prune"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Stale worktrees are registered checkouts whose folders have been moved, deleted, or left behind by automated CI/CD and AI agent jobs. Audit with `git worktree list --porcelain`, lock active temporary trees, and prune stale records with `git worktree prune`.",
    scenario: "A developer notices their branch list is cluttered with dozens of `agent/task-*` branches that cannot be deleted. Over the past week, automated scripts spawned temporary worktrees but crashed before running the cleanup routine.",
    lead: "In fast-paced development environments—especially when using autonomous AI coding agents, preview test builds, and local CI scripts—worktrees are frequently created dynamically. When those processes fail or exit unexpectedly, stale metadata accumulates.",
    problem: {
      title: "The Problem with Stale Worktrees",
      description: "Stale worktrees consume metadata space in `.git/worktrees/`, keep branch references locked, and cause confusing errors when new tasks attempt to reuse branch or directory names.",
      errorSnippet: `$ git worktree list
/home/dev/main           04e3a1f [main]
/home/dev/agent-run-102  a3f81e2 [agent/task-102] (prunable)
/home/dev/agent-run-103  b19cc41 [agent/task-103] (prunable)`,
      internals: "Git maintains an internal timer for prunable worktrees governed by `gc.worktreePruneExpire` (default is 14 days). Until that expiration window passes or an explicit `git worktree prune` is executed, Git keeps the metadata intact in case the drive is temporarily offline.",
    },
    commands: [
      {
        label: "List all stale and prunable worktrees",
        code: "git worktree list -v",
        explanation: "Prints detailed status including whether the worktree is missing or locked.",
      },
      {
        label: "Force immediate prune of all stale entries",
        code: "git worktree prune --expire=now -v",
        explanation: "Overrides the 14-day grace period and prunes missing worktrees immediately.",
      },
    ],
    steps: [
      {
        title: "Audit existing worktrees",
        description: "Inspect the list of active and stale worktrees across your repository.",
        command: "git worktree list",
        output: `/repos/main              04e3a1f [main]
/repos/temp-run-01       c912e88 [temp-run-01] (prunable)`,
      },
      {
        title: "Clean up with explicit expiration",
        description: "Run prune with `--expire=now` to clean up without waiting for the default 14-day timeout.",
        command: "git worktree prune --expire=now -v",
        output: "Removing worktrees/temp-run-01: gitdir points to non-existent location",
      },
      {
        title: "Delete orphaned branches",
        description: "Now that the worktrees are pruned, delete any leftover temporary branches.",
        command: "git branch -D temp-run-01",
        output: "Deleted branch temp-run-01 (was c912e88).",
      },
    ],
    edgeCases: [
      {
        title: "Locked worktrees will NOT be pruned",
        description: "If a stale worktree was previously locked, prune will intentionally skip it. Unlock it first with `git worktree unlock`.",
        command: "git worktree unlock /path/to/stale-worktree",
      },
    ],
    pitfalls: [
      {
        mistake: "Relying on automatic garbage collection (`git gc`) alone",
        consequence: "Git gc respects the 14-day prune grace period, meaning stale branches stay locked for two full weeks.",
        solution: "Run `git worktree prune --expire=now` during maintenance.",
      },
    ],
    checks: [
      "`git worktree list` contains only active, existing folders",
      "Stale branches can be deleted cleanly without checkout collision errors",
    ],
    proTips: [
      "WorktreeWise includes a Prune Manager that visually flags stale and prunable worktrees with their age, allowing one-click cleanup.",
    ],
    keyTakeaways: [
      "Stale worktrees are registered checkouts whose folders no longer exist on disk.",
      "Use `git worktree prune --expire=now` to force immediate cleanup.",
      "Locked worktrees are protected from pruning until explicitly unlocked.",
    ],
    image: "/images/v1.1.0/25-prune-worktrees.png",
    imageAlt: "WorktreeWise Prune dialog showing stale worktree detection and cleanup",
  },

  "pruneable-worktree": {
    slug: "pruneable-worktree",
    title: "Understanding and Managing Pruneable Worktrees in Git",
    keyword: "git worktree pruneable",
    tags: ["git", "troubleshooting", "prune", "git-internals"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "A worktree is marked 'pruneable' by Git when its filesystem directory cannot be accessed, has been deleted, or its `.git` pointer is missing. Discover how Git decides when an entry is pruneable and how to safely audit before running `git worktree prune`.",
    scenario: "During a routine check of `git worktree list -v`, Lina notices three entries tagged with `prunable`. She needs to know whether pruning them will delete any uncommitted code or if it is completely safe.",
    lead: "The term 'pruneable' sounds ominous to developers who worry about losing work. In reality, Git only marks a worktree as pruneable when the physical directory has ALREADY disappeared from disk. Pruning merely cleans up the empty administrative shell.",
    problem: {
      title: "What Makes a Worktree 'Pruneable'?",
      description: "When Git scans `.git/worktrees/`, it checks whether the path stored in each worktree's `gitdir` file actually exists on your storage drive. If `stat()` returns `ENOENT` (file not found), Git flags the entry as pruneable.",
      errorSnippet: `$ git worktree list -v
/projects/api-main     04e3a1f [main]
/projects/api-feature  18c42bb [feature] prunable (gitdir points to non-existent location)`,
      internals: "Git checks if the entry is locked. If `.git/worktrees/<name>/locked` exists, Git will NEVER prune the worktree, even if the directory is missing. If it is unlocked and missing, it qualifies for pruning once `gc.worktreePruneExpire` has elapsed.",
    },
    commands: [
      {
        label: "Safely audit pruneable entries",
        code: "git worktree prune --dry-run -v",
        explanation: "Simulates the pruning operation and outputs what will be removed.",
      },
      {
        label: "Prune unlocked missing entries",
        code: "git worktree prune -v",
        explanation: "Removes administrative folders for confirmed deleted worktrees.",
      },
    ],
    steps: [
      {
        title: "Check why the worktree is pruneable",
        description: "Inspect the exact path Git is trying to reach.",
        command: "git worktree list --porcelain",
        output: `worktree /projects/api-feature
HEAD 18c42bb5...
branch refs/heads/feature
prunable gitdir points to non-existent location`,
      },
      {
        title: "Verify the directory is genuinely not needed",
        description: "Check if the directory was on a disconnected USB drive or network share. If it was, reconnect the drive. If it was deleted intentionally, proceed to prune.",
        command: "ls /projects/api-feature",
        output: "ls: cannot access '/projects/api-feature': No such file or directory",
      },
      {
        title: "Run prune to clear the record",
        description: "Clean up Git's administrative metadata.",
        command: "git worktree prune -v",
        output: "Removing worktrees/api-feature",
      },
    ],
    edgeCases: [
      {
        title: "Worktree directory exists but permission is denied",
        description: "If permissions prevent Git from reading the directory, Git may misidentify it as missing. Verify folder permissions before pruning.",
      },
    ],
    pitfalls: [
      {
        mistake: "Pruning without verifying external drive mounts",
        consequence: "Worktrees on an unmounted external SSD lose their registration and must be repaired later.",
        solution: "Lock external worktrees with `git worktree lock`.",
      },
    ],
    checks: [
      "Pruning deletes only records inside `.git/worktrees/`, never your Git commits or branches",
      "`git worktree list` is clean and accurate",
    ],
    proTips: [
      "Pruning is completely harmless if you already deleted the folder on purpose. It simply tells Git to catch up with the filesystem.",
    ],
    keyTakeaways: [
      "Pruneable means: 'Git metadata exists, but the folder on disk is already gone'.",
      "Pruning does not delete your branches or commit history.",
      "Use `--dry-run` to preview before pruning.",
    ],
    image: "/images/v1.1.0/25-prune-worktrees.png",
    imageAlt: "WorktreeWise Prune Worktrees window showing pruneable status",
  },

  "moved-worktree": {
    slug: "moved-worktree",
    title: "How to Fix a Git Worktree that was Moved Manually",
    keyword: "moved git worktree",
    tags: ["git", "troubleshooting", "git-repair", "worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Moving a worktree folder using File Explorer, Finder, or `mv` breaks the two-way link between the worktree's `.git` file and `.git/worktrees/<name>/gitdir`. Fix it instantly by running `git worktree repair <new-path>` from your main repository.",
    scenario: "Lina tidies up her workspace by dragging `feature-search` into a new `archive/` subfolder. When she opens the folder in terminal, Git refuses to run commands: `fatal: not a git repository`. In the main repo, `git worktree list` reports the old path as missing.",
    lead: "Git worktrees rely on a strict bidirectional pointer system. The worktree contains a `.git` file storing the absolute path to the main repository, while the main repository stores the absolute path to the worktree directory. If you move a worktree folder with your OS file manager, both paths break.",
    problem: {
      title: "The Broken Two-Way Link",
      description: "When a folder is moved without `git worktree move`, the worktree cannot find the main object store, and the main repo marks the worktree as missing or prunable.",
      errorSnippet: `$ cd /projects/archive/feature-search
$ git status
fatal: not a git repository (or any of the parent directories): .git

$ cd /projects/main
$ git worktree list
/projects/main             04e3a1f [main]
/projects/feature-search   7b19dc2 [feature-search] (prunable)`,
      internals: "Git 2.30 introduced `git worktree repair` specifically to fix this scenario. The repair command reads the worktree's `.git` file, computes the new relative or absolute path, and updates both `.git` and `.git/worktrees/<name>/gitdir` simultaneously.",
    },
    commands: [
      {
        label: "The correct way to move a worktree",
        code: "git worktree move ../old-path ../new-path",
        explanation: "Moves the directory on disk and updates all Git internal metadata pointers atomically.",
      },
      {
        label: "Fix after manual move",
        code: "git worktree repair ../archive/feature-search",
        explanation: "Re-links the moved worktree with the main repository.",
      },
    ],
    steps: [
      {
        title: "Navigate to the main repository",
        description: "Always run the repair command from the primary checkout where the full `.git/` folder exists.",
        command: "cd /projects/main",
      },
      {
        title: "Run git worktree repair pointing to the new location",
        description: "Pass the new path of the moved worktree to repair.",
        command: "git worktree repair /projects/archive/feature-search",
        output: "repair worktree: /projects/archive/feature-search",
      },
      {
        title: "Verify the new worktree path is recognized",
        description: "Run `git worktree list` to confirm that the new path is active and no longer marked prunable.",
        command: "git worktree list",
        output: `/projects/main                     04e3a1f [main]
/projects/archive/feature-search   7b19dc2 [feature-search]`,
      },
      {
        title: "Test Git commands inside the moved directory",
        description: "Confirm that git status and git log work smoothly inside the moved folder.",
        command: "git -C /projects/archive/feature-search status",
        output: `On branch feature-search
nothing to commit, working tree clean`,
      },
    ],
    edgeCases: [
      {
        title: "Both the main repo AND the worktree were moved",
        description: "If you moved the entire parent folder containing both directories, run `git worktree repair` inside the main repo without arguments to re-link all sibling worktrees.",
        command: "git worktree repair",
      },
    ],
    pitfalls: [
      {
        mistake: "Running `git worktree prune` before repairing the moved folder",
        consequence: "Prune deletes the administrative metadata, severing the link permanently.",
        solution: "Always run `git worktree repair` BEFORE running `git worktree prune`.",
      },
    ],
    checks: [
      "`git worktree list` shows the new folder path without `(prunable)` tags",
      "`cat /new-path/.git` points to the valid `.git/worktrees/<id>` path",
    ],
    proTips: [
      "In WorktreeWise, you can simply rename or relocate worktrees through the UI, and all Git pointers are updated automatically without manual terminal repairs.",
    ],
    keyTakeaways: [
      "Manual directory moves break Git's two-way pointer system.",
      "Use `git worktree move` whenever possible.",
      "If you already moved it manually, run `git worktree repair <new-path>` to fix it in one second.",
    ],
    image: "/images/v1.1.0/21-worktree-move.png",
    imageAlt: "WorktreeWise Move Worktree interface updating paths safely",
  },

  "broken-worktree": {
    slug: "broken-worktree",
    title: "How to Repair a Corrupted or Broken Git Worktree",
    keyword: "broken git worktree",
    tags: ["git", "troubleshooting", "repair", "git-fsck"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "A broken worktree occurs when index files are corrupted, gitdir pointers are severed, or commits were interrupted during a crash. Diagnose with `git fsck`, repair pointers with `git worktree repair`, and reset the worktree index safely.",
    scenario: "A workstation crashes during a forced system reboot while a build was running in a secondary worktree. Upon rebooting, opening the worktree yields `error: bad signature 0x00000000` and `fatal: index file corrupt`.",
    lead: "Corrupted worktrees can appear terrifying because terminal commands stop responding. However, because worktrees share the underlying object database with the main repository, your commit history and blobs are almost always safe.",
    problem: {
      title: "Anatomy of Worktree Corruption",
      description: "Worktrees maintain their own private `index`, `HEAD`, and `ORIG_HEAD` files in `.git/worktrees/<name>/`. If power loss occurs while Git is writing to the index, the index file is truncated with null bytes.",
      errorSnippet: `$ git status
fatal: index file corrupt

$ git worktree list
fatal: could not read worktree /projects/feature: Not a directory`,
      internals: "The worktree's index file stores staged file state and inode cache metadata. Since the index is just a staging cache, deleting a corrupted index file and checking it out again from `HEAD` restores 100% of tracked repository state without data loss.",
    },
    commands: [
      {
        label: "Repair worktree pointers",
        code: "git worktree repair",
        explanation: "Fixes severed bidirectional links between all worktrees and the main repository.",
      },
      {
        label: "Rebuild a corrupted worktree index",
        code: "rm .git/worktrees/<name>/index\ngit -C /path/to/worktree reset",
        explanation: "Deletes the corrupt index file and rebuilds it cleanly from the worktree's HEAD commit.",
      },
      {
        label: "Verify repository integrity",
        code: "git fsck --no-dangling",
        explanation: "Performs full consistency check on all Git objects and refs.",
      },
    ],
    steps: [
      {
        title: "Identify which part is broken",
        description: "Determine whether the issue is a pointer failure or a corrupted index file.",
        command: "git -C /projects/broken-wt rev-parse --git-dir",
        output: "/projects/main/.git/worktrees/broken-wt",
        tip: "If this command fails, the pointer is broken. If it succeeds, the index or working tree is corrupted.",
      },
      {
        title: "Repair pointers first",
        description: "Run `git worktree repair` from the main repository.",
        command: "git worktree repair /projects/broken-wt",
        output: "repair worktree: /projects/broken-wt",
      },
      {
        title: "Recover from index corruption if needed",
        description: "If Git reports index file corrupt, delete the worktree's private index file and reset.",
        command: "rm /projects/main/.git/worktrees/broken-wt/index",
      },
      {
        title: "Rebuild index from current HEAD",
        description: "Run `git reset` inside the worktree directory to regenerate a clean index.",
        command: "git -C /projects/broken-wt reset",
        output: "Unstaged changes after reset:\nM\tsrc/index.ts",
      },
      {
        title: "Verify repository health",
        description: "Run `git status` inside the repaired worktree.",
        command: "git -C /projects/broken-wt status",
        output: `On branch feature-work
nothing to commit, working tree clean`,
      },
    ],
    edgeCases: [
      {
        title: "Worktree is locked and preventing operations",
        description: "If a lock file `.git/worktrees/<name>/locked` was left behind after a crash, unlock it with `git worktree unlock`.",
        command: "git worktree unlock /projects/broken-wt",
      },
    ],
    pitfalls: [
      {
        mistake: "Deleting the main `.git` folder in panic",
        consequence: "Destroys all branches, tags, and commits for the entire project.",
        solution: "Only modify files inside `.git/worktrees/<name>/` for that specific worktree.",
      },
    ],
    checks: [
      "`git fsck --no-dangling` reports clean repository state",
      "`git -C <path> status` returns zero errors",
    ],
    proTips: [
      "Because worktrees share the main object database, you can always recreate a broken worktree from scratch in seconds without losing commits.",
    ],
    keyTakeaways: [
      "The worktree index is a rebuildable cache: deleting a corrupted index does not lose committed code.",
      "`git worktree repair` fixes severed pointers.",
      "The shared object database keeps your history safe even when individual worktrees crash.",
    ],
    image: "/images/v1.1.0/39-repair-worktree.png",
    imageAlt: "WorktreeWise Repair Worktree feature diagnosing and fixing broken worktree states",
  },

  "delete-branch-used-by-worktree": {
    slug: "delete-branch-used-by-worktree",
    title: "Cannot Delete Branch Checked Out by a Worktree: How to Fix",
    keyword: "branch used by worktree",
    tags: ["git", "troubleshooting", "branches", "worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Git blocks `git branch -d` or `git branch -D` if the target branch is currently active in any linked worktree. Locate the worktree with `git worktree list`, switch that worktree to a different branch or remove the worktree, and then delete the branch.",
    scenario: "Alex merges a pull request on GitHub and runs branch cleanup locally: `git branch -d feature/billing`. Git aborts: `fatal: Cannot delete branch 'feature/billing' checked out at '/projects/wt-billing'`. Alex forgot that their secondary worktree is still parked on that branch.",
    lead: "In a standard Git clone, you can only have one branch checked out at a time. In a worktree setup, multiple branches are actively checked out across different directories. Git strictly prevents deleting any branch that currently serves as a worktree's `HEAD`.",
    problem: {
      title: "Why Git Protects Checked-Out Branches",
      description: "If Git allowed you to delete a branch currently checked out in a worktree, that worktree would immediately enter an invalid zombie state where its `HEAD` points to a non-existent ref in `refs/heads/`.",
      errorSnippet: `$ git branch -d feature/billing
fatal: Cannot delete branch 'feature/billing' checked out at '/projects/wt-billing'`,
      internals: "When `git branch -d` runs, Git iterates over all entries in `.git/worktrees/` and reads their `HEAD` files. If any `HEAD` contains `ref: refs/heads/<branch>`, the deletion is aborted with `fatal: Cannot delete branch`.",
    },
    commands: [
      {
        label: "Option A: Remove the worktree if finished",
        code: "git worktree remove /projects/wt-billing\ngit branch -d feature/billing",
        explanation: "Deletes the worktree directory and its registration, freeing the branch for immediate deletion.",
      },
      {
        label: "Option B: Switch the worktree to another branch",
        code: "git -C /projects/wt-billing switch main\ngit branch -d feature/billing",
        explanation: "Rebinds the worktree to `main`, releasing the target branch without deleting the directory.",
      },
    ],
    steps: [
      {
        title: "Identify which worktree is using the branch",
        description: "Run `git worktree list` to see all active branch assignments.",
        command: "git worktree list",
        output: `/projects/main        04e3a1f [main]
/projects/wt-billing  7b19dc2 [feature/billing]`,
      },
      {
        title: "Decide: Retire or Reassign the worktree",
        description: "If the feature is complete and merged, remove the worktree entirely.",
        command: "git worktree remove /projects/wt-billing",
        output: "",
      },
      {
        title: "Delete the branch cleanly",
        description: "Now that no worktree is holding the branch, delete it safely.",
        command: "git branch -d feature/billing",
        output: "Deleted branch feature/billing (was 7b19dc2).",
      },
    ],
    edgeCases: [
      {
        title: "The worktree folder was already deleted manually",
        description: "If the folder is gone but Git still blocks deletion, run `git worktree prune` first to clear the ghost checkout.",
        command: "git worktree prune\ngit branch -d feature/billing",
      },
    ],
    pitfalls: [
      {
        mistake: "Trying to force delete with `-D` without freeing the worktree",
        consequence: "`git branch -D` also fails with the exact same error: force flag does not override worktree checkout safety.",
        solution: "You must switch or remove the worktree first.",
      },
    ],
    checks: [
      "`git branch` no longer lists the deleted branch",
      "`git worktree list` confirms no worktree is pointing to the deleted ref",
    ],
    proTips: [
      "In WorktreeWise, deleting a worktree offers an optional checkbox: 'Also delete local branch', completing both steps in a single click.",
    ],
    keyTakeaways: [
      "No branch can be deleted while checked out in any active worktree.",
      "`git branch -D` cannot bypass this protection.",
      "Either remove the worktree or switch it to another branch before deleting.",
    ],
    image: "/images/v1.1.0/18b-worktree-actions-delete-options.png",
    imageAlt: "WorktreeWise interface showing worktree deletion with optional branch cleanup",
  },

  "locked-worktree": {
    slug: "locked-worktree",
    title: "How to Unlock and Remove a Locked Git Worktree",
    keyword: "git worktree locked",
    tags: ["git", "troubleshooting", "locking", "worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "A worktree becomes locked when `git worktree lock` is executed or when an administrative lock file is created in `.git/worktrees/<name>/locked`. Locked worktrees cannot be removed or pruned. Inspect the lock reason with `git worktree list --porcelain` and unlock with `git worktree unlock <path>`.",
    scenario: "A CI maintenance job attempts to clean up old build worktrees, but Git halts: `fatal: '/builds/preview-42' is locked: mounted on network NFS share`. The worktree was locked to prevent accidental pruning during maintenance.",
    lead: "Git worktree locking is an intentional safeguard designed for removable storage, network mounts, and long-running background tasks. When locked, Git refuses to remove, move, or prune the worktree until it is explicitly unlocked.",
    problem: {
      title: "Why Worktrees are Locked",
      description: "When a worktree is placed on an external SSD or network volume that might be unmounted, `git worktree prune` could mistakenly assume the folder is missing and delete its administrative metadata. Locking prevents this.",
      errorSnippet: `$ git worktree remove /builds/preview-42
fatal: '/builds/preview-42' is locked: mounted on network NFS share`,
      internals: "Locking is represented by a simple text file: `.git/worktrees/<name>/locked`. The text inside the file is the reason provided when the lock was created. As long as this file exists, `git worktree remove` and `git worktree prune` treat the worktree as immutable.",
    },
    commands: [
      {
        label: "Inspect lock status and reason",
        code: "git worktree list --porcelain",
        explanation: "Displays `locked <reason>` for any locked worktrees in the repository.",
      },
      {
        label: "Unlock a worktree",
        code: "git worktree unlock /path/to/worktree",
        explanation: "Removes the `.git/worktrees/<name>/locked` file, restoring normal operations.",
      },
      {
        label: "Lock with a custom reason",
        code: "git worktree lock --reason 'reviewing production bug' /path/to/worktree",
        explanation: "Protects a worktree from accidental removal or automatic pruning.",
      },
    ],
    steps: [
      {
        title: "Check why the worktree is locked",
        description: "Run porcelain list to inspect the lock reason.",
        command: "git worktree list --porcelain",
        output: `worktree /builds/preview-42
HEAD 94a11bc...
branch refs/heads/preview-42
locked mounted on network NFS share`,
      },
      {
        title: "Unlock the worktree",
        description: "Run the unlock command to release the administrative lock.",
        command: "git worktree unlock /builds/preview-42",
        output: "",
      },
      {
        title: "Remove the worktree if needed",
        description: "Now that it is unlocked, normal removal works without errors.",
        command: "git worktree remove /builds/preview-42",
        output: "",
      },
    ],
    edgeCases: [
      {
        title: "Lock file left behind after a machine crash",
        description: "If `git worktree unlock` fails due to filesystem errors, you can manually delete the `.git/worktrees/<name>/locked` file.",
        command: "rm .git/worktrees/preview-42/locked",
      },
    ],
    pitfalls: [
      {
        mistake: "Passing `--force` to `git worktree remove` expecting it to bypass locks",
        consequence: "Even `--force` does NOT override an active worktree lock in Git.",
        solution: "You must run `git worktree unlock` first.",
      },
    ],
    checks: [
      "`git worktree list` no longer displays `locked` next to the worktree entry",
      "Removal and pruning execute without lock warnings",
    ],
    proTips: [
      "WorktreeWise displays a clear padlock icon next to locked worktrees and allows toggling locks with a single click.",
    ],
    keyTakeaways: [
      "Locking protects worktrees from accidental deletion and pruning.",
      "`git worktree remove --force` will not delete a locked worktree.",
      "Unlock using `git worktree unlock <path>`.",
    ],
    image: "/images/v1.1.0/41-worktree-locked.png",
    imageAlt: "WorktreeWise interface displaying locked worktree status and reason",
  },

  "worktree-pruned": {
    slug: "worktree-pruned",
    title: "Recovering a Worktree Pruned by Mistake",
    keyword: "git worktree prune removed worktree",
    tags: ["git", "troubleshooting", "recovery", "prune"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "If `git worktree prune` was run while an external drive or network folder was unmounted, Git deletes its metadata. When the drive is plugged back in, Git doesn't recognize it. Re-register the existing directory using `git worktree repair <path>`.",
    scenario: "A developer stores worktrees on a high-speed external Thunderbolt SSD. While the drive was unplugged, a background maintenance script ran `git worktree prune`. Now when plugging the drive back in, Git acts as though the worktree doesn't exist.",
    lead: "Accidental pruning happens when Git's prune command runs while physical storage is temporarily offline. Fortunately, pruning ONLY deletes administrative records in `.git/worktrees/`—it never deletes your actual source files or committed code on disk.",
    problem: {
      title: "What Happens When an Active Worktree is Pruned",
      description: "The directory on disk remains 100% intact, but `.git/worktrees/<id>` in the main repository has been deleted. Inside the worktree, `.git` points to a path that no longer exists.",
      errorSnippet: `$ cd /Volumes/FastSSD/feature-video
$ git status
fatal: not a git repository (or any of the parent directories): .git`,
      internals: "Because the source files and uncommitted changes still exist in the working directory, running `git worktree repair <path>` reconstructs the missing administrative folder inside `.git/worktrees/` and restores full connectivity.",
    },
    commands: [
      {
        label: "Re-register and repair pruned worktree",
        code: "git worktree repair /path/to/existing-worktree",
        explanation: "Reconstructs administrative metadata in the main repo for an existing worktree folder.",
      },
      {
        label: "Lock to prevent future accidental pruning",
        code: "git worktree lock --reason 'removable drive' /path/to/existing-worktree",
        explanation: "Ensures future `git worktree prune` runs will never prune this worktree.",
      },
    ],
    steps: [
      {
        title: "Ensure the storage drive is mounted and readable",
        description: "Navigate to the worktree directory on your external drive.",
        command: "ls -la /Volumes/FastSSD/feature-video",
        output: "drwxr-xr-x  src/\n-rw-r--r--  .git\n-rw-r--r--  package.json",
      },
      {
        title: "Run git worktree repair from the main repository",
        description: "Switch to your primary repository and tell Git to repair the directory.",
        command: "git worktree repair /Volumes/FastSSD/feature-video",
        output: "repair worktree: /Volumes/FastSSD/feature-video",
      },
      {
        title: "Confirm the worktree is restored",
        description: "Verify that `git worktree list` displays the recovered directory and its branch.",
        command: "git worktree list",
        output: `/repos/main                       04e3a1f [main]
/Volumes/FastSSD/feature-video   8d11ca2 [feature-video]`,
      },
      {
        title: "Lock the worktree for safety",
        description: "Add a lock so future prune runs will protect it if the drive is unplugged.",
        command: "git worktree lock --reason 'external drive' /Volumes/FastSSD/feature-video",
      },
    ],
    edgeCases: [
      {
        title: "Older Git versions without `git worktree repair`",
        description: "In Git versions older than 2.30, re-add the worktree using `git worktree add <path> <branch>` directly over the existing directory.",
      },
    ],
    pitfalls: [
      {
        mistake: "Formatting or deleting the folder thinking the code was lost",
        consequence: "Irreversible data loss of all uncommitted work.",
        solution: "Your files on disk are completely intact—only Git's metadata was pruned.",
      },
    ],
    checks: [
      "`git status` inside the pruned folder runs cleanly without errors",
      "All uncommitted edits and untracked files are preserved",
    ],
    proTips: [
      "Always lock worktrees located on external USB drives, NAS shares, or WSL mounted disks.",
    ],
    keyTakeaways: [
      "`git worktree prune` never touches your actual working tree files.",
      "`git worktree repair <path>` restores pruned registrations in seconds.",
      "Lock external worktrees to make them immune to prune scripts.",
    ],
    image: "/images/v1.1.0/39-repair-worktree.png",
    imageAlt: "WorktreeWise Repair Worktree interface recovering pruned registrations",
  },

  "detached-head": {
    slug: "detached-head",
    title: "How to Fix Detached HEAD in a Git Worktree",
    keyword: "git worktree detached head",
    tags: ["git", "troubleshooting", "detached-head", "branches"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "When a worktree is created from a tag, commit SHA, or remote branch without `-b`, it enters 'detached HEAD' state. Any commits made here are not bound to a branch and will be lost on cleanup. Fix this by creating a branch pointer immediately with `git switch -c <new-branch>`.",
    scenario: "Sam creates a worktree to test release tag `v1.4.0`. While testing, he writes two critical bugfixes and commits them. Only later does he notice the warning: `You are in 'detached HEAD' state. Commits made here do not belong to any branch`.",
    lead: "Detached HEAD is one of the most common surprises in Git worktrees. When you create a worktree from a tag or commit hash instead of a local branch, Git checks out the exact commit directly. While useful for read-only inspection, committing in this state risks losing your work during garbage collection.",
    problem: {
      title: "The Danger of Detached HEAD",
      description: "When `HEAD` is detached, commits are not referenced by any branch pointer in `refs/heads/`. If you delete the worktree or switch commits, the new commits become orphaned and will eventually be permanently deleted by `git prune` and `git gc`.",
      errorSnippet: `$ git -C ../test-wt status
HEAD detached at v1.4.0
nothing to commit, working tree clean`,
      internals: "In a normal branch checkout, `.git/worktrees/<name>/HEAD` contains `ref: refs/heads/<branch>`. In a detached worktree, `HEAD` contains a raw 40-character commit SHA directly. Any new commit updates `HEAD` to the new SHA, but no ref in `refs/heads/` is updated.",
    },
    commands: [
      {
        label: "Attach commits to a new branch immediately",
        code: "git switch -c fix/release-bugfix",
        explanation: "Creates a new branch pointing to your current detached commit and attaches HEAD to it.",
      },
      {
        label: "Check current commit SHA",
        code: "git rev-parse HEAD",
        explanation: "Prints the exact commit hash so you have a safety record before switching.",
      },
    ],
    steps: [
      {
        title: "Check your current detached commits",
        description: "Inspect the commit log in the worktree to verify what commits were created while detached.",
        command: "git log --oneline -n 3",
        output: `a93b41c (HEAD) fix: correct calculation on billing vat
412e8b0 fix: handle empty response payload
e104a99 (tag: v1.4.0) release version 1.4.0`,
      },
      {
        title: "Create and switch to a new branch",
        description: "Turn the detached state into a proper named branch instantly.",
        command: "git switch -c fix/release-bugfix",
        output: "Switched to a new branch 'fix/release-bugfix'",
      },
      {
        title: "Verify the worktree is now bound to the branch",
        description: "Run status to confirm HEAD is now tracking your new branch.",
        command: "git status",
        output: `On branch fix/release-bugfix
nothing to commit, working tree clean`,
      },
    ],
    edgeCases: [
      {
        title: "You already switched away and lost the commit SHA",
        description: "Use `git reflog` inside the worktree or main repo to recover the orphaned commit SHA.",
        command: "git reflog -n 5\ngit branch recover-work <sha>",
      },
    ],
    pitfalls: [
      {
        mistake: "Removing the worktree before creating a branch",
        consequence: "The commits become unreferenced dangling objects eligible for garbage collection.",
        solution: "Always run `git switch -c <name>` before deleting a detached worktree.",
      },
    ],
    checks: [
      "`git status` reports 'On branch <branch_name>'",
      "`git worktree list` displays `[branch-name]` instead of `(detached HEAD)`",
    ],
    proTips: [
      "In WorktreeWise, when creating a worktree from a tag or commit, the UI automatically prompts you to create a new branch or explicitly check out as detached.",
    ],
    keyTakeaways: [
      "Detached HEAD means your commits are not anchored by any named branch.",
      "`git switch -c <new-branch>` saves detached commits in one step.",
      "Use `git reflog` if you accidentally navigated away before saving.",
    ],
    image: "/images/v1.1.0/15-create-worktree-from-tag.png",
    imageAlt: "WorktreeWise interface creating a worktree from a release tag with branch options",
  },

  "corrupted-metadata": {
    slug: "corrupted-metadata",
    title: "How to Repair Corrupted Git Worktree Metadata",
    keyword: "git worktree corrupted",
    tags: ["git", "troubleshooting", "git-internals", "recovery"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Corrupted worktree metadata occurs when files inside `.git/worktrees/` are modified, partially restored from conflicting backups, or damaged by disk errors. Inspect individual metadata folders, fix `gitdir` and `commondir` pointers, or run `git worktree repair`.",
    scenario: "After an incomplete Dropbox sync or partial backup restore, `.git/worktrees/` contains duplicate directories and corrupted HEAD files. Running any `git worktree` command outputs `fatal: corrupted worktree administrative files`.",
    lead: "Git stores the administrative state of each linked worktree inside `.git/worktrees/<name>/`. This folder contains lightweight text files that Git reads during every operation. Understanding how these files interact enables you to repair even severe corruption in minutes.",
    problem: {
      title: "The Structure of `.git/worktrees/<name>/`",
      description: "Inside each worktree record, Git maintains five critical files: `gitdir` (pointer to the worktree's `.git`), `commondir` (pointer to main `.git`), `HEAD` (active ref), `index` (staged cache), and optional `locked`.",
      errorSnippet: `$ git worktree list
fatal: could not read '/projects/main/.git/worktrees/feat-api/gitdir': No such file or directory`,
      internals: "If `gitdir` or `commondir` is missing or corrupted, Git cannot map the worktree to the main object database. Running `git worktree repair` scans all registered paths and recreates missing pointer files.",
    },
    commands: [
      {
        label: "Repair all worktree registrations",
        code: "git worktree repair",
        explanation: "Audits and rebuilds corrupted pointer metadata across all worktrees.",
      },
      {
        label: "Inspect metadata folder structure",
        code: "ls -la .git/worktrees/",
        explanation: "Lists all registered worktree administrative folders in the main repository.",
      },
    ],
    steps: [
      {
        title: "Inspect `.git/worktrees/` in your main repository",
        description: "Check which subfolder is corrupted.",
        command: "ls -la .git/worktrees/",
        output: `drwxr-xr-x feat-api/
drwxr-xr-x feat-ui/`,
      },
      {
        title: "Check the contents of the corrupted folder",
        description: "Verify that `commondir` and `gitdir` exist.",
        command: "cat .git/worktrees/feat-api/commondir",
        output: "../..",
      },
      {
        title: "Run automated repair",
        description: "Allow Git to regenerate corrupt pointers.",
        command: "git worktree repair /projects/feat-api",
        output: "repair worktree: /projects/feat-api",
      },
      {
        title: "Remove unrecoverable ghost folders",
        description: "If an entry in `.git/worktrees/` has no matching folder on disk and repair cannot resolve it, delete that specific subfolder from `.git/worktrees/`.",
        command: "rm -rf .git/worktrees/broken-ghost-entry",
      },
    ],
    edgeCases: [
      {
        title: "Dropbox or cloud drive sync conflicts",
        description: "Cloud sync tools create `gitdir (Conflicted Copy)` files inside `.git`. Delete conflicted duplicate files and exclude `.git/` from sync.",
      },
    ],
    pitfalls: [
      {
        mistake: "Deleting the entire `.git/worktrees/` folder",
        consequence: "Disassociates all active worktrees simultaneously.",
        solution: "Inspect and repair individual subfolders instead of deleting the whole directory.",
      },
    ],
    checks: [
      "`git worktree list --porcelain` executes with exit code 0",
      "All active worktrees appear in the list without fatal errors",
    ],
    proTips: [
      "Never store Git repositories inside cloud-synced folders (Dropbox, Google Drive, OneDrive) without excluding `.git` to prevent file lock contention.",
    ],
    keyTakeaways: [
      "Worktree administrative metadata lives in `.git/worktrees/<name>/`.",
      "`git worktree repair` automates rebuilding damaged pointers.",
      "Cloud sync tools are the #1 cause of corrupted metadata.",
    ],
    image: "/images/v1.1.0/39-repair-worktree.png",
    imageAlt: "WorktreeWise interface diagnosing and repairing worktree metadata",
  },

  "wrong-gitdir-path": {
    slug: "wrong-gitdir-path",
    title: "How to Fix '.git file points to wrong path' in Git Worktrees",
    keyword: "git worktree gitdir wrong path",
    tags: ["git", "troubleshooting", "gitdir", "configuration"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "When cloning, copying, or migrating worktrees to a new machine or OS user account, the `.git` pointer file still contains the old machine's absolute filesystem path. Update the path manually or run `git worktree repair` from the main repository.",
    scenario: "A developer migrates from an Intel Mac (`/Users/john/repo`) to Apple Silicon (`/Users/john.smith/repo`). When opening their secondary worktree, Git fails because the `.git` file points to `/Users/john/repo/.git/worktrees/feat`.",
    lead: "By default, Git writes absolute filesystem paths into the worktree's `.git` file and into `.git/worktrees/<name>/gitdir`. When usernames, host machines, or drive letters change, these hardcoded paths break immediately.",
    problem: {
      title: "Hardcoded Absolute Paths in Worktree Pointers",
      description: "Opening `.git` in a secondary worktree reveals a single line containing an absolute path. When that path is no longer valid, every Git command fails with `fatal: not a git repository`.",
      errorSnippet: `$ cat /projects/feature-ui/.git
gitdir: /Users/old-user/projects/main/.git/worktrees/feature-ui

$ git -C /projects/feature-ui status
fatal: not a git repository (or any of the parent directories): .git`,
      internals: "Git 2.32+ supports relative paths in worktrees under certain conditions, but absolute paths remain the standard default. If the path in `.git` does not resolve to an actual directory containing `commondir`, Git aborts repository discovery.",
    },
    commands: [
      {
        label: "Repair automatically from main repo",
        code: "git worktree repair /path/to/worktree",
        explanation: "Rewrites the pointer path using the current active location.",
      },
      {
        label: "Direct edit of the .git file",
        code: "echo \"gitdir: $(git rev-parse --git-common-dir)/worktrees/<name>\" > .git",
        explanation: "Overwrites the stale path with the correct active path.",
      },
    ],
    steps: [
      {
        title: "Inspect the current invalid gitdir path",
        description: "Read the `.git` file inside the broken worktree directory.",
        command: "cat /projects/feature-ui/.git",
        output: "gitdir: /Users/old-user/projects/main/.git/worktrees/feature-ui",
      },
      {
        title: "Locate the actual metadata folder in the main repository",
        description: "Check where the real administrative folder is located.",
        command: "ls /Users/new-user/projects/main/.git/worktrees/feature-ui",
        output: "HEAD  commondir  gitdir  index",
      },
      {
        title: "Run git worktree repair",
        description: "Execute repair from the main repository to update both paths.",
        command: "git -C /Users/new-user/projects/main worktree repair /projects/feature-ui",
        output: "repair worktree: /projects/feature-ui",
      },
      {
        title: "Confirm the pointer was updated",
        description: "Verify that `.git` now contains the correct path.",
        command: "cat /projects/feature-ui/.git",
        output: "gitdir: /Users/new-user/projects/main/.git/worktrees/feature-ui",
      },
    ],
    edgeCases: [
      {
        title: "Cross-platform path format (Windows backslashes vs Unix slashes)",
        description: "When using WSL or Git Bash on Windows, mixing Windows paths (`C:\\...`) with Unix paths (`/c/...`) can cause lookup failures. Use consistent path syntax.",
      },
    ],
    pitfalls: [
      {
        mistake: "Copying worktrees between developer machines over Git or zip archives",
        consequence: "Worktree pointers contain machine-specific paths that never match another computer.",
        solution: "Only push branches to remote; create fresh worktrees on the new machine.",
      },
    ],
    checks: [
      "`cat .git` points to a path that actually exists on disk",
      "`git rev-parse --show-toplevel` reports the current worktree folder",
    ],
    proTips: [
      "WorktreeWise automatically normalizes Windows and Unix paths to prevent path separator mismatches.",
    ],
    keyTakeaways: [
      "Linked worktrees store absolute paths inside `.git` by default.",
      "Changing usernames, drive letters, or directories breaks these paths.",
      "`git worktree repair <path>` updates the pointer in one command.",
    ],
    image: "/images/v1.1.0/39-repair-worktree.png",
    imageAlt: "WorktreeWise Repair Worktree tool fixing invalid gitdir paths",
  },
};
