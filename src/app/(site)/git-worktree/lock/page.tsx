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
import { LockUnlockDiagram } from "@/components/Tutorials/Diagrams";
import { getCommandBySlug } from "@/data/gitWorktreeCommands";

const command = getCommandBySlug("lock")!;

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

export default function GitWorktreeLockPage() {
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
            <span>Step #5</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark dark:text-white sm:text-4xl">
            {command.title}
          </h1>
          <p className="mt-4 text-base text-body-color dark:text-dark-6 sm:text-lg leading-relaxed">
            The <code className="font-mono text-primary font-bold">git worktree lock</code> command marks a worktree as locked, preventing it from being accidentally deleted by automated cleanup routines or pruned by <Link href="/git-worktree/prune" className="text-primary hover:underline font-semibold">git worktree prune</Link>.
          </p>
        </div>

        {/* Basic Usage */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Basic Syntax & Lock Reason
          </h2>
          <TerminalSnippet
            command="git worktree lock <worktree>"
            comment="Lock a worktree against automatic pruning"
          />
          <p className="mt-3 text-sm text-body-color dark:text-dark-6">
            You can also annotate the lock with an explanatory message using <code className="font-mono text-xs font-bold text-primary">--reason</code>:
          </p>
          <TerminalSnippet
            command='git worktree lock --reason "Stored on external SSD during benchmark testing" ../perf-benchmarks'
            comment="Lock with custom explanation"
          />

          <LockUnlockDiagram />
        </section>

        {/* Why Lock Worktrees? */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            When Should You Lock a Git Worktree?
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm text-body-color dark:text-dark-6">
            <div className="rounded-xl border border-stroke bg-gray-1/40 p-4 dark:border-dark-3 dark:bg-dark/30">
              <h3 className="font-bold text-dark dark:text-white">1. Removable & External Media</h3>
              <p className="mt-1 text-xs leading-relaxed">
                If your worktree folder is located on a portable SSD, flash drive, or network share that gets disconnected, Git might consider it &quot;missing&quot; and prune its administrative records during automatic garbage collection. Locking protects it while unmounted.
              </p>
            </div>
            <div className="rounded-xl border border-stroke bg-gray-1/40 p-4 dark:border-dark-3 dark:bg-dark/30">
              <h3 className="font-bold text-dark dark:text-white">2. Long-Running Workflows</h3>
              <p className="mt-1 text-xs leading-relaxed">
                If you have persistent build caches, background tests, or Docker volumes mounted into a worktree, locking guarantees team members or automated cleanup scripts won&apos;t accidentally delete the working tree.
              </p>
            </div>
          </div>
        </section>

        {/* Inspecting Lock Status */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Inspecting Locked State
          </h2>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6">
            Running <Link href="/git-worktree/list" className="text-primary font-semibold underline">git worktree list</Link> displays the locked badge and reason:
          </p>
          <TerminalOutput
            output={`/home/developer/projects/my-app          9a8b7c6 [main]
/home/developer/projects/perf-benchmarks 1d2e3f4 [perf/bench] (locked: "Stored on external SSD during benchmark testing")`}
            title="git worktree list output with lock"
          />
        </section>

        {/* WorktreeWise Showcase */}
        <section className="mt-12">
          <WorktreeWiseFeatureCard
            featureTitle={command.worktreeWiseFeature}
            description="WorktreeWise lets you toggle lock protection with a single switch on any worktree card. You can attach custom lock reasons and visually distinguish protected worktrees at a glance."
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
            When you are ready to resume normal operations or clean up the directory, release the lock using{" "}
            <Link href="/git-worktree/unlock" className="text-primary font-semibold hover:underline">
              git worktree unlock
            </Link>.
          </p>
        </section>
      </article>
    </TutorialContainer>
  );
}
