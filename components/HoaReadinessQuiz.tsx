"use client";

import { useState } from "react";
import LeadCapture from "./LeadCapture";
import HoaRiskCalculator from "./HoaRiskCalculator";

const questions = [
  {
    id: "weeds",
    text: "Are weeds, overgrowth, or volunteer plants visible from the street?",
    fail: "yes",
  },
  {
    id: "dead",
    text: "Do you have dead grass, dead shrubs, missing plants, or brown patches?",
    fail: "yes",
  },
  {
    id: "irrigation",
    text: "Are there leaks, standing water, broken emitters, or dry zones?",
    fail: "yes",
  },
  {
    id: "debris",
    text: "Are leaves, branches, bulk trash, or landscape debris sitting out?",
    fail: "yes",
  },
  {
    id: "edges",
    text: "Are borders, gravel, turf edges, or tree canopies looking untrimmed?",
    fail: "yes",
  },
];

export default function HoaReadinessQuiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<"pass" | "fail" | null>(null);

  const complete = questions.every((q) => answers[q.id]);
  const failedIds = questions
    .filter((q) => answers[q.id] === q.fail)
    .map((q) => q.id);

  function handleSubmit() {
    if (!complete) return;
    setResult(failedIds.length === 0 ? "pass" : "fail");
  }

  const message = `HOA readiness quiz lead.\nIssues flagged: ${failedIds.join(", ") || "none"}`;

  return (
    <section
      id="hoa-ready"
      className={`px-6 py-20 transition-colors duration-500 md:py-28 ${
        result === "fail"
          ? "bg-[radial-gradient(circle_at_70%_20%,rgba(239,68,68,0.22),transparent_34%),linear-gradient(180deg,#210707_0%,#0a0a0a_100%)]"
          : "bg-[#0a0a0a]"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d8b76a]">
            QR Destination 02
          </span>
          <h2 className="mt-3 text-4xl font-black leading-none text-white md:text-6xl">
            Is Your Yard HOA Ready?
          </h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-white/52">
            A quick street-view style check for the maintenance issues that
            commonly trigger HOA notices: weeds, dead plants, debris, irrigation,
            and untrimmed edges.
          </p>
        </div>

        <div className="border border-white/10 bg-[#10120f] p-5 sm:p-7">
          <div className="space-y-4">
            {questions.map((question, index) => (
              <fieldset key={question.id} className="border border-white/10 bg-black/20 p-4">
                <legend className="px-1 text-sm font-bold text-white">
                  {index + 1}. {question.text}
                </legend>
                <div className="mt-4 flex gap-3">
                  {["no", "yes"].map((value) => (
                    <label
                      key={value}
                      className={`flex-1 cursor-pointer border px-4 py-3 text-center text-xs font-black uppercase tracking-[0.12em] transition-colors ${
                        answers[question.id] === value
                          ? "border-[#d8b76a] bg-[#d8b76a] text-black"
                          : "border-white/10 text-white/62 hover:border-white/25"
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={value}
                        checked={answers[question.id] === value}
                        onChange={() => {
                          setAnswers((prev) => ({ ...prev, [question.id]: value }));
                          setResult(null);
                        }}
                        className="sr-only"
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!complete}
            className="mt-6 w-full bg-[#d8b76a] px-5 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#f0cf81] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Check HOA Readiness
          </button>

          {result === "pass" && (
            <div className="mt-6 border border-[#d8b76a]/30 bg-[#d8b76a]/10 p-5">
              <p className="text-xl font-black text-white">Looks HOA ready.</p>
              <p className="mt-2 text-sm leading-7 text-white/58">
                Keep watering consistent and do a quick edge/debris check before
                inspection days. Your specific HOA CC&Rs still control the final
                standard.
              </p>
            </div>
          )}

          {result === "fail" && (
            <div className="mt-6 space-y-5">
              <div className="border border-red-400/50 bg-red-950/40 p-5 shadow-2xl shadow-red-950/30">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-red-200">
                  Needs Help
                </p>
                <p className="mt-2 text-3xl font-black leading-none text-white">
                  Yard is not HOA ready
                </p>
                <p className="mt-3 text-sm leading-7 text-red-50/78">
                  You flagged {failedIds.length} issue{failedIds.length > 1 ? "s" : ""}.
                  See your estimated fine exposure and VIRENZA resolution cost below.
                </p>
              </div>
              <LeadCapture
                service="cleanup"
                message={message}
                title="Get your yard HOA ready."
              />
            </div>
          )}
        </div>
      </div>

      {result === "fail" && (
        <div className="mx-auto max-w-7xl">
          <HoaRiskCalculator failedIds={failedIds} />
        </div>
      )}
    </section>
  );
}
