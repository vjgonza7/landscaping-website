"use client";

import { useState } from "react";

type CookieSettings = {
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "virenza-cookie-preferences";

function getStoredSettings(): CookieSettings {
  if (typeof window === "undefined") {
    return { analytics: false, marketing: false };
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return { analytics: false, marketing: false };

  try {
    const parsed = JSON.parse(stored) as Partial<CookieSettings>;
    return {
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return { analytics: false, marketing: false };
  }
}

export default function CookiePreferences() {
  const [settings, setSettings] = useState<CookieSettings>(getStoredSettings);
  const [saved, setSaved] = useState(false);

  const update = (key: keyof CookieSettings) => {
    setSaved(false);
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const save = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setSaved(true);
  };

  const rejectOptional = () => {
    const next = { analytics: false, marketing: false };
    setSettings(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaved(true);
  };

  return (
    <div className="space-y-5">
      <div className="border border-white/10 bg-[#101010] p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-black text-white">Essential Cookies</h2>
            <p className="mt-2 text-sm leading-7 text-white/56">
              Required for the site to work, submit forms, remember preferences, and reduce spam.
            </p>
          </div>
          <span className="w-fit border border-[#d8b76a]/35 bg-[#d8b76a]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#f0cf81]">
            Always On
          </span>
        </div>
      </div>

      <PreferenceToggle
        title="Analytics"
        description="Helps us understand which pages visitors use so we can improve the site. No analytics script is active unless you add one later."
        checked={settings.analytics}
        onChange={() => update("analytics")}
      />
      <PreferenceToggle
        title="Marketing"
        description="Reserved for future ad tracking such as Meta Pixel, Google Ads, or retargeting. This is off by default."
        checked={settings.marketing}
        onChange={() => update("marketing")}
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={save}
          className="bg-[#d8b76a] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#f0cf81]"
        >
          Save Preferences
        </button>
        <button
          type="button"
          onClick={rejectOptional}
          className="border border-white/12 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-colors hover:border-white/30"
        >
          Reject Optional
        </button>
      </div>

      {saved && (
        <p className="border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          Cookie preferences saved on this device.
        </p>
      )}
    </div>
  );
}

function PreferenceToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="border border-white/10 bg-[#101010] p-6 md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-black text-white">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/56">{description}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={onChange}
          className={`relative h-8 w-16 shrink-0 border transition-colors ${
            checked ? "border-[#d8b76a] bg-[#d8b76a]" : "border-white/20 bg-white/8"
          }`}
        >
          <span
            className={`absolute top-1 h-6 w-6 bg-white transition-transform ${
              checked ? "translate-x-8" : "translate-x-1"
            }`}
          />
          <span className="sr-only">Toggle {title}</span>
        </button>
      </div>
    </div>
  );
}
