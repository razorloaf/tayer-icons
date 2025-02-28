const replace = require('@rollup/plugin-replace');

module.exports = {
  rollup(config, options) {
    const replacePluginIndex = config.plugins.findIndex(
      plugin => plugin && plugin.name === 'replace'
    );

    if (replacePluginIndex !== -1) {
      config.plugins[replacePluginIndex] = replace({
        'process.env.NODE_ENV': JSON.stringify(options.env),
        preventAssignment: true
      });
    }

    return config;
  }
};