const path = require('path');

module.exports = {
  webpack(config) {
    config.resolve.alias['@models'] = path.resolve(__dirname, 'app/models');
    config.resolve.alias['@utils'] = path.resolve(__dirname, 'app/utils');
    return config;
  },
};
