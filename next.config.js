/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/git-worktree-add",
        destination: "/git-worktree/add",
        permanent: true,
      },
      {
        source: "/blog/git-worktree-remove",
        destination: "/git-worktree/remove",
        permanent: true,
      },
      {
        source: "/blog/git-worktree-prune",
        destination: "/git-worktree/prune",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
