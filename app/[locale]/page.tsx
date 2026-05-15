import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Button from "@/components/Button";
import ScrollReveal from "@/components/ScrollReveal";
import HeroVideo from "@/components/HeroVideo";
import SectionLines from "@/components/SectionLines";
import ReservationSection from "@/components/ReservationSection";
import GalleryStrip from "@/components/GalleryStrip";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "home" });

	return {
		title: "The Dome — Fine Dining Târgu Mureș",
		description: t("heroSubtitle"),
		openGraph: {
			title: "The Dome — Fine Dining Târgu Mureș",
			description: t("heroSubtitle"),
		},
	};
}

/* ── Placeholder menu items ── */
const menuItems = [
	{
		name: "Rilette de rață",
		description: "Cu compot de afine și pâine prăjită artizanală",
		price: "58 RON",
	},
	{
		name: "File de biban de mare",
		description: "Cu risotto de șofran și legume de sezon",
		price: "95 RON",
	},
	{
		name: "Mușchi de vită Wagyu",
		description: "Cu sos de trufe, cartofi fondant și spanac sote",
		price: "145 RON",
	},
];

const galleryImages = [
	{ src: "/images/2.webp", label: "Interior" },
	{ src: "/images/3.webp", label: "Bucătărie" },
	{ src: "/images/4.webp", label: "Terasă" },
	{ src: "/images/5.webp", label: "Vinotecă" },
	{ src: "/images/6.webp", label: "Detalii" },
];

export default async function HomePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "home" });

	return (
		<>
			{/*
        Preload the poster — it IS the LCP element.
        Replace /hero-poster.svg with /hero-poster.webp once the real frame is ready.
        Target: < 80 KB, 1920×1080, WebP quality 75.
      */}
			<link
				rel="preload"
				as="image"
				href="/hero-poster.svg"
				fetchPriority="high"
			/>

			{/* ── Hero ────────────────────────────────────────────────── */}
			<section
				style={{
					position: "relative",
					minHeight: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					textAlign: "center",
					overflow: "hidden",
					backgroundColor: "var(--bg-primary)",
				}}>
				{/* Background video — deferred until idle, poster loads immediately */}
				<HeroVideo />

				{/* Decorative vertical line — top */}
				<div
					aria-hidden
					style={{
						position: "absolute",
						top: "8rem",
						left: "50%",
						transform: "translateX(-50%)",
						width: "1px",
						height: "60px",
						backgroundColor: "var(--accent-gold)",
						opacity: 0.4,
						zIndex: 2,
					}}
				/>

				{/* Hero content */}
				<div
					style={{
						position: "relative",
						zIndex: 2,
						padding: "2rem",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						textAlign: "center",
					}}>
					<p
						style={{
							fontSize: "0.65rem",
							letterSpacing: "0.35em",
							textTransform: "uppercase",
							color: "var(--accent-primary)",
							marginBottom: "1.5rem",
						}}>
						Fine Dining · Târgu Mureș
					</p>
					<h1
						style={{
							fontFamily: "var(--font-cormorant)",
							fontSize: "clamp(3rem, 8vw, 6.5rem)",
							fontWeight: 400,
							letterSpacing: "0.1em",
							textTransform: "uppercase",
							marginBottom: "1rem",
							lineHeight: 1,
							color: "#ffffff",
						}}>
						The Dome
					</h1>
					<p
						style={{
							fontSize: "clamp(1rem, 2vw, 1.25rem)",
							color: "rgba(255, 255, 255, 0.82)",
							fontWeight: 300,
							letterSpacing: "0.08em",
							marginBottom: "2.5rem",
							maxWidth: "480px",
						}}>
						{t("heroTagline")}
					</p>
					<Button href={`/${locale}/reservation`} variant="gold">
						{t("heroCta")}
					</Button>
				</div>

				{/* Decorative vertical line — bottom */}
				<div
					aria-hidden
					style={{
						position: "absolute",
						bottom: "3rem",
						left: "50%",
						transform: "translateX(-50%)",
						width: "1px",
						height: "60px",
						backgroundColor: "var(--accent-gold)",
						opacity: 0.4,
						zIndex: 2,
					}}
				/>
			</section>

			{/* ── Intro ───────────────────────────────────────────────── */}
			<section
				className="section"
				style={{ position: "relative", backgroundColor: "var(--bg-primary)" }}>
				<SectionLines />
				<div className="container" style={{ position: "relative", zIndex: 1 }}>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
							gap: "clamp(3rem, 6vw, 7rem)",
							alignItems: "center",
						}}>
						<ScrollReveal>
							<p
								style={{
									fontSize: "0.65rem",
									letterSpacing: "0.3em",
									textTransform: "uppercase",
									color: "var(--accent-gold)",
									marginBottom: "1.25rem",
								}}>
								Restaurantul nostru
							</p>
							<h2
								style={{
									fontFamily: "var(--font-cormorant)",
									fontSize: "clamp(2rem, 4vw, 3rem)",
									fontWeight: 400,
									marginBottom: "1.5rem",
									lineHeight: 1.15,
								}}>
								{t("introHeading")}
							</h2>
							<p
								style={{
									color: "var(--text-muted)",
									lineHeight: 1.8,
									marginBottom: "2rem",
									maxWidth: "480px",
								}}>
								{t("introCopy")}
							</p>
							<Button href={`/${locale}/menu`} variant="gold">
								{t("menuPreviewCta")}
							</Button>
						</ScrollReveal>

						<ScrollReveal delay={150}>
							<div
								className="img-zoom"
								style={{
									position: "relative",
									aspectRatio: "4/5",
									overflow: "hidden",
								}}>
								<Image
									src="/images/1.webp"
									alt="Interior restaurant The Dome"
									fill
									style={{ objectFit: "cover" }}
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
							</div>
						</ScrollReveal>
					</div>
				</div>
			</section>

			{/* ── Menu Preview ────────────────────────────────────────── */}
			<section
				className="section"
				style={{
					position: "relative",
					backgroundColor: "var(--bg-secondary)",
					// paddingBlockStart: "clamp(80px, 10vw, 160px)",
					// paddingBlockEnd: "clamp(80px, 10vw, 160px)",
				}}>
				<SectionLines />
				<div className="container" style={{ position: "relative", zIndex: 1 }}>
					<ScrollReveal>
						<p
							style={{
								fontSize: "0.65rem",
								letterSpacing: "0.3em",
								textTransform: "uppercase",
								color: "var(--accent-gold)",
								textAlign: "center",
								marginBottom: "0.75rem",
							}}>
							Selecție
						</p>
						<h2
							style={{
								fontFamily: "var(--font-cormorant)",
								fontSize: "clamp(2rem, 4vw, 3rem)",
								textAlign: "center",
								marginBottom: "clamp(3rem, 5vw, 5rem)",
							}}>
							{t("menuPreviewHeading")}
						</h2>
					</ScrollReveal>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
							gap: "2px",
						}}>
						{menuItems.map((item, i) => (
							<ScrollReveal key={item.name} delay={i * 100}>
								<article
									style={{
										padding: "2.5rem 2rem",
										backgroundColor: "var(--bg-primary)",
										borderTop: "1px solid var(--accent-border)",
										height: "100%",
									}}>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "baseline",
											marginBottom: "0.5rem",
										}}>
										<h3
											style={{
												fontFamily: "var(--font-cormorant)",
												fontSize: "1.2rem",
												fontWeight: 400,
											}}>
											{item.name}
										</h3>
										<span
											style={{
												color: "var(--accent-gold)",
												fontFamily: "var(--font-cormorant)",
												fontSize: "1.1rem",
												marginLeft: "1rem",
												whiteSpace: "nowrap",
											}}>
											{item.price}
										</span>
									</div>
									<p
										style={{
											color: "var(--text-muted)",
											fontSize: "0.875rem",
											fontStyle: "italic",
											lineHeight: 1.6,
										}}>
										{item.description}
									</p>
								</article>
							</ScrollReveal>
						))}
					</div>

					<ScrollReveal delay={300}>
						<div style={{ textAlign: "center", marginTop: "3rem" }}>
							<Button href={`/${locale}/menu`} variant="gold">
								{t("menuPreviewCta")}
							</Button>
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* ── Wine / Vinotecă ─────────────────────────────────────── */}
			<section
				style={{
					position: "relative",
					minHeight: "60vh",
					display: "flex",
					alignItems: "center",
					overflow: "hidden",
				}}>
				{/* Full-bleed background image */}
				<Image
					src="/images/1.webp"
					alt=""
					aria-hidden
					fill
					style={{ objectFit: "cover", objectPosition: "center" }}
					sizes="100vw"
					loading="lazy"
				/>
				{/* Dark overlay so text stays readable */}
				<div
					aria-hidden
					style={{
						position: "absolute",
						inset: 0,
						background:
							"linear-gradient(to right, rgba(0,0,0,0.62) 40%, rgba(0,0,0,0.45) 100%)",
					}}
				/>

				<div className="container" style={{ position: "relative", zIndex: 1 }}>
					<ScrollReveal>
						<p
							style={{
								fontSize: "0.65rem",
								letterSpacing: "0.3em",
								textTransform: "uppercase",
								color: "var(--accent-gold)",
								marginBottom: "1rem",
							}}>
							Selecție premium
						</p>
						<h2
							style={{
								fontFamily: "var(--font-cormorant)",
								fontSize: "clamp(2rem, 4vw, 3rem)",
								maxWidth: "500px",
								marginBottom: "1.25rem",
							}}>
							{t("wineHeading")}
						</h2>
						<p
							style={{
								color: "var(--text-muted)",
								maxWidth: "420px",
								lineHeight: 1.8,
								marginBottom: "2rem",
							}}>
							{t("wineCopy")}
						</p>
						<Button href={`/${locale}/menu?tab=wine`} variant="gold">
							{t("wineCta")}
						</Button>
					</ScrollReveal>
				</div>
			</section>

			{/* ── Gallery Strip ───────────────────────────────────────── */}
			<section
				// className="section"

				style={{
					paddingBlockStart: "clamp(80px, 10vw, 160px)",
					position: "relative",
					backgroundColor: "var(--bg-primary)",
				}}>
				<SectionLines />
				<div className="container" style={{ position: "relative", zIndex: 1 }}>
					<GalleryStrip
						items={galleryImages}
						locale={locale}
						eyebrow="Atmosferă"
						heading={t("galleryHeading")}
						ctaLabel={t("galleryCta")}
					/>
				</div>
			</section>

			{/* ── Inline Reservation ──────────────────────────────────── */}
			<ReservationSection locale={locale} />

			{/* Schema.org JSON-LD */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Restaurant",
						name: "The Dome",
						description: "Fine dining restaurant in Târgu Mureș, Romania",
						address: {
							"@type": "PostalAddress",
							streetAddress: "Str. Exemplu nr. 1",
							addressLocality: "Târgu Mureș",
							addressCountry: "RO",
						},
						telephone: "+40265000000",
						servesCuisine: "Fine Dining",
						openingHours: ["Mo-Sa 12:00-23:00", "Su 12:00-22:00"],
						url: "https://thedome.ro",
					}),
				}}
			/>
		</>
	);
}
