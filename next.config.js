/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "mobicheckin-assets.s3.amazonaws.com",
      "assets.eventmaker.io",
    ],
  },
  experimental: {
    serverActions: true,
  },
};
