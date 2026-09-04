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

const command = getCommandBySlug("move")!;

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

export default function GitWorktreeMovePage() {
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
            <span>Step #4</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark dark:text-white sm:text-4xl">
            {command.title}
          </h1>
          <p className="mt-4 text-base text-body-color dark:text-dark-6 sm:text-lg leading-relaxed">
            The <code className="font-mono text-primary font-bold">git worktree move</code> command relocates a linked worktree directory to a new path while automatically updating the bi-directional Git administrative pointers.
          </p>
        </div>

        {/* Basic Usage */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Basic Syntax
          </h2>
          <TerminalSnippet
            command="git worktree move <worktree> <new-path>"
            comment="Move worktree and update internal pointers"
          />
          <p className="mt-3 text-sm text-body-color dark:text-dark-6">
            For example, to organize a loose worktree into a structured <code className="font-mono text-xs">features/</code> folder:
          </p>
          <TerminalSnippet
            command="git worktree move project-feature-auth ../features/auth"
            comment="Relocate directory to new destination"
          />

          {/* Diagram */}
          <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-xs font-mono text-slate-200 shadow-md">
              <div className="text-amber-400 font-bold mb-2 uppercase text-[11px]">Before move:</div>
              <pre className="text-slate-200 whitespace-pre">
{`projects/
├── project/
└── project-feature-auth/`}
              </pre>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-xs font-mono text-emerald-300 shadow-md">
              <div className="text-emerald-400 font-bold mb-2 uppercase text-[11px]">After git worktree move:</div>
              <pre className="text-emerald-300 whitespace-pre">
{`projects/
├── project/
└── features/
    └── auth/`}
              </pre>
            </div>
          </div>
        </section>

        {/* Why not manual mv */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Why you should not use standard &apos;mv&apos; or Finder
          </h2>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6 leading-relaxed">
            Linked worktrees rely on two synchronized pointers:
          </p>
          <ol className="mt-3 space-y-2 text-sm text-body-color dark:text-dark-6 list-decimal pl-6">
            <li>
              The <code className="font-mono text-xs">.git</code> text file inside the worktree folder points to the primary repo&apos;s <code className="font-mono text-xs">.git/worktrees/&lt;id&gt;</code>.
            </li>
            <li>
              The <code className="font-mono text-xs">gitdir</code> file inside <code className="font-mono text-xs">.git/worktrees/&lt;id&gt;</code> points back to the worktree&apos;s physical directory.
            </li>
          </ol>
          <p className="mt-3 text-sm text-body-color dark:text-dark-6 leading-relaxed">
            If you move the folder manually with <code className="font-mono text-xs">mv</code> or your desktop file explorer, pointer #2 is severed. Git will lose track of the worktree and mark it as missing.
          </p>

          <Callout type="warning" title="Accidentally moved a folder manually?">
            Don&apos;t panic! You can easily re-link the severed pointers by running{" "}
            <Link href="/git-worktree/repair" className="font-semibold underline">
              git worktree repair
            </Link>.
          </Callout>
        </section>

        {/* Destination Rules */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Move Rules & Restrictions
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-body-color dark:text-dark-6 list-disc pl-6">
            <li>
              <strong>Primary worktree cannot be moved with this command:</strong> <code className="font-mono text-xs">git worktree move</code> only works on <em>linked</em> worktrees.
            </li>
            <li>
              <strong>Locked worktrees:</strong> A locked worktree cannot be moved unless you pass <code className="font-mono text-xs">--force</code> or unlock it first via <Link href="/git-worktree/unlock" className="font-semibold underline">git worktree unlock</Link>.
            </li>
            <li>
              <strong>Destination must not exist:</strong> The new path target must not already exist as a folder or file.
            </li>
          </ul>
        </section>

        {/* WorktreeWise Showcase */}
        <section className="mt-12">
          <WorktreeWiseFeatureCard
            featureTitle={command.worktreeWiseFeature}
            description="WorktreeWise allows you to rename or relocate any worktree instantly from the UI without typing terminal paths. All underlying Git metadata links and IDE configurations are updated automatically."
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
            To prevent automatic cleanup from removing a worktree located on an external drive or pending reorganization, use{" "}
            <Link href="/git-worktree/lock" className="text-primary font-semibold hover:underline">
              git worktree lock
            </Link>. If a move has severed administrative links, run{" "}
            <Link href="/git-worktree/repair" className="text-primary font-semibold hover:underline">
              git worktree repair
            </Link>.
          </p>
        </section>
      </article>
    </TutorialContainer>
  );
}
