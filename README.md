# Home Prayer Times — marketing site

Static Angular landing page for the **Home Prayer Times** wall display. Deployable to Vercel.

## Setup

1. Put your WhatsApp number (digits only, with country code) in `src/app/site.config.ts`:

```ts
whatsappNumber: '15551234567',
```

2. Run locally:

```bash
npm start -- --host 127.0.0.1 --port 4320
```

Open http://127.0.0.1:4320/

3. Production build:

```bash
npm run build
```

Output: `dist/home-prayer-times-website/browser`

## Screenshots

Real captures from the Home Prayer Times Display live under `public/screenshots/`.

To refresh them (display build must be served, e.g. on port 4177):

```bash
# from Home_Prayer_Times_Display
npm run build
cd dist/home-prayer-times-display/browser && python3 -m http.server 4177 --bind 127.0.0.1

# from this repo
python3 scripts/capture-screenshots.py
```

## Deploy to Vercel

- Import this repo / folder in Vercel
- Framework preset can stay **Other** (`vercel.json` is already set)
- Build command: `npm run build`
- Output directory: `dist/home-prayer-times-website/browser`

## What’s on the page

- Brand-first hero with a real day-mode screenshot
- Lookbook: day navy/green + night LED red, green, amber, teal
- Feature list and night-mode story
- “Mounted on the wall” room mockup using a real night screenshot
- WhatsApp CTAs throughout
