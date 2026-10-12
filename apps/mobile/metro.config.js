const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Metro starts one worker process per CPU core. On the low-RAM dev machine that
// exhausts memory while `eas update` bundles the app (the export hangs or dies
// with "out of memory"). Publish with METRO_MAX_WORKERS=2 to cap it; unset,
// nothing changes (EAS cloud builds don't set it).
if (process.env.METRO_MAX_WORKERS) {
  config.maxWorkers = Number(process.env.METRO_MAX_WORKERS);
}

module.exports = withNativeWind(config, { input: './global.css' });
