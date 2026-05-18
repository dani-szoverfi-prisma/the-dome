import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "contact" });
	return {
		title: t("heading"),
		description: "Contactați restaurantul The Dome din Satu Mare",
	};
}

export default async function ContactPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "contact" });

	const contactItems = [
		{ label: t("address"), value: "Strada 1 Decembrie 1918 nr. 5\nSatu Mare" },
		{ label: t("phone"), value: "+40 361 415 162" },
		{ label: t("email"), value: "contact@thedome.ro" },
		{ label: t("hours"), value: t("hoursValue") },
	];

	return (
		<>
			<PageHero heading={t("heading")} image="/images/food47.webp" />

			{/* Two-column layout */}
			<section
				className="section"
				style={{ backgroundColor: "var(--bg-primary)" }}>
				<div className="container">
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
							gap: "clamp(3rem, 6vw, 7rem)",
							alignItems: "start",
						}}>
						{/* ── Form column — DOM first so it's on top when stacked on mobile ── */}
						<div className="contact-form-col">
							<ScrollReveal delay={80}>
								<p
									style={{
										fontSize: "0.65rem",
										letterSpacing: "0.3em",
										textTransform: "uppercase",
										color: "var(--accent-gold)",
										marginBottom: "0.75rem",
									}}>
									{t("formHeading")}
								</p>
								<h2
									style={{
										fontFamily: "var(--font-cormorant)",
										fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
										fontWeight: 400,
										marginBottom: "2.5rem",
									}}>
									{t("formHeading")}
								</h2>
							</ScrollReveal>
							<ScrollReveal delay={160}>
								<ContactForm locale={locale} />
							</ScrollReveal>
						</div>

						{/* ── Contact data + map column ── */}
						<div
							className="contact-data-col"
							style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
							{/* Contact details */}
							<ScrollReveal>
								<dl
									style={{
										display: "grid",
										gridTemplateColumns: "1fr 1fr",
										gap: "2.5rem 3rem",
									}}>
									{contactItems.map(({ label, value }) => (
										<div key={label}>
											<dt
												style={{
													fontSize: "0.65rem",
													letterSpacing: "0.25em",
													textTransform: "uppercase",
													color: "var(--accent-gold)",
													marginBottom: "0.5rem",
												}}>
												{label}
											</dt>
											<dd
												style={{
													color: "var(--text-primary)",
													whiteSpace: "pre-line",
													lineHeight: 1.7,
													margin: 0,
												}}>
												{value}
											</dd>
										</div>
									))}
								</dl>
							</ScrollReveal>

							{/* Google Maps embed */}
							<ScrollReveal delay={120}>
								<div
									style={{
										width: "100%",
										aspectRatio: "4/3",
										border: "1px solid var(--accent-border)",
										overflow: "hidden",
									}}>
									<iframe
										title="The Dome — locație pe hartă"
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42894.634167791555!2d22.801903140311275!3d47.78310328411924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473805cb7ddb378b%3A0x4c5103cdb02dec23!2sThe%20Dome!5e0!3m2!1sro!2sro!4v1779094302040!5m2!1sro!2sro"
										width="100%"
										height="100%"
										style={{
											border: 0,
											filter: "grayscale(100%) invert(90%) contrast(90%)",
										}}
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									/>
								</div>
							</ScrollReveal>
						</div>
					</div>
				</div>
			</section>

			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebPage",
						name: `${t("heading")} — The Dome`,
						url: "https://thedome.ro/ro/contact",
					}),
				}}
			/>
		</>
	);
}
