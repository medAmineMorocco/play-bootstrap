/** @type {import('next-sitemap').IConfig} */
const blogPosts = [
  { slug: "git-stash-to-git-worktree" },
  { slug: "optimize-branch-switching-with-git-worktree" },
  { slug: "git-worktree-parallel-development" },
  { slug: "how-to-rename-git-worktree" },
  { slug: "git-worktree-vs-branch" },
  { slug: "git-worktree-vs-clone" },
  { slug: "git-worktree-gui-2026" },
  { slug: "claude-git-worktrees" },
  { slug: "qa-git-worktrees" },
];

const tutorialCommands = [
  "",
  "/add",
  "/list",
  "/remove",
  "/move",
  "/lock",
  "/unlock",
  "/prune",
  "/repair",
];

module.exports = {
  siteUrl: "https://www.worktreewise.com/",
  generateRobotsTxt: true,
  outDir: "./public",
  changefreq: "daily",
  priority: 0.8,
  exclude: [
    "/documentation",
    "/error",
    "/blog/git-worktree-add",
    "/blog/git-worktree-remove",
    "/blog/git-worktree-prune",
  ],
  sitemapSize: 5000,
  additionalPaths: async (config) => {
    const blogPaths = blogPosts.map((post) => ({
      loc: `/blog/${post.slug}`,
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));

    const tutorialPaths = tutorialCommands.map((cmd) => ({
      loc: `/git-worktree${cmd}`,
      changefreq: "daily",
      priority: cmd === "" ? 1.0 : 0.9,
      lastmod: new Date().toISOString(),
    }));

    return [...tutorialPaths, ...blogPaths];
  },
};
