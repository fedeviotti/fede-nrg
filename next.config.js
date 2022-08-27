/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: i18n.locales,
    defaultLocale: i18n.defaultLocale
  }
}

module.exports = nextConfig
