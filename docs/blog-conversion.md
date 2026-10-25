# Blog conversion system

Every article is classified at render time as `comparison`, `educational`, `tutorial`, or `advanced`. The classifier uses the title, category, tags, and article text. It selects intent-specific copy, a real WorktreeWise 1.2.0 screenshot, and three relevant product benefits.

The shared blog page places components only between rendered top-level sections. Articles under 500 words receive only an end CTA. Articles from 500 to 899 words add a compact contextual CTA. Longer articles add a product showcase, plus a CLI/visual comparison for educational and tutorial content. An existing WorktreeWise trial CTA suppresses the automatic end CTA.

## Frontmatter controls

All settings are optional. New articles receive the automatic defaults.

```yaml
category: tutorial
tags:
  - git worktree
conversion:
  enabled: true
  intent: tutorial
  headline: Create this worktree visually.
  description: Optional supporting copy.
  buttonLabel: Try the visual workflow
  variant: control
  inline: true
  showcase: true
  beforeAfter: true
  end: true
```

Set `conversion.enabled: false` to disable promotional components for a specific article. Placement flags can be overridden individually.

## Analytics and experiments

The components reuse the existing Google Analytics `gtag` integration and emit `blog_article_view`, `blog_cta_impression`, `blog_cta_click`, and `trial_cta_click`. The existing trial, Paddle checkout, and download flows emit `trial_activated`, `purchase_completed`, and `download_click` when a blog attribution exists. Events include article slug, inferred intent, CTA type, position, experiment variant, and inbound UTM attribution when present.

Visitors are assigned deterministically to the control or demo-first copy using a random browser-local identifier. The control experience renders by default when local storage or analytics is unavailable. Product media is static, so `blog_demo_play` is not emitted.

All trial links lead to the existing pricing/trial journey with article attribution preserved in UTM parameters. The experience states the verified 10-day trial, no-card requirement, and Windows, macOS, and Linux support.
