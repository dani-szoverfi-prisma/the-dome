import { getTranslations } from "next-intl/server";
import ReservationForm from "@/components/ReservationForm";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLines from "@/components/SectionLines";

export default async function ReservationSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <section
      className="section"
      style={{ position: "relative", backgroundColor: "var(--bg-primary)" }}
    >
      <SectionLines />
      <div
        className="container"
        style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}
      >
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
            Rezervare
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              textAlign: "center",
              marginBottom: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            {t("reservationHeading")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <ReservationForm locale={locale} />
        </ScrollReveal>
      </div>
    </section>
  );
}
