"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [phase, setPhase] = useState<"idle" | "visible" | "exiting">("idle");

  useEffect(() => {
    if (sessionStorage.getItem("loader-done")) return;

    document.body.style.overflow = "hidden";
    setPhase("visible");

    const t1 = setTimeout(() => setPhase("exiting"), 2400);
    const t2 = setTimeout(() => {
      document.body.style.overflow = "";
      sessionStorage.setItem("loader-done", "1");
      setPhase("idle");
    }, 3300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "idle") return null;

  return (
    <div
      aria-hidden="true"
      className={`page-loader${phase === "exiting" ? " page-loader--exit" : ""}`}
    >
      <p className="page-loader__eyebrow">Fine Dining · Târgu Mureș</p>
      <div className="page-loader__title">The Dome</div>
      <div className="page-loader__line" />
    </div>
  );
}
