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
    body: 'Fajr through Isha highlighted as the next one approaches — and a short “it’s time” cue when adhan arrives.',
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
    body: 'Automatic after sunset, always on, or off. Soft amber, LED red, green, and more for reading in the dark.',
  },
  {
    title: 'Runs offline',
    body: 'Prayer times are calculated on the device. Ideal for a Raspberry Pi kiosk that stays on all day.',
  },
  {
    title: 'Landscape or portrait',
    body: 'Hang it wide like a living-room TV, or run vertical with clock on top and prayers stacked below — pick in Settings.',
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
    label: 'Day mode · navy',
    caption: 'Bright living-room display — navy clock, soft panel, full prayer grid.',
    src: 'screenshots/day-navy.png',
  },
  {
    id: 'day-green',
    label: 'Day mode · green',
    caption: 'Same day layout with a calmer green clock color.',
    src: 'screenshots/day-green.png',
  },
  {
    id: 'led-red',
    label: 'Night · LED red',
    caption: 'Alarm-clock red that stays readable from across a dark bedroom.',
    src: 'screenshots/night-led-red.png',
  },
  {
    id: 'green',
    label: 'Night · green',
    caption: 'A softer green accent for nighttime without flooding the room with light.',
    src: 'screenshots/night-green.png',
  },
  {
    id: 'amber',
    label: 'Night · amber',
    caption: 'Warm amber default — easy on the eyes while you wind down.',
    src: 'screenshots/night-amber.png',
  },
  {
    id: 'teal',
    label: 'Night · teal',
    caption: 'Another night option for a cooler glow in the bedroom.',
    src: 'screenshots/night-teal.png',
  },
];

export type LayoutOption = {
  id: string;
  title: string;
  body: string;
  src: string;
  portrait?: boolean;
};

export const LAYOUTS: LayoutOption[] = [
  {
    id: 'landscape',
    title: 'Landscape',
    body: 'Wall display with the clock beside the prayer grid — best for living-room TVs and wide monitors.',
    src: 'screenshots/day-navy.png',
  },
  {
    id: 'portrait',
    title: 'Portrait / vertical',
    body: 'Stacked layout: clock on top, prayers below, then sunrise/sunset and date. Great for vertical monitors or tall narrow screens.',
    src: 'screenshots/portrait-day-navy.png',
    portrait: true,
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
