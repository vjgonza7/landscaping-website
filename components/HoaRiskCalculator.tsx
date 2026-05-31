"use client";

// SVG ring circumference for r=42
const CIRC = 263.9;

type Violation = { label: string; fine: number; repair: number };

const VIOLATIONS: Record<string, Violation> = {
  weeds:      { label: "Weeds & Overgrowth",  fine: 325, repair: 148 },
  dead:       { label: "Dead Vegetation",      fine: 475, repair: 295 },
  irrigation: { label: "Irrigation Issues",    fine: 250, repair: 165 },
  debris:     { label: "Debris & Cleanup",     fine: 185, repair: 108 },
  edges:      { label: "Trimming & Edging",    fine: 210, repair: 119 },
};

const RISK_META = {
  low:    { label: "Low Risk",    color: "#4ade80", bg: "rgba(74,222,128,0.08)",   border: "rgba(74,222,128,0.25)" },
  medium: { label: "Medium Risk", color: "#d8b76a", bg: "rgba(216,183,106,0.08)", border: "rgba(216,183,106,0.28)" },
  high:   { label: "High Risk",   color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.28)" },
} as const;

function usd(n: number) {
  return "$" + n.toLocaleString("en-US");
}

export default function HoaRiskCalculator({ failedIds }: { failedIds: string[] }) {
  const score = Math.max(0, 100 - failedIds.length * 20);
  const riskKey = score >= 80 ? "low" : score >= 40 ? "medium" : ("high" as const);
  const { label: riskLabel, color: riskColor, bg: riskBg, border: riskBorder } = RISK_META[riskKey];

  const violations    = failedIds.map((id) => ({ id, ...VIOLATIONS[id] }));
  const totalFines    = violations.reduce((s, v) => s + v.fine, 0);
  const totalRepair   = violations.reduce((s, v) => s + v.repair, 0);
  const savings       = totalFines - totalRepair;
  const repairBarPct  = totalFines > 0 ? Math.round((totalRepair / totalFines) * 100) : 0;
  const dashoffset    = parseFloat((CIRC * (1 - score / 100)).toFixed(1));

  return (
    <div
      className="mt-10 border border-white/10 bg-[#0d0f0c]"
      aria-label="HOA risk assessment results"
    >
      {/* Panel header */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-8">
        <span className="text-[11px] font-black uppercase tracking-[0.32em] text-[#d8b76a]">
          HOA Risk Assessment
        </span>
        <span className="text-[11px] text-white/28 uppercase tracking-widest">
          {violations.length} issue{violations.length !== 1 ? "s" : ""} flagged
        </span>
      </div>

      <div className="p-6 sm:p-8">
        {/* ── Top grid: gauge + issues + cost ── */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* 1 ── Compliance score gauge */}
          <div className="flex flex-col items-center gap-3 md:border-r md:border-white/8 md:pr-8">
            <svg
              viewBox="0 0 100 100"
              className="h-36 w-36 flex-shrink-0"
              aria-hidden="true"
            >
              {/* Track */}
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="9"
              />
              {/* Progress arc */}
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke={riskColor}
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={String(CIRC)}
                strokeDashoffset={String(dashoffset)}
                transform="rotate(-90 50 50)"
              />
              {/* Score number */}
              <text
                x="50" y="48"
                textAnchor="middle"
                fill="white"
                fontSize="24"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
              >
                {score}
              </text>
              {/* /100 label */}
              <text
                x="50" y="63"
                textAnchor="middle"
                fill="rgba(255,255,255,0.35)"
                fontSize="10"
                fontFamily="system-ui, sans-serif"
              >
                /100
              </text>
            </svg>

            {/* Risk badge */}
            <div
              className="px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em]"
              style={{ background: riskBg, border: `1px solid ${riskBorder}`, color: riskColor }}
            >
              {riskLabel}
            </div>
            <p className="text-center text-xs text-white/35">Compliance Score</p>
          </div>

          {/* 2 ── Issues breakdown */}
          <div className="md:border-r md:border-white/8 md:pr-8">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-white/35">
              Flagged Issues
            </p>
            <div className="space-y-2.5">
              {violations.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between border-b border-white/6 pb-2.5"
                >
                  <span className="text-sm text-white/72">{v.label}</span>
                  <span className="text-sm font-bold text-red-400">{usd(v.fine)}</span>
                </div>
              ))}
              {/* Fine exposure total */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-black uppercase tracking-widest text-white/38">
                  Total Exposure
                </span>
                <span className="text-base font-black text-red-400">{usd(totalFines)}</span>
              </div>
            </div>
            <p className="mt-4 text-[11px] leading-5 text-white/25">
              *Based on AZ HOA escalation after a 30-day notice period. Actual fines vary by association.
            </p>
          </div>

          {/* 3 ── Cost comparison + savings */}
          <div>
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.24em] text-white/35">
              Cost Comparison
            </p>

            {/* HOA Fine bar */}
            <div className="mb-4">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs text-white/55">HOA Fine Exposure</span>
                <span className="text-sm font-black text-red-400">{usd(totalFines)}</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-sm bg-white/6">
                <div className="h-full w-full rounded-sm bg-red-500/60" />
              </div>
            </div>

            {/* VIRENZA Resolution bar */}
            <div className="mb-5">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs text-white/55">VIRENZA Resolution</span>
                <span className="text-sm font-black text-[#d8b76a]">{usd(totalRepair)}</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-sm bg-white/6">
                <div
                  className="h-full rounded-sm bg-[#d8b76a]"
                  style={{ width: `${repairBarPct}%` }}
                />
              </div>
            </div>

            {/* Savings callout */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: "rgba(74,222,128,0.06)",
                border: "1px solid rgba(74,222,128,0.18)",
              }}
            >
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-emerald-300">
                  Potential Savings
                </p>
                <p className="mt-0.5 text-[11px] text-emerald-300/60">
                  vs. letting fines escalate
                </p>
              </div>
              <span className="text-2xl font-black text-emerald-300">{usd(savings)}</span>
            </div>
          </div>
        </div>

        {/* ── CTA bar ── */}
        <div className="mt-8 border-t border-white/8 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-black leading-snug text-white">
                Resolve these issues before they become costly.
              </p>
              <p className="mt-1 text-sm text-white/42">
                Most Arizona HOA violations are correctable in a single visit.
              </p>
            </div>
            <a
              href="#quote"
              className="inline-block flex-shrink-0 bg-[#d8b76a] px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#f0cf81]"
            >
              Get Free Estimate →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
