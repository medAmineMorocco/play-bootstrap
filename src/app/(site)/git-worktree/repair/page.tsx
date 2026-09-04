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
import { RepairDiagram } from "@/components/Tutorials/Diagrams";
import { getCommandBySlug } from "@/data/gitWorktreeCommands";

const command = getCommandBySlug("repair")!;

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

export default function GitWorktreeRepairPage() {
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
            <span>Step #8</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark dark:text-white sm:text-4xl">
            {command.title}
          </h1>
          <p className="mt-4 text-base text-body-color dark:text-dark-6 sm:text-lg leading-relaxed">
            The <code className="font-mono text-primary font-bold">git worktree repair</code> command re-establishes bi-directional administrative links between the main repository and worktrees after directories or repositories have been moved or renamed manually.
          </p>
        </div>

        {/* Basic Usage */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Basic Syntax
          </h2>
          <TerminalSnippet
            command="git worktree repair [<path>...]"
            comment="Reconcile metadata pointers for all or specific worktrees"
          />
          <p className="mt-3 text-sm text-body-color dark:text-dark-6">
            Running <code className="font-mono text-xs font-bold text-primary">git worktree repair</code> without arguments inside the main repository checks all registered worktrees and fixes their administrative pointers.
          </p>

          <RepairDiagram />
        </section>

        {/* Real-World Repair Scenarios */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Common Scenarios Where Repair is Essential
          </h2>

          <div className="mt-4 space-y-6">
            <div className="rounded-xl border border-stroke bg-gray-1/30 p-5 dark:border-dark-3/60 dark:bg-dark/20">
              <h3 className="text-base font-bold text-dark dark:text-white">
                Scenario A: You manually moved a linked worktree folder
              </h3>
              <p className="mt-1 text-sm text-body-color dark:text-dark-6 leading-relaxed">
                If you used <code className="font-mono text-xs">mv ../old-path ../new-path</code> instead of <Link href="/git-worktree/move" className="text-primary font-semibold underline">git worktree move</Link>, simply provide the new path to repair:
              </p>
              <TerminalSnippet
                command="git worktree repair ../new-path"
                comment="Repairs the connection to the moved worktree"
              />
              <TerminalOutput
                output={`repair: updated worktree at '/path/to/new-path'`}
              />
            </div>

            <div className="rounded-xl border border-stroke bg-gray-1/30 p-5 dark:border-dark-3/60 dark:bg-dark/20">
              <h3 className="text-base font-bold text-dark dark:text-white">
                Scenario B: The main parent repository folder was renamed or relocated
              </h3>
              <p className="mt-1 text-sm text-body-color dark:text-dark-6 leading-relaxed">
                If you renamed your main project folder (e.g. from <code className="font-mono text-xs">~/projects/app</code> to <code className="font-mono text-xs">~/projects/my-new-app</code>), all linked worktrees will lose their reference to the primary <code className="font-mono text-xs">.git</code> folder. Navigate into any worktree or the main directory and run:
              </p>
              <TerminalSnippet
                command="git worktree repair"
                comment="Scans and heals all linked pointer references"
              />
            </div>
          </div>
        </section>

        {/* How Git Worktree Repair Works */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            How git worktree repair works under the hood
          </h2>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6 leading-relaxed">
            Every linked worktree requires two reciprocal links:
          </p>
          <ol className="mt-3 space-y-2 text-sm text-body-color dark:text-dark-6 list-decimal pl-6">
            <li>
              <strong>Worktree &rarr; Repository:</strong> The <code className="font-mono text-xs">.git</code> file in the worktree directory contains <code className="font-mono text-xs">gitdir: /path/to/main/.git/worktrees/&lt;name&gt;</code>.
            </li>
            <li>
              <strong>Repository &rarr; Worktree:</strong> The <code className="font-mono text-xs">gitdir</code> file inside <code className="font-mono text-xs">.git/worktrees/&lt;name&gt;/</code> contains <code className="font-mono text-xs">/path/to/worktree/.git</code>.
            </li>
          </ol>
          <p className="mt-3 text-sm text-body-color dark:text-dark-6 leading-relaxed">
            <code className="font-mono text-xs">git worktree repair</code> reads the available pointer in whichever directory is valid and writes the matching updated pointer into the other side, instantly healing severed links.
          </p>
        </section>

        {/* WorktreeWise Showcase */}
        <section className="mt-12">
          <WorktreeWiseFeatureCard
            featureTitle={command.worktreeWiseFeature}
            description="WorktreeWise identifies damaged worktrees directly in the sidebar, disables unsafe actions, and provides a dedicated Repair action to reconnect a moved directory without deleting its files or branch."
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
            To move worktrees in the future without breaking administrative pointers, use{" "}
            <Link href="/git-worktree/move" className="text-primary font-semibold hover:underline">
              git worktree move
            </Link>. If a worktree directory is permanently gone and no longer needed, use{" "}
            <Link href="/git-worktree/prune" className="text-primary font-semibold hover:underline">
              git worktree prune
            </Link>.
          </p>
        </section>
      </article>
    </TutorialContainer>
  );
}
