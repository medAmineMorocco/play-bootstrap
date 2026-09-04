# WorktreeWise

Follow the workspace instructions in `../AGENTS.md` and the release workflow in `../.codex/skills/worktreewise-release-capture/SKILL.md`.

## Project Development

- This is a Next.js 14 App Router site using React, TypeScript, Tailwind CSS, and Markdown/MDX articles.
- Keep route metadata, canonical URLs, Open Graph/Twitter images, structured data, navigation, and sitemaps aligned when adding public pages.
- Reuse existing components and visual tokens; maintain responsive behavior, dark mode, accessibility, and reasonable image loading.
- Keep pricing claims synchronized with actual product capabilities and the existing Stripe plan model.
- Do not expose secrets from `.env`, change payment behavior, deploy, or publish without explicit authorization.
- Do not modify the Electron application or versioned docs as a side effect of a landing-page-only request.
- After editing multiple React components, review component boundaries, client/server usage, effects, accessibility, and avoidable rendering work.

## Release Images and Feature Updates

- Store current product captures in `public/images/v1.1.0`.
- Prefer the newest approved 1.1 image throughout the home page, tutorials, pricing, cheat sheet, and articles.
- Preserve an existing filename when a new capture is a direct replacement; this updates all references consistently.
- Add a new stable filename when the image represents a distinct feature state.
- Do not use screenshots containing visible Git author names, credentials, license data, or sensitive paths.
- When a documented feature is marketable, update the relevant feature section, tutorial, article references, metadata/social image, and pricing feature list where appropriate.
- Do not restore removed code-generator product features.
- Keep claims grounded in behavior verified in the WorktreeWise source and real application.

Run TypeScript checks, `git diff --check`, image-reference checks, and a production build after relevant changes.

## Overview
WorktreeWise is a tool for managing Git worktrees.

## Main Concepts
- Worktrees
- Workflows
- Hooks

## Usage
1. Open repository
2. Create a worktree
3. Run workflows

## Target Users
Developers working with multiple branches.
