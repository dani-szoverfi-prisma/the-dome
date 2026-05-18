"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";

const locales = [
	{ code: "ro", label: "RO" },
	{ code: "en", label: "EN" },
	{ code: "hu", label: "HU" },
	{ code: "de", label: "DE" },
];

/* Swap with real contact details */
const PHONE = "+40 361 415 162";
const ADDRESS = "Strada 1 Decembrie 1918 5, Satu Mare";

export default function Navigation() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const t = useTranslations("nav");
	const locale = useLocale();
	const pathname = usePathname();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth <= 768);
		check();
		window.addEventListener("resize", check, { passive: true });
		return () => window.removeEventListener("resize", check);
	}, []);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	const navLinks = [
		{ href: "/", label: t("home") },
		{ href: "/menu", label: t("menu") },
		{ href: "/gallery", label: t("gallery") },
		{ href: "/contact", label: t("contact") },
		{ href: "/reservation", label: t("reservation") },
	];

	return (
		<>
			<header
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 50,
					padding: "1.1rem 2rem",
					backgroundColor: scrolled ? "rgba(10, 10, 10, 0.58)" : "transparent",
					backdropFilter: scrolled ? "blur(16px)" : "none",
					WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
					borderBottom: "none",
					transition:
						"background-color 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
				}}>
				{/* Desktop: 3-column grid (contact | logo | hamburger) */}
				{/* Mobile:  2-column grid (contact | hamburger) */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: isMobile ? "1fr auto" : "1fr auto 1fr",
						alignItems: "center",
						width: "100%",
					}}>
					{/* Left column — phone + address (both breakpoints) */}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "0.12rem",
						}}>
						<a
							href={`tel:${PHONE.replace(/\s/g, "")}`}
							className="nav-link"
							style={{
								fontSize: isMobile ? "0.65rem" : "0.7rem",
								letterSpacing: "0.1em",
								color: "var(--text-primary)",
								textDecoration: "none",
							}}>
							{PHONE}
						</a>
						<span
							style={{
								fontSize: isMobile ? "0.6rem" : "0.65rem",
								letterSpacing: "0.07em",
								color: "var(--text-primary)",
							}}>
							{ADDRESS}
						</span>
					</div>

					{/* Center column — logo (desktop only) */}
					{!isMobile && (
						<Link
							href="/"
							style={{
								fontFamily: "var(--font-cormorant)",
								fontSize: "1.75rem",
								fontWeight: 600,
								color: "var(--text-primary)",
								letterSpacing: "0.12em",
								textDecoration: "none",
								textTransform: "uppercase",
								whiteSpace: "nowrap",
								justifySelf: "center",
							}}>
							The Dome
						</Link>
					)}

					{/* Right column — hamburger (always) */}
					<button
						onClick={() => setMenuOpen(true)}
						aria-label="Open navigation menu"
						aria-expanded={menuOpen}
						aria-controls="nav-overlay"
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							padding: "10px",
							display: "flex",
							flexDirection: "column",
							gap: "5px",
							minWidth: "44px",
							minHeight: "44px",
							alignItems: "center",
							justifyContent: "center",
							justifySelf: "end",
						}}>
						{[0, 1, 2].map((i) => (
							<span
								key={i}
								style={{
									display: "block",
									width: "24px",
									height: "1px",
									backgroundColor: "var(--text-primary)",
								}}
							/>
						))}
					</button>
				</div>
			</header>

			{/* Full-screen overlay menu */}
			<div
				id="nav-overlay"
				role="dialog"
				aria-modal="true"
				aria-label="Navigation menu"
				style={{
					position: "fixed",
					inset: 0,
					zIndex: 100,
					backgroundColor: "var(--bg-primary)",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					opacity: menuOpen ? 1 : 0,
					pointerEvents: menuOpen ? "all" : "none",
					transition: "opacity 0.4s ease",
				}}>
				{/* Close — 44×44px touch target */}
				<button
					onClick={() => setMenuOpen(false)}
					aria-label="Close navigation menu"
					style={{
						position: "absolute",
						top: "1.5rem",
						right: "2rem",
						background: "none",
						border: "none",
						cursor: "pointer",
						color: "var(--text-primary)",
						fontSize: "1.5rem",
						lineHeight: 1,
						minWidth: "44px",
						minHeight: "44px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}>
					✕
				</button>

				<nav aria-label="Main navigation">
					<ul
						style={{
							listStyle: "none",
							padding: 0,
							margin: 0,
							textAlign: "center",
						}}>
						{navLinks.map((link, i) => (
							<li key={link.href} style={{ animationDelay: `${i * 0.08}s` }}>
								<Link
									href={link.href}
									onClick={() => setMenuOpen(false)}
									className="nav-link-overlay"
									style={{
										fontFamily: "var(--font-cormorant)",
										fontSize: "clamp(2.5rem, 5vw, 4rem)",
										fontWeight: 400,
										letterSpacing: "0.08em",
										display: "block",
										padding: "0.3rem 0",
										minHeight: "44px",
									}}>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* Language switcher */}
				<div
					style={{
						position: "absolute",
						bottom: "2.5rem",
						display: "flex",
						gap: "1.5rem",
					}}>
					{locales.map(({ code, label }) => (
						<Link
							key={code}
							href={pathname}
							locale={code}
							onClick={() => setMenuOpen(false)}
							className="nav-link"
							style={{
								fontSize: "0.75rem",
								letterSpacing: "0.15em",
								fontWeight: 400,
								textTransform: "uppercase",
								color: code === locale ? "var(--accent-gold)" : undefined,
								minHeight: "44px",
								display: "inline-flex",
								alignItems: "center",
							}}>
							{label}
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
