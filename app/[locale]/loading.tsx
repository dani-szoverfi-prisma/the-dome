"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [visible, setVisible] = useState(false);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => setLineWidth(80), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0c0c0c",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "var(--accent-gold)",
          marginBottom: "1.25rem",
          margin: "0 0 1.25rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
        }}
      >
        Fine Dining · Târgu Mureș
      </p>
      <div
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(3rem, 8vw, 6.5rem)",
          fontWeight: 400,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#ffffff",
          lineHeight: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}
      >
        The Dome
      </div>
      <div
        style={{
          marginTop: "1.75rem",
          height: "1px",
          width: `${lineWidth}px`,
          backgroundColor: "var(--accent-gold)",
          opacity: 0.5,
          transition: "width 1s ease",
        }}
      />
    </div>
  );
}
