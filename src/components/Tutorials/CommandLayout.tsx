"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  WORKTREE_COMMANDS,
  TUTORIAL_CLUSTERS,
  WorktreeCommand,
  getAdjacentCommands,
} from "@/data/gitWorktreeCommands";

// --- BREADCRUMBS WITH JSON-LD SCHEMA ---
export function CommandBreadcrumbs({
  currentCommand,
}: {
  currentCommand?: WorktreeCommand;
}) {
  const baseUrl = "https://www.worktreewise.com";

  const breadcrumbsList = [
    { name: "Home", url: `${baseUrl}/` },
    { name: "Tutorials", url: `${baseUrl}/git-worktree` },
    { name: "Git Worktree", url: `${baseUrl}/git-worktree` },
    ...(currentCommand
      ? [
          {
            name: currentCommand.command,
            url: `${baseUrl}${currentCommand.path}`,
          },
        ]
      : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbsList.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumbs"
        className="mb-6 flex flex-wrap items-center text-xs text-body-color dark:text-dark-6 sm:text-sm"
      >
        <Link
          href="/"
          className="hover:text-primary transition-colors hover:underline"
        >
          Home
        </Link>
        <span className="mx-2 text-stroke dark:text-dark-3">/</span>
        <Link
          href="/git-worktree"
          className="hover:text-primary transition-colors hover:underline"
        >
          Tutorials
        </Link>
        <span className="mx-2 text-stroke dark:text-dark-3">/</span>
        {currentCommand ? (
          <>
            <Link
              href="/git-worktree"
              className="hover:text-primary transition-colors hover:underline"
            >
              Git Worktree
            </Link>
            <span className="mx-2 text-stroke dark:text-dark-3">/</span>
            <span className="font-semibold text-primary">
              {currentCommand.command}
            </span>
          </>
        ) : (
          <span className="font-semibold text-primary">Git Worktree</span>
        )}
      </nav>
    </>
  );
}

// --- COMMAND SIDEBAR ---
export function CommandSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
      {/* Mobile Drawer Toggle Button */}
      <div className="mb-6 block lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-stroke bg-white px-4 py-3 text-sm font-medium text-dark shadow-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white"
        >
          <span className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
            Tutorials Menu ({pathname === "/git-worktree" ? "Overview" : pathname?.split("/").pop()})
          </span>
          <svg
            className={`h-4 w-4 transition-transform ${
              mobileOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar Content */}
      <div
        className={`sticky top-28 space-y-6 rounded-xl border border-stroke bg-white p-5 shadow-sm dark:border-dark-3/40 dark:bg-dark-2 ${
          mobileOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-body-color dark:text-dark-6">
              Git Worktree Hub
            </span>
          </div>
          <Link
            href="/git-worktree"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/git-worktree"
                ? "bg-primary text-white shadow-sm"
                : "text-dark hover:bg-primary/10 hover:text-primary dark:text-white dark:hover:bg-white/5 dark:hover:text-primary"
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Overview & Pillar Guide
          </Link>
        </div>

        {/* Commands Cluster */}
        <div>
          <div className="mb-2.5 flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-body-color dark:text-dark-6">
              Commands Cluster
            </span>
            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary dark:bg-primary/20">
              8 Available
            </span>
          </div>

          <div className="space-y-1">
            {WORKTREE_COMMANDS.map((cmd) => {
              const isActive = pathname === cmd.path;
              return (
                <Link
                  key={cmd.slug}
                  href={cmd.path}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all ${
                    isActive
                      ? "bg-primary text-white font-medium shadow-sm"
                      : "text-body-color hover:bg-primary/10 hover:text-primary dark:text-dark-6 dark:hover:bg-white/5 dark:hover:text-primary"
                  }`}
                >
                  <span className="font-mono text-xs">
                    {cmd.command}
                  </span>
                  <span
                    className={`text-[11px] ${
                      isActive
                        ? "text-white/80"
                        : "text-body-color/60 dark:text-dark-6/60 group-hover:text-primary"
                    }`}
                  >
                    #{cmd.order}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Upcoming Clusters */}
        <div className="pt-4 border-t border-stroke dark:border-dark-3/40">
          <div className="mb-3 px-1 text-xs font-bold uppercase tracking-wider text-body-color dark:text-dark-6">
            Upcoming Clusters
          </div>
          <div className="space-y-1.5">
            {TUTORIAL_CLUSTERS.filter((c) => c.isSoon).map((cluster) => (
              <div
                key={cluster.id}
                aria-disabled="true"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs text-body-color/70 dark:text-dark-6/70 bg-gray-1/50 dark:bg-dark/30 select-none cursor-not-allowed"
              >
                <span className="font-medium">{cluster.title}</span>
                <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                  Soon
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* WorktreeWise Mini Promo */}
        <div className="rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4 border border-primary/20 dark:border-primary/30">
          <p className="text-xs font-bold text-dark dark:text-white">
            Visual Git Worktree Manager
          </p>
          <p className="mt-1 text-[11px] text-body-color dark:text-dark-6">
            Switch branches in seconds without stashing or context disruption.
          </p>
          <Link
            href="/#download"
            className="mt-3 inline-block w-full text-center rounded-md bg-primary py-1.5 text-xs font-medium text-white shadow hover:bg-primary/90 transition-colors"
          >
            Get WorktreeWise Free
          </Link>
        </div>
      </div>
    </aside>
  );
}

// --- COPYABLE CODE BLOCK ---
export function TerminalSnippet({
  command,
  comment,
}: {
  command: string;
  comment?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-stroke/70 bg-slate-900 shadow-md dark:border-dark-3/60">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[11px] text-slate-500">Terminal</span>
        </div>
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy command"
          className="flex items-center gap-1.5 rounded bg-slate-800/80 px-2.5 py-1 text-[11px] font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed text-slate-100 overflow-x-auto">
        {comment && (
          <div className="text-slate-400 select-none pb-1 text-xs"># {comment}</div>
        )}
        <div className="flex items-start">
          <span className="text-emerald-400 select-none mr-2 font-bold">$</span>
          <span className="text-amber-200">{command}</span>
        </div>
      </div>
    </div>
  );
}

// --- TERMINAL OUTPUT BOX ---
export function TerminalOutput({
  output,
  title = "Output Example",
}: {
  output: string;
  title?: string;
}) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-stroke/70 bg-slate-950 shadow-inner dark:border-dark-3/60">
      <div className="border-b border-slate-800/80 bg-slate-900/60 px-4 py-2 text-[11px] font-mono text-slate-400">
        {title}
      </div>
      <pre className="p-4 font-mono text-xs leading-relaxed text-slate-300 overflow-x-auto whitespace-pre">
        {output}
      </pre>
    </div>
  );
}

// --- PREV / NEXT NAVIGATION ---
export function CommandPagination({ currentSlug }: { currentSlug: string }) {
  const { prev, next } = getAdjacentCommands(currentSlug);

  return (
    <div className="mt-14 pt-8 border-t border-stroke dark:border-dark-3/50">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {prev ? (
          <Link
            href={prev.path}
            className="group flex flex-col rounded-xl border border-stroke bg-white p-4 transition-all hover:border-primary hover:shadow-md dark:border-dark-3 dark:bg-dark-2"
          >
            <span className="text-xs text-body-color dark:text-dark-6 flex items-center gap-1 group-hover:text-primary">
              ← Previous Command
            </span>
            <span className="mt-1 font-mono text-sm font-semibold text-dark dark:text-white group-hover:text-primary">
              {prev.command}
            </span>
            <span className="mt-0.5 text-xs text-body-color/80 dark:text-dark-6/80 line-clamp-1">
              {prev.description}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {next ? (
          <Link
            href={next.path}
            className="group flex flex-col items-end text-right rounded-xl border border-stroke bg-white p-4 transition-all hover:border-primary hover:shadow-md dark:border-dark-3 dark:bg-dark-2"
          >
            <span className="text-xs text-body-color dark:text-dark-6 flex items-center gap-1 group-hover:text-primary">
              Next Command →
            </span>
            <span className="mt-1 font-mono text-sm font-semibold text-dark dark:text-white group-hover:text-primary">
              {next.command}
            </span>
            <span className="mt-0.5 text-xs text-body-color/80 dark:text-dark-6/80 line-clamp-1">
              {next.description}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/git-worktree"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <span>View all Git worktree commands & complete guide</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// --- WORKTREEWISE PRODUCT HIGHLIGHT / SCREENSHOT CARD ---
export function WorktreeWiseFeatureCard({
  featureTitle,
  description,
  imageSrc,
  imageAlt,
}: {
  featureTitle: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-gray-1 p-6 shadow-md dark:from-dark-2 dark:via-dark-2 dark:to-dark dark:border-primary/30">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20">
            WorktreeWise
          </span>
          <h3 className="mt-2 text-xl font-bold text-dark dark:text-white">
            {featureTitle}
          </h3>
        </div>
        <Link
          href="/#download"
          className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white shadow hover:bg-primary/90 transition-colors"
        >
          Try Free
        </Link>
      </div>
      <p className="text-sm text-body-color dark:text-dark-6 leading-relaxed">
        {description}
      </p>
      {imageSrc && (
        <div className="mt-5 relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-stroke shadow-sm dark:border-dark-3">
          <Image
            src={imageSrc}
            alt={imageAlt || featureTitle}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
        </div>
      )}
    </div>
  );
}

// --- WARNING / ALERT CALLOUT ---
export function Callout({
  type = "warning",
  title,
  children,
}: {
  type?: "warning" | "tip" | "info" | "danger";
  title: string;
  children: React.ReactNode;
}) {
  const styles = {
    warning: {
      border: "border-amber-500/30",
      bg: "bg-amber-500/10 text-amber-900 dark:text-amber-200",
      iconColor: "text-amber-500",
      titleColor: "text-amber-800 dark:text-amber-300",
    },
    danger: {
      border: "border-rose-500/30",
      bg: "bg-rose-500/10 text-rose-900 dark:text-rose-200",
      iconColor: "text-rose-500",
      titleColor: "text-rose-800 dark:text-rose-300",
    },
    tip: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
      iconColor: "text-emerald-500",
      titleColor: "text-emerald-800 dark:text-emerald-300",
    },
    info: {
      border: "border-blue-500/30",
      bg: "bg-blue-500/10 text-blue-900 dark:text-blue-200",
      iconColor: "text-blue-500",
      titleColor: "text-blue-800 dark:text-blue-300",
    },
  }[type];

  return (
    <div
      className={`my-6 rounded-xl border p-4 sm:p-5 ${styles.border} ${styles.bg}`}
    >
      <div className="flex items-start gap-3">
        <svg
          className={`h-5 w-5 flex-shrink-0 mt-0.5 ${styles.iconColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {type === "warning" || type === "danger" ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          )}
        </svg>
        <div>
          <h4 className={`text-sm font-bold ${styles.titleColor}`}>{title}</h4>
          <div className="mt-1 text-xs sm:text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

// --- TUTORIAL CONTENT CONTAINER ---
export function TutorialContainer({
  children,
  command,
}: {
  children: React.ReactNode;
  command?: WorktreeCommand;
}) {
  return (
    <div className="min-h-screen bg-gray-1/30 pb-20 pt-28 dark:bg-dark lg:pt-36">
      <div className="container mx-auto px-4 max-w-7xl">
        <CommandBreadcrumbs currentCommand={command} />
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          <CommandSidebar />
          <main className="w-full min-w-0 flex-1 rounded-2xl border border-stroke bg-white p-6 shadow-sm dark:border-dark-3/40 dark:bg-dark-2 sm:p-8 md:p-10">
            {children}
            {command && <CommandPagination currentSlug={command.slug} />}
          </main>
        </div>
      </div>
    </div>
  );
}
