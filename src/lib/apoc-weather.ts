/**
 * Open-Meteo Weather Integration for apoc-bnb
 * Uses the free Open-Meteo API — no API key required.
 * https://open-meteo.com/en/docs
 *
 * Maps weather conditions to apocalyptic severity levels
 * for the post-apocalyptic Airbnb experience overlay.
 */

const OPEN_METEO_BASE = "https://api.open-meteo.com/v1";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WeatherCondition {
  latitude: number;
  longitude: number;
  temperature: number; // °C
  windspeed: number; // km/h
  windgusts: number; // km/h
  precipitation: number; // mm
  weatherCode: number; // WMO code
  isDay: boolean;
}

export type ApocLevel = 0 | 1 | 2 | 3 | 4 | 5;
// 0 = Clear, 1 = Mild, 2 = Moderate, 3 = Harsh, 4 = Extreme, 5 = APOCALYPTIC

export interface ApocWeatherContext {
  condition: WeatherCondition;
  apocLevel: ApocLevel;
  apocLabel: string;
  hazards: string[];
  shelterPremiumMultiplier: number; // how much to mark up shelter prices
  description: string; // flavour text for UI
}

// ─── WMO Weather Code mappings ────────────────────────────────────────────────

const WMO_DESCRIPTIONS: Record<number, string> = {
  0: "Clear skies",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Light showers",
  81: "Showers",
  82: "Violent showers",
  85: "Snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Heavy thunderstorm with hail",
};

// ─── Apoc Level calculation ───────────────────────────────────────────────────

function calculateApocLevel(
  temp: number,
  windspeed: number,
  precipitation: number,
  weatherCode: number,
): { level: ApocLevel; hazards: string[] } {
  const hazards: string[] = [];
  let score = 0;

  // Temperature extremes
  if (temp > 45 || temp < -30) {
    score += 3;
    hazards.push(temp > 45 ? "Extreme heat" : "Extreme cold");
  } else if (temp > 38 || temp < -15) {
    score += 2;
    hazards.push(temp > 38 ? "Dangerous heat" : "Severe cold");
  } else if (temp > 32 || temp < 0) {
    score += 1;
  }

  // Wind
  if (windspeed > 100) {
    score += 3;
    hazards.push("Hurricane-force winds");
  } else if (windspeed > 60) {
    score += 2;
    hazards.push("Storm winds");
  } else if (windspeed > 30) {
    score += 1;
  }

  // Precipitation
  if (precipitation > 50) {
    score += 2;
    hazards.push("Flash flood risk");
  } else if (precipitation > 20) {
    score += 1;
  }

  // Weather code severity
  if (weatherCode === 99 || weatherCode === 96) {
    score += 3;
    hazards.push("Severe thunderstorm with hail");
  } else if (weatherCode === 95) {
    score += 2;
    hazards.push("Active thunderstorm");
  } else if (weatherCode === 82 || weatherCode === 86) {
    score += 2;
    hazards.push("Violent precipitation");
  } else if (weatherCode >= 80) {
    score += 1;
  }

  const level = Math.min(5, score) as ApocLevel;
  return { level, hazards };
}

const APOC_LABELS: Record<ApocLevel, string> = {
  0: "Pre-Collapse Normality",
  1: "Mild Disruption",
  2: "Regional Instability",
  3: "Harsh Wasteland",
  4: "Extreme Hazard Zone",
  5: "APOCALYPTIC EVENT",
};

const APOC_DESCRIPTIONS: Record<ApocLevel, string> = {
  0: "Suspiciously normal. Perhaps the calm before the storm.",
  1: "Minor inconveniences. Scavengers report manageable conditions.",
  2: "Supplies dwindling. Shelter premium warranted.",
  3: "Exposed travel not recommended. Bunker pricing applies.",
  4: "Extreme danger. Maximum-security refuges only.",
  5: "All bets off. Pray to whatever gods remain.",
};

const PREMIUM_MULTIPLIERS: Record<ApocLevel, number> = {
  0: 1.0,
  1: 1.2,
  2: 1.5,
  3: 2.0,
  4: 3.5,
  5: 5.0,
};

// ─── API ──────────────────────────────────────────────────────────────────────

/**
 * Fetch current weather for a lat/lon coordinate.
 * Used to add real-world weather context to apocalyptic listings.
 */
export async function getCurrentWeather(
  lat: number,
  lon: number,
  signal?: AbortSignal,
): Promise<WeatherCondition | null> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: [
      "temperature_2m",
      "windspeed_10m",
      "windgusts_10m",
      "precipitation",
      "weathercode",
      "is_day",
    ].join(","),
    timezone: "auto",
  });

  try {
    const res = await fetch(`${OPEN_METEO_BASE}/forecast?${params}`, {
      signal,
    });
    if (!res.ok) return null;
    const json = await res.json();
    const c = json.current;

    return {
      latitude: lat,
      longitude: lon,
      temperature: c.temperature_2m,
      windspeed: c.windspeed_10m,
      windgusts: c.windgusts_10m,
      precipitation: c.precipitation,
      weatherCode: c.weathercode,
      isDay: c.is_day === 1,
    };
  } catch {
    return null;
  }
}

/**
 * Get full apocalyptic weather context for a location.
 * Combines real-world weather data with apocalyptic scoring.
 */
export async function getApocWeatherContext(
  lat: number,
  lon: number,
  signal?: AbortSignal,
): Promise<ApocWeatherContext | null> {
  const condition = await getCurrentWeather(lat, lon, signal);
  if (!condition) return null;

  const { level, hazards } = calculateApocLevel(
    condition.temperature,
    condition.windspeed,
    condition.precipitation,
    condition.weatherCode,
  );

  return {
    condition,
    apocLevel: level,
    apocLabel: APOC_LABELS[level],
    hazards,
    shelterPremiumMultiplier: PREMIUM_MULTIPLIERS[level],
    description: APOC_DESCRIPTIONS[level],
  };
}

/**
 * Get the WMO weather description for a code.
 */
export function getWeatherDescription(code: number): string {
  return WMO_DESCRIPTIONS[code] ?? "Unknown conditions";
}
