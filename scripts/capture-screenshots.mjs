import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../public/screenshots');
const URL = 'http://127.0.0.1:4205/';
const CHROME =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const baseSettings = {
  coords: { lat: 42.4788, lng: -83.0248 },
  method: 'ISNA',
  asr: 'Hanafi',
  timezone: 'America/Detroit',
  panelLeft: true,
  dayClockColor: 'navy',
  nightClockColor: 'amber',
  nightMode: 'off',
  cityId: '',
};

const shots = [
  { file: 'day-navy.png', nightMode: 'off', dayClockColor: 'navy', nightClockColor: 'amber', width: 1440, height: 810 },
  { file: 'day-green.png', nightMode: 'off', dayClockColor: 'green', nightClockColor: 'amber', width: 1440, height: 810 },
  { file: 'portrait-day-navy.png', nightMode: 'off', dayClockColor: 'navy', nightClockColor: 'amber', screenLayout: 'portrait', width: 810, height: 1440 },
  { file: 'night-amber.png', nightMode: 'on', dayClockColor: 'navy', nightClockColor: 'amber', width: 1440, height: 810 },
  { file: 'night-led-red.png', nightMode: 'on', dayClockColor: 'navy', nightClockColor: 'led-red', width: 1440, height: 810 },
  { file: 'night-green.png', nightMode: 'on', dayClockColor: 'navy', nightClockColor: 'green', width: 1440, height: 810 },
  { file: 'night-teal.png', nightMode: 'on', dayClockColor: 'navy', nightClockColor: 'teal', width: 1440, height: 810 },
];

async function capture() {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    defaultViewport: { width: 1440, height: 810 },
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
  });

  try {
    for (const shot of shots) {
      const page = await browser.newPage();
      const width = shot.width ?? 1440;
      const height = shot.height ?? 810;
      await page.setViewport({ width, height });
      const settings = {
        ...baseSettings,
        nightMode: shot.nightMode,
        dayClockColor: shot.dayClockColor,
        nightClockColor: shot.nightClockColor,
        ...(shot.screenLayout ? { screenLayout: shot.screenLayout } : {}),
      };

      await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
      await page.evaluate((s) => {
        localStorage.setItem('prayerSettings', JSON.stringify(s));
      }, settings);
      await page.reload({ waitUntil: 'load', timeout: 60000 });
      await page.waitForSelector('main.board .content', { timeout: 30000 });
      await page.addStyleTag({
        content: `.geoPromptBackdrop, .hotCorner { display: none !important; }`,
      });
      await new Promise((r) => setTimeout(r, 1500));

      const outPath = path.join(OUT, shot.file);
      await page.screenshot({ path: outPath, type: 'png' });
      console.log('saved', shot.file, fs.statSync(outPath).size);
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
