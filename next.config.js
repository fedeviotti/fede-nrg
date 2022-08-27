/** @type {import('next').NextConfig} */
var path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "it"],
    defaultLocale: "it",
    localePath: path.resolve("./locales")
  }
}

module.exports = nextConfig
