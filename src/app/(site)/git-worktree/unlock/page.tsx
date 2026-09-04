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

const command = getCommandBySlug("unlock")!;

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

export default function GitWorktreeUnlockPage() {
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
            <span>Step #6</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark dark:text-white sm:text-4xl">
            {command.title}
          </h1>
          <p className="mt-4 text-base text-body-color dark:text-dark-6 sm:text-lg leading-relaxed">
            The <code className="font-mono text-primary font-bold">git worktree unlock</code> command removes the protective lock flag from a linked worktree, enabling it to be moved, removed, or cleaned up by administrative pruning.
          </p>
        </div>

        {/* Basic Usage */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Basic Syntax
          </h2>
          <TerminalSnippet
            command="git worktree unlock <worktree>"
            comment="Unlock a worktree by relative path or directory name"
          />
          <p className="mt-3 text-sm text-body-color dark:text-dark-6">
            Example:
          </p>
          <TerminalSnippet
            command="git worktree unlock ../perf-benchmarks"
            comment="Removes the lock on perf-benchmarks"
          />

          <LockUnlockDiagram />
        </section>

        {/* Why Unlock? */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            What Changes When You Unlock a Worktree?
          </h2>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6 leading-relaxed">
            When a worktree is unlocked:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-body-color dark:text-dark-6 list-disc pl-6">
            <li>
              You can now run <Link href="/git-worktree/remove" className="text-primary font-semibold underline">git worktree remove</Link> without requiring force flags.
            </li>
            <li>
              You can move the worktree directory with <Link href="/git-worktree/move" className="text-primary font-semibold underline">git worktree move</Link>.
            </li>
            <li>
              If the folder is deleted manually from your drive, <Link href="/git-worktree/prune" className="text-primary font-semibold underline">git worktree prune</Link> will clean up its orphaned administrative metadata.
            </li>
          </ul>
        </section>

        {/* Verifying Status */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Verifying Worktree State
          </h2>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6">
            Inspect <Link href="/git-worktree/list" className="text-primary font-semibold underline">git worktree list</Link> to confirm the lock annotation has been removed:
          </p>
          <TerminalOutput
            output={`/home/developer/projects/my-app          9a8b7c6 [main]
/home/developer/projects/perf-benchmarks 1d2e3f4 [perf/bench]`}
            title="git worktree list (now unlocked)"
          />
        </section>

        {/* WorktreeWise Showcase */}
        <section className="mt-12">
          <WorktreeWiseFeatureCard
            featureTitle={command.worktreeWiseFeature}
            description="In WorktreeWise, unlocking is as simple as clicking the padlock icon. The app displays real-time lock indicators and protects your critical worktrees with visual confirmation modals."
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
            After unlocking, you can safely remove the temporary directory using{" "}
            <Link href="/git-worktree/remove" className="text-primary font-semibold hover:underline">
              git worktree remove
            </Link>{" "}
            or prune obsolete records with{" "}
            <Link href="/git-worktree/prune" className="text-primary font-semibold hover:underline">
              git worktree prune
            </Link>.
          </p>
        </section>
      </article>
    </TutorialContainer>
  );
}
