export type BlogIntent = "comparison" | "educational" | "tutorial" | "advanced";

export type BlogConversionOverrides = {
  enabled?: boolean;
  intent?: BlogIntent;
  headline?: string;
  description?: string;
  buttonLabel?: string;
  variant?: "control" | "demo-first";
  inline?: boolean;
  showcase?: boolean;
  beforeAfter?: boolean;
  end?: boolean;
};

export type BlogConversionPlan = {
  enabled: boolean;
  intent: BlogIntent;
  headline: string;
  description: string;
  buttonLabel: string;
  variant: "control" | "demo-first";
  placements: { inline: boolean; showcase: boolean; beforeAfter: boolean; end: boolean };
  image: { src: string; width: number; height: number; alt: string };
  benefits: string[];
};

const INTENT_COPY: Record<BlogIntent, Omit<BlogConversionPlan, "enabled" | "intent" | "variant" | "placements">> = {
  comparison: {
    headline: "See how WorktreeWise handles worktrees in practice.",
    description: "Create, inspect, and organize parallel working directories from one visual workspace.",
    buttonLabel: "Try WorktreeWise Free",
    image: { src: "/images/v1.2.0/dashboard.png", width: 1746, height: 901, alt: "WorktreeWise worktree dashboard and Git graph" },
    benefits: ["See every worktree and its status", "Open the right IDE or terminal", "Keep native Git compatibility"],
  },
  educational: {
    headline: "Put Git worktrees into a clearer workflow.",
    description: "Keep branches checked out side by side and see their state without losing the Git concepts you just learned.",
    buttonLabel: "See WorktreeWise in Action",
    image: { src: "/images/v1.2.0/worktrees-list-and-actions.png", width: 1746, height: 901, alt: "WorktreeWise worktree list with visual worktree actions" },
    benefits: ["Understand each worktree at a glance", "Keep parallel branches visible", "Use the Git CLI whenever you want"],
  },
  tutorial: {
    headline: "Do this workflow visually with WorktreeWise.",
    description: "Create a worktree from HEAD, a branch, a tag, or a commit, then open it in the tools you already use.",
    buttonLabel: "Do This Visually",
    image: { src: "/images/v1.2.0/create-worktree-public.png", width: 1628, height: 966, alt: "WorktreeWise create worktree dialog with hooks and repository checkout options" },
    benefits: ["Choose the exact Git starting point", "Run repeatable creation hooks", "Use predictable directory names"],
  },
  advanced: {
    headline: "Give every parallel task its own worktree.",
    description: "Run workflows, terminals, and supported coding agents in separate working directories while keeping one shared view.",
    buttonLabel: "Manage Parallel Workflows",
    image: { src: "/images/v1.2.0/multiple-ai-agents-public.png", width: 1746, height: 901, alt: "Multiple coding agents running in separate WorktreeWise worktrees" },
    benefits: ["Isolate files by working directory", "Run commands across selected worktrees", "Keep terminals and agents organized"],
  },
};

export function classifyBlogIntent(input: { title?: string; category?: string; tags?: string[]; content?: string }): BlogIntent {
  const heading = [input.title, input.category, ...(input.tags || [])].filter(Boolean).join(" ").toLowerCase();
  const text = `${heading} ${input.content?.slice(0, 4000) || ""}`.toLowerCase();
  if (/git worktree\s+vs\.?\s+branch/.test(heading)) return "educational";
  if (/\b(vs\.?|versus|comparison|compare|best|alternative|gui tools?)\b/.test(heading)) return "comparison";
  if (/\b(ai agent|claude|parallel|automation|workflow|qa|advanced|multiple worktree)\b/.test(heading)) return "advanced";
  if (/\b(how to|tutorial|guide|step[- ]by[- ]step|add|remove|prune|rename|create)\b/.test(heading)) return "tutorial";
  if (/\b(ai agent|claude|parallel|automation|workflow|qa|advanced|multiple worktree)\b/.test(text)) return "advanced";
  if (/\b(how to|tutorial|guide|step[- ]by[- ]step|add|remove|prune|rename|create)\b/.test(text)) return "tutorial";
  if (/\b(vs\.?|versus|comparison|compare|best|alternative|gui tools?)\b/.test(text)) return "comparison";
  return "educational";
}

export function hasExistingConversionCta(content: string) {
  return /(?:try|start|download|get)\s+worktreewise|start\s+(?:a\s+)?free\s+trial|data-blog-conversion/i.test(content);
}

export function buildBlogConversionPlan(input: {
  title?: string; category?: string; tags?: string[]; content?: string; wordCount: number; overrides?: BlogConversionOverrides;
}): BlogConversionPlan {
  const overrides = input.overrides || {};
  const intent = overrides.intent || classifyBlogIntent(input);
  const copy = INTENT_COPY[intent];
  const medium = input.wordCount >= 500;
  const long = input.wordCount >= 900;
  const existingCta = hasExistingConversionCta(input.content || "");
  return {
    enabled: overrides.enabled !== false,
    intent,
    headline: overrides.headline || copy.headline,
    description: overrides.description || copy.description,
    buttonLabel: overrides.buttonLabel || copy.buttonLabel,
    variant: overrides.variant || "control",
    image: copy.image,
    benefits: copy.benefits,
    placements: {
      inline: overrides.inline ?? medium,
      showcase: overrides.showcase ?? long,
      beforeAfter: overrides.beforeAfter ?? (long && (intent === "educational" || intent === "tutorial")),
      end: overrides.end ?? !existingCta,
    },
  };
}

export function splitArticleHtml(html: string) {
  const starts = Array.from(html.matchAll(/<h2(?:\s[^>]*)?>/gi), (match) => match.index || 0);
  if (starts.length < 2) return [html];
  const indexes = Array.from(new Set([1, Math.ceil(starts.length / 2), Math.ceil(starts.length * 0.75)]))
    .filter((index) => index < starts.length)
    .sort((a, b) => a - b);
  const boundaries = indexes.map((index) => starts[index]);
  return boundaries.map((start, index) => html.slice(index === 0 ? 0 : boundaries[index - 1], start))
    .concat(html.slice(boundaries[boundaries.length - 1]));
}

export function conversionHref(slug: string, position: string, variant: string) {
  const query = new URLSearchParams({ utm_source: "blog", utm_medium: "cta", utm_campaign: slug, utm_content: `${position}-${variant}` });
  return `/pricing?${query.toString()}`;
}

export function buildBlogEvent(slug: string, intent: string, type: string, position: string, variant: string) {
  return { article_slug: slug, article_intent: intent, cta_type: type, cta_position: position, cta_variant: variant };
}
