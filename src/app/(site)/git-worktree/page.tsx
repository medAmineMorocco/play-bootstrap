import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  TutorialContainer,
  TerminalSnippet,
  TerminalOutput,
  Callout,
  WorktreeWiseFeatureCard,
} from "@/components/Tutorials/CommandLayout";
import {
  SharedRepoDiagram,
  WorkflowComparisonDiagram,
  WorktreeStructureDiagram,
} from "@/components/Tutorials/Diagrams";
import { WORKTREE_COMMANDS, TUTORIAL_CLUSTERS } from "@/data/gitWorktreeCommands";

export const metadata: Metadata = {
  title: "Git Worktree: Complete Guide & All Commands | WorktreeWise",
  description:
    "Master Git worktrees for parallel development without multiple clones. Complete guide covering architecture, all 8 commands, workflows, AI agents, and GUI tools.",
  alternates: {
    canonical: "https://www.worktreewise.com/git-worktree",
  },
  openGraph: {
    title: "Git Worktree: Complete Guide & All Commands | WorktreeWise",
    description:
      "Learn how to manage multiple Git branches simultaneously using Git worktrees. Complete pillar guide with architecture diagrams, commands, and best practices.",
    url: "https://www.worktreewise.com/git-worktree",
    siteName: "WorktreeWise",
    images: [
      {
        url: "https://www.worktreewise.com/images/v1.1.0/04-worktree-overview.png",
        width: 1200,
        height: 630,
        alt: "Git Worktree Complete Guide",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Git Worktree: Complete Guide & All Commands",
    description:
      "Everything you need to master Git worktrees: architecture, all 8 commands, AI agent workflows, and practical scenarios.",
    images: ["https://www.worktreewise.com/images/v1.1.0/04-worktree-overview.png"],
  },
};

export default function GitWorktreePillarPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Git Worktree: Complete Guide",
    description:
      "Comprehensive developer guide to Git worktrees: internal architecture, all 8 CLI commands, parallel workflows, and AI coding agent setups.",
    author: {
      "@type": "Organization",
      name: "WorktreeWise",
      url: "https://www.worktreewise.com",
    },
    publisher: {
      "@type": "Organization",
      name: "WorktreeWise",
      logo: {
        "@type": "ImageObject",
        url: "https://www.worktreewise.com/images/logo/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.worktreewise.com/git-worktree",
    },
  };

  return (
    <TutorialContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="prose prose-slate max-w-none dark:prose-invert">
        {/* Header section */}
        <div className="border-b border-stroke pb-8 dark:border-dark-3/60">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20">
            <span>Tutorials</span>
            <span>•</span>
            <span>Pillar Guide</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark dark:text-white sm:text-4xl lg:text-5xl">
            Git Worktree: Complete Guide
          </h1>
          <p className="mt-4 text-base text-body-color dark:text-dark-6 sm:text-lg leading-relaxed">
            A <strong>Git worktree</strong> enables you to attach multiple isolated working directories to a single Git repository. Work on multiple branches simultaneously without stash conflicts, branch switching overhead, or duplicate disk-heavy repository clones.
          </p>
        </div>

        {/* Quick Summary Grid */}
        <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-stroke bg-gray-1/50 p-4 dark:border-dark-3 dark:bg-dark/40">
            <span className="text-xs font-bold uppercase text-primary">Simultaneous Branches</span>
            <p className="mt-1 text-xs text-body-color dark:text-dark-6">
              Checkout 3, 5, or 10 branches at the same time in separate folders on your machine.
            </p>
          </div>
          <div className="rounded-xl border border-stroke bg-gray-1/50 p-4 dark:border-dark-3 dark:bg-dark/40">
            <span className="text-xs font-bold uppercase text-primary">Zero Disk Duplication</span>
            <p className="mt-1 text-xs text-body-color dark:text-dark-6">
              All linked worktrees share the primary <code className="text-xs">.git</code> history and object database.
            </p>
          </div>
          <div className="rounded-xl border border-stroke bg-gray-1/50 p-4 dark:border-dark-3 dark:bg-dark/40">
            <span className="text-xs font-bold uppercase text-primary">Zero Stashing</span>
            <p className="mt-1 text-xs text-body-color dark:text-dark-6">
              Switch contexts instantly for PR reviews or emergency hotfixes without stashing uncommitted files.
            </p>
          </div>
        </div>

        {/* SECTION 1: What is a Git worktree? */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-dark dark:text-white sm:text-3xl">
            What is a Git worktree?
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-body-color dark:text-dark-6">
            In standard Git usage, one repository directory corresponds to exactly one working directory and one active checked-out branch. Switching branches modifies files directly inside that single directory, requiring you to commit or stash any uncommitted work.
          </p>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-body-color dark:text-dark-6">
            With <strong>Git worktrees</strong> (introduced natively in Git 2.5 and refined in subsequent versions), a single repository can have <em>multiple linked working directories</em>. Each working directory is checked out to its own branch, but they all share the exact same commit history, object store (<code className="font-mono text-xs">.git/objects</code>), remotes, and configuration.
          </p>

          <SharedRepoDiagram />
        </section>

        {/* SECTION 2: How Git worktrees work under the hood */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-dark dark:text-white sm:text-3xl">
            How Git worktrees work internally
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-body-color dark:text-dark-6">
            Under the hood, Git organizes worktrees using a lightweight pointer architecture:
          </p>
          <ul className="mt-4 space-y-2.5 text-sm sm:text-base text-body-color dark:text-dark-6 list-disc pl-6">
            <li>
              <strong>Primary Worktree:</strong> The original folder created when you initialize or clone a repository. It contains the real <code className="font-mono text-xs text-primary font-bold">.git/</code> directory.
            </li>
            <li>
              <strong>Linked Worktrees:</strong> Additional folders created via <Link href="/git-worktree/add" className="text-primary hover:underline font-semibold">git worktree add</Link>. Instead of a <code className="font-mono text-xs">.git</code> directory, each linked worktree has a tiny <code className="font-mono text-xs">.git</code> <em>text file</em> containing a single line pointing back to the main repository: <code className="font-mono text-xs bg-gray-2 dark:bg-dark-3 px-2 py-0.5 rounded">gitdir: /path/to/main/.git/worktrees/&lt;worktree-name&gt;</code>.
            </li>
            <li>
              <strong>Administrative Storage:</strong> The main repository keeps per-worktree state (HEAD pointer, index, worktree-specific config, logs) under <code className="font-mono text-xs text-primary">.git/worktrees/&lt;id&gt;/</code>.
            </li>
          </ul>
        </section>

        {/* SECTION 3: Git worktree vs normal branch switching */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-dark dark:text-white sm:text-3xl">
            Git worktree vs normal branch switching
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-body-color dark:text-dark-6">
            Traditional branch switching interrupts your flow whenever an unexpected interruption occurs. Compare the two models below:
          </p>

          <WorkflowComparisonDiagram />

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse rounded-xl border border-stroke dark:border-dark-3/60">
              <thead>
                <tr className="bg-gray-1 dark:bg-dark-3/40 text-dark dark:text-white border-b border-stroke dark:border-dark-3">
                  <th className="p-3 sm:p-4 font-bold">Comparison Point</th>
                  <th className="p-3 sm:p-4 font-bold text-rose-600 dark:text-rose-400">git switch / checkout</th>
                  <th className="p-3 sm:p-4 font-bold text-emerald-600 dark:text-emerald-400">Git worktrees</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stroke dark:divide-dark-3/40 text-body-color dark:text-dark-6">
                <tr>
                  <td className="p-3 sm:p-4 font-semibold text-dark dark:text-white">Parallel Branches</td>
                  <td className="p-3 sm:p-4">1 branch at a time</td>
                  <td className="p-3 sm:p-4 font-medium text-emerald-600 dark:text-emerald-400">Unlimited simultaneous branches</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-semibold text-dark dark:text-white">Uncommitted Changes</td>
                  <td className="p-3 sm:p-4">Requires stash or throwaway commit</td>
                  <td className="p-3 sm:p-4 font-medium text-emerald-600 dark:text-emerald-400">Untouched; stay in their own folder</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-semibold text-dark dark:text-white">IDE / Language Server Cache</td>
                  <td className="p-3 sm:p-4">Re-indexes on every branch switch</td>
                  <td className="p-3 sm:p-4 font-medium text-emerald-600 dark:text-emerald-400">Warm & intact in separate IDE windows</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-semibold text-dark dark:text-white">Dev Server / Port State</td>
                  <td className="p-3 sm:p-4">Must stop/restart on branch change</td>
                  <td className="p-3 sm:p-4 font-medium text-emerald-600 dark:text-emerald-400">Can run concurrently on separate ports</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-semibold text-dark dark:text-white">Disk Space Usage</td>
                  <td className="p-3 sm:p-4">1 working tree</td>
                  <td className="p-3 sm:p-4 font-medium text-emerald-600 dark:text-emerald-400">Only working tree files (shared .git)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 4: Directory Structure */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-dark dark:text-white sm:text-3xl">
            Git worktree directory structure
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-body-color dark:text-dark-6">
            A recommended layout is placing sibling folders side-by-side or inside a dedicated project root. This ensures relative imports and navigation remain intuitive:
          </p>

          <WorktreeStructureDiagram />
        </section>

        {/* SECTION 5: All Git Worktree Commands */}
        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-dark dark:text-white sm:text-3xl">
                Git worktree commands overview
              </h2>
              <p className="mt-2 text-sm sm:text-base text-body-color dark:text-dark-6">
                Explore all 8 dedicated command tutorials with deep examples, flags, and diagrams:
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {WORKTREE_COMMANDS.map((cmd) => (
              <Link
                key={cmd.slug}
                href={cmd.path}
                className="group flex flex-col justify-between rounded-xl border border-stroke bg-white p-5 transition-all hover:border-primary hover:shadow-md dark:border-dark-3 dark:bg-dark-2"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-primary group-hover:underline">
                      {cmd.command}
                    </span>
                    <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
                      #{cmd.order}
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-dark dark:text-white group-hover:text-primary transition-colors">
                    {cmd.label} Guide
                  </h3>
                  <p className="mt-1.5 text-xs text-body-color dark:text-dark-6 leading-relaxed">
                    {cmd.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
                  <span>Read tutorial</span>
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 6: Real-World Development Workflows */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-dark dark:text-white sm:text-3xl">
            Real-world practical workflows
          </h2>

          <div className="mt-6 space-y-6">
            {/* Scenario 1: Parallel feature development */}
            <div className="rounded-xl border border-stroke bg-gray-1/30 p-5 dark:border-dark-3/60 dark:bg-dark/20">
              <h3 className="text-lg font-bold text-dark dark:text-white">
                1. Parallel development without stash mess
              </h3>
              <p className="mt-2 text-sm text-body-color dark:text-dark-6 leading-relaxed">
                When building a complex feature on <code className="font-mono text-xs">feature/billing</code>, you need to spin up <code className="font-mono text-xs">feature/auth</code> to test integration. Instead of stashing:
              </p>
              <TerminalSnippet
                command="git worktree add -b feature/auth ../app-auth main"
                comment="Create a new branch and folder directly from main"
              />
              <p className="text-xs text-body-color dark:text-dark-6">
                Now open <code className="font-mono text-xs">../app-auth</code> in a second VS Code / IntelliJ window. Both branches run independently.
              </p>
            </div>

            {/* Scenario 2: Emergency Hotfix */}
            <div className="rounded-xl border border-stroke bg-gray-1/30 p-5 dark:border-dark-3/60 dark:bg-dark/20">
              <h3 className="text-lg font-bold text-dark dark:text-white">
                2. Emergency production hotfix
              </h3>
              <p className="mt-2 text-sm text-body-color dark:text-dark-6 leading-relaxed">
                A critical production bug is reported while you have 15 modified files in your current working tree. Do not risk losing state:
              </p>
              <TerminalSnippet
                command="git worktree add -b hotfix/payment-gateway ../app-hotfix production"
                comment="Branch directly from production tag or branch"
              />
              <p className="text-xs text-body-color dark:text-dark-6">
                Fix the bug, test, commit, push, and create your PR. Then safely clean up with <Link href="/git-worktree/remove" className="text-primary hover:underline font-semibold">git worktree remove ../app-hotfix</Link>.
              </p>
            </div>

            {/* Scenario 3: AI Coding Agents */}
            <div className="rounded-xl border border-stroke bg-gray-1/30 p-5 dark:border-dark-3/60 dark:bg-dark/20">
              <h3 className="text-lg font-bold text-dark dark:text-white">
                3. AI coding agents (Claude Code, Cursor, Codex, Gemini CLI)
              </h3>
              <p className="mt-2 text-sm text-body-color dark:text-dark-6 leading-relaxed">
                Autonomous AI agents often perform aggressive refactors, install test packages, or modify configuration files. Running an AI agent in your primary working directory can overwrite your active work. By assigning each AI task its own worktree:
              </p>
              <TerminalSnippet
                command="git worktree add ../agent-refactor -b ai/refactor-auth"
                comment="Isolate the AI agent in its own sandbox directory"
              />
              <p className="text-xs text-body-color dark:text-dark-6">
                Point Claude Code or Cursor at <code className="font-mono text-xs">../agent-refactor</code>. You can continue writing code on your main branch without AI-generated file conflicts.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: Common Problems & Gotchas */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-dark dark:text-white sm:text-3xl">
            Common problems & restrictions
          </h2>
          <div className="mt-4 space-y-4">
            <Callout type="warning" title="A branch cannot be checked out in two worktrees simultaneously">
              Git prevents you from checking out the exact same branch in two different worktrees to prevent index corruption. If you try, Git will report: <code className="font-mono text-xs">fatal: &apos;branch-name&apos; is already checked out at &apos;/path/to/worktree&apos;</code>. Use <Link href="/git-worktree/list" className="underline font-semibold">git worktree list</Link> to find where it is currently checked out.
            </Callout>

            <Callout type="danger" title="Uncommitted changes during deletion">
              Running <code className="font-mono text-xs">git worktree remove</code> will fail if the directory has untracked or uncommitted changes. This protects you from accidental data loss. Learn safe cleanup on the <Link href="/git-worktree/remove" className="underline font-semibold">git worktree remove guide</Link>.
            </Callout>
          </div>
        </section>

        {/* SECTION 8: WorktreeWise GUI Showcase */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-dark dark:text-white sm:text-3xl">
            Managing Git worktrees with WorktreeWise GUI
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-body-color dark:text-dark-6">
            While the Git CLI commands are powerful, visual tools eliminate path memorization, automate hooks, and manage IDE integration effortlessly:
          </p>

          <WorktreeWiseFeatureCard
            featureTitle="Central Worktree Dashboard"
            description="WorktreeWise provides an intuitive visual interface to inspect all linked worktrees, switch IDE windows, run custom pre/post creation hooks, and repair broken links in 1-click."
            imageSrc="/images/v1.1.0/04-worktree-overview.png"
            imageAlt="WorktreeWise visual Git worktree management dashboard"
          />
        </section>

        {/* SECTION 9: Tutorials Cluster Roadmap */}
        <section className="mt-14 pt-8 border-t border-stroke dark:border-dark-3/60">
          <h2 className="text-2xl font-bold text-dark dark:text-white sm:text-3xl">
            Tutorials Cluster Roadmap
          </h2>
          <p className="mt-2 text-sm sm:text-base text-body-color dark:text-dark-6">
            Explore our expanding curriculum of in-depth Git worktree guides:
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TUTORIAL_CLUSTERS.map((cluster) => (
              <div
                key={cluster.id}
                className={`rounded-xl border p-5 transition-all ${
                  cluster.isSoon
                    ? "border-stroke/70 bg-gray-1/40 dark:border-dark-3/40 dark:bg-dark/30 select-none"
                    : "border-primary/40 bg-primary/5 dark:bg-primary/10 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-dark dark:text-white">
                    {cluster.title}
                  </h3>
                  {cluster.isSoon ? (
                    <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                      Soon
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Available Now
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs text-body-color dark:text-dark-6 leading-relaxed">
                  {cluster.description}
                </p>
                {cluster.topics && (
                  <ul className="mt-3 space-y-1 text-[11px] text-body-color/80 dark:text-dark-6/80">
                    {cluster.topics.slice(0, 3).map((topic, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-primary">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {!cluster.isSoon && cluster.path && (
                  <Link
                    href={cluster.path}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>Explore commands</span>
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      </article>
    </TutorialContainer>
  );
}
