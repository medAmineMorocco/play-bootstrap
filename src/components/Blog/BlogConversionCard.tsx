import Link from "next/link";

type BlogConversionCardProps = {
  compact?: boolean;
  source: string;
};

export default function BlogConversionCard({
  compact = false,
  source,
}: BlogConversionCardProps) {
  const pricingHref = `/pricing?utm_source=blog&utm_medium=cta&utm_campaign=${encodeURIComponent(source)}&utm_content=${compact ? "inline" : "end"}`;

  return (
    <aside
      className={`not-prose overflow-hidden rounded-xl border border-primary/20 bg-primary/5 ${compact ? "p-6" : "p-8 text-center"}`}
      aria-label="Try WorktreeWise"
    >
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
        Spend less time managing worktrees
      </p>
      <h2 className="mb-3 text-2xl font-bold text-dark dark:text-white">
        Try WorktreeWise free
      </h2>
      <p className={`text-body-color dark:text-dark-6 ${compact ? "mb-5" : "mx-auto mb-6 max-w-2xl"}`}>
        Create and organize Git worktrees visually, open them in your IDE, and
        run repeatable workflows across branches. No credit card required.
      </p>
      <div className={`flex flex-wrap gap-3 ${compact ? "" : "justify-center"}`}>
        <Link
          href={pricingHref}
          className="rounded-md bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary/90"
        >
          Start free trial
        </Link>
        <Link
          href="/#features"
          className="rounded-md border border-primary px-5 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white"
        >
          See how it works
        </Link>
      </div>
      <p className="mt-4 text-sm text-body-color dark:text-dark-6">
        Available for Windows, macOS, and Linux.
      </p>
    </aside>
  );
}
