/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'worktreewise.com' }],
        destination: 'https://www.worktreewise.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
