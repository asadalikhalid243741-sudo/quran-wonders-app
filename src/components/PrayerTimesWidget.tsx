import { useCallback, useEffect, useMemo, useState } from 'react';
import { LocateFixed, MapPin, RefreshCw } from 'lucide-react';
import type { Language } from '../types';
import type { UIStrings } from '../data/translations';

interface PrayerTimesWidgetProps {
  language: Language;
  ui: UIStrings;
}

interface PrayerTimings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

type SavedLocation =
  | { mode: 'city'; city: string; country: string; label: string }
  | { mode: 'coords'; latitude: number; longitude: number; label: string };

const PRESET_CITIES: Array<{ city: string; country: string }> = [
  { city: 'Makkah', country: 'Saudi Arabia' },
  { city: 'Madinah', country: 'Saudi Arabia' },
  { city: 'Karachi', country: 'Pakistan' },
  { city: 'Lahore', country: 'Pakistan' },
  { city: 'London', country: 'United Kingdom' },
  { city: 'New York', country: 'United States' },
];

const DEFAULT_LOCATION: SavedLocation = {
  mode: 'city',
  city: 'Makkah',
  country: 'Saudi Arabia',
  label: 'Makkah, Saudi Arabia',
};

function cleanTime(raw: string): string {
  // AlAdhan sometimes appends timezone like "05:12 (AST)"
  return raw.split(' ')[0].trim();
}

function format12Hour(time24: string): string {
  const clean = cleanTime(time24);
  const [hStr, mStr] = clean.split(':');
  const h = Number(hStr);
  const m = Number(mStr);
  if (Number.isNaN(h) || Number.isNaN(m)) return clean;
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

function getNextPrayerKey(timings: PrayerTimings): keyof PrayerTimings {
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const order: Array<keyof PrayerTimings> = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  for (const key of order) {
    const [hStr, mStr] = cleanTime(timings[key]).split(':');
    const mins = Number(hStr) * 60 + Number(mStr);
    if (!Number.isNaN(mins) && mins > nowMins) {
      return key;
    }
  }
  return 'Fajr';
}

export function PrayerTimesWidget({ language, ui }: PrayerTimesWidgetProps) {
  const [location, setLocation] = useState<SavedLocation>(() => {
    try {
      const raw = localStorage.getItem('qw_prayer_location');
      return raw ? (JSON.parse(raw) as SavedLocation) : DEFAULT_LOCATION;
    } catch {
      return DEFAULT_LOCATION;
    }
  });

  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [hijriDate, setHijriDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [geoNote, setGeoNote] = useState<string | null>(null);

  const [showCityForm, setShowCityForm] = useState(false);
  const [cityInput, setCityInput] = useState(
    location.mode === 'city' ? location.city : ''
  );
  const [countryInput, setCountryInput] = useState(
    location.mode === 'city' ? location.country : ''
  );

  useEffect(() => {
    try {
      localStorage.setItem('qw_prayer_location', JSON.stringify(location));
    } catch {
      // ignore storage failure
    }
  }, [location]);

  const fetchTimings = useCallback(async (loc: SavedLocation) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 9000);
      const timestamp = Math.floor(Date.now() / 1000);

      const url =
        loc.mode === 'coords'
          ? `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${loc.latitude}&longitude=${loc.longitude}&method=2`
          : `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
              loc.city
            )}&country=${encodeURIComponent(loc.country)}&method=2`;

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = (await res.json()) as {
        code: number;
        data?: {
          timings: PrayerTimings;
          date?: {
            hijri?: {
              day: string;
              month: { en: string; ar: string };
              year: string;
            };
          };
          meta?: {
            timezone?: string;
          };
        };
      };

      if (json.code !== 200 || !json.data?.timings) {
        throw new Error('Invalid AlAdhan payload');
      }

      const t = json.data.timings;
      const cleanTimings: PrayerTimings = {
        Fajr: t.Fajr,
        Dhuhr: t.Dhuhr,
        Asr: t.Asr,
        Maghrib: t.Maghrib,
        Isha: t.Isha,
      };
      setTimings(cleanTimings);

      const hijri = json.data.date?.hijri;
      const formattedHijri = hijri
        ? `${hijri.day} ${language === 'en' ? hijri.month.en : hijri.month.ar} ${hijri.year}`
        : '';
      if (formattedHijri) {
        setHijriDate(formattedHijri);
      }

      try {
        localStorage.setItem(
          'qw_prayer_timings_v1',
          JSON.stringify({
            label: loc.label,
            timings: cleanTimings,
            hijriDate: formattedHijri,
          })
        );
      } catch {
        // ignore storage quota errors
      }

      if (loc.mode === 'coords' && !loc.label && json.data.meta?.timezone) {
        setLocation((prev) =>
          prev.mode === 'coords' && !prev.label
            ? { ...prev, label: json.data!.meta!.timezone!.replace(/_/g, ' ') }
            : prev
        );
      }
    } catch {
      try {
        const raw = localStorage.getItem('qw_prayer_timings_v1');
        if (raw) {
          const cached = JSON.parse(raw) as {
            timings?: PrayerTimings;
            hijriDate?: string;
          };
          if (cached.timings) {
            setTimings(cached.timings);
            if (cached.hijriDate) setHijriDate(cached.hijriDate);
            setErrorMsg(null);
            return;
          }
        }
      } catch {
        // ignore cache parse errors
      }
      setErrorMsg(ui.prayerError);
    } finally {
      setLoading(false);
    }
  }, [language, ui.prayerError]);

  useEffect(() => {
    fetchTimings(location);
  }, [location, fetchTimings]);

  const handleUseMyLocation = () => {
    setGeoNote(null);
    if (!('geolocation' in navigator)) {
      setGeoNote(ui.prayerLocationDenied);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let resolvedLabel = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;

        try {
          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${language}`
          );
          if (geoRes.ok) {
            const geoJson = (await geoRes.json()) as {
              city?: string;
              locality?: string;
              countryName?: string;
            };
            const cityPart = geoJson.city || geoJson.locality;
            if (cityPart && geoJson.countryName) {
              resolvedLabel = `${cityPart}, ${geoJson.countryName}`;
            } else if (geoJson.countryName) {
              resolvedLabel = geoJson.countryName;
            }
          }
        } catch {
          // keep coordinate / timezone fallback
        }

        setShowCityForm(false);
        setLocation({
          mode: 'coords',
          latitude,
          longitude,
          label: resolvedLabel,
        });
      },
      () => {
        setLoading(false);
        setGeoNote(ui.prayerLocationDenied);
      },
      { timeout: 8000 }
    );
  };

  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const c = cityInput.trim();
    const co = countryInput.trim();
    if (!c) return;
    setGeoNote(null);
    setShowCityForm(false);
    setLocation({
      mode: 'city',
      city: c,
      country: co || '',
      label: co ? `${c}, ${co}` : c,
    });
  };

  const nextKey = useMemo(() => {
    if (!timings) return null;
    return getNextPrayerKey(timings);
  }, [timings]);

  const prayerItems: Array<{ key: keyof PrayerTimings; label: string }> = [
    { key: 'Fajr', label: ui.prayerFajr },
    { key: 'Dhuhr', label: ui.prayerDhuhr },
    { key: 'Asr', label: ui.prayerAsr },
    { key: 'Maghrib', label: ui.prayerMaghrib },
    { key: 'Isha', label: ui.prayerIsha },
  ];

  return (
    <section
      aria-label={ui.prayerTimesTitle}
      className="rounded-2xl border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] p-5 sm:p-6 space-y-4"
    >
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2 className="text-base font-semibold text-[#1A221E] dark:text-[#F2EFE9]">
            {ui.prayerTimesTitle}
          </h2>
          <span className="text-xs text-[#6B756F] dark:text-[#9BA8A2] inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-400 shrink-0" />
            <span>{location.label}</span>
          </span>
          {hijriDate && (
            <>
              <span aria-hidden="true" className="text-xs text-[#6B756F] dark:text-[#9BA8A2]">
                ·
              </span>
              <span className="text-xs font-medium text-[#8A6118] dark:text-[#E5BE53] tabular-nums">
                {hijriDate}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleUseMyLocation}
            className="min-h-[38px] px-3 py-1.5 rounded-lg border border-[#E5DFD2] dark:border-[#23352E] bg-[#FBF9F4] dark:bg-[#0D1613] text-xs font-medium text-emerald-900 dark:text-emerald-300 hover:border-emerald-700/40 inline-flex items-center gap-1.5 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <LocateFixed className="w-3.5 h-3.5" />
            <span>{ui.prayerDetectLocation}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCityForm((v) => !v)}
            className="min-h-[38px] px-3 py-1.5 rounded-lg border border-[#E5DFD2] dark:border-[#23352E] text-xs font-medium text-[#4E5A54] dark:text-[#B4C0BB] hover:border-emerald-700/40 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            {ui.prayerChangeCity}
          </button>
        </div>
      </div>

      {geoNote && (
        <p className="text-xs text-[#8A6118] dark:text-[#E5BE53]">{geoNote}</p>
      )}

      {/* Optional City Picker Drawer */}
      {showCityForm && (
        <div className="rounded-xl border border-[#EAE3D4] dark:border-[#1E2F29] bg-[#F8F5ED] dark:bg-[#0E1814] p-4 space-y-3">
          <form onSubmit={handleCitySubmit} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder={ui.prayerCityPlaceholder}
              required
              className="flex-1 min-h-[40px] px-3 py-1.5 rounded-lg border border-[#D8D0C0] dark:border-[#2A4037] bg-white dark:bg-[#111C18] text-sm text-[#1A221E] dark:text-[#F2EFE9] focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
            <input
              type="text"
              value={countryInput}
              onChange={(e) => setCountryInput(e.target.value)}
              placeholder={ui.prayerCountryPlaceholder}
              className="flex-1 min-h-[40px] px-3 py-1.5 rounded-lg border border-[#D8D0C0] dark:border-[#2A4037] bg-white dark:bg-[#111C18] text-sm text-[#1A221E] dark:text-[#F2EFE9] focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="submit"
                className="min-h-[40px] px-4 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-[#0B1210] text-xs font-medium whitespace-nowrap"
              >
                {ui.prayerApplyCity}
              </button>
              <button
                type="button"
                onClick={() => setShowCityForm(false)}
                className="min-h-[40px] px-3 py-1.5 rounded-lg border border-[#D8D0C0] dark:border-[#2A4037] text-xs font-medium text-[#5A6560] dark:text-[#9BA8A2] whitespace-nowrap"
              >
                {ui.prayerCancel}
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {PRESET_CITIES.map((preset) => (
              <button
                key={preset.city}
                type="button"
                onClick={() => {
                  setCityInput(preset.city);
                  setCountryInput(preset.country);
                  setGeoNote(null);
                  setShowCityForm(false);
                  setLocation({
                    mode: 'city',
                    city: preset.city,
                    country: preset.country,
                    label: `${preset.city}, ${preset.country}`,
                  });
                }}
                className="px-2.5 py-1 rounded-md border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] text-xs text-[#4E5A54] dark:text-[#B4C0BB] hover:border-emerald-700/40 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
              >
                {preset.city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Prayer Times Grid */}
      {loading && !timings ? (
        <div className="py-4 text-xs text-[#5A6560] dark:text-[#9BA8A2]">
          {ui.prayerLoading}
        </div>
      ) : errorMsg ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 dark:border-amber-700/50 bg-amber-50/70 dark:bg-amber-950/30 px-4 py-3">
          <p className="text-xs text-amber-950 dark:text-amber-200">{errorMsg}</p>
          <button
            type="button"
            onClick={() => fetchTimings(location)}
            className="min-h-[36px] px-3 py-1 rounded-lg border border-amber-400/60 text-xs font-medium text-amber-950 dark:text-amber-100 inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{ui.prayerRetry}</span>
          </button>
        </div>
      ) : timings ? (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {prayerItems.map((item) => {
            const isNext = nextKey === item.key;
            return (
              <div
                key={item.key}
                className={`rounded-xl border px-4 py-3 transition-colors ${
                  isNext
                    ? 'border-emerald-700/60 dark:border-emerald-400/50 bg-emerald-800/[0.06] dark:bg-emerald-500/10'
                    : 'border-[#EAE3D4] dark:border-[#1E2F29] bg-[#FAF7F0] dark:bg-[#0D1613]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className={`text-xs font-medium ${
                      isNext
                        ? 'text-emerald-900 dark:text-emerald-300'
                        : 'text-[#5A6560] dark:text-[#9BA8A2]'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isNext && (
                    <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">
                      {ui.prayerNextLabel}
                    </span>
                  )}
                </div>
                <p
                  dir="ltr"
                  className="text-base sm:text-lg font-semibold text-[#1A221E] dark:text-[#F2EFE9] tabular-nums"
                >
                  {format12Hour(timings[item.key])}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
