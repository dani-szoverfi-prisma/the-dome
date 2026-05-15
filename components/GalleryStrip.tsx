"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import ScrollReveal from "./ScrollReveal";
import Lightbox from "./Lightbox";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

type Item = { src: string; label: string };

type Props = {
  items: Item[];
  locale: string;
  eyebrow: string;
  heading: string;
  ctaLabel: string;
};

export default function GalleryStrip({ items, locale, eyebrow, heading, ctaLabel }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const timer = setTimeout(() => {
      swiper.slideTo(1, 500);
      setTimeout(() => swiper.slideTo(0, 400), 900);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollReveal>
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--accent-gold)",
            textAlign: "center",
            marginBottom: "0.75rem",
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            textAlign: "center",
            marginBottom: "clamp(2rem, 4vw, 4rem)",
          }}
        >
          {heading}
        </h2>
      </ScrollReveal>

      <Swiper
        modules={[FreeMode]}
        freeMode
        slidesPerView={2.15}
        spaceBetween={4}
        breakpoints={{
          769: {
            slidesPerView: 5,
            spaceBetween: 4,
            allowTouchMove: false,
          },
        }}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        style={{ width: "100%" }}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className="img-zoom"
              onClick={() => setLightboxIndex(i)}
              style={{
                position: "relative",
                aspectRatio: "3/4",
                overflow: "hidden",
                cursor: "pointer",
              }}
              aria-label={item.label}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 50vw, 20vw"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <ScrollReveal delay={400}>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Button href={`/${locale}/gallery`} variant="gold">
            {ctaLabel}
          </Button>
        </div>
      </ScrollReveal>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
