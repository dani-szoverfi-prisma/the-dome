"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import Lightbox from "@/components/Lightbox";
import PageHero from "@/components/PageHero";

type Category = "all" | "interior" | "terrace" | "vinoteca";

const items: {
	src: string;
	category: Category;
	label: string;
	aspect: string;
}[] = [
	{
		src: "/images/1.webp",
		category: "interior",
		label: "Interior — Sala principală",
		aspect: "4/5",
	},
	{
		src: "/images/2.webp",
		category: "interior",
		label: "Interior — Detaliu masă",
		aspect: "16/9",
	},
	{
		src: "/images/3.webp",
		category: "terrace",
		label: "Terasă — Vedere panoramică",
		aspect: "4/5",
	},
	{
		src: "/images/4.webp",
		category: "terrace",
		label: "Terasă — Seară",
		aspect: "16/9",
	},
	{
		src: "/images/5.webp",
		category: "vinoteca",
		label: "Vinotecă — Raft vinuri",
		aspect: "4/5",
	},
	{
		src: "/images/6.webp",
		category: "vinoteca",
		label: "Vinotecă — Pivniță",
		aspect: "4/5",
	},
];

export default function GalleryPage() {
	const t = useTranslations("gallery");
	const [active, setActive] = useState<Category>("all");
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	const categories: { key: Category; label: string }[] = [
		{ key: "all", label: "All" },
		{ key: "interior", label: t("interior") },
		{ key: "terrace", label: t("terrace") },
		{ key: "vinoteca", label: t("vinoteca") },
	];

	const filtered =
		active === "all" ? items : items.filter((i) => i.category === active);

	return (
		<>
			<PageHero heading={t("heading")} image="/images/3.webp" />

			{/* Category filter */}
			<section
				style={{
					backgroundColor: "var(--bg-secondary)",
					borderBottom: "1px solid var(--accent-border)",
				}}>
				<div className="container">
					<div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
						{categories.map(({ key, label }) => (
							<button
								key={key}
								onClick={() => {
									setActive(key);
									setLightboxIndex(null);
								}}
								aria-selected={active === key}
								className={`tab-btn${active === key ? " active" : ""}`}>
								{label}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Masonry gallery */}
			<section
				className="section"
				style={{ backgroundColor: "var(--bg-primary)" }}>
				<div className="container">
					<div style={{ columns: "2 300px", gap: "6px" }}>
						{filtered.map((item, i) => (
							<ScrollReveal key={`${active}-${i}`} delay={i * 60}>
								<div
									className="img-zoom"
									onClick={() => setLightboxIndex(i)}
									style={{
										position: "relative",
										aspectRatio: item.aspect,
										overflow: "hidden",
										marginBottom: "6px",
										breakInside: "avoid",
										cursor: "pointer",
									}}
									aria-label={item.label}>
									<Image
										src={item.src}
										alt={item.label}
										fill
										style={{ objectFit: "cover" }}
										sizes="(max-width: 768px) 100vw, 50vw"
										loading="lazy"
									/>
								</div>
							</ScrollReveal>
						))}
					</div>
				</div>
			</section>

			{lightboxIndex !== null && (
				<Lightbox
					items={filtered.map(({ src, label }) => ({ src, label }))}
					index={lightboxIndex}
					onClose={() => setLightboxIndex(null)}
					onNavigate={setLightboxIndex}
				/>
			)}

			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebPage",
						name: `${t("heading")} — The Dome`,
						url: "https://thedome.ro/ro/gallery",
					}),
				}}
			/>
		</>
	);
}
