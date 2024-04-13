const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([], {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
});
