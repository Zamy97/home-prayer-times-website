# Home Prayer Times — marketing site

Two-page Angular landing site for the **Home Prayer Times** wall display.

- **`/`** — Apple-style product story (full-bleed hero, day/night features, wall mosaic)
- **`/on-the-wall`** — Wall-mount gallery, real screens, hardware list, WhatsApp CTA

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

## Assets

- Real UI captures: `public/screenshots/`
- Wall lifestyle images: `public/walls/`

## Deploy to Vercel

- Import [Zamy97/home-prayer-times-website](https://github.com/Zamy97/home-prayer-times-website)
- `vercel.json` already sets build + output directory
