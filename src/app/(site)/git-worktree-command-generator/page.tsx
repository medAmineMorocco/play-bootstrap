import type { Metadata } from "next";
import {
  CommandGenerator,
  ScrollToGeneratorButton,
  TrackedLink,
} from "@/components/CheatSheet/ClientControls";

const canonical = "https://www.worktreewise.com/git-worktree-command-generator";

export const metadata: Metadata = {
  title: "Git Worktree Command Generator — Build Commands Visually",
  description:
    "Generate Git worktree commands for creating, listing, moving, removing, locking, unlocking, and pruning worktrees.",
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Git Worktree Command Generator",
    description:
      "Build, validate, explain, and share ready-to-use Git worktree commands.",
    url: canonical,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Git Worktree Command Generator",
    description:
      "Build a correct Git worktree command without memorizing every flag.",
  },
};

const steps = [
  {
    number: "01",
    title: "Choose the destination",
    copy: "Enter the directory where Git should create the additional working tree.",
  },
  {
    number: "02",
    title: "Select a branch strategy",
    copy: "Create a new branch, use an existing one, or work from a detached commit.",
  },
  {
    number: "03",
    title: "Copy and run",
    copy: "Review the generated command, copy it, and run it from your repository.",
  },
];

export default function GitWorktreeCommandGeneratorPage() {
  return (
    <main className="overflow-hidden bg-white pt-[72px] dark:bg-dark">
      <section className="relative border-b border-stroke bg-[#f5f8ff] py-16 dark:border-white/10 dark:bg-[#080d17] lg:py-24">
        <div className="absolute left-1/2 top-0 h-72 w-[56rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl dark:bg-primary/20" />
        <div className="container relative max-w-5xl text-center">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
            Free interactive tool
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight text-dark dark:text-white sm:text-5xl lg:text-6xl">
            Build the right Git worktree command in seconds
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body-color dark:text-dark-6">
            Choose an operation, configure its options, and get a validated,
            explained, ready-to-copy command. Everything stays in your browser.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ScrollToGeneratorButton />
            <TrackedLink
              href="/git-worktree-cheat-sheet"
              eventName="generator_cheat_sheet_opened"
              eventLabel="hero"
              className="rounded-xl border border-stroke bg-white px-6 py-3.5 font-semibold text-dark transition hover:border-primary hover:text-primary dark:border-white/15 dark:bg-white/5 dark:text-white"
            >
              View the cheat sheet
            </TrackedLink>
          </div>
        </div>
      </section>

      <section id="generator" className="scroll-mt-24 py-16 lg:py-24">
        <div className="container max-w-5xl">
          <div className="mb-10 max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Command builder
            </span>
            <h2 className="mt-3 text-3xl font-bold text-dark dark:text-white sm:text-4xl">
              Configure your command
            </h2>
            <p className="mt-4 leading-relaxed text-body-color dark:text-dark-6">
              Start with a preset or build any common Git worktree operation,
              then copy the command or share the configured URL.
            </p>
          </div>
          <CommandGenerator />
        </div>
      </section>

      <section className="bg-[#f7f9ff] py-16 dark:bg-[#0b101a] lg:py-24">
        <div className="container max-w-5xl">
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-stroke bg-white p-6 shadow-sm dark:border-white/10 dark:bg-dark-2"
              >
                <span className="text-sm font-black tracking-widest text-primary">
                  {step.number}
                </span>
                <h2 className="mt-4 text-xl font-bold text-dark dark:text-white">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-body-color dark:text-dark-6">
                  {step.copy}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#09101f] p-8 shadow-[0_24px_70px_-32px_rgba(47,84,235,0.7)] sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Prefer a visual workflow every day?
              </h2>
              <p className="mt-2 max-w-2xl text-slate-300">
                WorktreeWise creates and manages worktrees, hooks, workflows,
                and isolated environments from one interface.
              </p>
            </div>
            <TrackedLink
              href="/pricing?utm_source=command_generator&utm_medium=cta&utm_campaign=git_worktree_tools"
              eventName="generator_cta_clicked"
              eventLabel="pricing"
              className="shrink-0 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition hover:bg-primary/90"
            >
              Try WorktreeWise →
            </TrackedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
