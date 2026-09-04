import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  TutorialContainer,
  TerminalSnippet,
  TerminalOutput,
  Callout,
  WorktreeWiseFeatureCard,
} from "@/components/Tutorials/CommandLayout";
import { getCommandBySlug } from "@/data/gitWorktreeCommands";

const command = getCommandBySlug("list")!;

export const metadata: Metadata = {
  title: command.metaTitle,
  description: command.metaDescription,
  alternates: {
    canonical: `https://www.worktreewise.com${command.path}`,
  },
  openGraph: {
    title: command.metaTitle,
    description: command.metaDescription,
    url: `https://www.worktreewise.com${command.path}`,
    siteName: "WorktreeWise",
    images: [
      {
        url: `https://www.worktreewise.com${command.worktreeWiseScreenshot}`,
        width: 1200,
        height: 630,
        alt: command.worktreeWiseAlt,
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: command.metaTitle,
    description: command.metaDescription,
    images: [`https://www.worktreewise.com${command.worktreeWiseScreenshot}`],
  },
};

export default function GitWorktreeListPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: command.title,
    description: command.metaDescription,
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
      "@id": `https://www.worktreewise.com${command.path}`,
    },
  };

  return (
    <TutorialContainer command={command}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="prose prose-slate max-w-none dark:prose-invert">
        <div className="border-b border-stroke pb-8 dark:border-dark-3/60">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20">
            <span>Git Worktree Command</span>
            <span>•</span>
            <span>Step #2</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark dark:text-white sm:text-4xl">
            {command.title}
          </h1>
          <p className="mt-4 text-base text-body-color dark:text-dark-6 sm:text-lg leading-relaxed">
            The <code className="font-mono text-primary font-bold">git worktree list</code> command displays all active and linked worktrees associated with the current repository, along with their checked-out commit, branch, and status annotations.
          </p>
        </div>

        {/* Basic Usage */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Standard Output
          </h2>
          <TerminalSnippet
            command="git worktree list"
            comment="List all linked worktrees"
          />
          <TerminalOutput
            output={`/home/developer/projects/my-app          9a8b7c6 [main]
/home/developer/projects/feature-auth    1d2e3f4 [feature/auth]
/home/developer/projects/hotfix-login    5c6d7e8 [hotfix/login] (locked: "Testing migration")
/home/developer/projects/inspect-v1      4b3a2c1 (detached HEAD)`}
            title="Terminal Output"
          />

          {/* Visual Output Breakdown */}
          <div className="my-6 rounded-xl border border-stroke bg-slate-900 p-5 text-white shadow-md">
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Anatomy of git worktree list Output
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="rounded bg-slate-950 p-3 border border-slate-800">
                <span className="text-emerald-400 font-bold">/home/user/project</span>
                <span className="mx-2 text-slate-500">•</span>
                <span className="text-amber-300">9a8b7c6</span>
                <span className="mx-2 text-slate-500">•</span>
                <span className="text-indigo-300">[main]</span>
                <span className="mx-2 text-slate-500">•</span>
                <span className="text-rose-400 font-semibold">(locked: &quot;reason&quot;)</span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <div><strong className="text-emerald-400">1. Absolute Path:</strong> Directory on filesystem</div>
                <div><strong className="text-amber-300">2. Commit Hash:</strong> Current HEAD of tree</div>
                <div><strong className="text-indigo-300">3. Branch:</strong> Checked-out branch</div>
                <div><strong className="text-rose-400">4. Status:</strong> Locked, detached, or pruneable</div>
              </div>
            </div>
          </div>
        </section>

        {/* Porcelain Output */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Machine-Readable Output: --porcelain
          </h2>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6">
            For automation, scripts, and CI/CD pipelines, use the <code className="font-mono text-xs font-bold text-primary">--porcelain</code> flag. This provides a guaranteed stable multi-line block format:
          </p>
          <TerminalSnippet
            command="git worktree list --porcelain"
            comment="Stable machine-readable format"
          />
          <TerminalOutput
            output={`worktree /home/developer/projects/my-app
HEAD 9a8b7c65d4e3f2109876543210abcdef01234567
branch refs/heads/main

worktree /home/developer/projects/feature-auth
HEAD 1d2e3f4a5b6c7d8e9f0123456789abcdef012345
branch refs/heads/feature/auth

worktree /home/developer/projects/hotfix-login
HEAD 5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d
branch refs/heads/hotfix/login
locked Testing migration`}
            title="Porcelain Output Structure"
          />
        </section>

        {/* Scripting Example */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Scripting Example: Extracting Worktree Paths
          </h2>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6">
            You can easily parse worktrees in bash or node scripts:
          </p>
          <TerminalSnippet
            command="git worktree list --porcelain | grep '^worktree ' | cut -d' ' -f2-"
            comment="List only the absolute folder paths of all worktrees"
          />
        </section>

        {/* Understanding States */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Status Indicators Explained
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
            <div className="rounded-xl border border-stroke bg-gray-1/40 p-4 dark:border-dark-3/60 dark:bg-dark/30">
              <span className="font-bold text-indigo-500">[branch-name]</span>
              <p className="mt-1 text-body-color dark:text-dark-6">Standard active branch attached to the worktree.</p>
            </div>
            <div className="rounded-xl border border-stroke bg-gray-1/40 p-4 dark:border-dark-3/60 dark:bg-dark/30">
              <span className="font-bold text-amber-500">(detached HEAD)</span>
              <p className="mt-1 text-body-color dark:text-dark-6">Worktree checked out directly to a commit or tag without a branch.</p>
            </div>
            <div className="rounded-xl border border-stroke bg-gray-1/40 p-4 dark:border-dark-3/60 dark:bg-dark/30">
              <span className="font-bold text-rose-500">(locked: &quot;reason&quot;)</span>
              <p className="mt-1 text-body-color dark:text-dark-6">
                Protected from deletion. See <Link href="/git-worktree/lock" className="text-primary underline">git worktree lock</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* WorktreeWise Showcase */}
        <section className="mt-12">
          <WorktreeWiseFeatureCard
            featureTitle={command.worktreeWiseFeature}
            description="WorktreeWise transforms git worktree list into an interactive visual dashboard with live Git diffs, commit logs, branch search, and instant open in VS Code / JetBrains IDEs."
            imageSrc={command.worktreeWiseScreenshot}
            imageAlt={command.worktreeWiseAlt}
          />
        </section>

        {/* Related Commands */}
        <section className="mt-10">
          <h3 className="text-lg font-bold text-dark dark:text-white">
            Related commands
          </h3>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6">
            If an entry in your list shows a path that no longer exists on disk, run{" "}
            <Link href="/git-worktree/prune" className="text-primary font-semibold hover:underline">
              git worktree prune
            </Link>{" "}
            to clean up stale metadata. If a directory was moved, use{" "}
            <Link href="/git-worktree/repair" className="text-primary font-semibold hover:underline">
              git worktree repair
            </Link>.
          </p>
        </section>
      </article>
    </TutorialContainer>
  );
}
