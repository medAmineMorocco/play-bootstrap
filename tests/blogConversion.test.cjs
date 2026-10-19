const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const matter = require("gray-matter");
const ts = require("typescript");
const source = fs.readFileSync("src/lib/blogConversion.ts", "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const moduleUnderTest = { exports: {} };
new Function("exports", "module", "require", compiled)(moduleUnderTest.exports, moduleUnderTest, require);
const { buildBlogConversionPlan, buildBlogEvent, classifyBlogIntent, conversionHref, splitArticleHtml } = moduleUnderTest.exports;

test("classifies each supported article intent", () => {
  assert.equal(classifyBlogIntent({ title: "Best Git Worktree GUI Tools" }), "comparison");
  assert.equal(classifyBlogIntent({ title: "Git Worktree vs Branch" }), "educational");
  assert.equal(classifyBlogIntent({ title: "How to Create a Git Worktree" }), "tutorial");
  assert.equal(classifyBlogIntent({ title: "Parallel AI Coding Agents" }), "advanced");
});

test("classifies the two example articles and additional real categories", () => {
  const cases = [
    ["git-worktree-gui-2026", "comparison", "Try WorktreeWise Free"],
    ["git-worktree-vs-branch", "educational", "See WorktreeWise in Action"],
    ["git-worktree-add", "tutorial", "Do This Visually"],
    ["claude-git-worktrees", "advanced", "Manage Parallel Workflows"],
  ];
  for (const [slug, intent, buttonLabel] of cases) {
    const article = matter(fs.readFileSync(`markdown/blog/${slug}.mdx`, "utf8"));
    const plan = buildBlogConversionPlan({ title: article.data.title, content: article.content, wordCount: article.content.split(/\s+/).length });
    assert.equal(plan.intent, intent, slug); assert.equal(plan.buttonLabel, buttonLabel, slug);
  }
});

test("manual configuration overrides classification and CTA copy", () => {
  const plan = buildBlogConversionPlan({ title: "A comparison", content: "", wordCount: 1000, overrides: { intent: "tutorial", headline: "Custom", end: false } });
  assert.equal(plan.intent, "tutorial"); assert.equal(plan.headline, "Custom"); assert.equal(plan.placements.end, false);
});

test("limits placements for short articles and prevents duplicate end CTAs", () => {
  const short = buildBlogConversionPlan({ title: "Git explained", content: "", wordCount: 300 });
  assert.equal(short.placements.inline, false); assert.equal(short.placements.showcase, false);
  const duplicate = buildBlogConversionPlan({ title: "Git explained", content: "Try WorktreeWise free", wordCount: 1000 });
  assert.equal(duplicate.placements.end, false);
});

test("splits only at safe top-level h2 boundaries", () => {
  const parts = splitArticleHtml("<p>Intro</p><h2>A</h2><pre>&lt;h2&gt;</pre><h2>B</h2><p>End</p>");
  assert.equal(parts.length, 2); assert.match(parts[0], /<h2>A/); assert.match(parts[0], /&lt;h2&gt;/); assert.match(parts[1], /^<h2>B/);
});

test("builds a valid attributed destination", () => {
  const href = conversionHref("git-worktree-vs-branch", "end", "control");
  assert.match(href, /^\/pricing\?/); assert.match(href, /utm_campaign=git-worktree-vs-branch/);
});

test("tracking properties include article and CTA context", () => {
  assert.deepEqual(buildBlogEvent("article", "tutorial", "trial", "inline", "control"), {
    article_slug: "article", article_intent: "tutorial", cta_type: "trial", cta_position: "inline", cta_variant: "control",
  });
});
