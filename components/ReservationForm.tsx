"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "./Button";

function Ornament() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <div style={{ flex: 1, height: "1px", backgroundColor: "var(--accent-border)" }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
        <rect x="7" y="0.5" width="9" height="9" transform="rotate(45 7 0.5)"
          fill="none" stroke="var(--accent-gold)" strokeWidth="1" />
      </svg>
      <div style={{ flex: 1, height: "1px", backgroundColor: "var(--accent-border)" }} />
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
};

function Field({ label, name, type = "text", required, value, onChange, min }: FieldProps) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span style={{ color: "var(--accent-copper)", marginLeft: "2px" }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        min={min}
        className="form-input"
      />
    </div>
  );
}

type Props = { locale: string };

export default function ReservationForm({ locale }: Props) {
  const t = useTranslations("reservation");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fields, setFields] = useState({
    name: "", phone: "", email: "", date: "", time: "", guests: "", notes: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, locale }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setFields({ name: "", phone: "", email: "", date: "", time: "", guests: "", notes: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{
        padding: "3rem 2rem",
        border: "1px solid var(--accent-border)",
        backgroundColor: "var(--bg-card)",
        textAlign: "center",
      }}>
        <Ornament />
        <p style={{ color: "var(--accent-gold)", fontSize: "1rem", letterSpacing: "0.05em", lineHeight: 1.7, marginTop: "1.75rem" }}>
          {t("successMessage")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--accent-border)",
        padding: "clamp(2rem, 5vw, 3.5rem)",
      }}>

        {/* Top ornament */}
        <div style={{ marginBottom: "2.5rem" }}>
          <Ornament />
        </div>

        {/* Two-column field layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "clamp(2rem, 4vw, 3rem) clamp(2.5rem, 6vw, 6rem)",
          marginBottom: "2.5rem",
        }}>
          {/* Left column — contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
            <Field label={t("formName")}  name="name"  required value={fields.name}  onChange={handleChange} />
            <Field label={t("formEmail")} name="email" type="email" value={fields.email} onChange={handleChange} />
            <Field label={t("formPhone")} name="phone" type="tel" required value={fields.phone} onChange={handleChange} />
          </div>

          {/* Right column — booking */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
            <Field label={t("formDate")}   name="date"   type="date"   required value={fields.date}   onChange={handleChange} min={today} />
            <Field label={t("formTime")}   name="time"   type="time"   required value={fields.time}   onChange={handleChange} />
            <Field label={t("formGuests")} name="guests" type="number" required value={fields.guests} onChange={handleChange} />
          </div>
        </div>

        {/* Bottom ornament */}
        <div style={{ marginBottom: "2rem" }}>
          <Ornament />
        </div>

        {/* Error */}
        {status === "error" && (
          <p style={{ color: "#c0392b", fontSize: "0.8rem", marginBottom: "1.25rem", letterSpacing: "0.05em", textAlign: "center" }}>
            {t("errorMessage")}
          </p>
        )}

        {/* Centered submit button */}
        <div style={{ textAlign: "center" }}>
          <Button type="submit" disabled={status === "loading"} variant="gold">
            {status === "loading" ? "Se trimite..." : t("formSubmit")}
          </Button>
        </div>

        {/* Required note */}
        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
          <span style={{ color: "var(--accent-copper)" }}>*</span> câmpuri obligatorii
        </p>

      </div>
    </form>
  );
}
