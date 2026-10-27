"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { BlogConversionPlan } from "@/lib/blogConversion";
import { buildBlogEvent, conversionHref } from "@/lib/blogConversion";
import { FREE_TRIAL_DAYS } from "@/config/product";
import { trackBlogConversion } from "./BlogConversionAnalytics";

type Position = "inline" | "middle" | "end" | "sidebar";

function useExperiment(slug: string, configured: BlogConversionPlan["variant"]) {
  const [variant, setVariant] = useState<BlogConversionPlan["variant"]>(configured);
  useEffect(() => {
    if (configured !== "control") return;
    const key = "worktreewise_blog_experiment_id_v1";
    let id = slug;
    try {
      id = window.localStorage.getItem(key) || "";
      if (!id) { id = crypto.randomUUID(); window.localStorage.setItem(key, id); }
    } catch { /* The control experience still works when storage is unavailable. */ }
    let hash = 0;
    for (const character of `${id}:${slug}`) hash = ((hash << 5) - hash + character.charCodeAt(0)) | 0;
    setVariant(Math.abs(hash) % 2 === 0 ? "control" : "demo-first");
  }, [configured, slug]);
  return variant;
}

function TrackedRegion({ plan, slug, position, type, children, className = "" }: { plan: BlogConversionPlan; slug: string; position: Position; type: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reported = useRef(false);
  const variant = useExperiment(slug, plan.variant);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || reported.current) return;
      reported.current = true;
      trackBlogConversion("blog_cta_impression", buildBlogEvent(slug, plan.intent, type, position, variant));
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [plan.intent, position, slug, type, variant]);
  return <aside ref={ref} className={className} data-blog-conversion={type} data-variant={variant}>{children}</aside>;
}

function TrialLink({ plan, slug, position, className = "" }: { plan: BlogConversionPlan; slug: string; position: Position; className?: string }) {
  const variant = useExperiment(slug, plan.variant);
  const label = variant === "demo-first" && position !== "end" ? "See WorktreeWise in Action" : plan.buttonLabel;
  return <Link href={conversionHref(slug, position, variant)} target="_self" className={className} onClick={() => {
    const props = buildBlogEvent(slug, plan.intent, "trial", position, variant);
    trackBlogConversion("blog_cta_click", props); trackBlogConversion("trial_cta_click", props);
  }}>{label}<span aria-hidden="true"> →</span></Link>;
}

const primary = "inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";
const secondary = "inline-flex min-h-11 items-center justify-center rounded-md border border-primary px-5 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";
const endCtaBenefits = ["Every Pro feature", "No credit card", "Windows · macOS · Linux"];

export function BlogConversionCTA({ plan, slug, position = "inline", compact = false }: { plan: BlogConversionPlan; slug: string; position?: Position; compact?: boolean }) {
  return <TrackedRegion plan={plan} slug={slug} position={position} type="contextual" className={`not-prose my-9 overflow-hidden rounded-xl border border-primary/20 bg-primary/5 ${compact ? "p-5" : "p-6 sm:p-7"}`}>
    <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">WorktreeWise · visual Git worktrees</p>
    <h2 className="mb-3 text-xl font-bold leading-tight text-dark dark:text-white sm:text-2xl">{plan.headline}</h2>
    <p className="mb-5 text-body-color dark:text-dark-6">{plan.description}</p>
    <TrialLink plan={plan} slug={slug} position={position} className={primary} />
  </TrackedRegion>;
}

export function BlogProductShowcase({ plan, slug }: { plan: BlogConversionPlan; slug: string }) {
  return <TrackedRegion plan={plan} slug={slug} position="middle" type="showcase" className="not-prose my-12 overflow-hidden rounded-2xl border border-stroke bg-white shadow-sm dark:border-dark-3 dark:bg-dark-2">
    <Image src={plan.image.src} alt={plan.image.alt} width={plan.image.width} height={plan.image.height} sizes="(max-width: 1024px) 100vw, 820px" className="h-auto w-full border-b border-stroke dark:border-dark-3" />
    <div className="p-6 sm:p-8"><p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">Apply what you’re learning</p><h2 className="mb-4 text-2xl font-bold text-dark dark:text-white">Worktrees, visible and ready to use.</h2>
      <ul className="mb-6 grid gap-3 text-sm text-body-color dark:text-dark-6 sm:grid-cols-3">{plan.benefits.map((benefit) => <li key={benefit} className="rounded-lg bg-gray-1 p-3 dark:bg-dark">✓ {benefit}</li>)}</ul>
      <details className="mb-6 rounded-lg border border-stroke p-4 text-sm dark:border-dark-3"><summary className="cursor-pointer font-semibold text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:text-white">What this product view shows</summary><p className="mt-3 text-body-color dark:text-dark-6">{plan.image.alt}. WorktreeWise uses native Git and leaves the repository compatible with your existing tools.</p></details>
      <div className="flex flex-wrap items-center gap-3"><TrialLink plan={plan} slug={slug} position="middle" className={primary} /><Link href="/#product" target="_self" className={secondary} onClick={() => trackBlogConversion("blog_cta_click", buildBlogEvent(slug, plan.intent, "features", "middle", plan.variant))}>Explore features</Link></div>
      <p className="mt-4 text-sm text-body-color dark:text-dark-6">{FREE_TRIAL_DAYS}-day free trial · No credit card required · Windows, macOS, and Linux</p>
    </div>
  </TrackedRegion>;
}

export function BlogBeforeAfter({ plan, slug }: { plan: BlogConversionPlan; slug: string }) {
  return <TrackedRegion plan={plan} slug={slug} position="middle" type="before-after" className="not-prose my-10 grid overflow-hidden rounded-xl border border-stroke dark:border-dark-3 sm:grid-cols-2">
    <div className="bg-gray-1 p-6 dark:bg-dark-2"><p className="mb-2 text-xs font-bold uppercase tracking-wide text-body-color">With Git commands</p><h2 className="mb-3 text-xl font-bold text-dark dark:text-white">You stay in control.</h2><code className="block rounded bg-dark p-3 text-sm text-white">git worktree add ../feature feature</code><p className="mt-3 text-sm text-body-color dark:text-dark-6">Create and inspect worktrees directly with native Git.</p></div>
    <div className="bg-primary/5 p-6"><p className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">With WorktreeWise</p><h2 className="mb-3 text-xl font-bold text-dark dark:text-white">The same model, made visible.</h2><p className="text-sm text-body-color dark:text-dark-6">Choose a branch or commit, configure the directory and hooks, then keep its status and actions in one workspace.</p></div>
  </TrackedRegion>;
}

export function BlogEndCTA({ plan, slug }: { plan: BlogConversionPlan; slug: string }) {
  return <TrackedRegion plan={plan} slug={slug} position="end" type="end" className="not-prose relative overflow-hidden rounded-2xl border border-white/10 bg-dark p-7 text-white shadow-[0_24px_70px_-35px_rgba(55,88,249,0.8)] sm:p-10">
    <div aria-hidden="true" className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
    <div aria-hidden="true" className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
    <div className="relative">
      <p className="!mb-3 text-xs font-bold uppercase tracking-[0.18em] !text-primary">Your next branch deserves its own workspace</p>
      <h2 className="!mb-3 !mt-0 text-2xl font-bold leading-tight !text-white sm:text-3xl">Try WorktreeWise free.</h2>
      <p className="!mb-6 max-w-2xl !text-dark-6">Use the complete WorktreeWise workspace with your own repositories for {FREE_TRIAL_DAYS} days. No credit card required, and your repositories remain standard Git repositories.</p>
      <div className="flex flex-wrap items-center gap-4">
        <TrialLink plan={plan} slug={slug} position="end" className={primary} />
        <span className="text-sm text-dark-6">Start in minutes · Cancel nothing</span>
      </div>
      <ul className="!mb-0 mt-7 flex !list-none flex-wrap gap-x-6 gap-y-3 border-t border-white/10 !p-0 pt-5 text-sm text-dark-6" aria-label="Free trial benefits">
        {endCtaBenefits.map((benefit) => <li key={benefit} className="flex items-center gap-2"><span aria-hidden="true" className="text-primary">✓</span>{benefit}</li>)}
      </ul>
    </div>
  </TrackedRegion>;
}
