import Link from "next/link";

export default function CheatSheetLink() {
  return (
    <aside
      className="not-prose rounded-xl border border-primary/20 bg-primary/5 p-5"
      aria-label="Git Worktree Cheat Sheet"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">
        Quick reference
      </p>
      <Link
        href="/git-worktree-cheat-sheet"
        target="_self"
        className="mt-2 inline-flex text-lg font-bold text-dark hover:text-primary dark:text-white dark:hover:text-primary"
      >
        Git Worktree Cheat Sheet →
      </Link>
      <p className="mt-2 text-sm text-body-color dark:text-dark-6">
        View all native commands, examples, troubleshooting tips, and the
        interactive command generator.
      </p>
    </aside>
  );
}
