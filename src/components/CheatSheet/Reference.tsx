import { CommandItem, commandGroups, quickReference } from "./data";
import { CopyButton, TrackedLink } from "./ClientControls";

export function CommandBlock({
  command,
  label,
}: {
  command: string;
  label?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#090d16] shadow-[0_20px_45px_-32px_rgba(15,23,42,0.8)]">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          {label || "bash"}
        </span>
        <CopyButton command={command} label={`Copy command: ${command}`} />
      </div>
      <pre className="m-0 overflow-x-auto bg-transparent p-4 text-sm leading-7 text-slate-100 sm:p-5">
        <code>{command}</code>
      </pre>
    </div>
  );
}

export function QuickReferenceTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-stroke bg-white shadow-sm dark:border-white/10 dark:bg-dark-2">
      <div className="hidden grid-cols-[1fr_1.65fr_1fr] bg-dark px-5 py-4 text-sm font-semibold text-white md:grid">
        <span>Task</span>
        <span>Native Git</span>
        <span>WorktreeWise</span>
      </div>
      <div className="divide-y divide-stroke dark:divide-white/10">
        {quickReference.map((row) => (
          <div
            key={row.task}
            className="grid gap-3 px-4 py-5 md:grid-cols-[1fr_1.65fr_1fr] md:items-center md:px-5"
          >
            <a
              href={row.href}
              target="_self"
              className="font-semibold text-dark hover:text-primary dark:text-white"
            >
              <span className="text-xs uppercase tracking-wide text-body-color dark:text-dark-6 md:hidden">
                Task ·{" "}
              </span>
              {row.task}
            </a>
            <div className="min-w-0">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-body-color dark:text-dark-6 md:hidden">
                Native Git
              </span>
              <div className="flex min-w-0 items-center gap-2">
                <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-lg bg-slate-100 px-3 py-2 font-mono text-xs text-slate-800 dark:bg-[#090d16] dark:text-slate-200 sm:text-sm">
                  {row.command}
                </code>
                <CopyButton
                  command={row.command}
                  label={`Copy ${row.task} command`}
                />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-[10px] font-bold uppercase tracking-wide text-body-color dark:text-dark-6">
                  Useful options
                </span>
                {row.options.map((option) => (
                  <code
                    key={option}
                    className="rounded-md border border-primary/15 bg-primary/5 px-2 py-1 font-mono text-[11px] text-primary dark:border-primary/25 dark:bg-primary/10"
                  >
                    {option}
                  </code>
                ))}
              </div>
            </div>
            <div className="text-sm text-body-color dark:text-dark-6">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide md:hidden">
                WorktreeWise
              </span>
              {row.worktreeWise}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommandCard({ item }: { item: CommandItem }) {
  return (
    <article
      id={item.id}
      className="min-w-0 scroll-mt-28 rounded-2xl border border-stroke bg-white p-5 shadow-sm dark:border-white/10 dark:bg-dark-2 sm:p-7"
    >
      <div className="mb-4">
        <h4 className="text-xl font-bold text-dark dark:text-white">
          {item.title}
        </h4>
      </div>
      <CommandBlock command={item.command} />
      {item.syntax && (
        <p className="mt-4 overflow-x-auto text-sm text-body-color dark:text-dark-6">
          <strong className="text-dark dark:text-white">Syntax:</strong>{" "}
          <code className="whitespace-nowrap font-mono text-primary">
            {item.syntax}
          </code>
        </p>
      )}
      <p className="mt-4 leading-relaxed text-body-color dark:text-dark-6">
        {item.explanation}
      </p>
      {item.options?.length ? (
        <ul className="mt-3 space-y-2 text-sm text-body-color dark:text-dark-6">
          {item.options.map((option) => (
            <li key={option} className="flex gap-2">
              <span className="text-primary">•</span>
              {option}
            </li>
          ))}
        </ul>
      ) : null}
      {item.note && (
        <p className="mt-4 rounded-lg border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-400/10 dark:text-amber-100">
          <strong>Note:</strong> {item.note}
        </p>
      )}
      {item.article && (
        <TrackedLink
          href={item.article.href}
          eventName="cheat_sheet_blog_clicked"
          eventLabel={item.article.href}
          className="mt-4 inline-flex font-semibold text-primary hover:underline"
        >
          {item.article.label} →
        </TrackedLink>
      )}
    </article>
  );
}

function CommandComparison({ item }: { item: CommandItem }) {
  const equivalent = getEquivalent(item.id);

  if (!equivalent) return <CommandCard item={item} />;

  return (
    <div className="grid items-stretch gap-5 lg:grid-cols-2">
      <CommandCard item={item} />
      <aside
        className="min-w-0 rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:bg-primary/10 sm:p-7"
        aria-label={`WorktreeWise equivalent for ${item.title}`}
      >
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
          WorktreeWise equivalent
        </p>
        <div className="mt-5 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-lg shadow-primary/20">
            WTW
          </div>
          <h5 className="text-xl font-bold text-dark dark:text-white">
            {equivalent.docsLabel}
          </h5>
        </div>
        <div className="product-shot-frame relative mt-5 overflow-hidden rounded-xl p-3 sm:p-4">
          <img
            src={equivalent.image}
            alt={equivalent.imageAlt}
            width={1600}
            height={900}
            loading="lazy"
            className="relative z-10 h-auto w-full rounded-lg shadow-[0_22px_48px_-20px_rgba(15,23,42,0.75)] dark:shadow-[0_26px_55px_-20px_rgba(0,0,0,0.95)]"
          />
        </div>
        <p className="mt-3 leading-relaxed text-body-color dark:text-dark-6">
          {equivalent.description}
        </p>
        <a
          href={equivalent.docsUrl}
          target="_blank"
          rel="noreferrer"
          className="print-hidden mt-5 inline-flex font-semibold text-primary hover:underline"
        >
          View {equivalent.docsLabel} documentation →
        </a>
      </aside>
    </div>
  );
}

function getEquivalent(id: string) {
  const equivalents: Record<string, DocumentationEquivalent> = {
    "existing-branch": createEquivalent(
      "create#from-an-existing-branch",
      "Create a Git Worktree",
      "13-create-worktree-from-local-branch.png",
      "Create a worktree from an existing branch in WorktreeWise",
      "Select an existing branch, choose its destination, and create the linked worktree visually.",
    ),
    "new-branch": createEquivalent(
      "create#from-head",
      "Create a Git Worktree",
      "08-create-worktree-configured.png",
      "Create a new branch and worktree from HEAD in WorktreeWise",
      "Create a named branch and its worktree from HEAD, with the destination and hooks configured in one dialog.",
    ),
    "specific-commit": createEquivalent(
      "create#from-a-git-commit",
      "Create from a Git Commit",
      "44-create-worktree-from-commit.png",
      "Create a worktree from a Git commit in WorktreeWise",
      "Locate the commit in Git Log and create a worktree directly from its context menu.",
    ),
    "list-worktrees": createEquivalent(
      "list",
      "List Git Worktrees",
      "04-worktree-overview.png",
      "Worktree list in the WorktreeWise sidebar",
      "See every linked worktree and the total count in the Worktrees panel.",
    ),
    "move-worktree": createEquivalent(
      "move",
      "Move a Git Worktree",
      "21-worktree-move.png",
      "Change a worktree folder in WorktreeWise",
      "Choose Change Folder on the worktree, select the destination, and confirm the move.",
    ),
    "remove-worktree": createEquivalent(
      "delete",
      "Delete a Git Worktree",
      "18b-worktree-actions-delete-options.png",
      "Delete a worktree in WorktreeWise",
      "Delete only the worktree or remove both the worktree and its branch from a clear confirmation dialog.",
    ),
    "lock-worktree": createEquivalent(
      "lock",
      "Lock a Git Worktree",
      "22-worktree-lock.png",
      "Lock a worktree in WorktreeWise",
      "Use the Lock action on the selected worktree to protect it from changes.",
    ),
    "unlock-worktree": createEquivalent(
      "unlock",
      "Unlock a Git Worktree",
      "16-worktree-actions.png",
      "Unlock a worktree in WorktreeWise",
      "Use the documented Unlock action to make the protected worktree available again.",
    ),
    "prune-worktrees": createEquivalent(
      "prune",
      "Prune Git Worktrees",
      "25-prune-worktrees.png",
      "Prune invalid worktrees in WorktreeWise",
      "Use Prune Worktrees in the sidebar to scan for and remove invalid worktree entries.",
    ),
    "repair-worktrees": createEquivalent(
      "repair",
      "Repair a Damaged Worktree",
      "39-repair-worktree.png",
      "Repair action for a damaged Git worktree in WorktreeWise",
      "Select a damaged worktree and use Repair to reconnect its current directory without deleting its files or branch.",
    ),
  };

  return equivalents[id];
}

type DocumentationEquivalent = {
  docsUrl: string;
  docsLabel: string;
  image: string;
  imageAlt: string;
  description: string;
};

function createEquivalent(
  docsPath: string,
  docsLabel: string,
  imageFile: string,
  imageAlt: string,
  description: string,
): DocumentationEquivalent {
  return {
    docsUrl: `https://docs.worktreewise.com/git-worktrees/${docsPath}`,
    docsLabel,
    image: `/images/v1.1.0/${imageFile}`,
    imageAlt,
    description,
  };
}

export function CommandReference() {
  return (
    <div className="space-y-14">
      {commandGroups.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-28">
          <h3 className="text-2xl font-bold text-dark dark:text-white sm:text-3xl">
            {group.title}
          </h3>
          <p className="mb-6 mt-2 text-body-color dark:text-dark-6">
            {group.description}
          </p>
          <div className="space-y-8">
            {group.commands.map((item) => (
              <CommandComparison key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function ComparisonSection() {
  const nativeWorkflow =
    "git worktree add ../feature-auth -b feature/auth main\ncd ../feature-auth\ncp ../main/.env .env\n# configure environment if needed\nidea .";
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-stroke bg-white p-6 dark:border-white/10 dark:bg-dark-2">
        <p className="mb-4 text-sm font-bold uppercase tracking-wider text-body-color dark:text-dark-6">
          Native Git
        </p>
        <CommandBlock command={nativeWorkflow} label="terminal workflow" />
        <p className="mt-4 text-sm leading-relaxed text-body-color dark:text-dark-6">
          Git creates the linked checkout. Your setup files, environment, and
          editor launch remain separate workflow steps.
        </p>
      </div>
      <div className="min-w-0 rounded-2xl border border-primary/20 bg-primary/5 p-6 dark:bg-primary/10">
        <p className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">
          WorktreeWise
        </p>
        <div className="product-shot-frame relative overflow-hidden rounded-xl p-3">
          <img
            src="/images/v1.1.0/09-create-worktree-hooks.png"
            alt="Create a Git worktree with hooks in WorktreeWise"
            width={1600}
            height={900}
            loading="lazy"
            className="relative z-10 h-auto w-full rounded-lg"
          />
        </div>
        <p className="mt-5 text-lg font-semibold text-dark dark:text-white">
          Create Worktree → Configure hooks → Open in IDE
        </p>
        <a
          href="https://docs.worktreewise.com/git-worktrees/create#hooks"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex font-semibold text-primary hover:underline"
        >
          View worktree hooks documentation →
        </a>
      </div>
    </div>
  );
}
