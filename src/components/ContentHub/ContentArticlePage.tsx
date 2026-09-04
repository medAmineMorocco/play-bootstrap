"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ContentHub, HubArticle } from "@/data/contentHubs";
import { getArticleDetails } from "@/data/contentArticleDetails";

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 overflow-hidden rounded-xl border border-stroke bg-dark dark:border-dark-3">
      <div className="flex items-center justify-between border-b border-dark-3/60 bg-dark-2 px-4 py-2.5 text-xs text-gray-4">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2.5 rounded-full bg-red-500/80" />
          <span className="inline-block size-2.5 rounded-full bg-yellow-500/80" />
          <span className="inline-block size-2.5 rounded-full bg-emerald-500/80" />
          {label && <span className="ml-2 font-mono text-gray-3">{label}</span>}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-gray-3 transition hover:bg-dark-3 hover:text-white"
          title="Copy code"
          type="button"
        >
          {copied ? (
            <>
              <svg className="size-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-6 text-gray-2">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function ContentArticlePage({ hub, article }: { hub: ContentHub; article: HubArticle }) {
  const details = getArticleDetails(hub.key, article);
  const related = hub.articles.filter((item) => item.slug !== article.slug).slice(0, 3);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const shareTwitterUrl = typeof window !== "undefined"
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${article.title} - WorktreeWise Guide`)}&url=${encodeURIComponent(window.location.href)}`
    : `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`;

  const shareLinkedInUrl = typeof window !== "undefined"
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
    : "#";

  return (
    <main className="pb-24 pt-28 sm:pt-32">
      <article className="container max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-body-color dark:text-dark-6" aria-label="Breadcrumb">
          <Link href="/" className="transition hover:text-primary">Home</Link>
          <span aria-hidden="true" className="text-stroke dark:text-dark-3">/</span>
          <Link href={hub.href} className="transition hover:text-primary">{hub.label}</Link>
          <span aria-hidden="true" className="text-stroke dark:text-dark-3">/</span>
          <span className="font-medium text-dark dark:text-white truncate max-w-xs sm:max-w-md">{article.title}</span>
        </nav>

        {/* Header */}
        <header className="mt-8">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {details.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-primary/20 bg-primary/[0.06] px-2.5 py-1 text-xs font-semibold text-primary dark:border-primary/30"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-dark dark:text-white sm:text-4xl lg:text-5xl lg:leading-[1.15]">
            {article.title}
          </h1>

          {/* Author / Publication Meta Bar (Medium / Dev.to style) */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-stroke py-4 dark:border-dark-3">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg dark:bg-primary/20">
                W
              </div>
              <div>
                <p className="text-sm font-semibold text-dark dark:text-white">
                  WorktreeWise Engineering Team
                </p>
                <div className="flex items-center gap-2 text-xs text-body-color dark:text-dark-6">
                  <span>{details.updatedDate}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium text-primary">
                    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {details.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Social / Copy link actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-dark transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-white"
                type="button"
                title="Copy article link"
              >
                {copiedLink ? (
                  <>
                    <svg className="size-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-emerald-500">Copied Link!</span>
                  </>
                ) : (
                  <>
                    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span>Share</span>
                  </>
                )}
              </button>
              <a
                href={shareTwitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-lg border border-stroke text-body-color transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-6"
                title="Share on X"
              >
                <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={shareLinkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-lg border border-stroke text-body-color transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-6"
                title="Share on LinkedIn"
              >
                <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
                </svg>
              </a>
            </div>
          </div>

          {/* TL;DR Quick Summary Box (Dev.to style) */}
          <div className="mt-8 rounded-2xl border-2 border-primary/25 bg-gradient-to-br from-primary/[0.08] to-primary/[0.02] p-6 shadow-sm dark:border-primary/30 sm:p-7">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
                ⚡
              </span>
              <h2 className="text-base font-bold uppercase tracking-wider text-primary">
                TL;DR: The 30-Second Summary
              </h2>
            </div>
            <p className="mt-3.5 text-base leading-relaxed text-dark dark:text-white font-medium">
              {details.tldr}
            </p>
          </div>

          {/* Real-Life Developer Scenario Box */}
          <div className="mt-6 rounded-2xl border border-stroke bg-gray-1 p-6 dark:border-dark-3 dark:bg-dark-2 sm:p-7">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">💡</span>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-body-color dark:text-dark-6">
                The Real-Life Scenario
              </h3>
            </div>
            <p className="mt-3 text-base leading-relaxed italic text-dark dark:text-white">
              &ldquo;{details.scenario}&rdquo;
            </p>
          </div>

          {/* Lead paragraph */}
          <p className="mt-8 text-lg leading-relaxed text-body-color dark:text-dark-6 sm:text-xl">
            {details.lead}
          </p>

          {/* Quick Table of Contents Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2 rounded-xl border border-stroke/70 bg-white p-3 text-xs dark:border-dark-3 dark:bg-dark-2">
            <span className="font-semibold text-dark dark:text-white px-2">Jump to:</span>
            <a href="#root-cause" className="rounded-md bg-gray-1 px-2.5 py-1 text-body-color hover:text-primary dark:bg-dark-3 dark:text-dark-6">
              Root Cause &amp; Internals
            </a>
            <a href="#step-by-step" className="rounded-md bg-gray-1 px-2.5 py-1 text-body-color hover:text-primary dark:bg-dark-3 dark:text-dark-6">
              Step-by-Step Fix
            </a>
            {details.edgeCases && details.edgeCases.length > 0 && (
              <a href="#edge-cases" className="rounded-md bg-gray-1 px-2.5 py-1 text-body-color hover:text-primary dark:bg-dark-3 dark:text-dark-6">
                Edge Cases
              </a>
            )}
            <a href="#common-pitfalls" className="rounded-md bg-gray-1 px-2.5 py-1 text-body-color hover:text-primary dark:bg-dark-3 dark:text-dark-6">
              Common Mistakes
            </a>
            <a href="#checklist" className="rounded-md bg-gray-1 px-2.5 py-1 text-body-color hover:text-primary dark:bg-dark-3 dark:text-dark-6">
              Checklist
            </a>
            <a href="#worktreewise" className="rounded-md bg-gray-1 px-2.5 py-1 text-body-color hover:text-primary dark:bg-dark-3 dark:text-dark-6">
              In WorktreeWise
            </a>
          </div>
        </header>

        {/* Section 1: The Problem & Under the Hood */}
        <section id="root-cause" className="mt-14 scroll-mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-dark dark:text-white sm:text-3xl">
            {details.problem.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-body-color dark:text-dark-6">
            {details.problem.description}
          </p>

          {/* Terminal Error Snippet if provided */}
          {details.problem.errorSnippet && (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-body-color dark:text-dark-6">
                What you see in the terminal:
              </p>
              <CodeBlock code={details.problem.errorSnippet} label="terminal output" />
            </div>
          )}

          {/* Git Internals Deep Dive Card */}
          <div className="mt-6 rounded-2xl border-l-4 border-indigo-500 bg-indigo-50/50 p-6 dark:border-indigo-400 dark:bg-indigo-950/20 sm:p-7">
            <div className="flex items-center gap-2">
              <span className="text-indigo-600 dark:text-indigo-400 text-lg">🔍</span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                Under the Hood: Git Plumbing &amp; Architecture
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-dark dark:text-gray-2">
              {details.problem.internals}
            </p>
          </div>
        </section>

        {/* Section 2: Quick Command Reference */}
        {details.commands && details.commands.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold tracking-tight text-dark dark:text-white sm:text-3xl">
              Quick Command Recipes
            </h2>
            <p className="mt-3 text-body-color dark:text-dark-6">
              Copy and adapt these commands directly in your terminal:
            </p>
            <div className="mt-6 grid gap-5">
              {details.commands.map((cmd) => (
                <div key={cmd.label} className="rounded-2xl border border-stroke bg-white p-5 dark:border-dark-3 dark:bg-dark-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-dark dark:text-white">{cmd.label}</h3>
                  </div>
                  {cmd.explanation && (
                    <p className="mt-1 text-xs text-body-color dark:text-dark-6">{cmd.explanation}</p>
                  )}
                  <CodeBlock code={cmd.code} label="bash" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Step-by-Step Resolution Walkthrough */}
        <section id="step-by-step" className="mt-14 scroll-mt-24">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary">TUTORIAL</span>
            <h2 className="text-2xl font-bold tracking-tight text-dark dark:text-white sm:text-3xl">
              Step-by-Step Practical Walkthrough
            </h2>
          </div>
          <p className="mt-3 text-body-color dark:text-dark-6">
            Follow these verified steps to safely resolve the issue and guarantee that your filesystem and Git references are in sync.
          </p>

          <div className="mt-8 space-y-6">
            {details.steps.map((step, idx) => (
              <div
                key={step.title}
                className="relative rounded-2xl border border-stroke bg-white p-6 shadow-sm transition hover:border-primary/40 dark:border-dark-3 dark:bg-dark-2 sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white shadow-md">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-dark dark:text-white sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-body-color dark:text-dark-6">
                      {step.description}
                    </p>

                    {step.command && (
                      <div className="mt-4">
                        <CodeBlock code={step.command} label="terminal" />
                      </div>
                    )}

                    {step.output && (
                      <div className="mt-3 rounded-lg border border-stroke/70 bg-gray-1 p-3.5 font-mono text-xs text-dark dark:border-dark-3 dark:bg-dark dark:text-gray-3">
                        <span className="block mb-1 text-[10px] font-bold uppercase tracking-wider text-body-color dark:text-dark-6">Expected Output:</span>
                        <pre className="overflow-x-auto whitespace-pre">{step.output}</pre>
                      </div>
                    )}

                    {step.tip && (
                      <div className="mt-3 flex items-start gap-2 rounded-lg bg-primary/[0.05] p-3 text-xs text-primary dark:bg-primary/10">
                        <span className="font-bold">Tip:</span>
                        <span>{step.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Comparison Table (for comparison / isolation topics) */}
        {details.comparisonTable && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold tracking-tight text-dark dark:text-white sm:text-3xl">
              Comparative Feature Matrix
            </h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-stroke dark:border-dark-3">
              <table className="w-full text-left text-sm text-body-color dark:text-dark-6">
                <thead className="border-b border-stroke bg-gray-1 text-xs uppercase text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <tr>
                    {details.comparisonTable.headers.map((h) => (
                      <th key={h} scope="col" className="px-6 py-4 font-bold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stroke dark:divide-dark-3">
                  {details.comparisonTable.rows.map((row, i) => (
                    <tr key={i} className="bg-white hover:bg-gray-1/50 dark:bg-dark dark:hover:bg-dark-2/50">
                      <td className="px-6 py-4 font-semibold text-dark dark:text-white whitespace-nowrap">
                        {row[0]}
                      </td>
                      <td className="px-6 py-4">
                        {row[1]}
                      </td>
                      <td className="px-6 py-4">
                        {row[2]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Section 5: Edge Cases & Advanced Scenarios */}
        {details.edgeCases && details.edgeCases.length > 0 && (
          <section id="edge-cases" className="mt-14 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-dark dark:text-white sm:text-3xl">
              Edge Cases &amp; Advanced Scenarios
            </h2>
            <div className="mt-6 space-y-5">
              {details.edgeCases.map((ec) => (
                <div key={ec.title} className="rounded-2xl border border-stroke bg-gray-1/60 p-6 dark:border-dark-3 dark:bg-dark-2">
                  <h3 className="text-lg font-bold text-dark dark:text-white">{ec.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body-color dark:text-dark-6">{ec.description}</p>
                  {ec.command && <CodeBlock code={ec.command} label="bash" />}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Common Mistakes (Pitfalls) */}
        <section id="common-pitfalls" className="mt-14 scroll-mt-24">
          <div className="rounded-2xl border border-amber-300/80 bg-amber-50/70 p-6 dark:border-amber-900/60 dark:bg-amber-950/25 sm:p-8">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-amber-500 text-white font-bold text-sm">
                ⚠️
              </span>
              <h2 className="text-xl font-bold text-dark dark:text-white">
                Common Mistakes to Avoid
              </h2>
            </div>

            <div className="mt-6 space-y-6">
              {details.pitfalls.map((pitfall, i) => (
                <div key={i} className="rounded-xl border border-amber-200 bg-white/90 p-5 dark:border-amber-900/40 dark:bg-dark-2">
                  <h3 className="text-base font-bold text-dark dark:text-white">
                    ❌ Mistake: {pitfall.mistake}
                  </h3>
                  <p className="mt-2 text-sm text-body-color dark:text-dark-6">
                    <strong className="text-amber-700 dark:text-amber-400">Why it causes trouble:</strong> {pitfall.consequence}
                  </p>
                  <p className="mt-2 text-sm text-body-color dark:text-dark-6">
                    <strong className="text-emerald-700 dark:text-emerald-400">What to do instead:</strong> {pitfall.solution || pitfall.fix}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Verification Checklist & Pro Tips Grid */}
        <section id="checklist" className="mt-14 grid gap-6 md:grid-cols-2 scroll-mt-24">
          {/* Checklist */}
          <div className="rounded-2xl border border-emerald-300/80 bg-emerald-50/70 p-6 dark:border-emerald-900/60 dark:bg-emerald-950/25 sm:p-7">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500 text-white font-bold text-sm">
                ✓
              </span>
              <h2 className="text-xl font-bold text-dark dark:text-white">
                Verification Checklist
              </h2>
            </div>
            <ul className="mt-5 space-y-3.5 text-sm text-body-color dark:text-dark-6">
              {details.checks.map((item) => (
                <li className="flex items-start gap-3" key={item}>
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 font-bold text-xs dark:text-emerald-400">
                    ✓
                  </span>
                  <span className="font-medium text-dark dark:text-gray-2">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Tips */}
          <div className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-6 dark:border-primary/30 dark:bg-primary/[0.08] sm:p-7">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
                💡
              </span>
              <h2 className="text-xl font-bold text-dark dark:text-white">
                Senior Engineering Tips
              </h2>
            </div>
            <ul className="mt-5 space-y-3.5 text-sm text-body-color dark:text-dark-6">
              {details.proTips.map((tip) => (
                <li className="flex items-start gap-3" key={tip}>
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xs">
                    ★
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 8: Key Takeaways */}
        {details.keyTakeaways && details.keyTakeaways.length > 0 && (
          <section className="mt-14 rounded-2xl border border-stroke bg-white p-6 dark:border-dark-3 dark:bg-dark-2 sm:p-8">
            <h2 className="text-xl font-bold text-dark dark:text-white">
              Key Takeaways
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {details.keyTakeaways.map((item, idx) => (
                <li key={idx} className="rounded-xl border border-stroke/60 bg-gray-1 p-4 text-xs leading-relaxed text-dark dark:border-dark-3 dark:bg-dark dark:text-gray-2">
                  <span className="mb-1 block font-bold text-primary">0{idx + 1}.</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Section 9: How WorktreeWise Streamlines This */}
        <section id="worktreewise" className="mt-14 rounded-2xl border border-stroke bg-gradient-to-br from-primary/[0.04] to-transparent p-6 dark:border-dark-3 dark:bg-dark-2 sm:p-8 scroll-mt-24">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-primary px-3 py-1 font-mono text-xs font-bold text-white">TOOL</span>
            <h2 className="text-2xl font-bold tracking-tight text-dark dark:text-white sm:text-3xl">
              How WorktreeWise Solves This Visually
            </h2>
          </div>
          <p className="mt-4 max-w-3xl leading-relaxed text-body-color dark:text-dark-6">
            WorktreeWise eliminates the manual friction and mental overhead of CLI flags. It displays real-time branch states, uncommitted modifications, active terminals, and lock statuses across all worktrees on a single visual dashboard.
          </p>

          {details.image && details.imageAlt && (
            <figure className="relative mt-7 overflow-hidden rounded-2xl border border-stroke bg-gray-1 p-3 shadow-lg dark:border-dark-3 dark:bg-dark-2 sm:p-5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" aria-hidden="true" />
              <Image
                src={details.image}
                alt={details.imageAlt}
                width={1600}
                height={900}
                sizes="(max-width: 1024px) 100vw, 960px"
                className="relative z-10 h-auto w-full rounded-xl"
              />
              <figcaption className="relative z-10 px-2 pb-1 pt-4 text-center text-xs font-medium text-body-color dark:text-dark-6">
                {details.imageAlt}
              </figcaption>
            </figure>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/pricing"
              className="rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-md transition hover:bg-primary/90"
            >
              Get WorktreeWise
            </Link>
            <Link
              href="/git-worktree-cheat-sheet"
              className="rounded-xl border border-stroke bg-white px-5 py-3 font-semibold text-dark transition hover:border-primary hover:text-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            >
              Interactive Cheat Sheet →
            </Link>
            <Link
              href="/git-worktree-command-generator"
              className="rounded-xl border border-stroke bg-white px-5 py-3 font-semibold text-dark transition hover:border-primary hover:text-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            >
              Command Generator →
            </Link>
          </div>
        </section>

        {/* Section 10: Author Bio & Publication Footer */}
        <section className="mt-14 rounded-2xl border border-stroke bg-gray-1 p-6 dark:border-dark-3 dark:bg-dark-2 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-white font-extrabold text-2xl shadow-md">
              W
            </div>
            <div>
              <h3 className="text-lg font-bold text-dark dark:text-white">
                WorktreeWise Engineering Publication
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body-color dark:text-dark-6">
                Written and curated by the core WorktreeWise team. We build developer tools that turn Git worktrees, workflows, and parallel AI coding agents into second nature.
              </p>
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3 text-xs font-medium text-primary">
                <Link href="/git-worktree" className="hover:underline">Explore Tutorials</Link>
                <span>•</span>
                <Link href="/blog" className="hover:underline">Engineering Blog</Link>
                <span>•</span>
                <Link href="/roadmap" className="hover:underline">Product Roadmap</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Related Guides */}
        <section className="mt-14 border-t border-stroke pt-10 dark:border-dark-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-dark dark:text-white">
              Related {hub.label} Guides
            </h2>
            <Link href={hub.href} className="text-sm font-semibold text-primary hover:underline">
              View all {hub.label.toLowerCase()} →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-stroke bg-white p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:border-dark-3 dark:bg-dark-2"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  {item.keyword}
                </span>
                <h3 className="mt-2 text-base font-bold text-dark group-hover:text-primary dark:text-white">
                  {item.title}
                </h3>
                <span className="mt-4 inline-flex text-xs font-semibold text-primary">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
