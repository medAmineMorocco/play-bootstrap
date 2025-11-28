/** @type {import('next-sitemap').IConfig} */
const blogPosts = [
  { slug: 'git-stash-to-git-worktree' },
  { slug: 'optimize-branch-switching-with-git-worktree' },
  { slug: 'git-worktree-parallel-development' },
  { slug: 'how-to-rename-git-worktree' },
];

module.exports = {
  siteUrl: 'https://www.worktreewise.com/', // Replace with your domain
  generateRobotsTxt: true,           // Generate robots.txt along with sitemap
  outDir: './public',
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/documentation'],
  sitemapSize: 5000,                 // Optional, if you have many pages
  additionalPaths: async (config) => {
    return blogPosts.map((post) => `/blog/${post.slug}`);
  },
};
