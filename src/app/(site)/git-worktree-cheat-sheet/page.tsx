import type { Metadata } from "next";
import Image from "next/image";
import VideoModal from "@/components/Hero/VideoModal";
import {
  ScrollToCommandsButton,
  TrackedLink,
} from "@/components/CheatSheet/ClientControls";
import {
  CommandReference,
  ComparisonSection,
  QuickReferenceTable,
} from "@/components/CheatSheet/Reference";
import { faqs } from "@/components/CheatSheet/data";

const canonical = "https://www.worktreewise.com/git-worktree-cheat-sheet";
const HERO_VIDEO_ID = process.env.NEXT_PUBLIC_HERO_VIDEO_ID;

const additionalWorktreeWiseFeatures = [
  {
    title: "Rename Git worktrees safely",
    description:
      "Rename a worktree and its associated branch together from one visual action.",
    href: "https://docs.worktreewise.com/git-worktrees/rename",
    linkLabel: "Rename a Git Worktree",
    icon: "Aa",
    image: "/images/v1.1.0/19-worktree-rename.png",
    imageAlt: "Rename a Git worktree in WorktreeWise",
  },
  {
    title: "Consistent naming patterns",
    description:
      "Use repository and branch placeholders to keep worktree folders recognizable and organized.",
    href: "https://docs.worktreewise.com/git-worktrees/naming-pattern",
    linkLabel: "Git Worktree Naming Pattern",
    icon: "{}",
    image: "/images/v1.1.0/20-worktree-change-pattern.png",
    imageAlt: "Configure a custom Git worktree naming pattern",
  },
  {
    title: "Open in your favorite IDE",
    description:
      "Configure your editors once, then launch any worktree with its familiar IDE configuration.",
    href: "https://docs.worktreewise.com/integrations/ide",
    linkLabel: "Opening a Worktree in an IDE",
    icon: "IDE",
    image: "/images/v1.1.0/17-worktree-actions-editors.png",
    imageAlt: "Open a WorktreeWise worktree in a configured editor",
  },
  {
    title: "WorktreeWise for JetBrains",
    description:
      "Manage and open WorktreeWise worktrees directly from supported JetBrains IDEs.",
    href: "https://docs.worktreewise.com/integrations/jetbrains-plugin",
    linkLabel: "WorktreeWise for JetBrains Plugin",
    icon: "JB",
    image: "/images/cheatsheet/worktreewise-for-jetbrains-plugin.webp",
    imageAlt: "WorktreeWise plugin inside a JetBrains IDE",
  },
] as const;

export const metadata: Metadata = {
  title: "Git Worktree Cheat Sheet — Commands, Examples & WorktreeWise",
  description:
    "A practical Git worktree cheat sheet with native commands, examples, common problems, and accurate WorktreeWise equivalents.",
  keywords: [
    "git worktree cheat sheet",
    "git worktree commands",
    "git worktree add",
    "git worktree remove",
    "git worktree prune",
    "git worktree move",
    "git worktree lock",
    "git worktree repair",
    "git worktree multiple branches",
  ],
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Git Worktree Cheat Sheet — Commands & Examples",
    description:
      "Create, list, move, lock, remove, prune, and repair Git worktrees with concise examples.",
    url: canonical,
    siteName: "WorktreeWise",
    type: "article",
    images: [
      {
        url: "https://www.worktreewise.com/images/v1.1.0/16-worktree-actions.png",
        width: 1200,
        height: 630,
        alt: "Git worktree cheat sheet by WorktreeWise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Git Worktree Cheat Sheet",
    description:
      "Native Git worktree commands, examples, troubleshooting, and a command generator.",
    images: [
      "https://www.worktreewise.com/images/v1.1.0/16-worktree-actions.png",
    ],
  },
};

const problems = [
  {
    title: "Branch is already checked out",
    answer:
      "Git normally protects a local branch from being checked out in two worktrees simultaneously. Use the existing worktree, choose another branch, create a new branch, or use detached mode when you only need to inspect a commit.",
    link: "/blog/git-worktree-vs-branch",
    label: "Worktrees and branches explained",
  },
  {
    title: "Worktree directory was deleted manually",
    answer:
      "The directory may be gone while its administrative record remains. Run git worktree prune --dry-run, review the result, then run git worktree prune to clean stale metadata.",
    link: "/blog/git-worktree-prune",
    label: "Pruning stale worktrees",
  },
  {
    title: "Git won't remove a worktree with local changes",
    answer:
      "Normal removal refuses to discard modified or untracked files. Commit or stash wanted work first. Use --force only after confirming that losing the local files is acceptable.",
    link: "/blog/git-worktree-remove",
    label: "Remove worktrees safely",
  },
  {
    title: "Worktree metadata is broken",
    answer:
      "If the repository or linked directory was moved outside Git, git worktree repair can reconnect the administrative metadata. Pass affected worktree paths when Git cannot discover them automatically.",
  },
  {
    title: "Worktree path moved outside Git",
    answer:
      "Prefer git worktree move for a linked worktree. If a manual move already happened, run git worktree repair from the main repository and provide the new path when needed.",
  },
];

const workflowFeatures = [
  [
    "Visual management",
    "List, create, rename, move, delete, lock, unlock, and prune worktrees from one interface.",
  ],
  [
    "IDE and terminal access",
    "Open the correct worktree directly in your editor or terminal without navigating paths manually.",
  ],
  [
    "Workflows and hooks",
    "Run reusable setup commands and workflows sequentially or in parallel across selected worktrees.",
  ],
  [
    "Git log and diff",
    "Inspect history and compare worktrees, branches, tags, and commits without leaving the workflow.",
  ],
];

export default function GitWorktreeCheatSheetPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="cheat-sheet-page bg-white dark:bg-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative overflow-hidden bg-[#f7f9ff] pb-20 pt-40 dark:bg-[#090d16] lg:pb-24 lg:pt-44">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(74,108,247,0.16),transparent_35%)]"
          aria-hidden="true"
        />
        <div className="container relative">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Free developer reference
            </p>
            <h1 className="text-4xl font-bold leading-tight text-dark dark:text-white sm:text-5xl lg:text-6xl">
              Git Worktree Cheat Sheet
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-body-color dark:text-dark-6 sm:text-xl">
              A practical reference for creating, listing, moving, locking,
              removing, cleaning up, and troubleshooting Git worktrees.
            </p>
            <p className="mt-3 text-base text-body-color dark:text-dark-6">
              Native Git commands, examples, common problems, and WorktreeWise
              equivalents.
            </p>
            <div className="print-hidden mt-8 flex flex-wrap gap-4">
              <ScrollToCommandsButton />
            </div>
          </div>
        </div>
      </section>

      <section
        id="quick-reference"
        className="scroll-mt-24 py-16 dark:bg-dark lg:py-24"
      >
        <div className="container">
          <SectionHeading
            eyebrow="Start here"
            title="Git Worktree Quick Reference"
            copy="The commands developers reach for most often. Copy one directly or jump to its explanation."
          />
          <div className="quick-reference-print-target">
            <QuickReferenceTable />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9ff] py-16 dark:bg-[#0b101a] lg:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="Workflow comparison"
            title="Same workflow. Two approaches."
            copy="Native Git provides the worktree primitives. WorktreeWise coordinates the practical steps around them."
          />
          <ComparisonSection />
        </div>
      </section>

      <section id="commands" className="py-16 dark:bg-dark lg:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="Reference"
            title="Git Worktree Commands"
            copy="Concise syntax, examples, options, and the mistakes worth remembering."
          />
          <CommandReference />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7f9ff] py-16 dark:bg-[#0b101a] lg:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[52rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative">
          <SectionHeading
            eyebrow="Beyond native commands"
            title="WorktreeWise adds more to your worktree workflow"
            copy="Git provides the foundation. WorktreeWise adds organization, editor integration, and safer visual actions around it."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {additionalWorktreeWiseFeatures.map((feature) => (
              <article
                key={feature.title}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stroke bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_22px_50px_-30px_rgba(47,84,235,0.55)] dark:border-white/10 dark:bg-dark-2"
              >
                <div className="product-shot-frame relative m-4 overflow-hidden rounded-xl p-3 sm:m-5">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    width={1600}
                    height={900}
                    sizes="(max-width: 1024px) 92vw, 560px"
                    className="relative z-10 aspect-video w-full rounded-lg object-contain shadow-[0_20px_45px_-24px_rgba(15,23,42,0.75)]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-6 pb-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-black text-primary transition group-hover:bg-primary group-hover:text-white">
                      {feature.icon}
                    </span>
                    <h3 className="text-xl font-bold text-dark dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-body-color dark:text-dark-6">
                    {feature.description}
                  </p>
                  <a
                    href={feature.href}
                    target="_blank"
                    rel="noreferrer"
                    className="print-hidden mt-5 inline-flex font-semibold text-primary hover:underline"
                  >
                    {feature.linkLabel} →
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="print-hidden mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#09101f] p-7 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-bold text-white">
                Discover the complete WorktreeWise workflow
              </h3>
              <p className="mt-2 text-slate-300">
                Explore worktrees, integrations, workflows, Git operations, and
                AI-agent workspaces.
              </p>
            </div>
            <a
              href="https://docs.worktreewise.com/"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition hover:bg-primary/90"
            >
              See WorktreeWise documentation →
            </a>
          </div>
        </div>
      </section>

      <section
        id="worktree-hooks-editor"
        className="bg-[#f7f9ff] py-16 dark:bg-[#0b101a] lg:py-24"
      >
        <div className="container">
          <WorkflowSpotlight
            eyebrow="Automated worktree setup"
            title="Create a Git worktree + hooks + automatic editor configuration"
            copy="Turn worktree creation into a repeatable developer workflow. WorktreeWise creates the linked worktree, runs your configured hooks, and opens the finished project in the correct editor with its worktree context ready."
            steps={[
              "Create the worktree and branch visually",
              "Run post-create setup hooks automatically",
              "Open the new worktree in your selected IDE",
              "Preserve the editor configuration and project context",
            ]}
            image="/images/v1.1.0/09-create-worktree-hooks.png"
            imageWidth={1920}
            imageHeight={991}
            imageAlt="WorktreeWise creating a Git worktree with automatic setup hooks"
          />
        </div>
      </section>

      <section
        id="worktree-hooks-isolated-environments"
        className="py-16 dark:bg-dark lg:py-24"
      >
        <div className="container">
          <WorkflowSpotlight
            eyebrow="Isolated development environments"
            title="Create a Git worktree + hooks + isolated environments"
            copy="Each Git worktree has its own working directory. Use WorktreeWise hooks to prepare the environment for that directory—install dependencies, create local configuration, and run setup commands without mixing files between branches."
            steps={[
              "Keep per-worktree environment files in separate directories",
              "Install or restore dependencies through setup hooks",
              "Run branch-specific initialization commands",
              "Repeat the same environment setup for every new worktree",
            ]}
            image="/images/v1.1.0/05-workflows.png"
            darkImage="/images/v1.1.0/05-workflows.png"
            imageWidth={3840}
            imageHeight={2160}
            imageAlt="WorktreeWise workflow automation used to prepare isolated Git worktree environments"
            reverse
          />
        </div>
      </section>

      <section className="bg-[#f7f9ff] py-16 dark:bg-[#0b101a] lg:py-24">
        <div className="container max-w-5xl">
          <SectionHeading
            eyebrow="Troubleshooting"
            title="Common Git Worktree Problems"
            copy="Quick answers for the failure modes that most often interrupt parallel branch work."
          />
          <div className="space-y-3">
            {problems.map((problem) => (
              <details
                key={problem.title}
                className="group rounded-xl border border-stroke bg-white p-5 open:shadow-sm dark:border-white/10 dark:bg-dark-2"
              >
                <summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-dark marker:hidden dark:text-white">
                  {problem.title}
                  <span
                    className="float-right text-primary transition group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-body-color dark:text-dark-6">
                  {problem.answer}
                </p>
                {problem.link && (
                  <TrackedLink
                    href={problem.link}
                    eventName="cheat_sheet_blog_clicked"
                    eventLabel={problem.link}
                    className="mt-3 inline-flex font-semibold text-primary hover:underline"
                  >
                    {problem.label} →
                  </TrackedLink>
                )}
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 dark:bg-dark lg:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="Beyond the CLI"
            title="Git creates the worktree. What about everything around it?"
            copy="Git handles the linked checkout. Developers still need to open the right tools, reproduce setup, run scripts, navigate worktrees, clean up, and inspect changes."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {workflowFeatures.map(([title, description]) => (
              <article
                key={title}
                className="rounded-2xl border border-stroke p-6 dark:border-white/10 dark:bg-dark-2"
              >
                <h3 className="text-lg font-bold text-dark dark:text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-body-color dark:text-dark-6">
                  {description}
                </p>
              </article>
            ))}
          </div>
          <TrackedLink
            href="/#features"
            eventName="cheat_sheet_cta_clicked"
            eventLabel="explore_worktreewise"
            className="print-hidden mt-8 inline-flex rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
          >
            Explore WorktreeWise
          </TrackedLink>
        </div>
      </section>

      <section className="bg-[#f7f9ff] py-16 dark:bg-[#0b101a] lg:py-24">
        <div className="container max-w-5xl">
          <SectionHeading
            eyebrow="Interactive tool"
            title="Need the exact command for your setup?"
            copy="Use the dedicated visual generator to choose a path, branch strategy, and starting point without memorizing every flag."
          />
          <div className="print-hidden relative overflow-hidden rounded-3xl bg-[#09101f] p-7 shadow-[0_28px_80px_-32px_rgba(47,84,235,0.65)] sm:p-10">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/35 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <div>
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
                  Free browser tool
                </span>
                <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                  Generate a ready-to-copy command
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-slate-300">
                  Your selections stay in the browser. The generator creates
                  command text and never executes anything on your machine.
                </p>
              </div>
              <TrackedLink
                href="/git-worktree-command-generator"
                eventName="cheat_sheet_generator_opened"
                eventLabel="dedicated_generator"
                className="inline-flex shrink-0 items-center rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Open command generator →
              </TrackedLink>
            </div>
          </div>
          <div className="print-hidden mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-body-color dark:text-dark-6">
              Creating and managing worktrees frequently? WorktreeWise handles
              these workflows visually.
            </p>
            <TrackedLink
              href="/pricing?utm_source=cheat_sheet&utm_medium=generator_link&utm_campaign=git_worktree_cheat_sheet"
              eventName="cheat_sheet_cta_clicked"
              eventLabel="generator_try"
              className="font-semibold text-primary hover:underline"
            >
              Try WorktreeWise →
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="commercial-cta bg-primary py-16 lg:py-20">
        <div className="container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Spend less time managing worktrees
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
              Git worktrees are powerful. WorktreeWise handles the repetitive
              workflow around them so you can focus on your branches and code.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <TrackedLink
                href="/pricing?utm_source=cheat_sheet&utm_medium=cta&utm_campaign=git_worktree_cheat_sheet"
                eventName="cheat_sheet_trial_clicked"
                eventLabel="final_cta"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-primary hover:bg-slate-100"
              >
                Try WorktreeWise Free
              </TrackedLink>
              {HERO_VIDEO_ID && (
                <VideoModal
                  videoId={HERO_VIDEO_ID}
                  triggerLabel="Watch Demo"
                  triggerClassName="rounded-lg border border-white/50 px-6 py-3 font-semibold text-white hover:bg-white/10"
                />
              )}
            </div>
          </div>
          <div className="product-shot-frame relative overflow-hidden rounded-2xl p-4">
            <Image
              src="/images/v1.1.0/24-multiple-ai-agents.png"
              alt="WorktreeWise dashboard for managing Git worktrees"
              width={1536}
              height={992}
              sizes="(max-width: 1024px) 94vw, 620px"
              className="relative z-10 w-full rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="py-16 dark:bg-dark lg:py-24">
        <div className="container max-w-5xl">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="Git Worktree FAQ"
            copy="Short, technically accurate answers to common worktree questions."
          />
          <div className="grid gap-3 md:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <details
                key={question}
                className="rounded-xl border border-stroke p-5 dark:border-white/10 dark:bg-dark-2"
              >
                <summary className="cursor-pointer font-semibold text-dark dark:text-white">
                  {question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-body-color dark:text-dark-6">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-body-color dark:text-dark-6">
        {copy}
      </p>
    </div>
  );
}

function WorkflowSpotlight({
  eyebrow,
  title,
  copy,
  steps,
  image,
  darkImage,
  imageWidth,
  imageHeight,
  imageAlt,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  steps: string[];
  image: string;
  darkImage?: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <div className={reverse ? "lg:order-2" : ""}>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-bold leading-tight text-dark dark:text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-body-color dark:text-dark-6">
          {copy}
        </p>
        <ol className="mt-7 space-y-4">
          {steps.map((step, index) => (
            <li key={step} className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {index + 1}
              </span>
              <span className="pt-1 font-medium text-dark dark:text-white">
                {step}
              </span>
            </li>
          ))}
        </ol>
        <TrackedLink
          href="/pricing?utm_source=cheat_sheet&utm_medium=workflow&utm_campaign=git_worktree_cheat_sheet"
          eventName="cheat_sheet_cta_clicked"
          eventLabel={
            reverse ? "isolated_env_workflow" : "hooks_editor_workflow"
          }
          className="print-hidden mt-8 inline-flex rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
        >
          Automate this workflow with WorktreeWise
        </TrackedLink>
      </div>
      <div
        className={`product-shot-frame relative min-w-0 overflow-hidden rounded-2xl p-4 sm:p-6 ${reverse ? "lg:order-1" : ""}`}
      >
        <Image
          src={image}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          sizes="(max-width: 1024px) 94vw, 600px"
          className={`relative z-10 w-full rounded-xl shadow-2xl ${darkImage ? "dark:hidden" : ""}`}
        />
        {darkImage && (
          <Image
            src={darkImage}
            alt={`${imageAlt} in dark mode`}
            width={imageWidth}
            height={imageHeight}
            sizes="(max-width: 1024px) 94vw, 600px"
            className="relative z-10 hidden w-full rounded-xl shadow-2xl dark:block"
          />
        )}
      </div>
    </div>
  );
}
