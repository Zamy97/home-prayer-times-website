/** Edit this before deploy — WhatsApp opens with a prefilled message. */
export const SITE = {
  brand: 'Home Prayer Times',
  tagline: 'A wall-mounted prayer clock for the home.',
  /** Digits only, country code included. Example: 15551234567 */
  whatsappNumber: '15106605453',
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
  /** Gallery grouping */
  group?: 'home' | 'rooms' | 'corner';
};

/**
 * Wall lifestyle images — real display UI kept, room cleaned up for marketing.
 */
export const WALL_SHOTS: WallShot[] = [
  {
    id: 'corner-patio',
    label: 'High mount · patio corner',
    caption: 'By the sliding door — high corner, day mode, clean wall.',
    src: 'walls/clean-corner-patio-day.png',
    group: 'corner',
  },
  {
    id: 'corner-two-wall',
    label: 'High mount · two-wall corner',
    caption: 'Tucked into the ceiling corner where both walls meet.',
    src: 'walls/clean-corner-two-wall-day.png',
    group: 'corner',
  },
  {
    id: 'corner-day-living',
    label: 'High mount · day living room',
    caption: 'Near the ceiling above the sofa — day mode, clean install.',
    src: 'walls/clean-corner-day-living.png',
    group: 'corner',
  },
  {
    id: 'corner-day-bright',
    label: 'High mount · bright day',
    caption: 'Looking up from the room in daylight — no cables.',
    src: 'walls/clean-corner-day-bright.png',
    group: 'corner',
  },
  {
    id: 'corner-day',
    label: 'High mount · day',
    caption: 'Near the ceiling — easy to read looking up from the room.',
    src: 'walls/clean-corner-day.png',
    group: 'corner',
  },
  {
    id: 'corner-green',
    label: 'High mount · night green',
    caption: 'Corner near the ceiling with a soft green night accent.',
    src: 'walls/clean-corner-green.png',
    group: 'corner',
  },
  {
    id: 'corner-amber',
    label: 'High mount · amber',
    caption: 'Warm amber night mode from a low looking-up angle.',
    src: 'walls/clean-corner-amber.png',
    group: 'corner',
  },
  {
    id: 'home-day',
    label: 'Living room · day',
    caption: 'Clean living-room wall with day mode.',
    src: 'walls/clean-home-day.png',
    group: 'home',
  },
  {
    id: 'home-green',
    label: 'Evening · night green',
    caption: 'Soft green night accent on a tidy wall.',
    src: 'walls/clean-home-green.png',
    group: 'home',
  },
  {
    id: 'home-teal',
    label: 'Hallway · night teal',
    caption: 'Teal night mode — no clutter.',
    src: 'walls/clean-home-teal.png',
    group: 'home',
  },
  {
    id: 'living-sofa',
    label: 'Living room · sofa view',
    caption: 'Glanceable from across the couch.',
    src: 'walls/clean-living-sofa.png',
    group: 'rooms',
  },
  {
    id: 'dining-day',
    label: 'Dining room',
    caption: 'At the end of the table for the whole family.',
    src: 'walls/clean-dining-day.png',
    group: 'rooms',
  },
  {
    id: 'bedroom-amber',
    label: 'Bedroom · amber',
    caption: 'Warm night mode that doesn’t flood the room.',
    src: 'walls/clean-bedroom-amber.png',
    group: 'rooms',
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
