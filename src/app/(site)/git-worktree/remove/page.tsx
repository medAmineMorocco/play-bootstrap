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

const command = getCommandBySlug("remove")!;

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

export default function GitWorktreeRemovePage() {
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
            <span>Step #3</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark dark:text-white sm:text-4xl">
            {command.title}
          </h1>
          <p className="mt-4 text-base text-body-color dark:text-dark-6 sm:text-lg leading-relaxed">
            The <code className="font-mono text-primary font-bold">git worktree remove</code> command safely removes a linked worktree directory from your filesystem and unregisters its administrative metadata in the primary repository.
          </p>
        </div>

        {/* Basic Usage */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Basic Syntax
          </h2>
          <TerminalSnippet
            command="git worktree remove <worktree>"
            comment="Remove a worktree by relative path or directory name"
          />
          <p className="mt-3 text-sm text-body-color dark:text-dark-6">
            For example, to remove a finished feature worktree:
          </p>
          <TerminalSnippet
            command="git worktree remove ../project-feature-auth"
            comment="Deletes the folder and unregisters worktree metadata"
          />

          {/* Before & After Diagram */}
          <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-xs font-mono text-slate-200 shadow-md">
              <div className="text-amber-400 font-bold mb-2 uppercase text-[11px]">BEFORE git worktree remove</div>
              <pre className="text-slate-200 whitespace-pre">
{`projects/
├── project/              [main]
└── project-feature-auth/ [feature/auth]`}
              </pre>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-xs font-mono text-emerald-300 shadow-md">
              <div className="text-emerald-400 font-bold mb-2 uppercase text-[11px]">AFTER git worktree remove</div>
              <pre className="text-emerald-300 whitespace-pre">
{`projects/
└── project/              [main]
(project-feature-auth folder deleted)`}
              </pre>
            </div>
          </div>
        </section>

        {/* CRITICAL NOTE: Branch is NOT deleted */}
        <section className="mt-10">
          <Callout type="info" title="Important: Removing a worktree does NOT delete its Git branch">
            <p className="leading-relaxed">
              When you execute <code className="font-mono text-xs">git worktree remove</code>, Git deletes the <strong>working directory folder</strong> from disk and cleans the worktree registry. Your Git branch (<code className="font-mono text-xs">feature/auth</code>) remains completely intact in the repository history!
            </p>
          </Callout>

          <p className="mt-3 text-sm text-body-color dark:text-dark-6">
            You can verify that your branch is still safe:
          </p>
          <TerminalSnippet
            command="git branch --list 'feature/*'"
            comment="Branch still exists in Git object database"
          />
          <TerminalOutput
            output={`* main
  feature/auth`}
          />
          <p className="text-xs text-body-color dark:text-dark-6">
            If you also want to delete the Git branch after merging, run <code className="font-mono text-xs">git branch -d feature/auth</code> separately.
          </p>
        </section>

        {/* Uncommitted changes safety */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Protection Against Uncommitted Changes
          </h2>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6">
            If you have modified tracked files or uncommitted changes inside the worktree, Git intentionally blocks removal to prevent data loss:
          </p>
          <TerminalOutput
            output={`fatal: 'project-feature-auth' contains modified or untracked files, use --force to delete it`}
            title="Git Safety Error"
          />

          <h3 className="mt-6 text-base font-bold text-dark dark:text-white">
            How to resolve:
          </h3>
          <ul className="mt-2 space-y-2 text-sm text-body-color dark:text-dark-6 list-disc pl-6">
            <li>
              <strong>Option A (Recommended):</strong> Navigate into the folder, inspect changes with <code className="font-mono text-xs">git status</code>, and commit or discard them intentionally.
            </li>
            <li>
              <strong>Option B (Force Deletion):</strong> If you are certain you want to discard all untracked files and changes, use the force flag:
            </li>
          </ul>

          <TerminalSnippet
            command="git worktree remove --force ../project-feature-auth"
            comment="Forces removal and deletes uncommitted modifications"
          />
        </section>

        {/* Locked Worktrees */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Removing Locked Worktrees
          </h2>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6">
            If a worktree was protected with <Link href="/git-worktree/lock" className="text-primary font-semibold underline">git worktree lock</Link>, Git will refuse standard removal. You must first unlock it with <Link href="/git-worktree/unlock" className="text-primary font-semibold underline">git worktree unlock</Link> or supply double force <code className="font-mono text-xs">--force --force</code>.
          </p>
        </section>

        {/* Safe Cleanup Workflow */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Standard Post-Merge Cleanup Workflow
          </h2>
          <TerminalSnippet
            command={`# 1. Inspect all worktrees
git worktree list

# 2. Remove the merged worktree directory
git worktree remove ../project-feature-auth

# 3. Delete the local branch (now that PR is merged)
git branch -d feature/auth`}
            comment="Complete clean post-merge routine"
          />
        </section>

        {/* WorktreeWise Showcase */}
        <section className="mt-12">
          <WorktreeWiseFeatureCard
            featureTitle={command.worktreeWiseFeature}
            description="WorktreeWise checks for uncommitted changes before deletion and gives you the option to keep or delete the associated Git branch simultaneously from one visual dialog."
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
            If the worktree folder was already deleted through your operating system file manager, use{" "}
            <Link href="/git-worktree/prune" className="text-primary font-semibold hover:underline">
              git worktree prune
            </Link>{" "}
            instead to clean up stale administrative records.
          </p>
        </section>
      </article>
    </TutorialContainer>
  );
}
