"use client";

import { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackCheatSheetEvent(
  eventName: string,
  parameters: Record<string, string> = {},
) {
  window.gtag?.("event", eventName, {
    page_type: "git_worktree_cheat_sheet",
    ...parameters,
  });
}

export function CopyButton({
  command,
  label = "Copy command",
}: {
  command: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    trackCheatSheetEvent("cheat_sheet_command_copied", { command });
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="print-hidden inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-primary/60 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <span aria-hidden="true">{copied ? "✓" : "⧉"}</span>
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

export function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        trackCheatSheetEvent("cheat_sheet_print_clicked");
        window.print();
      }}
      className={className}
    >
      Print / Save as PDF
    </button>
  );
}

export function TrackedLink({
  href,
  eventName,
  eventLabel,
  className,
  children,
}: {
  href: string;
  eventName: string;
  eventLabel: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_self"
      className={className}
      onClick={() => trackCheatSheetEvent(eventName, { label: eventLabel })}
    >
      {children}
    </a>
  );
}

export function ScrollToGeneratorButton() {
  return (
    <button
      type="button"
      onClick={() =>
        document
          .getElementById("generator")
          ?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      className="rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary/90"
    >
      Build my command
    </button>
  );
}

export function ScrollToCommandsButton() {
  return (
    <button
      type="button"
      onClick={() =>
        document
          .getElementById("commands")
          ?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      className="rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
    >
      Jump to commands
    </button>
  );
}

type Operation =
  | "add"
  | "list"
  | "move"
  | "remove"
  | "lock"
  | "unlock"
  | "prune";
type AddMode = "new" | "existing" | "detached";
type Platform = "posix" | "windows";

const operations: Array<{ value: Operation; label: string }> = [
  { value: "add", label: "Create" },
  { value: "list", label: "List" },
  { value: "move", label: "Move" },
  { value: "remove", label: "Remove" },
  { value: "lock", label: "Lock" },
  { value: "unlock", label: "Unlock" },
  { value: "prune", label: "Prune" },
];

const presets = [
  {
    label: "Feature",
    path: "../feature-auth",
    branch: "feature/auth",
    start: "main",
  },
  {
    label: "Bug fix",
    path: "../fix-login",
    branch: "fix/login",
    start: "main",
  },
  {
    label: "PR review",
    path: "../review-pr-42",
    branch: "review/pr-42",
    start: "origin/main",
  },
] as const;

const inputClass =
  "mt-2 w-full rounded-lg border border-stroke bg-white px-4 py-3 text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-dark dark:text-white";

function quote(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "<value>";
  return /\s/.test(trimmed) ? `\"${trimmed.replaceAll('"', '\\"')}\"` : trimmed;
}

function convertPath(value: string, target: Platform) {
  return target === "windows"
    ? value.replaceAll("/", "\\")
    : value.replaceAll("\\", "/");
}

export function CommandGenerator() {
  const [operation, setOperation] = useState<Operation>("add");
  const [mode, setMode] = useState<AddMode>("new");
  const [platform, setPlatform] = useState<Platform>("posix");
  const [path, setPath] = useState("../feature-auth");
  const [destination, setDestination] = useState("../worktrees/feature-auth");
  const [branch, setBranch] = useState("feature/auth");
  const [startPoint, setStartPoint] = useState("main");
  const [force, setForce] = useState(false);
  const [verbose, setVerbose] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedOperation = params.get("operation") as Operation | null;
    const requestedMode = params.get("mode") as AddMode | null;
    const requestedPlatform = params.get("platform") as Platform | null;
    if (operations.some(({ value }) => value === requestedOperation))
      setOperation(requestedOperation!);
    if (["new", "existing", "detached"].includes(requestedMode || ""))
      setMode(requestedMode!);
    if (["posix", "windows"].includes(requestedPlatform || "")) {
      setPlatform(requestedPlatform!);
      if (!params.has("path"))
        setPath(convertPath("../feature-auth", requestedPlatform!));
      if (!params.has("destination"))
        setDestination(
          convertPath("../worktrees/feature-auth", requestedPlatform!),
        );
    }
    if (params.has("path"))
      setPath(
        convertPath(params.get("path") || "", requestedPlatform || "posix"),
      );
    if (params.has("destination"))
      setDestination(
        convertPath(
          params.get("destination") || "",
          requestedPlatform || "posix",
        ),
      );
    if (params.has("branch")) setBranch(params.get("branch") || "");
    if (params.has("start")) setStartPoint(params.get("start") || "");
    setForce(params.get("force") === "1");
    setVerbose(params.get("verbose") === "1");
  }, []);

  const result = useMemo(() => {
    const safePath = quote(path);
    const safeDestination = quote(destination);
    const safeBranch = quote(branch);
    const safeStart = quote(startPoint || "HEAD");
    const warnings: string[] = [];
    let command = "";
    let summary = "";

    if (
      ["add", "move", "remove", "lock", "unlock"].includes(operation) &&
      !path.trim()
    )
      warnings.push("Enter a worktree path before running this command.");
    if (path.includes(" "))
      warnings.push("The path contains spaces, so the generator added quotes.");
    if (operation === "add" && mode !== "detached" && !branch.trim())
      warnings.push("Enter a branch name.");

    switch (operation) {
      case "add":
        if (mode === "detached") {
          command = `git worktree add --detach ${safePath} ${safeStart}`;
          summary = `Creates a detached worktree at ${path || "the selected path"} from ${startPoint || "HEAD"}.`;
        } else if (mode === "new") {
          command = `git worktree add -b ${safeBranch} ${safePath} ${safeStart}`;
          summary = `Creates ${branch || "a new branch"} from ${startPoint || "HEAD"} inside ${path || "the selected path"}.`;
        } else {
          command = `git worktree add ${safePath} ${safeBranch}`;
          summary = `Checks out the existing ${branch || "branch"} branch inside ${path || "the selected path"}.`;
        }
        break;
      case "list":
        command = `git worktree list${verbose ? " --verbose" : ""}`;
        summary = `Lists every linked worktree${verbose ? " with additional annotations" : ""}.`;
        break;
      case "move":
        if (!destination.trim())
          warnings.push("Enter the new destination path.");
        command = `git worktree move ${safePath} ${safeDestination}`;
        summary = `Moves the worktree from ${path || "its current path"} to ${destination || "the new path"}.`;
        break;
      case "remove":
        if (force)
          warnings.push(
            "Force removal can permanently discard uncommitted or untracked files.",
          );
        command = `git worktree remove${force ? " --force" : ""} ${safePath}`;
        summary = `Removes the worktree at ${path || "the selected path"}${force ? ", including local changes" : ""}.`;
        break;
      case "lock":
      case "unlock":
        command = `git worktree ${operation} ${safePath}`;
        summary = `${operation === "lock" ? "Protects" : "Unlocks"} the worktree at ${path || "the selected path"}.`;
        break;
      case "prune":
        command = `git worktree prune${verbose ? " --verbose" : " --dry-run"}`;
        summary = verbose
          ? "Removes stale worktree metadata and reports each action."
          : "Previews stale worktree metadata that Git would remove.";
    }

    const related =
      operation === "add"
        ? [
            `cd ${safePath}`,
            "git worktree list",
            `git worktree remove ${safePath}`,
          ]
        : operation === "remove" || operation === "prune"
          ? ["git worktree list", "git worktree prune --dry-run"]
          : ["git worktree list"];

    return { command, summary, warnings, related };
  }, [branch, destination, force, mode, operation, path, startPoint, verbose]);

  const worktreeWise = getWorktreeWiseAlternative(operation, mode, force);

  const selectOperation = (value: Operation) => {
    setOperation(value);
    trackCheatSheetEvent("worktree_generator_operation_selected", {
      operation: value,
    });
  };

  const applyPreset = (preset: (typeof presets)[number]) => {
    setOperation("add");
    setMode("new");
    setPath(convertPath(preset.path, platform));
    setBranch(preset.branch);
    setStartPoint(preset.start);
  };

  const switchPlatform = (nextPlatform: Platform) => {
    setPlatform(nextPlatform);
    setPath((currentPath) => convertPath(currentPath, nextPlatform));
    setDestination((currentPath) => convertPath(currentPath, nextPlatform));
  };

  const copyShareLink = async () => {
    const params = new URLSearchParams({
      operation,
      mode,
      platform,
      path,
      destination,
      branch,
      start: startPoint,
    });
    if (force) params.set("force", "1");
    if (verbose) params.set("verbose", "1");
    await navigator.clipboard.writeText(
      `${window.location.origin}${window.location.pathname}?${params}`,
    );
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 1600);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-stroke bg-white shadow-[0_24px_70px_-40px_rgba(47,84,235,0.5)] dark:border-white/10 dark:bg-dark-2">
      <div className="border-b border-stroke p-5 dark:border-white/10 sm:p-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Choose an operation
            </p>
            <div
              className="mt-3 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Git worktree operation"
            >
              {operations.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => selectOperation(value)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${operation === value ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-slate-100 text-body-color hover:text-primary dark:bg-white/5 dark:text-dark-6"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex rounded-xl border border-stroke p-1 dark:border-white/10">
            {(["posix", "windows"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => switchPlatform(value)}
                className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wide ${platform === value ? "bg-dark text-white dark:bg-white dark:text-dark" : "text-body-color dark:text-dark-6"}`}
              >
                {value === "posix" ? "macOS / Linux" : "Windows"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-stroke p-5 dark:border-white/10 sm:p-8 lg:border-b-0 lg:border-r">
          {operation === "add" && (
            <>
              <div className="mb-6 flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10"
                  >
                    {preset.label} preset
                  </button>
                ))}
              </div>
              <label className="text-sm font-semibold text-dark dark:text-white">
                Creation mode
                <select
                  value={mode}
                  onChange={(event) => setMode(event.target.value as AddMode)}
                  className={inputClass}
                >
                  <option value="new">New branch</option>
                  <option value="existing">Existing branch</option>
                  <option value="detached">Detached commit</option>
                </select>
              </label>
            </>
          )}

          {!["list", "prune"].includes(operation) && (
            <label className="mt-5 block text-sm font-semibold text-dark dark:text-white">
              Worktree path
              <input
                value={path}
                onChange={(event) => setPath(event.target.value)}
                placeholder={
                  platform === "windows"
                    ? "..\\feature-auth"
                    : "../feature-auth"
                }
                className={inputClass}
                spellCheck={false}
              />
            </label>
          )}
          {operation === "move" && (
            <label className="mt-5 block text-sm font-semibold text-dark dark:text-white">
              New destination
              <input
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                className={inputClass}
                spellCheck={false}
              />
            </label>
          )}
          {operation === "add" && mode !== "detached" && (
            <label className="mt-5 block text-sm font-semibold text-dark dark:text-white">
              Branch
              <input
                value={branch}
                onChange={(event) => setBranch(event.target.value)}
                className={inputClass}
                spellCheck={false}
              />
            </label>
          )}
          {operation === "add" && mode !== "existing" && (
            <label className="mt-5 block text-sm font-semibold text-dark dark:text-white">
              Starting branch, tag, or commit
              <input
                value={startPoint}
                onChange={(event) => setStartPoint(event.target.value)}
                className={inputClass}
                spellCheck={false}
              />
            </label>
          )}
          {operation === "remove" && (
            <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm font-medium text-body-color dark:text-dark-6">
              <input
                type="checkbox"
                checked={force}
                onChange={(event) => setForce(event.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              Force removal
            </label>
          )}
          {["list", "prune"].includes(operation) && (
            <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm font-medium text-body-color dark:text-dark-6">
              <input
                type="checkbox"
                checked={verbose}
                onChange={(event) => setVerbose(event.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              Verbose output
            </label>
          )}
        </div>

        <div className="bg-slate-50 p-5 dark:bg-[#080d17] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            What will happen?
          </p>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-dark dark:text-white">
            {result.summary}
          </p>
          {result.warnings.length > 0 && (
            <div className="mt-5 space-y-2">
              {result.warnings.map((warning) => (
                <p
                  key={warning}
                  className="rounded-lg border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-400/10 dark:text-amber-100"
                >
                  {warning}
                </p>
              ))}
            </div>
          )}
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-700 bg-[#090d16]">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Generated command
              </span>
              <CopyButton
                command={result.command}
                label="Copy generated Git worktree command"
              />
            </div>
            <pre className="m-0 overflow-x-auto bg-transparent p-5 text-sm leading-7 text-slate-100">
              <code>
                {result.command.split(" ").map((part, index) => (
                  <span
                    key={`${part}-${index}`}
                    className={
                      index < 2
                        ? "text-blue-300"
                        : part.startsWith("-")
                          ? "text-amber-300"
                          : "text-slate-100"
                    }
                  >
                    {part}{" "}
                  </span>
                ))}
              </code>
            </pre>
          </div>
          <div className="mt-5 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={copyShareLink}
              className="text-sm font-semibold text-primary hover:underline"
            >
              {shareCopied ? "Share link copied ✓" : "Copy shareable link"}
            </button>
          </div>

          <div className="mt-7">
            <p className="text-xs font-bold uppercase tracking-wider text-body-color dark:text-dark-6">
              Useful next commands
            </p>
            <div className="mt-3 space-y-2">
              {result.related.map((command) => (
                <div
                  key={command}
                  className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 dark:bg-white/5"
                >
                  <code className="overflow-x-auto text-xs text-dark dark:text-slate-200">
                    {command}
                  </code>
                  <CopyButton command={command} />
                </div>
              ))}
            </div>
          </div>

          {worktreeWise && (
            <div className="mt-7 rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:bg-primary/10">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-xs font-black text-white">
                  WTW
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    WorktreeWise equivalent
                  </p>
                  <p className="font-bold text-dark dark:text-white">
                    {worktreeWise.label}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-body-color dark:text-dark-6">
                Complete this operation visually without memorizing flags.
              </p>
              <a
                href={worktreeWise.href}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Open the matching documentation →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getWorktreeWiseAlternative(
  operation: Operation,
  mode: AddMode,
  force: boolean,
) {
  if (
    (operation === "add" && mode === "detached") ||
    (operation === "remove" && force)
  )
    return null;
  const equivalents: Partial<
    Record<Operation, { label: string; href: string }>
  > = {
    add: {
      label: "Create a Git Worktree",
      href: "https://docs.worktreewise.com/git-worktrees/create",
    },
    list: {
      label: "List Git Worktrees",
      href: "https://docs.worktreewise.com/git-worktrees/list",
    },
    move: {
      label: "Move a Git Worktree",
      href: "https://docs.worktreewise.com/git-worktrees/move",
    },
    remove: {
      label: "Delete a Git Worktree",
      href: "https://docs.worktreewise.com/git-worktrees/delete",
    },
    lock: {
      label: "Lock a Git Worktree",
      href: "https://docs.worktreewise.com/git-worktrees/lock",
    },
    unlock: {
      label: "Unlock a Git Worktree",
      href: "https://docs.worktreewise.com/git-worktrees/unlock",
    },
    prune: {
      label: "Prune Git Worktrees",
      href: "https://docs.worktreewise.com/git-worktrees/prune",
    },
  };
  return equivalents[operation];
}
