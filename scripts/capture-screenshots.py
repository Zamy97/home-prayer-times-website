#!/usr/bin/env python3
"""Capture display screenshots via Chrome headless + localStorage bootstrap pages."""
from __future__ import annotations

import json
import subprocess
import time
from pathlib import Path

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DIST = Path(
    "/Users/akhtarzaman/Desktop/Bunch of Stuff/web_proj/"
    "Home_Prayer_Times_Display/dist/home-prayer-times-display/browser"
)
OUT = Path(
    "/Users/akhtarzaman/Desktop/Bunch of Stuff/web_proj/"
    "home-prayer-times-website/public/screenshots"
)
PORT = 4177
LAT = 42.4788
LNG = -83.0248

BASE = {
    "coords": {"lat": LAT, "lng": LNG},
    "method": "ISNA",
    "asr": "Hanafi",
    "timezone": "America/Detroit",
    "panelLeft": True,
    "cityId": "",
}

# Matches home.component.ts weatherTemp.v2 cache so screenshots show Current + Feels like
# even when /api/weather is unavailable during headless capture.
def weather_cache(temp: float = 63.0, feels_like: float = 62.0) -> dict:
    return {
        "temp": temp,
        "feelsLike": feels_like,
        "lat": LAT,
        "lng": LNG,
        "fetchedAt": int(time.time() * 1000),
    }

SHOTS = [
    ("day-navy.png", {"nightMode": "off", "dayClockColor": "navy", "nightClockColor": "amber"}, (1440, 810)),
    ("day-green.png", {"nightMode": "off", "dayClockColor": "green", "nightClockColor": "amber"}, (1440, 810)),
    ("portrait-day-navy.png", {"nightMode": "off", "dayClockColor": "navy", "nightClockColor": "amber", "screenLayout": "portrait"}, (810, 1440)),
    ("night-amber.png", {"nightMode": "on", "dayClockColor": "navy", "nightClockColor": "amber"}, (1440, 810)),
    ("night-led-red.png", {"nightMode": "on", "dayClockColor": "navy", "nightClockColor": "led-red"}, (1440, 810)),
    ("night-green.png", {"nightMode": "on", "dayClockColor": "navy", "nightClockColor": "green"}, (1440, 810)),
    ("night-teal.png", {"nightMode": "on", "dayClockColor": "navy", "nightClockColor": "teal"}, (1440, 810)),
]


def capture(file_name: str, settings: dict, weather: dict, window_size: tuple[int, int]) -> None:
    stem = file_name.replace(".png", "")
    payload = json.dumps({**BASE, **settings})
    weather_payload = json.dumps(weather)
    boot = DIST / f"_shot_{stem}.html"
    # Same-origin page: set settings + weather cache, then show the app full-bleed
    # so Chrome's screenshot captures Current / Feels like like the live site.
    boot.write_text(
        f"""<!doctype html>
<html><head><meta charset="utf-8"><title>{stem}</title>
<style>
  html, body {{ margin: 0; width: 100%; height: 100%; background: #000; overflow: hidden; }}
  iframe {{ border: 0; width: 100vw; height: 100vh; display: block; }}
</style></head>
<body>
<script>
  localStorage.setItem('prayerSettings', {json.dumps(payload)});
  localStorage.setItem('weatherTemp.v2', {json.dumps(weather_payload)});
</script>
<iframe id="app" src="./index.html"></iframe>
</body></html>
""",
        encoding="utf-8",
    )
    out = OUT / file_name
    if out.exists():
        out.unlink()
    url = f"http://127.0.0.1:{PORT}/_shot_{stem}.html"
    width, height = window_size
    proc = subprocess.run(
        [
            CHROME,
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            "--force-device-scale-factor=1",
            f"--window-size={width},{height}",
            f"--screenshot={out}",
            "--virtual-time-budget=8000",
            "--run-all-compositor-stages-before-draw",
            url,
        ],
        capture_output=True,
        text=True,
    )
    if out.exists() and out.stat().st_size > 5000:
        print("saved", file_name, out.stat().st_size)
    else:
        print("FAIL", file_name, "stderr:", (proc.stderr or "")[-800:])
    boot.unlink(missing_ok=True)


def fetch_live_weather() -> dict:
    """Prefer a live Open-Meteo reading so screenshots match the real app."""
    import urllib.request

    url = (
        "https://api.open-meteo.com/v1/forecast"
        f"?latitude={LAT}&longitude={LNG}"
        "&current=temperature_2m,apparent_temperature"
        "&temperature_unit=fahrenheit"
    )
    try:
        with urllib.request.urlopen(url, timeout=8) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        current = data.get("current") or {}
        temp = current.get("temperature_2m")
        feels = current.get("apparent_temperature")
        if isinstance(temp, (int, float)):
            return weather_cache(
                float(temp),
                float(feels) if isinstance(feels, (int, float)) else float(temp),
            )
    except Exception as exc:  # noqa: BLE001
        print("weather fetch fallback:", exc)
    return weather_cache()


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    weather = fetch_live_weather()
    print(
        "weather cache",
        f"Current {weather['temp']:.0f}°F / Feels like {weather['feelsLike']:.0f}°F",
    )
    for file_name, settings, window_size in SHOTS:
        capture(file_name, settings, weather, window_size)
        time.sleep(0.2)


if __name__ == "__main__":
    main()
