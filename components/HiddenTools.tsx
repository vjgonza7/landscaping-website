"use client";

import { useEffect, useState } from "react";
import HeatSurvivalPredictor from "./HeatSurvivalPredictor";

type Tool = "heat-survival" | null;

function getActiveTool(): Tool {
  const params = new URLSearchParams(window.location.search);
  const tool = params.get("tool");
  const hash = window.location.hash.replace("#", "");

  if (tool === "heat-survival" || hash === "heat-survival") return "heat-survival";
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
  return null;
}
