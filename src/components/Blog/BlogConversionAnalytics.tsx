"use client";

import { useEffect } from "react";

declare global { interface Window { gtag?: (...args: unknown[]) => void } }

export type BlogConversionEvent = {
  article_slug: string;
  article_intent: string;
  cta_type?: string;
  cta_position?: string;
  cta_variant?: string;
  [key: string]: string | undefined;
};

export function trackBlogConversion(eventName: string, properties: BlogConversionEvent) {
  if (typeof window === "undefined") return;
  const query = new URLSearchParams(window.location.search);
  if (eventName === "blog_article_view") {
    try { window.sessionStorage.setItem("worktreewise_blog_attribution", JSON.stringify(properties)); } catch { /* Analytics remains optional. */ }
  }
  window.gtag?.("event", eventName, {
    ...properties,
    referrer_campaign: query.get("utm_campaign") || undefined,
    referrer_source: query.get("utm_source") || undefined,
    referrer_medium: query.get("utm_medium") || undefined,
  });
}

export function trackAttributedBlogOutcome(eventName: "trial_activated" | "purchase_completed" | "download_click", extra: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  let attribution: Partial<BlogConversionEvent> = {};
  try { attribution = JSON.parse(window.sessionStorage.getItem("worktreewise_blog_attribution") || "{}"); } catch { /* No stored attribution. */ }
  const query = new URLSearchParams(window.location.search);
  const slug = query.get("utm_source") === "blog" ? query.get("utm_campaign") : attribution.article_slug;
  if (!slug) return;
  window.gtag?.("event", eventName, {
    article_slug: slug,
    article_intent: attribution.article_intent,
    cta_variant: query.get("utm_content") || attribution.cta_variant,
    ...extra,
  });
}

export function BlogArticleAnalytics({ slug, intent }: { slug: string; intent: string }) {
  useEffect(() => {
    trackBlogConversion("blog_article_view", { article_slug: slug, article_intent: intent });
  }, [slug, intent]);
  return null;
}
