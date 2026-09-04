import type { ArticleContent } from "./types";

export const aiAgentsArticles: Record<string, ArticleContent> = {
  "claude-code-worktrees": {
    slug: "claude-code-worktrees",
    title: "How to Use Claude Code with Git Worktrees for Parallel AI Development",
    keyword: "claude code worktrees",
    tags: ["ai-agents", "claude-code", "git-worktree", "productivity"],
    readTime: "7 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Running Claude Code in your primary checkout leads to uncommitted file clobbering, unexpected branch switches, and staging conflicts. By giving Claude Code its own dedicated worktree on an isolated branch, Claude can execute commands, install dependencies, and generate code without disturbing your active editor.",
    scenario: "Sarah is deep into refactoring a React state machine when a critical dependency audit flags five vulnerabilities. Instead of interrupting her work and stashing changes, she launches Claude Code in a dedicated Git worktree (`../task-claude-deps`) on branch `agent/dep-upgrades`. Claude updates the lockfile and runs tests while Sarah keeps typing uninterrupted in her main IDE window.",
    lead: "Autonomous AI CLI agents like Anthropic's Claude Code have transformed software engineering by reading repositories, running commands, and modifying code independently. However, running Claude Code in the same working tree where you are actively writing code is a recipe for chaos. Git worktrees solve this cleanly by decoupling agent execution into parallel directories.",
    problem: {
      title: "Why AI Agents and Humans Collide in a Single Checkout",
      description: "When Claude Code executes in your primary working tree, it performs filesystem writes, runs test runners, modifies `package-lock.json`, and stages Git changes. If you are editing files simultaneously, both you and the AI fight over the same files, language server processes, and Git staging index.",
      errorSnippet: `$ claude
> Updating dependencies in package.json...
error: Your local changes to 'src/App.tsx' would be overwritten by checkout.
fatal: Unable to create '/repo/.git/index.lock': File exists.`,
      internals: "Git uses an exclusive index lock file (`.git/index.lock`) whenever a staging or commit operation occurs. If an AI agent runs `git add` or `git commit` in the background while your IDE auto-saves or runs a Git plugin, lock contention crashes one or both processes. Worktrees eliminate this because each worktree has its own completely independent `.git/worktrees/<name>/index` file.",
    },
    commands: [
      {
        label: "Create dedicated worktree for Claude Code",
        code: "git worktree add ../task-claude-deps -b agent/claude-deps main",
        explanation: "Spawns a clean working directory and creates an isolated branch off main.",
      },
      {
        label: "Launch Claude Code inside the worktree",
        code: "cd ../task-claude-deps && claude",
        explanation: "Launches the Claude Code interactive session scoped strictly to the new directory.",
      },
      {
        label: "Review Claude's work from your main repository",
        code: "git diff main...agent/claude-deps",
        explanation: "Compares Claude's commits against main without leaving your current workspace.",
      },
    ],
    steps: [
      {
        title: "Create an isolated worktree and branch",
        description: "Always give the agent a descriptive branch name prefix like `agent/` or `ai/`.",
        command: "git worktree add ../claude-auth -b agent/auth-refactor main",
        output: `Preparing worktree (checking out 'agent/auth-refactor')
HEAD is now at 8b49e10 chore: release v1.2.0`,
      },
      {
        title: "Launch Claude Code inside the worktree directory",
        description: "Open your terminal in the worktree folder and start Claude. Claude will only see and modify files in this directory.",
        command: "cd ../claude-auth && claude",
        output: "Claude Code v1.0.0 initialized. Scoped to /projects/claude-auth",
        tip: "Claude has full access to the project history, but zero access to your uncommitted main files.",
      },
      {
        title: "Assign Claude a self-contained objective",
        description: "Prompt Claude to implement the feature and run local verification tests before committing.",
        command: "claude 'Migrate auth tokens to httpOnly cookies and run test suite'",
        output: "Running tests... 42 passed. Committed 2 changes to agent/auth-refactor.",
      },
      {
        title: "Inspect and test in parallel",
        description: "While Claude works, continue your normal development in your primary repository without interference.",
      },
      {
        title: "Merge and cleanup",
        description: "Once satisfied with Claude's commits, merge the branch into main and remove the temporary worktree.",
        command: "git merge agent/auth-refactor\ngit worktree remove ../claude-auth\ngit branch -d agent/auth-refactor",
        output: "Updating 8b49e10..3a11b9c\nFast-forward",
      },
    ],
    edgeCases: [
      {
        title: "Claude Code needs local environment variables (.env)",
        description: "Remember that untracked `.env` files are not copied into new worktrees by default. Copy your `.env` or use a pre-worktree hook.",
        command: "cp .env ../claude-auth/.env",
      },
    ],
    pitfalls: [
      {
        mistake: "Letting Claude Code run on your current active branch",
        consequence: "Claude's commits mix with your uncommitted work, making rebasing and code review painful.",
        solution: "Strictly enforce 1 agent = 1 worktree = 1 isolated branch.",
      },
    ],
    checks: [
      "Claude Code working directory is outside your primary checkout",
      "Git branch for Claude has a clear prefix (`agent/`)",
      "No `.git/index.lock` collisions occur during concurrent development",
    ],
    proTips: [
      "In WorktreeWise, you can configure an AI Agent profile for Claude Code so that creating a worktree automatically launches Claude in an integrated terminal.",
    ],
    keyTakeaways: [
      "Running Claude Code in a separate worktree prevents index lock collisions and file overwrites.",
      "Worktrees allow full parallel multitasking between human engineers and AI agents.",
      "Cleanup is as simple as `git worktree remove` once the AI branch is merged.",
    ],
    image: "/images/v1.1.0/24-multiple-ai-agents.png",
    imageAlt: "WorktreeWise interface managing multiple AI coding agent sessions in parallel worktrees",
  },

  "codex-worktrees": {
    slug: "codex-worktrees",
    title: "Using OpenAI Codex CLI with Git Worktrees for Automated Tasks",
    keyword: "codex git worktrees",
    tags: ["ai-agents", "codex", "git-worktree", "automation"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Run OpenAI Codex automated tasks inside sandboxed Git worktrees to prevent destructive script execution, unreviewed file writes, and dirty tree contamination. Isolate the environment, let Codex run unattended, and review commits safely before merging.",
    scenario: "Priya needs to generate OpenAPI TypeScript schemas for 40 backend endpoints. Running Codex scripts directly in her working directory would overwrite dozens of files while she reviews a production hotfix. She delegates the schema generation to a Codex worktree.",
    lead: "OpenAI Codex scripts and CLI agents excel at high-volume code synthesis, repetitive migrations, and automated documentation generation. Because these tasks frequently touch hundreds of files, isolating Codex inside a dedicated Git worktree is essential for developer sanity.",
    problem: {
      title: "The Danger of Unattended AI Code Generation",
      description: "When Codex generates code across a large codebase, an errant prompt or hallucinatory script can overwrite existing source files, delete configs, or leave half-migrated syntax that breaks your local build.",
      errorSnippet: `$ codex run generate-schemas
Wrote 48 files...
Error: TypeScript compile failed: 12 errors in src/api/generated/
Your working tree has 52 modified files.`,
      internals: "In a dedicated worktree, even a completely disastrous AI script is harmless. Because the worktree is completely isolated on a separate branch, discarding bad AI output takes a single command (`git worktree remove -f`), leaving your real work pristine.",
    },
    commands: [
      {
        label: "Create Codex scratchpad worktree",
        code: "git worktree add ../task-codex-schemas -b agent/codex-schemas main",
        explanation: "Creates an isolated sandbox environment for automated Codex scripts.",
      },
      {
        label: "Run Codex in headless mode",
        code: "cd ../task-codex-schemas && npx codex-cli generate",
        explanation: "Executes generation scripts strictly within the secondary worktree.",
      },
      {
        label: "Discard failed generation instantly",
        code: "git worktree remove -f ../task-codex-schemas\ngit branch -D agent/codex-schemas",
        explanation: "Permanently wipes the failed AI attempt in 2 seconds without risking your repository history.",
      },
    ],
    steps: [
      {
        title: "Initialize the agent worktree",
        command: "git worktree add ../codex-sandbox -b agent/codex-task main",
        description: "Branch off a stable commit so Codex starts from a known clean state.",
      },
      {
        title: "Run your Codex automation",
        command: "cd ../codex-sandbox && codex generate --target ./src/api",
        description: "Let the model write files and run formatters inside the sandbox.",
      },
      {
        title: "Review changes using git diff",
        command: "git -C ../codex-sandbox diff --stat",
        description: "Inspect the summary of modified and created files before accepting them.",
      },
    ],
    edgeCases: [
      {
        title: "Codex generates unwanted untracked temporary files",
        description: "Use `git clean -fd` inside the worktree to reset untracked artifacts before committing.",
        command: "git -C ../codex-sandbox clean -fd",
      },
    ],
    pitfalls: [
      {
        mistake: "Running Codex scripts with `--yes` in your primary checkout",
        consequence: "Overwrites uncommitted work that cannot be undone with `git checkout`.",
        solution: "Always sandbox automated tools inside disposable worktrees.",
      },
    ],
    checks: [
      "Codex changes are confined to the `agent/` branch",
      "Your main editor remains clean and responsive",
    ],
    proTips: [
      "Combine worktrees with Git hooks to automatically run linter checks whenever Codex commits code.",
    ],
    keyTakeaways: [
      "Disposable worktrees turn risky AI scripts into zero-risk sandbox experiments.",
      "Discarding bad AI generation takes 1 second with `git worktree remove -f`.",
      "Never run unattended AI code generation in your primary working tree.",
    ],
    image: "/images/v1.1.0/24-multiple-ai-agents.png",
    imageAlt: "WorktreeWise interface displaying AI agent automation in Git worktrees",
  },

  "cursor-worktrees": {
    slug: "cursor-worktrees",
    title: "How to Run Multiple Cursor Editor Windows with Git Worktrees",
    keyword: "cursor git worktrees",
    tags: ["cursor", "ai-agents", "ide", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Running multiple Cursor windows on the same project using Git worktrees allows you to run Cursor Composer or Agent mode on a secondary feature branch while actively writing code in your primary window—with zero file collisions or indexing conflicts.",
    scenario: "Marco uses Cursor's Agent mode to rebuild a complex search modal. While Cursor is analyzing the codebase and making multi-file edits, Marco needs to continue working on payment webhooks. Opening a second Cursor window on a separate worktree lets both workflows run in parallel.",
    lead: "Cursor is one of the most powerful AI-first code editors available today. Its multi-file Composer and Agent capabilities can inspect and refactor dozens of files simultaneously. By leveraging Git worktrees, you can open multiple independent Cursor windows on different branches of the same repository without any file contention.",
    problem: {
      title: "Why Multiple Cursor Windows Need Separate Worktrees",
      description: "If you open two Cursor windows pointing to the same folder on disk, both windows share the same files and the same Git branch. When Cursor's Agent writes changes in window A, window B immediately reloads the file from disk, clobbering whatever you were actively typing.",
      errorSnippet: `[Cursor Agent] Modifying src/components/SearchModal.tsx...
[Editor] The file 'SearchModal.tsx' on disk is newer than the editor buffer. Overwrite?`,
      internals: "Cursor maintains a local vector index and SQLite database inside `.cursor/` or `~/.config/Cursor/User/workspaceStorage/`. By opening distinct filesystem paths via Git worktrees, Cursor creates separate workspace storage IDs, giving each window its own isolated file watcher, language server daemon, and agent context.",
    },
    commands: [
      {
        label: "Create a worktree for Cursor AI",
        code: "git worktree add ../ui-search-agent -b feat/cursor-search main",
        explanation: "Prepares a separate folder and branch for Cursor Agent mode.",
      },
      {
        label: "Launch Cursor on the new worktree",
        code: "cursor ../ui-search-agent",
        explanation: "Spawns a new independent Cursor window attached to the worktree.",
      },
    ],
    steps: [
      {
        title: "Create the secondary worktree",
        command: "git worktree add ../cursor-task -b feat/ai-task main",
        description: "Set up the destination directory next to your project root.",
      },
      {
        title: "Launch Cursor in the new directory",
        command: "cursor ../cursor-task",
        description: "A completely new Cursor instance opens with its own terminal and workspace state.",
      },
      {
        title: "Engage Cursor Composer or Agent mode",
        description: "Prompt Cursor to perform the heavy refactoring in window #2 while you work peacefully in window #1.",
      },
      {
        title: "Review changes visually in WorktreeWise",
        description: "Open WorktreeWise to view side-by-side diffs of Cursor's work across both active branches.",
      },
    ],
    edgeCases: [
      {
        title: "Configuring per-worktree .cursorrules",
        description: "You can customize `.cursorrules` in each worktree to give different instructions to Cursor for frontend vs backend tasks.",
      },
    ],
    pitfalls: [
      {
        mistake: "Switching branches in Cursor while Agent mode is running",
        consequence: "Agent mode loses context and may write changes to the wrong branch.",
        solution: "Keep each Cursor window pinned to its dedicated worktree branch.",
      },
    ],
    checks: [
      "Each Cursor window displays a distinct branch name in the bottom status bar",
      "Language servers in both windows run independently without port collisions",
    ],
    proTips: [
      "In WorktreeWise Settings -> Editors, configure Cursor as your default editor to open any worktree in Cursor with a single click or keyboard shortcut.",
    ],
    keyTakeaways: [
      "Each Cursor window needs its own filesystem path to avoid buffer collisions.",
      "Worktrees allow Cursor Agent mode to run in the background while you code.",
      "WorktreeWise lets you launch Cursor directly into any worktree instantly.",
    ],
    image: "/images/v1.1.0/17-worktree-actions-editors.png",
    imageAlt: "WorktreeWise interface showing one-click launch of Git worktrees in Cursor editor",
  },

  "gemini-cli-worktrees": {
    slug: "gemini-cli-worktrees",
    title: "Pairing Gemini CLI with Git Worktrees for Fast Experimentation",
    keyword: "gemini cli worktrees",
    tags: ["gemini", "ai-agents", "cli", "git-worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Use Google's Gemini CLI inside isolated Git worktrees to generate test suites, benchmark alternative algorithms, and explore architecture prototypes without risking your primary codebase.",
    scenario: "David wants to test whether switching an internal parsing engine from regex to WebAssembly improves throughput. He spawns a disposable worktree and asks Gemini CLI to generate the WebAssembly module and benchmark suite.",
    lead: "Gemini CLI offers lightning-fast context windows and exceptional code generation capabilities. When experimenting with risky architectural refactors or alternative library implementations, hosting Gemini CLI inside an isolated Git worktree gives you a fearless playground.",
    problem: {
      title: "The Friction of Experimental Branching in Monolithic Repositories",
      description: "Switching back and forth between experimental branches in a single directory invalidates build caches, restarts dev servers, and forces clean installs. Worktrees make experiments truly zero-overhead.",
      errorSnippet: `$ git checkout experiment-wasm
Switched to branch 'experiment-wasm'
[Webpack] Rebuilding 1,420 modules... (45s elapsed)`,
      internals: "With Git worktrees, the experiment directory maintains its own build output and dependencies. Your main dev server remains running on `localhost:3000`, while the Gemini CLI experiment runs on `localhost:3001` in parallel.",
    },
    commands: [
      {
        label: "Create Gemini experiment worktree",
        code: "git worktree add ../exp-gemini -b exp/wasm-parser main",
        explanation: "Creates an isolated sandbox for Gemini CLI.",
      },
      {
        label: "Run Gemini CLI query",
        code: "cd ../exp-gemini && gemini 'Implement WASM parser and add benchmark.js'",
        explanation: "Runs Gemini CLI scoped strictly to the experiment directory.",
      },
    ],
    steps: [
      {
        title: "Create the experiment worktree",
        command: "git worktree add ../gemini-bench -b exp/gemini-bench main",
        description: "Set up the parallel directory.",
      },
      {
        title: "Run Gemini CLI prompts",
        command: "cd ../gemini-bench && gemini-cli 'Refactor db pool connection logic'",
        description: "Let Gemini generate code and run local verification.",
      },
      {
        title: "Decide whether to adopt or discard",
        description: "If the experiment succeeds, merge `exp/gemini-bench`. If it fails, delete the worktree in one command.",
      },
    ],
    edgeCases: [
      {
        title: "Large context ingestion",
        description: "Gemini CLI can ingest your entire codebase easily because worktrees share all repository history instantly.",
      },
    ],
    pitfalls: [
      {
        mistake: "Abandoning failed experiment worktrees without pruning",
        consequence: "Accumulates disk space over time.",
        solution: "Run `git worktree remove` or use WorktreeWise Prune.",
      },
    ],
    checks: [
      "Experimental code never touches production branches until vetted",
      "Benchmark results are reproducible in isolation",
    ],
    proTips: [
      "Use Git worktree hooks in WorktreeWise to automatically copy benchmark datasets whenever an experiment worktree is created.",
    ],
    keyTakeaways: [
      "Gemini CLI + Git worktrees = zero-risk architectural experimentation.",
      "Keep build caches intact across both branches.",
      "Discard failed experiments cleanly without Git branch mess.",
    ],
    image: "/images/v1.1.0/24-multiple-ai-agents.png",
    imageAlt: "WorktreeWise running Gemini CLI and parallel AI agents in Git worktrees",
  },

  "opencode-worktrees": {
    slug: "opencode-worktrees",
    title: "Sandboxing OpenCode Workflows Using Git Worktrees",
    keyword: "opencode git worktrees",
    tags: ["opencode", "ai-agents", "sandboxing", "git-worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "OpenCode autonomous sessions execute shell scripts, run linters, and refactor code. Running OpenCode in a separate Git worktree gives you complete sandbox control, preventing unintended branch changes and dirty tree states.",
    scenario: "An engineering team deploys OpenCode to run automated TypeScript strictness migrations across 200 files. Running this in a dedicated worktree ensures other developers can pull latest changes without being blocked by ongoing codemod runs.",
    lead: "OpenCode enables powerful automated developer workflows. Because OpenCode operates autonomously by executing shell commands and making broad file modifications, isolating it within a Git worktree guarantees that any failures or incomplete passes are contained.",
    problem: {
      title: "Containing Autonomous Agent Side Effects",
      description: "Autonomous agents can execute arbitrary commands (`npm install`, `rm`, `sed`). If an agent acts errantly in your main checkout, reverting the damage can be complex.",
      errorSnippet: `[OpenCode] Executed: rm -rf ./cache && npm run codemod
Error: SyntaxError in 18 files. Branch state: UNCLEAN`,
      internals: "In a dedicated worktree, the entire directory is an ephemeral disposable workspace. You can reset or discard it without any risk to your primary working tree.",
    },
    commands: [
      {
        label: "Create OpenCode sandbox",
        code: "git worktree add ../task-opencode -b agent/opencode-migration main",
        explanation: "Isolates OpenCode execution into a clean directory.",
      },
      {
        label: "Run OpenCode session",
        code: "cd ../task-opencode && opencode --task 'Strict null checks migration'",
        explanation: "Executes the migration within the isolated boundary.",
      },
    ],
    steps: [
      {
        title: "Create worktree",
        command: "git worktree add ../opencode-task -b agent/opencode main",
        description: "Branch off main for the automated task.",
      },
      {
        title: "Run OpenCode",
        command: "cd ../opencode-task && opencode run",
        description: "Let OpenCode run autonomously.",
      },
      {
        title: "Review diff",
        command: "git diff main...agent/opencode",
        description: "Inspect generated changes before accepting.",
      },
    ],
    edgeCases: [
      {
        title: "Submodule updates",
        description: "If the project uses submodules, run `git submodule update --init` inside the new worktree.",
      },
    ],
    pitfalls: [
      {
        mistake: "Running autonomous agents with sudo/admin rights in shared directories",
        consequence: "Can modify system files outside the repository.",
        solution: "Run agents with standard user privileges inside dedicated worktrees.",
      },
    ],
    checks: [
      "OpenCode completes without affecting active working tree",
      "Generated commits are clean and reviewable",
    ],
    proTips: [
      "WorktreeWise shows live terminal output of running agent sessions side by side.",
    ],
    keyTakeaways: [
      "OpenCode sessions should always be sandboxed in dedicated worktrees.",
      "Zero impact on human developers working on the same repo.",
    ],
    image: "/images/v1.1.0/24-multiple-ai-agents.png",
    imageAlt: "WorktreeWise managing OpenCode agent sessions in isolated worktrees",
  },

  "multiple-agents-same-repository": {
    slug: "multiple-agents-same-repository",
    title: "How to Run Multiple AI Coding Agents on the Same Repository",
    keyword: "multiple ai agents same repository",
    tags: ["ai-agents", "multi-agent", "parallelism", "architecture"],
    readTime: "7 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Scale up development velocity by assigning three or more AI agents to different features simultaneously on the same repository. By using Git worktrees, each agent receives its own directory, branch, and runtime port without index lock collisions or merge conflicts.",
    scenario: "A tech lead delegates three parallel tasks: Claude Code handles an API endpoint upgrade, Cursor Agent optimizes CSS rendering, and Gemini CLI writes end-to-end Cypress tests. All three agents run simultaneously in three separate worktrees on the same local repository.",
    lead: "The modern software engineering team is no longer just humans and one AI assistant—it is an ensemble of specialized AI agents working concurrently. However, orchestrating multiple autonomous agents on a single Git repository requires a robust architectural pattern to prevent agent collisions.",
    problem: {
      title: "Why Multiple Agents Collide in a Traditional Setup",
      description: "If two agents attempt to run in the same checkout, Git locks prevent concurrent staging, file edits overwrite each other, and test runners fight over identical port allocations.",
      errorSnippet: `[Agent 1] git commit -m "feat: api v2"
[Agent 2] fatal: Unable to create '/repo/.git/index.lock': File exists.
[Agent 2] Port 3000 is already in use by PID 49102.`,
      internals: "Git worktrees provide the ideal architecture: each agent has a unique directory (`../agent-api`, `../agent-ui`, `../agent-tests`), a dedicated branch (`agent/api`, `agent/ui`, `agent/tests`), and an independent `.git/worktrees/<name>/index` file. They all share the same local object database, meaning zero duplicate disk overhead.",
    },
    commands: [
      {
        label: "Create worktrees for 3 parallel agents",
        code: `git worktree add ../agent-api -b agent/api-v2 main
git worktree add ../agent-ui -b agent/ui-redesign main
git worktree add ../agent-tests -b agent/e2e-tests main`,
        explanation: "Creates 3 independent directories and branches from the latest main commit.",
      },
      {
        label: "Check status of all agent branches",
        code: "git worktree list\ngit branch --list 'agent/*'",
        explanation: "Provides instant visibility into all active agent working directories.",
      },
    ],
    steps: [
      {
        title: "Define distinct agent domains",
        description: "Ensure each agent is assigned a well-scoped task that touches different modules (e.g. backend, frontend, testing) to minimize semantic merge conflicts.",
      },
      {
        title: "Spawn dedicated worktrees for each agent",
        command: "git worktree add ../agent-1 -b agent/task-1 main && git worktree add ../agent-2 -b agent/task-2 main",
        description: "Create the workspaces in parallel.",
      },
      {
        title: "Configure independent runtime ports",
        description: "Set `PORT=3001` for Agent 1 and `PORT=3002` for Agent 2 in their respective `.env` files.",
      },
      {
        title: "Launch agents and monitor progress",
        description: "Run each agent session in its dedicated folder.",
      },
      {
        title: "Sequential review and integration",
        description: "Review and merge each agent branch one by one using standard pull requests or Git merges.",
      },
    ],
    edgeCases: [
      {
        title: "Shared database contention",
        description: "If both agents run database migrations, assign different database names or use SQLite files per worktree.",
      },
    ],
    pitfalls: [
      {
        mistake: "Assigning two agents to edit the exact same function concurrently",
        consequence: "Guaranteed complex merge conflicts during integration.",
        solution: "Decompose tasks along architectural boundaries.",
      },
    ],
    checks: [
      "Every running agent has its own directory and distinct port",
      "All agent branches share a common naming convention (`agent/*`)",
    ],
    proTips: [
      "WorktreeWise's Multi-Terminal and AI Agent management views allow monitoring 4+ running agents on a single screen.",
    ],
    keyTakeaways: [
      "Git worktrees make multi-agent local development practical and collision-free.",
      "Isolate ports, databases, and branches for each agent.",
      "Integrate agent branches sequentially.",
    ],
    image: "/images/v1.1.0/24-multiple-ai-agents.png",
    imageAlt: "WorktreeWise managing multiple parallel AI agent worktrees simultaneously",
  },

  "parallel-coding-agents": {
    slug: "parallel-coding-agents",
    title: "Parallel Coding Agents: Maximizing Throughput with Git Worktrees",
    keyword: "parallel coding agents",
    tags: ["ai-agents", "parallelism", "productivity", "devops"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Parallel coding agents allow you to multiply your engineering output by executing independent tasks concurrently. Discover the optimal directory topology, branch lifecycle, and review strategies for parallel AI agent development.",
    scenario: "A solo founder needs to build an onboarding tour, fix a billing bug, and write documentation before product launch. Instead of tackling them sequentially over 3 days, she launches 3 parallel agents in Git worktrees and completes all 3 in an afternoon.",
    lead: "Sequential development has been the industry standard because human developers cannot easily write code in three branches at the same moment. With AI coding agents, that constraint is gone. The bottleneck is now orchestrating parallel workspaces—and Git worktrees are the foundational primitive.",
    problem: {
      title: "The Concurrency Bottleneck in Git",
      description: "Traditional Git repositories assume one working directory. Forcing multiple agents into one directory creates fatal lockups and dirty tree states.",
      errorSnippet: `fatal: Unable to create '/repo/.git/index.lock': File exists.`,
      internals: "Git worktrees break this bottleneck by providing N independent working trees connected to 1 shared `.git` object store.",
    },
    commands: [
      {
        label: "Create parallel agent topology",
        code: `git worktree add ../feat-onboarding -b feat/onboarding main
git worktree add ../fix-billing -b fix/billing main
git worktree add ../docs-api -b docs/api main`,
        explanation: "Instantly provisions three independent environments.",
      },
    ],
    steps: [
      {
        title: "Plan independent deliverables",
        description: "Break your sprint into modular, orthogonal issues.",
      },
      {
        title: "Spawn worktrees",
        command: "git worktree add ../task-a -b agent/task-a main",
        description: "Create clean workspaces.",
      },
      {
        title: "Execute concurrently",
        description: "Run agent tools in each workspace.",
      },
      {
        title: "Review and merge",
        description: "Merge each completed task back to main.",
      },
    ],
    edgeCases: [
      {
        title: "Disk space optimization",
        description: "Because worktrees share the `.git/objects` folder, 10 worktrees take only the disk space of the checkout files, not 10 full repository copies.",
      },
    ],
    pitfalls: [
      {
        mistake: "Merging without running the full test suite on the integrated branch",
        consequence: "Hidden semantic conflicts between agent outputs.",
        solution: "Always run full CI after merging multiple agent branches.",
      },
    ],
    checks: [
      "All parallel agents report successful test execution",
      "Branches are merged cleanly without conflicts",
    ],
    proTips: [
      "Use WorktreeWise Workflows to automatically trigger `npm install` and test scripts as soon as an agent worktree is created.",
    ],
    keyTakeaways: [
      "Parallel agents transform 1-developer teams into multi-contributor powerhouses.",
      "Worktrees eliminate the filesystem and Git lock bottlenecks of concurrency.",
    ],
    image: "/images/v1.1.0/24-multiple-ai-agents.png",
    imageAlt: "WorktreeWise parallel coding agents workflow interface",
  },

  "one-worktree-per-agent": {
    slug: "one-worktree-per-agent",
    title: "The 'One Worktree Per Agent' Rule: Architectural Best Practices",
    keyword: "one worktree per ai agent",
    tags: ["ai-agents", "architecture", "best-practices", "git-worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Establish the golden rule of AI engineering: 1 Agent = 1 Worktree = 1 Dedicated Branch. This clean architectural separation ensures auditability, prevents file clobbering, and makes discarding bad AI output effortless.",
    scenario: "An enterprise engineering team institutes an AI coding policy. To prevent developers from committing unreviewed agent output directly to master, they standardize on the 'One Worktree Per Agent' pattern across all repositories.",
    lead: "As AI coding agents become permanent fixtures in software engineering, teams need clear operational rules. The 'One Worktree Per Agent' architecture is the simplest, most effective pattern for maintaining clean Git history and bulletproof security boundaries.",
    problem: {
      title: "The Chaos of Ad-Hoc AI Execution",
      description: "When developers run AI agents across random local branches, unreviewed code sneaks into commits, and dirty tree states make troubleshooting impossible.",
      errorSnippet: `Git log:
commit 48a1b2: human edit
commit 91c4d2: AI generated fix (untested)
commit 11b3e4: human edit fixing AI bug`,
      internals: "Isolating each agent in its own worktree ensures that all agent commits are quarantined to an `agent/*` branch until verified by automated tests and human review.",
    },
    commands: [
      {
        label: "Standard worktree creation pattern",
        code: "git worktree add ../agent-<ticket-id> -b agent/<ticket-id> main",
        explanation: "Enforces consistent directory naming and branch tracking.",
      },
    ],
    steps: [
      {
        title: "Standardize naming conventions",
        description: "Use `../agent-<name>` for folders and `agent/<name>` for branches.",
      },
      {
        title: "Provision dedicated workspace",
        command: "git worktree add ../agent-login -b agent/login main",
        description: "Launch the agent strictly within this boundary.",
      },
      {
        title: "Enforce review before merge",
        description: "Never push directly from an agent worktree without verification.",
      },
    ],
    edgeCases: [
      {
        title: "Automated cleanup scripts",
        description: "Set up a daily cron or Git hook that runs `git worktree prune` to clean up merged agent worktrees.",
      },
    ],
    pitfalls: [
      {
        mistake: "Reusing the same agent worktree for multiple unrelated tasks",
        consequence: "Leftover artifacts from task A bleed into task B.",
        solution: "Discard and recreate a fresh worktree for every new objective.",
      },
    ],
    checks: [
      "Every active agent has a 1:1 mapping to an isolated worktree folder",
      "All agent worktrees branch off verified base commits",
    ],
    proTips: [
      "WorktreeWise lets you define templates for new worktrees with pre-configured hooks and shell environments.",
    ],
    keyTakeaways: [
      "1 Agent = 1 Worktree = 1 Branch is the gold standard for AI development.",
      "Quarantines agent changes until reviewed.",
      "Allows instantaneous cleanup without repository pollution.",
    ],
    image: "/images/v1.1.0/08-create-worktree-configured.png",
    imageAlt: "WorktreeWise interface enforcing clean 1:1 worktree creation patterns",
  },

  "worktree-isolation": {
    slug: "worktree-isolation",
    title: "Complete Process and Filesystem Isolation for AI Coding Agents",
    keyword: "ai agent isolation git",
    tags: ["ai-agents", "isolation", "security", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "True AI agent isolation requires more than just Git branches—it requires filesystem separation, process boundaries, port offsets, and untracked environment isolation. Learn how to construct an impenetrable development sandbox.",
    scenario: "An agent executing a heavy build script triggers an out-of-memory error and kills the Node process. Because it was running in an isolated worktree with independent ports and memory limits, the developer's main editor and application server remain unharmed.",
    lead: "Giving an AI agent read/write access to your code requires defense-in-depth. A complete isolation strategy ensures that background agents cannot corrupt your staging index, exhaust shared system ports, or overwrite private `.env` secrets.",
    problem: {
      title: "The Multi-Layered Isolation Problem",
      description: "Isolation must cover four distinct layers: Git state (index/HEAD), filesystem (source files/configs), process execution (Node/Python daemons), and network (ports/databases).",
      errorSnippet: `EADDRINUSE: address already in use :::3000
FATAL: database "app_dev" is locked by process 9812`,
      internals: "Git worktrees provide the filesystem and Git layer isolation natively. Pairing worktrees with port environment variables (`PORT=3001`) and local database schemas completes the sandbox.",
    },
    commands: [
      {
        label: "Create isolated environment",
        code: "git worktree add ../sandboxed-agent -b agent/sandbox main\ncp .env.sandbox ../sandboxed-agent/.env",
        explanation: "Copies safe sandboxed environment configs into the new worktree.",
      },
    ],
    steps: [
      {
        title: "Layer 1: Git Worktree",
        description: "Creates an isolated branch and separate `.git/worktrees/<name>/index` file.",
        command: "git worktree add ../agent-env -b agent/env main",
      },
      {
        title: "Layer 2: Environment Variables",
        description: "Provide dedicated `.env` with sandboxed API keys and custom ports.",
      },
      {
        title: "Layer 3: Process Execution",
        description: "Run the agent in a dedicated shell or terminal window.",
      },
      {
        title: "Layer 4: Verification",
        description: "Confirm no shared state leaks into your main repository.",
      },
    ],
    edgeCases: [
      {
        title: "Shared memory caches (Redis)",
        description: "Use key prefixing or separate Redis DB indices (e.g. `REDIS_DB=2`) for agent worktrees.",
      },
    ],
    pitfalls: [
      {
        mistake: "Sharing live production database credentials in agent `.env` files",
        consequence: "An AI agent could accidentally drop or modify production tables during testing.",
        solution: "Always use local mock or seeded SQLite/PostgreSQL databases.",
      },
    ],
    checks: [
      "Agent runs against mocked or local-only databases",
      "Network ports do not collide with active dev servers",
    ],
    proTips: [
      "WorktreeWise includes an Environment Isolation configuration screen to automate port and env variable mapping per worktree.",
    ],
    keyTakeaways: [
      "Isolate Git state, filesystem, processes, and network ports.",
      "Never give AI agents production credentials.",
      "Worktrees are the core filesystem foundation of the sandbox.",
    ],
    image: "/images/v1.1.0/12-create-worktree-environment-isolation.png",
    imageAlt: "WorktreeWise Environment Isolation configuration for Git worktrees",
  },

  "avoid-agent-merge-conflicts": {
    slug: "avoid-agent-merge-conflicts",
    title: "How to Avoid Merge Conflicts Between Parallel AI Coding Agents",
    keyword: "ai agents merge conflicts",
    tags: ["ai-agents", "git", "merge-conflicts", "architecture"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Prevent painful Git merge conflicts between parallel AI agents by partitioning code along architectural boundaries, rebasing agent branches frequently against main, and using semantic diff reviews.",
    scenario: "Two agents are instructed to improve the app: Agent 1 refactors the backend user model, while Agent 2 refactors auth middleware. Because both agents modified the exact same interface declaration in `types/user.ts`, merging produces a 50-line conflict block.",
    lead: "AI agents code fast—generating hundreds of lines in seconds. When multiple agents touch the same files concurrently, merge conflicts become inevitable unless you implement proactive architectural partitioning.",
    problem: {
      title: "Why AI Merge Conflicts are Harder than Human Conflicts",
      description: "AI agents frequently reorder imports, reformat whitespace, and rewrite helper functions. When two agents format the same file differently, Git flags conflicts across the entire file.",
      errorSnippet: `CONFLICT (content): Merge conflict in src/services/auth.ts
Automatic merge failed; fix conflicts and then commit the result.`,
      internals: "Git's merge algorithm uses 3-way merge (`diff3`). If both branches modify lines from the same base commit, Git cannot automatically choose which modification wins. Minimizing overlapping file edits is the only true prevention.",
    },
    commands: [
      {
        label: "Rebase agent branch onto latest main",
        code: "git -C ../agent-ui rebase main",
        explanation: "Keeps the agent branch updated with recently merged changes.",
      },
      {
        label: "Preview conflicts before merging",
        code: "git merge-tree $(git merge-base main agent/ui) main agent/ui",
        explanation: "Detects conflicts programmatically without touching your active working tree.",
      },
    ],
    steps: [
      {
        title: "Partition agent assignments by directory",
        description: "Assign Agent A strictly to `src/api/` and Agent B strictly to `src/components/`.",
      },
      {
        title: "Rebase frequently",
        description: "Whenever an agent finishes and merges, rebase all remaining active agent worktrees onto the new main commit.",
        command: "git -C ../agent-2 rebase main",
      },
      {
        title: "Use consistent auto-formatting",
        description: "Enforce identical Prettier/Biome formatting rules so agents don't battle over code styles.",
      },
    ],
    edgeCases: [
      {
        title: "Lockfile merge conflicts",
        description: "If both agents install packages, regenerate the lockfile cleanly after merging rather than resolving lockfile diffs manually.",
      },
    ],
    pitfalls: [
      {
        mistake: "Letting an agent branch live for multiple days without updating from main",
        consequence: "Diverges heavily from main, making eventual integration difficult.",
        solution: "Keep agent tasks short (under 2 hours) and integrate immediately.",
      },
    ],
    checks: [
      "Agent tasks touch disjoint sets of files",
      "`git merge-base` shows agents branched from recent commits",
    ],
    proTips: [
      "WorktreeWise's visual diff tool highlights changed files across all active worktrees so you can spot overlapping file edits before they conflict.",
    ],
    keyTakeaways: [
      "Partition agent tasks along clear architectural boundaries.",
      "Enforce universal formatters to prevent styling conflicts.",
      "Keep agent tasks small and rebase frequently.",
    ],
    image: "/images/v1.1.0/03-git-diff.png",
    imageAlt: "WorktreeWise Git diff view identifying cross-branch file modifications",
  },

  "share-changes-between-worktrees": {
    slug: "share-changes-between-worktrees",
    title: "How to Share Commits and Changes Between AI Agent Worktrees",
    keyword: "share changes git worktrees",
    tags: ["git", "ai-agents", "cherry-pick", "worktree"],
    readTime: "5 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Because all worktrees share the same underlying repository object database, you can cherry-pick, rebase, or format patches between worktrees instantly without pushing to a remote server or copying files manually.",
    scenario: "Agent 1 generates a new TypeScript interface in `agent/database` that Agent 2 in `agent/api` desperately needs. Instead of waiting for Agent 1 to finish its entire feature, the developer cherry-picks the single commit directly into Agent 2's worktree.",
    lead: "One of the greatest superpowers of Git worktrees is that they share a unified `.git/objects` database. Any commit made in Worktree A is immediately visible and accessible to Worktree B—zero network traffic or remote pushes required.",
    problem: {
      title: "The Friction of Polyrepo or Multi-Clone Sharing",
      description: "If you used multiple Git clones, sharing a commit would require pushing to GitHub and pulling in the other directory. In worktrees, commits are already local.",
      errorSnippet: `$ git cherry-pick 8a12f4c
[agent/api 3d19e8a] feat: add user interface types
 1 file changed, 25 insertions(+)`,
      internals: "All worktrees point to the primary `.git` directory via `commondir`. When Agent 1 writes commit `8a12f4c`, the commit object and tree blobs are written directly into `.git/objects/`. Agent 2 can immediately reference that hash.",
    },
    commands: [
      {
        label: "Cherry-pick commit from another worktree",
        code: "git -C ../agent-api cherry-pick <commit-sha>",
        explanation: "Applies a specific commit from Agent 1 into Agent 2's working tree.",
      },
      {
        label: "Share uncommitted changes via temporary patch",
        code: "git -C ../agent-1 diff > /tmp/shared.patch\ngit -C ../agent-2 apply /tmp/shared.patch",
        explanation: "Transfers uncommitted working edits between worktrees in milliseconds.",
      },
    ],
    steps: [
      {
        title: "Identify the desired commit SHA",
        command: "git -C ../agent-1 log --oneline -n 3",
        output: "e4a11bc feat: add shared schema types",
        description: "Find the commit you want to transfer.",
      },
      {
        title: "Apply into the receiving worktree",
        command: "git -C ../agent-2 cherry-pick e4a11bc",
        output: "[agent-2 91c4d11] feat: add shared schema types",
        description: "Cherry-pick applies the commit cleanly.",
      },
      {
        title: "Verify the transferred changes",
        command: "git -C ../agent-2 status",
        description: "Confirm the new code is active in the receiving worktree.",
      },
    ],
    edgeCases: [
      {
        title: "Transferring uncommitted staged files",
        description: "Use `git stash` and `git stash apply`—stashes are shared globally across all worktrees!",
        command: "git -C ../agent-1 stash\ngit -C ../agent-2 stash apply",
      },
    ],
    pitfalls: [
      {
        mistake: "Manually copying files between worktree directories",
        consequence: "Loses commit authorship, message, and Git history tracking.",
        solution: "Always use `git cherry-pick` or `git patch`.",
      },
    ],
    checks: [
      "Commit hash is successfully applied in the destination worktree",
      "Tests in the destination worktree continue to pass",
    ],
    proTips: [
      "Because Git stashes are repository-wide, you can `git stash` in Worktree A and immediately `git stash apply` in Worktree B.",
    ],
    keyTakeaways: [
      "All worktrees share the same commit object database.",
      "Cherry-pick works instantly between worktrees without remote pushes.",
      "Global stash allows transferring uncommitted work between worktrees in seconds.",
    ],
    image: "/images/v1.1.0/01-git-log.png",
    imageAlt: "WorktreeWise Git log interface displaying shared commits across all worktree branches",
  },

  "review-ai-code-with-worktrees": {
    slug: "review-ai-code-with-worktrees",
    title: "How to Safely Review and Test AI-Generated Code Using Git Worktrees",
    keyword: "review ai code git worktree",
    tags: ["ai-agents", "code-review", "testing", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Never merge AI code blindly. Use Git worktrees to create an isolated inspection bench where you can run the app, execute test suites, and review visual diffs without altering your primary working tree.",
    scenario: "An autonomous agent submits a pull request refactoring the billing subscription flow. The developer opens the agent's worktree, boots the development server on port 3005, and manually tests credit card checkouts before approving the changes.",
    lead: "Reviewing AI-generated code requires more than a casual glance at a GitHub diff. Because AI models can write plausible-looking code that contains subtle runtime errors or security holes, running and testing the code locally in an isolated worktree is essential.",
    problem: {
      title: "The Friction of Local PR Review",
      description: "In a standard checkout, testing a colleague's or agent's PR requires stashing your work, checking out the branch, running `npm install`, and restarting your dev server. Worktrees make PR reviews instant.",
      errorSnippet: `$ git checkout pr/agent-billing
error: Your local changes to the following files would be overwritten by checkout:
  src/dashboard/Analytics.tsx
Please commit your changes or stash them before you switch branches.`,
      internals: "By having a dedicated `../review` worktree, you simply check out the agent's branch there. Your main worktree stays completely untouched.",
    },
    commands: [
      {
        label: "Check out agent branch for review",
        code: "git worktree add ../review-agent -b review/agent-task origin/agent/task",
        explanation: "Creates a dedicated review worktree directly from the agent's remote branch.",
      },
      {
        label: "Run tests in review worktree",
        code: "cd ../review-agent && npm test",
        explanation: "Validates tests inside the isolated review folder.",
      },
    ],
    steps: [
      {
        title: "Create the review worktree",
        command: "git worktree add ../review-task agent/auth-refactor",
        description: "Check out the branch into a review folder.",
      },
      {
        title: "Inspect visual diffs",
        description: "Open WorktreeWise to view side-by-side colorized diffs of every file modified by the agent.",
      },
      {
        title: "Execute test suite and run the app",
        command: "cd ../review-task && npm test",
        description: "Verify that unit, integration, and type checks pass.",
      },
      {
        title: "Approve and merge",
        command: "git merge agent/auth-refactor",
        description: "Merge into main once verified.",
      },
      {
        title: "Retire review worktree",
        command: "git worktree remove ../review-task",
        description: "Clean up the review directory.",
      },
    ],
    edgeCases: [
      {
        title: "Agent introduced unwanted dependency",
        description: "Inspect `package.json` diff carefully to ensure the AI did not hallucinate an obsolete or insecure npm package.",
      },
    ],
    pitfalls: [
      {
        mistake: "Relying solely on green CI checks without inspecting the diff",
        consequence: "AI agents sometimes delete failing tests to make CI pass.",
        solution: "Always verify that test assertions were not weakened.",
      },
    ],
    checks: [
      "Every modified file has been inspected visually",
      "Test suite passes inside the review worktree",
      "No security-sensitive credentials or keys were committed",
    ],
    proTips: [
      "WorktreeWise's Diff Viewer shows syntax-highlighted side-by-side diffs and allows staging individual lines or files directly.",
    ],
    keyTakeaways: [
      "Use dedicated review worktrees to test AI code locally without stashing main work.",
      "Always verify test assertions haven't been deleted.",
      "Clean up review worktrees with `git worktree remove`.",
    ],
    image: "/images/v1.1.0/03-git-diff.png",
    imageAlt: "WorktreeWise Git diff interface reviewing isolated AI-generated code modifications",
  },

  "parallel-feature-development": {
    slug: "parallel-feature-development",
    title: "Sprint Acceleration: Parallel Feature Development with AI Agents",
    keyword: "parallel ai development",
    tags: ["ai-agents", "agile", "sprint-velocity", "git-worktree"],
    readTime: "6 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Accelerate your sprint velocity by assigning multiple roadmap features to parallel AI agents in Git worktrees. Discover how to plan, monitor, and merge concurrent feature branches efficiently.",
    scenario: "During a 2-week sprint, a product team assigns search filters, export to CSV, and dark mode theming to 3 parallel AI agents. The features are built simultaneously in 3 worktrees, reviewed by developers, and deployed days ahead of schedule.",
    lead: "Parallel feature development has traditionally been limited by developer headcount and communication overhead. By pairing senior developers with multiple parallel AI agents operating in Git worktrees, teams can compress weeks of feature delivery into days.",
    problem: {
      title: "Managing Multiple Concurrent Feature Streams",
      description: "When multiple features develop simultaneously, managing local environments, keeping branches fresh, and preventing merge gridlock becomes the primary operational challenge.",
      errorSnippet: `3 features in flight:
- branch feat/search (3 commits ahead)
- branch feat/export (5 commits ahead)
- branch feat/dark-mode (2 commits ahead)`,
      internals: "WorktreeWise coordinates multiple active worktrees on a single dashboard, showing live Git status, uncommitted changes, and active terminal processes across all branches.",
    },
    commands: [
      {
        label: "Launch parallel feature worktrees",
        code: `git worktree add ../feat-search -b feat/search main
git worktree add ../feat-export -b feat/export main
git worktree add ../feat-darkmode -b feat/dark-mode main`,
        explanation: "Provisions independent directories for each sprint feature.",
      },
    ],
    steps: [
      {
        title: "Sprint decomposition",
        description: "Select features with minimal architectural overlap.",
      },
      {
        title: "Agent provisioning",
        description: "Launch agents in their respective worktrees.",
      },
      {
        title: "Milestone reviews",
        description: "Review progress periodically without switching contexts.",
      },
      {
        title: "Progressive integration",
        description: "Merge completed features sequentially into main.",
      },
    ],
    edgeCases: [
      {
        title: "Shared library updates",
        description: "If one feature updates a core utility, merge that feature first and rebase the remaining worktrees.",
      },
    ],
    pitfalls: [
      {
        mistake: "Starting too many parallel features without adequate review bandwidth",
        consequence: "Creates a bottleneck at the code review stage.",
        solution: "Limit active parallel agent worktrees to 3-4 per developer.",
      },
    ],
    checks: [
      "Each feature branch has an active worktree and clear PR target",
      "Sprint velocity increases without sacrificing code quality",
    ],
    proTips: [
      "WorktreeWise lets you jump between parallel feature environments with a single click or keyboard shortcut.",
    ],
    keyTakeaways: [
      "Parallel AI agents accelerate sprint delivery dramatically.",
      "Worktrees prevent context-switching penalties.",
      "Integrate features progressively as they complete.",
    ],
    image: "/images/v1.1.0/04-worktree-overview.png",
    imageAlt: "WorktreeWise overview screen tracking multiple parallel feature worktrees",
  },

  "worktrees-vs-clones": {
    slug: "worktrees-vs-clones",
    title: "Git Worktrees vs Clones for AI Agents: In-Depth Comparison",
    keyword: "worktrees vs clones ai agents",
    tags: ["comparisons", "ai-agents", "git-worktree", "architecture"],
    readTime: "7 min read",
    updatedDate: "Updated Sep 2026",
    tldr: "Should you use Git worktrees or separate `git clone` directories for AI coding agents? Worktrees share the local object store, create instantly, save gigabytes of disk space, and share stashes and refs. Clones offer total process isolation at the cost of duplicate storage and manual sync.",
    scenario: "An engineering platform team evaluates whether to spin up full repository clones or lightweight Git worktrees for their automated agent fleet. Clones require downloading 4GB of history per agent, whereas worktrees provision in 200 milliseconds.",
    lead: "When building infrastructure for AI coding agents, deciding between Git worktrees and multiple repository clones is a fundamental architectural choice. Both approaches provide separate directories on disk, but their underlying Git mechanics differ radically.",
    problem: {
      title: "Storage and Synchronization Overhead",
      description: "A 2GB repository cloned 5 times consumes 10GB of disk space and requires 5 separate `git fetch` operations. In contrast, 5 worktrees consume only 2.1GB and share all fetched commits instantly.",
      errorSnippet: `$ git clone https://github.com/org/huge-repo agent-5
Cloning into 'agent-5'...
Receiving objects: 100% (452,190/452,190), 2.41 GiB | 18.2 MiB/s, done. (Took 2m 14s)

$ git worktree add ../agent-5 -b agent/task-5 main
Preparing worktree (checking out 'main')
HEAD is now at 8b49e10 chore: release v1.2.0 (Took 0.3s)`,
      internals: "Worktrees share `.git/objects/`, `.git/refs/remotes/`, and `.git/config`. Clones have completely separate object stores and ref databases that must be synchronized over network protocols.",
    },
    commands: [
      {
        label: "Create instant worktree (0.3 seconds)",
        code: "git worktree add ../agent-fast -b agent/fast main",
        explanation: "Reuses local objects immediately.",
      },
      {
        label: "Inspect shared object store size",
        code: "git count-objects -vH",
        explanation: "Verifies that objects are shared and not duplicated.",
      },
    ],
    steps: [
      {
        title: "Measure repository size",
        command: "du -sh .git",
        description: "Check how much disk space a clone would duplicate.",
      },
      {
        title: "Provision via worktree",
        command: "git worktree add ../agent-bench -b agent/bench main",
        description: "Notice near-instant creation time.",
      },
      {
        title: "Compare workflow ergonomics",
        description: "Commits in the worktree are immediately accessible in your main repo without pushing to origin.",
      },
    ],
    comparisonTable: {
      headers: ["Feature / Metric", "Git Worktree", "Separate Git Clone"],
      rows: [
        ["Creation Time", "< 1 second", "Minutes (downloads history)"],
        ["Disk Usage", "Lightweight (shared objects)", "Heavy (duplicates entire history)"],
        ["Object Sharing", "100% shared locally", "Zero (must push/pull over network)"],
        ["Stash Sharing", "Shared globally across worktrees", "Completely isolated per clone"],
        ["Branch Collision Safety", "Guaranteed (cannot double-checkout)", "None (can cause remote push conflicts)"],
        ["Best Use Case", "Local AI agents & parallel features", "Completely untrusted sandboxes or CI"],
      ],
    },
    edgeCases: [
      {
        title: "Fully untrusted third-party AI agents",
        description: "If an AI agent executes arbitrary untrusted binaries, a separate Docker container or clone provides an extra layer of OS-level isolation.",
      },
    ],
    pitfalls: [
      {
        mistake: "Creating 10 full clones of a 5GB monorepo on a 256GB laptop SSD",
        consequence: "Quickly exhausts disk storage and slows down IDE indexing.",
        solution: "Use Git worktrees to share the object database.",
      },
    ],
    checks: [
      "Worktrees provision in sub-second time",
      "Disk storage remains lean across all agent workspaces",
    ],
    proTips: [
      "WorktreeWise is optimized specifically for worktree topologies, giving you visual visibility across all linked workspaces simultaneously.",
    ],
    keyTakeaways: [
      "Git worktrees are 10x faster to create and use 80% less disk space than clones.",
      "Commits and stashes are shared locally across all worktrees.",
      "Worktrees prevent accidental double-checkouts of the same branch.",
    ],
    image: "/images/v1.1.0/36-repository-start.png",
    imageAlt: "WorktreeWise repository options comparing opening local worktrees vs cloning",
  },
};
