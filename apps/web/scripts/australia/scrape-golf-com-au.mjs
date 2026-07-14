// scrape-golf-com-au.mjs
// Source: golf.com.au "Find a Place to Play" — Terraces CMS API (same family as UK federations)
// IMPORTANT: golf.com.au is Cloudflare-protected. Direct curl/node-fetch returns HTTP 403 with
// CF managed challenge. This script is documentation of the API shape we discovered via the
// Claude-in-Chrome extension. To re-run a scrape, paste the JS payload (see below) into the
// browser console while sitting on https://golf.com.au/find-a-place-to-play and let it run for
// ~7 minutes, then trigger a download of `window.AU_JSON` to `raw-golf-com-au/details.json`.
//
// API shape:
//   POST /api/clubs/FindClubs           — listing (cap 100/page, paginate via pageNumber+pageSize+regionId)
//   GET  /api/clubs/GetClubDetails?clubId={id}  — full per-club detail (Email, Phone, Website, Lat/Lng, Holes)
//
// Pagination quirk: skip/take/sortBy=distance/lat-lng all IGNORED. Only pageNumber+pageSize+regionId works.
// Region IDs (state codes):
//   2=NSW (474), 3=VIC (517), 4=QLD (332), 5=WA (238), 6=SA (180), 7=NT (20), 8=ACT (17), 9=TAS (86)
//   Total: 1864 clubs (matches DB-claim of 1737 with some delta)

export const REGIONS = [
  {id: 2, code: 'NSW', name: 'New South Wales', total: 474},
  {id: 3, code: 'VIC', name: 'Victoria', total: 517},
  {id: 4, code: 'QLD', name: 'Queensland', total: 332},
  {id: 5, code: 'WA',  name: 'Western Australia', total: 238},
  {id: 6, code: 'SA',  name: 'South Australia', total: 180},
  {id: 7, code: 'NT',  name: 'Northern Territory', total: 20},
  {id: 8, code: 'ACT', name: 'Australian Capital Territory', total: 17},
  {id: 9, code: 'TAS', name: 'Tasmania', total: 86}
];

// Browser console payload — paste into devtools at https://golf.com.au/find-a-place-to-play
export const BROWSER_SCRAPE_PAYLOAD = `
window.AU_LISTING = []; window.AU_DETAIL = []; window.AU_DONE = false;
window.AU_PROGRESS = {phase:'listing', pagesDone:0, detailsDone:0, errors:[]};
(async () => {
  try {
    const regions = [
      {id:2, total:474},{id:3, total:517},{id:4, total:332},{id:5, total:238},
      {id:6, total:180},{id:7, total:20},{id:8, total:17},{id:9, total:86}
    ];
    const all = new Map();
    for (const reg of regions) {
      const pages = Math.ceil(reg.total / 100);
      for (let p = 1; p <= pages; p++) {
        const r = await fetch('/api/clubs/FindClubs', {
          method:'POST',
          headers:{'Content-Type':'application/json','X-Requested-With':'XMLHttpRequest'},
          body: JSON.stringify({location:'',sortBy:'name',pageNumber:p,pageSize:100,regionId:reg.id})
        });
        const arr = await r.json();
        for (const c of arr) if (c.ClubId) all.set(c.ClubId, c);
        window.AU_PROGRESS.pagesDone++;
        await new Promise(r=>setTimeout(r,150));
      }
    }
    window.AU_PROGRESS.phase = 'detail';
    window.AU_PROGRESS.totalDetail = all.size;
    const ids = [...all.keys()];
    const slim = [];
    for (let i = 0; i < ids.length; i += 6) {
      const batch = ids.slice(i, i+6);
      const results = await Promise.all(batch.map(async id => {
        try {
          const r = await fetch('/api/clubs/GetClubDetails?clubId=' + id, {headers:{'X-Requested-With':'XMLHttpRequest'}});
          if (!r.ok) return {ClubId:id, _error:'HTTP '+r.status};
          const d = await r.json();
          return {
            ClubId: d.ClubId, ClubUID: d.ClubUID, ClubName: d.ClubName,
            Email: d.Email||null, Phone: d.Phone||null, ProShopPhone: d.ProShopPhone||null,
            Website: d.Website||null,
            Latitude: d.Latitude, Longitude: d.Longitude, NoOfHoles: d.NoOfHoles||0,
            Address1: d.LocAddress1, Address2: d.LocAddress2, Address3: d.LocAddress3, Address4: d.LocAddress4,
            PostalCode: d.PostalCode, Region: d.RegionName, DisplayRegionCode: d.DisplayRegionCode,
            FoundingYear: d.FoundingYear, FacebookUrl: d.FacebookUrl||null
          };
        } catch (e) { return {ClubId:id, _error: e.message}; }
      }));
      slim.push(...results);
      window.AU_DETAIL = slim;
      window.AU_PROGRESS.detailsDone = slim.length;
    }
    window.AU_JSON = JSON.stringify(slim);
    window.AU_DONE = true;
  } catch (e) {
    window.AU_PROGRESS.errors.push(e.message);
    window.AU_DONE = true;
  }
})();
`;

// Download trigger (paste once AU_DONE === true):
export const BROWSER_DOWNLOAD_PAYLOAD = `
const blob = new Blob([window.AU_JSON], {type: 'application/json'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'au-golf-com-au-details.json';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
setTimeout(()=>URL.revokeObjectURL(url), 1000);
'downloaded';
`;
