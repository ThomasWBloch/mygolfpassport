// Loads @mygolfpassport/shared's design-tokens.ts (plain TS, no build step)
// so tailwind.config.js — a plain Node/CommonJS file — can require it directly.
// Uses tsx's scoped require (not `require('tsx/cjs')`, which patches Node's
// module resolution process-wide and breaks Expo CLI's own internal
// requires, e.g. expo-router's typed-routes generation).
const { require: tsxRequire } = require('tsx/cjs/api');
const { colors } = tsxRequire('@mygolfpassport/shared', __filename);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
