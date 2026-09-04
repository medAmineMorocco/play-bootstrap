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

const command = getCommandBySlug("add")!;

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

export default function GitWorktreeAddPage() {
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
            <span>Step #1</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark dark:text-white sm:text-4xl">
            {command.title}
          </h1>
          <p className="mt-4 text-base text-body-color dark:text-dark-6 sm:text-lg leading-relaxed">
            The <code className="font-mono text-primary font-bold">git worktree add</code> command creates a new working directory linked to your current Git repository. It allows you to check out any existing branch, commit, or create a brand-new branch in a separate folder simultaneously.
          </p>
        </div>

        {/* Basic Syntax */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Basic Syntax
          </h2>
          <TerminalSnippet
            command="git worktree add <path> [<commit-ish>]"
            comment="Basic git worktree add format"
          />
          <p className="mt-3 text-sm text-body-color dark:text-dark-6">
            <code className="font-mono text-xs font-semibold">&lt;path&gt;</code> is the target directory where the new worktree will live (relative or absolute). If <code className="font-mono text-xs font-semibold">&lt;commit-ish&gt;</code> is omitted, Git creates a new branch based on current HEAD matching the basename of the path.
          </p>
        </section>

        {/* Use Case 1: Add Existing Branch */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            1. Add a worktree from an existing branch
          </h2>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6">
            If a branch named <code className="font-mono text-xs">feature/login</code> already exists in your repository:
          </p>
          <TerminalSnippet
            command="git worktree add ../project-feature-login feature/login"
            comment="Create sibling directory and checkout feature/login"
          />
          <TerminalOutput
            output={`Preparing worktree (checking out 'feature/login')
HEAD is now at a1b2c3d Add login form validation`}
          />

          {/* Diagram */}
          <div className="my-6 rounded-xl border border-stroke bg-slate-950 p-4 font-mono text-xs text-slate-300">
            <div className="text-slate-500 pb-1 text-[11px] font-sans font-bold uppercase">Resulting Directory Structure:</div>
            <pre className="text-slate-300 whitespace-pre">
{`projects/
├── project/                <-- primary worktree [main]
└── project-feature-login/  <-- linked worktree [feature/login]`}
            </pre>
          </div>
        </section>

        {/* Use Case 2: Create a New Branch */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            2. Create a new branch and worktree simultaneously
          </h2>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6">
            Use the <code className="font-mono text-xs font-bold text-primary">-b &lt;new-branch&gt;</code> flag to create a new branch from a starting point (e.g. <code className="font-mono text-xs">main</code>):
          </p>
          <TerminalSnippet
            command="git worktree add -b feature/auth ../project-auth main"
            comment="Creates branch 'feature/auth' branching off 'main'"
          />
          <TerminalOutput
            output={`Preparing worktree (new branch 'feature/auth')
HEAD is now at f4e5d6c Merge pull request #142 from main`}
          />
        </section>

        {/* Use Case 3: Detached Worktree & Commit Hash */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            3. Checkout a detached worktree or specific commit
          </h2>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6">
            For inspecting an older release tag or commit hash without creating a permanent branch, use <code className="font-mono text-xs">--detach</code>:
          </p>
          <TerminalSnippet
            command="git worktree add --detach ../inspect-v2.1.0 v2.1.0"
            comment="Checkout release tag v2.1.0 in detached HEAD state"
          />
        </section>

        {/* Practical Realistic Scenario */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Complete practical workflow
          </h2>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6">
            Here is a realistic day-to-day workflow for starting a new task without interrupting ongoing work:
          </p>
          <TerminalSnippet
            command={`# 1. Update your primary repository main branch
git switch main
git pull origin main

# 2. Create the worktree and new branch
git worktree add -b feature/payments ../app-payments main

# 3. Navigate into your new isolated directory
cd ../app-payments

# 4. Install dependencies or start isolated server
npm install
npm run dev`}
            comment="End-to-end setup for isolated feature development"
          />
        </section>

        {/* Key Flags Table */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Common Command Flags
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse rounded-xl border border-stroke dark:border-dark-3/60">
              <thead>
                <tr className="bg-gray-1 dark:bg-dark-3/40 text-dark dark:text-white border-b border-stroke dark:border-dark-3">
                  <th className="p-3 font-bold font-mono">Flag</th>
                  <th className="p-3 font-bold">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stroke dark:divide-dark-3/40 text-body-color dark:text-dark-6">
                {command.keyFlags.map((flag, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-mono font-semibold text-primary">{flag.flag}</td>
                    <td className="p-3">{flag.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Warnings & Gotchas */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Common Mistakes & Restrictions
          </h2>
          <div className="mt-4 space-y-4">
            <Callout type="warning" title="Branch Already Checked Out Error">
              If the branch is already checked out in another worktree, Git will refuse to create another worktree for it. Check your existing worktrees with <Link href="/git-worktree/list" className="font-semibold underline">git worktree list</Link>. If the old worktree folder was deleted manually, run <Link href="/git-worktree/prune" className="font-semibold underline">git worktree prune</Link> to clear stale records.
            </Callout>

            <Callout type="tip" title="Choosing directory paths">
              Always use sibling paths like <code className="font-mono text-xs">../project-feature</code> rather than nesting worktrees inside each other. Nesting can confuse IDE file watchers and cause duplicate git tracking errors.
            </Callout>
          </div>
        </section>

        {/* WorktreeWise Showcase */}
        <section className="mt-12">
          <WorktreeWiseFeatureCard
            featureTitle={command.worktreeWiseFeature}
            description="With WorktreeWise, you can create worktrees from HEAD, any existing branch, tag, or commit in 1 click. WorktreeWise automatically creates the folder according to your custom naming pattern and triggers your configured setup hooks."
            imageSrc={command.worktreeWiseScreenshot}
            imageAlt={command.worktreeWiseAlt}
          />
        </section>

        {/* Contextual Links */}
        <section className="mt-10">
          <h3 className="text-lg font-bold text-dark dark:text-white">
            Next steps & related commands
          </h3>
          <p className="mt-2 text-sm text-body-color dark:text-dark-6">
            After creating your worktree, learn how to inspect it with{" "}
            <Link href="/git-worktree/list" className="text-primary font-semibold hover:underline">
              git worktree list
            </Link>{" "}
            or safely remove it after merging with{" "}
            <Link href="/git-worktree/remove" className="text-primary font-semibold hover:underline">
              git worktree remove
            </Link>.
          </p>
        </section>
      </article>
    </TutorialContainer>
  );
}
