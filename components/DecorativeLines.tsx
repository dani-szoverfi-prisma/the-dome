"use client";

import { useEffect, useState } from "react";

export default function DecorativeLines() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  const cls = `deco-line${visible ? " deco-visible" : ""}`;

  return (
    <>
      {/* Left line — drop at 0s */}
      <div aria-hidden="true" className={`${cls} deco-line-left`}>
        <span className="deco-drop" style={{ animationDelay: "0s" }} />
      </div>

      {/* Right line — drop offset by half the cycle */}
      <div aria-hidden="true" className={`${cls} deco-line-right`}>
        <span className="deco-drop" style={{ animationDelay: "7s" }} />
      </div>

      {/* Mobile only — single centered line, drop at 2s */}
      <div aria-hidden="true" className={`${cls} deco-line-center`}>
        <span className="deco-drop" style={{ animationDelay: "2s" }} />
      </div>
    </>
  );
}
