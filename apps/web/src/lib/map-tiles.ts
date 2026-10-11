// CARTO's free Voyager basemap tiles need an API key (from October 2026, tiles
// without one are a grey "API KEY REQUIRED" watermark). Request/manage the key
// at https://carto.com/basemaps/apikey — it is free (1M tiles/month commercial).
//
// NEXT_PUBLIC_CARTO_KEY is inlined at build time: set it in .env.local and in
// the Vercel project's environment variables, then redeploy. The repo is
// public, so never hard-code the key here. Without it the map still renders,
// just with the watermark.
const key = process.env.NEXT_PUBLIC_CARTO_KEY

export const CARTO_TILE_URL =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' + (key ? `?key=${key}` : '')
