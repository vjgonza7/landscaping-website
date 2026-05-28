"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import LeadCapture from "./LeadCapture";

type Forecast = {
  daily?: {
    temperature_2m_max?: number[];
    precipitation_sum?: number[];
    et0_fao_evapotranspiration?: number[];
  };
};

type Result = {
  probability: number;
  maxTemp: number;
  dryDays: number;
  recommendation: string;
  level: "good" | "watch" | "urgent";
};

const plantProfiles = {
  desert: { label: "Desert adapted", heat: 112 },
  shrub: { label: "Shrub / hedge", heat: 106 },
  tree: { label: "Young tree", heat: 104 },
  turf: { label: "Grass / sod", heat: 101 },
  flower: { label: "Flower / soft plant", heat: 98 },
};

export default function HeatSurvivalPredictor() {
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [plant, setPlant] = useState<keyof typeof plantProfiles>("shrub");
  const [exposure, setExposure] = useState("full");
  const [symptom, setSymptom] = useState("wilting");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const needsHelp = result?.level === "urgent";

  const leadMessage = useMemo(() => {
    if (!result) return "Heat survival predictor lead.";
    return [
      "Heat survival predictor lead.",
      `Address/zip: ${address || "Not provided"} ${zip}`.trim(),
      `Plant: ${plantProfiles[plant].label}`,
      `Exposure: ${exposure}`,
      `Symptoms: ${symptom}`,
      `Save probability: ${result.probability}%`,
      `Forecast max: ${result.maxTemp}F`,
    ].join("\n");
  }, [address, exposure, plant, result, symptom, zip]);

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const locationQuery = encodeURIComponent(zip || address);
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${locationQuery}&count=1&countryCode=US&language=en&format=json`
      );
      const geo = await geoRes.json();
      const place = geo.results?.[0];
      if (!place) throw new Error("location");

      const forecastRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&daily=temperature_2m_max,precipitation_sum,et0_fao_evapotranspiration&temperature_unit=fahrenheit&timezone=auto&forecast_days=7`
      );
      const forecast = (await forecastRes.json()) as Forecast;
      const highs = forecast.daily?.temperature_2m_max ?? [];
      const rain = forecast.daily?.precipitation_sum ?? [];
      const evap = forecast.daily?.et0_fao_evapotranspiration ?? [];

      const maxTemp = Math.round(Math.max(...highs));
      const dryDays = rain.filter((day) => day < 0.02).length;
      const evapStress = evap.reduce((sum, day) => sum + day, 0) / Math.max(evap.length, 1);
      const profile = plantProfiles[plant];
      let risk = 22;

      risk += Math.max(0, maxTemp - profile.heat) * 6;
      risk += dryDays * 4;
      risk += exposure === "full" ? 14 : exposure === "afternoon" ? 9 : 2;
      risk += symptom === "crispy" ? 20 : symptom === "brown" ? 15 : symptom === "wilting" ? 10 : 3;
      risk += evapStress > 0.32 ? 10 : evapStress > 0.24 ? 6 : 0;

      const probability = Math.max(8, Math.min(92, Math.round(100 - risk)));
      const level = probability >= 68 ? "good" : probability >= 42 ? "watch" : "urgent";
      const recommendation =
        level === "good"
          ? "This plant has a strong chance if watering is consistent and the root zone is protected."
          : level === "watch"
            ? "This plant is stressed. Shade, irrigation timing, and soil moisture should be checked soon."
            : "This plant is in a danger zone. A fast irrigation and heat-stress visit is recommended.";

      setResult({ probability, maxTemp, dryDays, level, recommendation });
    } catch {
      setError("We could not pull weather for that location. Try a nearby ZIP code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="heat-survival"
      className={`px-6 py-20 transition-colors duration-500 md:py-28 ${
        needsHelp
          ? "bg-[radial-gradient(circle_at_70%_20%,rgba(239,68,68,0.24),transparent_34%),linear-gradient(180deg,#210707_0%,#0a0a0a_100%)]"
          : "bg-[#080908]"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d8b76a]">
            QR Destination 01
          </span>
          <h2 className="mt-3 text-4xl font-black leading-none text-white md:text-6xl">
            Heat Survival Predictor
          </h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-white/52">
            Upload a plant photo, enter the ZIP code, and get a fast weather-based
            survival score for Arizona heat stress.
          </p>
        </div>

        <div className="border border-white/10 bg-[#10120f] p-5 sm:p-7">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="md:col-span-2">
              <span className="text-sm font-medium text-white/72">Plant photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="mt-2 w-full border border-white/10 bg-[#080908] px-3 py-3 text-sm text-white file:mr-4 file:border-0 file:bg-[#d8b76a] file:px-4 file:py-2 file:text-xs file:font-bold file:text-black"
              />
            </label>
            {preview && (
              <img
                src={preview}
                alt="Uploaded plant preview"
                className="h-48 w-full object-cover md:col-span-2"
              />
            )}
            <Field label="ZIP code" value={zip} onChange={setZip} placeholder="85001" required />
            <Field label="Address or neighborhood" value={address} onChange={setAddress} placeholder="Phoenix, AZ" />
            <Select label="Plant type" value={plant} onChange={(value) => setPlant(value as keyof typeof plantProfiles)}>
              {Object.entries(plantProfiles).map(([value, profile]) => (
                <option key={value} value={value}>{profile.label}</option>
              ))}
            </Select>
            <Select label="Sun exposure" value={exposure} onChange={setExposure}>
              <option value="full">Full sun all day</option>
              <option value="afternoon">Hot afternoon sun</option>
              <option value="partial">Partial shade</option>
            </Select>
            <Select label="Visible symptoms" value={symptom} onChange={setSymptom}>
              <option value="wilting">Wilting / drooping</option>
              <option value="crispy">Crispy leaves</option>
              <option value="brown">Brown edges or patches</option>
              <option value="minor">Minor stress</option>
            </Select>
            <button
              type="submit"
              disabled={loading}
              className="self-end bg-[#d8b76a] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#f0cf81] disabled:opacity-60"
            >
              {loading ? "Checking Weather..." : "Predict Survival"}
            </button>
          </form>

          {error && <p className="mt-5 text-sm text-red-300">{error}</p>}

          {result && (
            <div
              className={`mt-7 space-y-5 border p-5 ${
                needsHelp
                  ? "border-red-400/50 bg-red-950/40 shadow-2xl shadow-red-950/30"
                  : "border-white/10 bg-black/20"
              }`}
            >
              {needsHelp && (
                <div className="border border-red-300/40 bg-red-500/15 p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.28em] text-red-200">
                    Needs Help
                  </p>
                  <p className="mt-2 text-3xl font-black leading-none text-white">
                    High heat-risk plant detected
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className={`text-sm uppercase tracking-[0.22em] ${needsHelp ? "text-red-100/72" : "text-white/38"}`}>
                    Estimated save probability
                  </p>
                  <p className={`mt-2 text-6xl font-black ${needsHelp ? "text-red-100" : "text-white"}`}>
                    {result.probability}%
                  </p>
                </div>
                <div className={`text-sm leading-7 ${needsHelp ? "text-red-100/72" : "text-white/52"}`}>
                  <p>7-day max: {result.maxTemp}F</p>
                  <p>Dry days ahead: {result.dryDays}</p>
                </div>
              </div>
              <p className={`text-base leading-8 ${needsHelp ? "text-red-50/82" : "text-white/68"}`}>
                {result.recommendation}
              </p>
              {result.level !== "good" && (
                <LeadCapture
                  service="landscaping"
                  message={leadMessage}
                  title="We can save it before the heat finishes it."
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span className="text-sm font-medium text-white/72">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full border border-white/10 bg-[#080908] px-3 py-3 text-sm text-white placeholder:text-white/24 focus:border-[#d8b76a] focus:outline-none"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label>
      <span className="text-sm font-medium text-white/72">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full border border-white/10 bg-[#080908] px-3 py-3 text-sm text-white focus:border-[#d8b76a] focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}
