/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "it"],
    defaultLocale: "it",
    localeDetection: false
  }
}

module.exports = nextConfig
