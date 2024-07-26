const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    unstable_enablePackageExports: true,
    // assetExts: [...(defaultConfig.resolver?.assetExts || []), 'glb'],
  },
};
module.exports = mergeConfig(defaultConfig, config);
