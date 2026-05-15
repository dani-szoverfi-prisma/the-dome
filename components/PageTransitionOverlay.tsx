"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function PageTransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const busy = useRef(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const show = () => {
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "all";
    };
    const hide = () => {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
    };

    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      if (!link || !link.href) return;
      if (link.target === "_blank") return;
      if (link.hasAttribute("download")) return;

      let url: URL;
      try { url = new URL(link.href); } catch { return; }

      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      if (busy.current) return;

      e.preventDefault();
      busy.current = true;
      show();

      setTimeout(() => {
        router.push(url.pathname + url.search + url.hash);
        setTimeout(() => {
          hide();
          busy.current = false;
        }, 150);
      }, 300);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [router]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        backgroundColor: "var(--bg-primary)",
        opacity: 0,
        pointerEvents: "none",
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
