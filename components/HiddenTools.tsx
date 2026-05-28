"use client";

import { useEffect, useState } from "react";
import HeatSurvivalPredictor from "./HeatSurvivalPredictor";
import HoaReadinessQuiz from "./HoaReadinessQuiz";

type Tool = "heat-survival" | "hoa-ready" | null;

function getActiveTool(): Tool {
  const params = new URLSearchParams(window.location.search);
  const tool = params.get("tool");
  const hash = window.location.hash.replace("#", "");

  if (tool === "heat-survival" || hash === "heat-survival") return "heat-survival";
  if (tool === "hoa-ready" || hash === "hoa-ready") return "hoa-ready";
  return null;
}

export default function HiddenTools() {
  const [activeTool, setActiveTool] = useState<Tool>(null);

  useEffect(() => {
    const syncTool = () => setActiveTool(getActiveTool());
    syncTool();
    window.addEventListener("hashchange", syncTool);
    window.addEventListener("popstate", syncTool);
    return () => {
      window.removeEventListener("hashchange", syncTool);
      window.removeEventListener("popstate", syncTool);
    };
  }, []);

  useEffect(() => {
    if (!activeTool) return;
    window.requestAnimationFrame(() => {
      document.getElementById(activeTool)?.scrollIntoView({ block: "start" });
    });
  }, [activeTool]);

  if (activeTool === "heat-survival") return <HeatSurvivalPredictor />;
  if (activeTool === "hoa-ready") return <HoaReadinessQuiz />;
  return null;
}
