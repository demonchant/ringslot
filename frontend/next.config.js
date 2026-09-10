/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  agentRules: false,
  async redirects() {
    return [
      { source: '/virtual-number', destination: '/virtual-phone-number', permanent: true },
      { source: '/get-virtual-number', destination: '/virtual-phone-number', permanent: true },
      { source: '/where-to-get-a-virtual-number', destination: '/virtual-phone-number', permanent: true },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol:'https', hostname:'api.qrserver.com' },
      { protocol:'https', hostname:'quickchart.io' },
    ],
  },
};
