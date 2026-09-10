/** Edit this before deploy — WhatsApp opens with a prefilled message. */
export const SITE = {
  brand: 'Home Prayer Times',
  tagline: 'A wall-mounted prayer clock for the home.',
  /** Digits only, country code included. Example: 15551234567 */
  whatsappNumber: '15551234567',
  whatsappPrefill:
    "Assalamu alaikum — I'm interested in the Home Prayer Times display for our house.",
} as const;

export function whatsappUrl(): string {
  const text = encodeURIComponent(SITE.whatsappPrefill);
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}

export type Feature = {
  title: string;
  body: string;
};

export const FEATURES: Feature[] = [
  {
    title: 'Live clock & countdown',
    body: 'A large, glanceable clock with seconds, plus a clear countdown to the next prayer.',
  },
  {
    title: 'Five daily prayers',
    body: 'Fajr through Isha highlighted as the next one approaches — and a short cue when it’s time.',
  },
  {
    title: 'Hijri & Gregorian',
    body: 'Both calendars side by side so the date feels familiar for the whole family.',
  },
  {
    title: 'Sunrise & sunset',
    body: 'Daily sun times shown large — useful every day, not just Fridays.',
  },
  {
    title: 'Night mode',
    body: 'Automatic after sunset, always on, or off. Soft amber, LED red, green, teal, and more.',
  },
  {
    title: 'Runs offline',
    body: 'Prayer times are calculated on the device. Ideal for a Raspberry Pi kiosk that stays on all day.',
  },
];

export type WallShot = {
  id: string;
  label: string;
  caption: string;
  src: string;
  portrait?: boolean;
};

/** Lifestyle wall-mount images for the product story. */
export const WALL_SHOTS: WallShot[] = [
  {
    id: 'living-day',
    label: 'Living room · day',
    caption: 'Hung at eye level — readable from across the sofa.',
    src: 'walls/wall-living-day.png',
  },
  {
    id: 'living-green',
    label: 'Living room · green',
    caption: 'Same calm day layout with a softer green accent.',
    src: 'walls/wall-living-green.png',
  },
  {
    id: 'bedroom-amber',
    label: 'Bedroom · amber',
    caption: 'Warm night mode that doesn’t flood the room with light.',
    src: 'walls/wall-bedroom-amber.png',
  },
  {
    id: 'bedroom-led',
    label: 'Bedroom · LED red',
    caption: 'Classic digital-clock glow for dark rooms.',
    src: 'walls/wall-bedroom-led.png',
  },
  {
    id: 'bedroom-teal',
    label: 'Bedroom · teal',
    caption: 'A cooler night option for a quieter glow.',
    src: 'walls/wall-bedroom-teal.png',
  },
  {
    id: 'portrait',
    label: 'Hallway · portrait',
    caption: 'Vertical layout for tall screens and narrow walls.',
    src: 'walls/wall-portrait-hall.png',
    portrait: true,
  },
];

export type Look = {
  id: string;
  label: string;
  caption: string;
  src: string;
};

export const LOOKS: Look[] = [
  {
    id: 'day',
    label: 'Day · navy',
    caption: 'Bright living-room display.',
    src: 'screenshots/day-navy.png',
  },
  {
    id: 'day-green',
    label: 'Day · green',
    caption: 'Calmer green clock color.',
    src: 'screenshots/day-green.png',
  },
  {
    id: 'led-red',
    label: 'Night · LED red',
    caption: 'Readable from across a dark bedroom.',
    src: 'screenshots/night-led-red.png',
  },
  {
    id: 'green',
    label: 'Night · green',
    caption: 'Softer night read.',
    src: 'screenshots/night-green.png',
  },
  {
    id: 'amber',
    label: 'Night · amber',
    caption: 'Warm default for winding down.',
    src: 'screenshots/night-amber.png',
  },
  {
    id: 'teal',
    label: 'Night · teal',
    caption: 'Cooler bedroom glow.',
    src: 'screenshots/night-teal.png',
  },
  {
    id: 'portrait',
    label: 'Portrait · day',
    caption: 'Clock on top, prayers stacked below.',
    src: 'screenshots/portrait-day-navy.png',
  },
];

export type HardwareItem = {
  name: string;
  price: string;
  note?: string;
  href?: string;
};

export const HARDWARE_REQUIRED: HardwareItem[] = [
  { name: 'Monitor / TV (22–32″)', price: '$100–150' },
  {
    name: 'Raspberry Pi 4 (4 GB)',
    price: '~$100',
    note: 'Micro Center — price with tax',
    href: 'https://www.microcenter.com/product/637834/raspberry-pi-4-model-b',
  },
  { name: 'microSD card (32–64 GB, A2 rated)', price: '$10–20' },
  { name: 'Official Pi power supply (USB-C, 5V 3A)', price: '$10–15' },
  { name: 'HDMI cable', price: '$8–15' },
  { name: 'Pi case (with ventilation)', price: '$5–15' },
  { name: 'Small USB speakers', price: '$15–35' },
  { name: 'Wall mount (VESA or TV mount)', price: '$15–35' },
  { name: 'Power cable / extension for monitor', price: '$8–15' },
  {
    name: '12 ft extension cord (multi-outlet)',
    price: '$12–18',
    note: 'Home Depot — HDX 12 ft',
    href: 'https://www.homedepot.com/pep/HDX-12-ft-16-2-Light-Duty-Indoor-Multi-Outlet-Extension-Cord-White-FSEX06/324077712',
  },
];

export const HARDWARE_OPTIONAL: HardwareItem[] = [
  { name: 'Ethernet cable', price: '$5–10' },
];

export const MATERIALS_TOTAL = '~$285';
