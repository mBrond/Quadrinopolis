const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@models': path.resolve(__dirname, 'models'),
    };
    return config;
  },
};
