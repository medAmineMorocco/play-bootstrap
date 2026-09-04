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
import { RemoveVsPruneDiagram } from "@/components/Tutorials/Diagrams";
import { getCommandBySlug } from "@/data/gitWorktreeCommands";

const command = getCommandBySlug("prune")!;

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

export default function GitWorktreePrunePage() {
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
            <span>Step #7</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark dark:text-white sm:text-4xl">
            {command.title}
          </h1>
          <p className="mt-4 text-base text-body-color dark:text-dark-6 sm:text-lg leading-relaxed">
            The <code className="font-mono text-primary font-bold">git worktree prune</code> command cleans up stale administrative records in <code className="font-mono text-xs">.git/worktrees/</code> whose working directories have been manually deleted from disk.
          </p>
        </div>

        {/* Fundamental Distinction */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            git worktree remove vs git worktree prune
          </h2>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6">
            A common point of confusion among developers is the difference between <code className="font-mono text-xs">remove</code> and <code className="font-mono text-xs">prune</code>:
          </p>

          <RemoveVsPruneDiagram />
        </section>

        {/* How Stale Metadata Happens */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            How Stale Metadata Happens
          </h2>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6 leading-relaxed">
            When you create a worktree, Git registers an entry in <code className="font-mono text-xs text-primary">.git/worktrees/&lt;name&gt;/</code>. If you later delete that worktree folder using <code className="font-mono text-xs">rm -rf</code>, macOS Finder, or Windows Explorer instead of using <Link href="/git-worktree/remove" className="text-primary font-semibold underline">git worktree remove</Link>, Git still thinks the worktree exists.
          </p>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6 leading-relaxed">
            As a result, you might encounter errors like:
          </p>
          <TerminalOutput
            output={`fatal: 'feature/auth' is already checked out at '/path/to/old/deleted-folder'`}
            title="Symptom of Stale Worktree Metadata"
          />
          <p className="mt-2 text-sm text-body-color dark:text-dark-6 leading-relaxed">
            Running <code className="font-mono text-xs font-bold text-primary">git worktree prune</code> immediately scans your filesystem, finds which registered paths no longer exist, and cleans up their obsolete administrative files.
          </p>
        </section>

        {/* Prune Commands */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Command Usage & Safe Dry Run
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-dark dark:text-white">
                1. Preview changes with dry-run
              </h3>
              <p className="text-xs text-body-color dark:text-dark-6">
                Always run a dry run first to see what stale records would be pruned:
              </p>
              <TerminalSnippet
                command="git worktree prune --dry-run --verbose"
                comment="Preview stale records without deleting anything"
              />
              <TerminalOutput
                output={`Removing worktrees/project-old-feature: gitdir file points to non-existent location`}
                title="Dry Run Output"
              />
            </div>

            <div>
              <h3 className="text-base font-bold text-dark dark:text-white">
                2. Execute pruning
              </h3>
              <TerminalSnippet
                command="git worktree prune -v"
                comment="Prune all stale metadata and display removed entries"
              />
            </div>

            <div>
              <h3 className="text-base font-bold text-dark dark:text-white">
                3. Prune by expiration time
              </h3>
              <p className="text-xs text-body-color dark:text-dark-6">
                You can specify an expiration window so that recently disconnected paths (e.g. from removable drives) are not immediately discarded:
              </p>
              <TerminalSnippet
                command="git worktree prune --expire 2.weeks.ago"
                comment="Only prune entries unreachable for longer than 2 weeks"
              />
            </div>
          </div>
        </section>

        {/* WorktreeWise Showcase */}
        <section className="mt-12">
          <WorktreeWiseFeatureCard
            featureTitle={command.worktreeWiseFeature}
            description="WorktreeWise automatically detects missing or stale worktree folders in real-time, displaying a quick 1-click &apos;Prune Stale Records&apos; button that keeps your Git repository clean and free of ghost branch checkouts."
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
            If a worktree folder was moved instead of deleted, do not prune it! Instead, restore the connection using{" "}
            <Link href="/git-worktree/repair" className="text-primary font-semibold hover:underline">
              git worktree repair
            </Link>.
          </p>
        </section>
      </article>
    </TutorialContainer>
  );
}
