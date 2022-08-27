const path = require("path");

const i18nextConfig = {
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'it',
    localePath: path.resolve('./public/locales')
  },
};

module.exports = i18nextConfig;
