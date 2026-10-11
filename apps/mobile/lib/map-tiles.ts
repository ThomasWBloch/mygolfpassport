// CARTO's free Voyager basemap tiles need an API key (from October 2026, tiles
// without one are a grey "API KEY REQUIRED" watermark). Request/manage the key
// at https://carto.com/basemaps/apikey — it is free (1M tiles/month commercial).
//
// EXPO_PUBLIC_CARTO_KEY is inlined at bundle time, so a key change ships with
// an OTA update — no native rebuild. It must exist in .env.local AND in all
// three EAS environments (production / preview / development). The repo is
// public, so never hard-code the key here. Without it the map still renders,
// just with the watermark.
const key = process.env.EXPO_PUBLIC_CARTO_KEY;

export const CARTO_TILE_URL =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' + (key ? `?key=${key}` : '');
