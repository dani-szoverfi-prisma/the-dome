import Image from "next/image";

type Props = {
  heading: string;
  eyebrow?: string;
  subheading?: string;
  image?: string;
};

export default function PageHero({
  heading,
  eyebrow = "The Dome",
  subheading,
  image = "/images/2.webp",
}: Props) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "45vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        paddingTop: "10rem",
        paddingBottom: "5rem",
      }}
    >
      <Image
        src={image}
        alt=""
        aria-hidden
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        sizes="100vw"
        priority
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.52) 50%, rgba(0,0,0,0.72) 100%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, padding: "0 1.5rem" }}>
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--accent-gold)",
            marginBottom: "1rem",
          }}
        >
          {eyebrow}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 400,
            color: "#ffffff",
            lineHeight: 1.1,
          }}
        >
          {heading}
        </h1>
        {subheading && (
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              maxWidth: "480px",
              margin: "1.25rem auto 0",
              lineHeight: 1.7,
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
            }}
          >
            {subheading}
          </p>
        )}
      </div>
    </section>
  );
}
