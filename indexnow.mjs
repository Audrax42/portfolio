// Tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver) that the pages changed.
// Run after publishing an update: node indexnow.mjs
// The key file at the site root proves the request comes from the owner of the domain.

import { readdirSync } from 'node:fs';
import { SITE } from './src/render.mjs';

const keyFile = readdirSync('.').find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('IndexNow key file missing at the site root');
const key = keyFile.slice(0, -4);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key,
    keyLocation: `${SITE}${keyFile}`,
    urlList: [SITE, `${SITE}en/`],
  }),
});
// 200 and 202 both mean the URLs were accepted.
console.log(`IndexNow: ${res.status} ${res.statusText}`);
