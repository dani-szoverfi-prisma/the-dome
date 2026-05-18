"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
export default function Footer() {
	const t = useTranslations("footer");
	const nav = useTranslations("nav");
	const year = new Date().getFullYear();

	const navLinks: Array<{
		key: "home" | "menu" | "gallery" | "contact" | "reservation";
		href: string;
	}> = [
		{ key: "home", href: `/` },
		{ key: "menu", href: `/menu` },
		{ key: "gallery", href: `/gallery` },
		{ key: "contact", href: `/contact` },
		{ key: "reservation", href: `/reservation` },
	];

	return (
		<footer
			style={{
				borderTop: "1px solid var(--accent-border)",
				backgroundColor: "var(--bg-secondary)",
				padding: "4rem 0 2rem",
			}}>
			<div className="container">
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
						gap: "3rem",
						marginBottom: "3rem",
					}}>
					{/* Brand */}
					<div>
						{/* <p
							style={{
								fontFamily: "var(--font-cormorant)",
								fontSize: "1.75rem",
								fontWeight: 600,
								letterSpacing: "0.12em",
								textTransform: "uppercase",
								marginBottom: "0.75rem",
							}}>
							The Dome
						</p> */}
						<Image
							src="/logo/4.webp"
							alt="The Dome"
							width={120}
							height={30}
							style={{ marginBottom: "0.75rem" }}
						/>
						<p
							style={{
								color: "var(--text-muted)",
								fontSize: "0.875rem",
								letterSpacing: "0.08em",
							}}>
							{t("tagline")}
						</p>
					</div>

					{/* Navigation */}
					<nav aria-label="Footer navigation">
						<p
							style={{
								fontSize: "0.7rem",
								letterSpacing: "0.2em",
								textTransform: "uppercase",
								color: "var(--accent-gold)",
								marginBottom: "1rem",
							}}>
							{nav("menu")}
						</p>
						<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
							{navLinks.map(({ key, href }) => (
								<li key={key} style={{ marginBottom: "0.5rem" }}>
									<Link
										href={href}
										className="nav-link"
										style={{ fontSize: "0.875rem", letterSpacing: "0.05em" }}>
										{nav(key)}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* Contact */}
					<div>
						<p
							style={{
								fontSize: "0.7rem",
								letterSpacing: "0.2em",
								textTransform: "uppercase",
								color: "var(--accent-gold)",
								marginBottom: "1rem",
							}}>
							Contact
						</p>
						<address
							style={{
								fontStyle: "normal",
								color: "var(--text-muted)",
								fontSize: "0.875rem",
								lineHeight: 1.9,
							}}>
							<p>{t("address")}</p>
							<p>
								<a
									href={`tel:${t("phone").replace(/\s/g, "")}`}
									className="nav-link">
									{t("phone")}
								</a>
							</p>
							<p>
								<a href={`mailto:${t("email")}`} className="nav-link">
									{t("email")}
								</a>
							</p>
						</address>
					</div>
				</div>

				<hr className="divider" style={{ marginBottom: "1.5rem" }} />

				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
					}}>
					<p
						style={{
							color: "var(--text-muted)",
							fontSize: "0.75rem",
							letterSpacing: "0.08em",
							textAlign: "center",
						}}>
						© {year} The Dome. {t("rights")}.
					</p>
					<p
						style={{
							color: "var(--text-muted)",
							fontSize: "0.75rem",
							letterSpacing: "0.08em",
							textAlign: "center",
						}}>
						{t("developedBy")}{" "}
						<a
							href="https://prismasolutions.ro"
							target="_blank"
							rel="noopener noreferrer"
							className="nav-link">
							Prisma Solutions
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
