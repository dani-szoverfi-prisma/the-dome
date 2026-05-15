"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "./Button";

const inputStyle = {
	width: "100%",
	background: "transparent",
	border: "none",
	borderBottom: "1px solid var(--accent-border)",
	padding: "0.75rem 0",
	color: "var(--text-primary)",
	fontSize: "0.9rem",
	fontFamily: "var(--font-jost)",
	fontWeight: 300,
	outline: "none",
	transition: "border-color 0.3s ease",
};

const labelStyle = {
	display: "block",
	fontSize: "0.65rem",
	letterSpacing: "0.2em",
	textTransform: "uppercase" as const,
	color: "var(--text-muted)",
	marginBottom: "0.25rem",
};

type Props = { locale: string };

export default function ContactForm({ locale }: Props) {
	const t = useTranslations("contact");
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [fields, setFields] = useState({ name: "", email: "", message: "" });
	const [focused, setFocused] = useState<string | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("loading");

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...fields, locale }),
			});

			if (res.ok) {
				setStatus("success");
				setFields({ name: "", email: "", message: "" });
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	};

	if (status === "success") {
		return (
			<p
				style={{
					color: "var(--accent-gold)",
					padding: "2rem",
					border: "1px solid var(--accent-olive)",
					textAlign: "center",
				}}>
				Mesajul dumneavoastră a fost trimis. Vă vom răspunde în curând.
			</p>
		);
	}

	const borderFor = (name: string) =>
		focused === name ? "var(--accent-gold)" : "var(--accent-border)";

	return (
		<form
			onSubmit={handleSubmit}
			noValidate
			style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
			<label style={{ display: "block" }}>
				<span style={labelStyle}>{t("formName")}</span>
				<input
					type="text"
					name="name"
					required
					value={fields.name}
					onChange={handleChange}
					style={{ ...inputStyle, borderBottomColor: borderFor("name") }}
					onFocus={() => setFocused("name")}
					onBlur={() => setFocused(null)}
				/>
			</label>

			<label style={{ display: "block" }}>
				<span style={labelStyle}>{t("formEmail")}</span>
				<input
					type="email"
					name="email"
					required
					value={fields.email}
					onChange={handleChange}
					style={{ ...inputStyle, borderBottomColor: borderFor("email") }}
					onFocus={() => setFocused("email")}
					onBlur={() => setFocused(null)}
				/>
			</label>

			<label style={{ display: "block" }}>
				<span style={labelStyle}>{t("formMessage")}</span>
				<textarea
					name="message"
					required
					rows={5}
					value={fields.message}
					onChange={handleChange}
					style={{
						...inputStyle,
						borderBottomColor: borderFor("message"),
						resize: "none",
					}}
					onFocus={() => setFocused("message")}
					onBlur={() => setFocused(null)}
				/>
			</label>

			{status === "error" && (
				<p style={{ color: "#c0392b", fontSize: "0.85rem" }}>
					A apărut o eroare. Vă rugăm să ne contactați direct.
				</p>
			)}

			<div>
				<Button type="submit" disabled={status === "loading"} variant="gold">
					{status === "loading" ? "..." : t("formSubmit")}
				</Button>
			</div>
		</form>
	);
}
