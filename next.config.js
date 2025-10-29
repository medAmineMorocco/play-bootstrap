/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.worktreewise.com' }],
        destination: 'https://worktreewise.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
