"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import Lightbox from "@/components/Lightbox";
import PageHero from "@/components/PageHero";

type Category = "all" | "interior" | "terrace" | "vinoteca" | "food" | "drink";

const PAGE_SIZE = 10;

const items: { src: string; category: Category; label: string; aspect: string }[] = [
	// drink
	{ src: "/images/drink10.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink11.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink12.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink13.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink14.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink15.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink16.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink17.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink18.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink20.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink21.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink22.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink23.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink24.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink25.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink26.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink32.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink33.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink59.webp", category: "drink", label: "Drink", aspect: "4/5" },
	{ src: "/images/drink60.webp", category: "drink", label: "Drink", aspect: "4/5" },
	// food
	{ src: "/images/food1.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food2.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food3.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food4.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food5.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food6.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food7.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food8.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food9.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food27.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food28.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food29.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food30.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food31.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food40.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food45.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food46.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food47.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food48.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food49.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food50.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food51.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food52.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food53.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food54.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food55.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food56.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food57.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food58.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food61.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food62.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food63.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food64.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food65.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food68.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food69.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food70.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food71.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food72.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food73.webp", category: "food", label: "Food", aspect: "4/5" },
	{ src: "/images/food74.webp", category: "food", label: "Food", aspect: "4/5" },
	// interior
	{ src: "/images/interior39.webp", category: "interior", label: "Interior", aspect: "16/9" },
	{ src: "/images/interior41.webp", category: "interior", label: "Interior", aspect: "16/9" },
	{ src: "/images/interior42.webp", category: "interior", label: "Interior", aspect: "16/9" },
	{ src: "/images/interior43.webp", category: "interior", label: "Interior", aspect: "16/9" },
	{ src: "/images/interior44.webp", category: "interior", label: "Interior", aspect: "16/9" },
	// terrace
	{ src: "/images/terrace.webp", category: "terrace", label: "Terrace", aspect: "16/9" },
	{ src: "/images/terrace35.webp", category: "terrace", label: "Terrace", aspect: "16/9" },
	{ src: "/images/terrace36.webp", category: "terrace", label: "Terrace", aspect: "16/9" },
	{ src: "/images/terrace37.webp", category: "terrace", label: "Terrace", aspect: "16/9" },
	{ src: "/images/terrace38.webp", category: "terrace", label: "Terrace", aspect: "16/9" },
	// vinoteca
	{ src: "/images/vinoteca19.webp", category: "vinoteca", label: "Wine Cellar", aspect: "4/5" },
	{ src: "/images/vinoteca66.webp", category: "vinoteca", label: "Wine Cellar", aspect: "4/5" },
	{ src: "/images/vinoteca67.webp", category: "vinoteca", label: "Wine Cellar", aspect: "4/5" },
	{ src: "/images/vinoteca75.webp", category: "vinoteca", label: "Wine Cellar", aspect: "4/5" },
	{ src: "/images/vinoteca76.webp", category: "vinoteca", label: "Wine Cellar", aspect: "4/5" },
	{ src: "/images/vinoteca77.webp", category: "vinoteca", label: "Wine Cellar", aspect: "4/5" },
	{ src: "/images/vinoteca78.webp", category: "vinoteca", label: "Wine Cellar", aspect: "4/5" },
	{ src: "/images/vinoteca79.webp", category: "vinoteca", label: "Wine Cellar", aspect: "4/5" },
	{ src: "/images/vinoteca80.webp", category: "vinoteca", label: "Wine Cellar", aspect: "4/5" },
	{ src: "/images/vinoteca81.webp", category: "vinoteca", label: "Wine Cellar", aspect: "4/5" },
	{ src: "/images/vinoteca82.webp", category: "vinoteca", label: "Wine Cellar", aspect: "4/5" },
];

export default function GalleryPage() {
	const t = useTranslations("gallery");
	const [active, setActive] = useState<Category>("all");
	const [page, setPage] = useState(1);
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	const categories: { key: Category; label: string }[] = [
		{ key: "all", label: "All" },
		{ key: "interior", label: t("interior") },
		{ key: "terrace", label: t("terrace") },
		{ key: "vinoteca", label: t("vinoteca") },
		{ key: "food", label: t("food") },
		{ key: "drink", label: t("drink") },
	];

	const filtered = active === "all" ? items : items.filter((i) => i.category === active);
	const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
	const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	function handleCategoryChange(key: Category) {
		setActive(key);
		setPage(1);
		setLightboxIndex(null);
	}

	return (
		<>
			<PageHero heading={t("heading")} image="/images/terrace.webp" />

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
								onClick={() => handleCategoryChange(key)}
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
						{paginated.map((item, i) => (
							<ScrollReveal key={`${active}-${page}-${i}`} delay={i * 60}>
								<div
									className="img-zoom"
									onClick={() => setLightboxIndex((page - 1) * PAGE_SIZE + i)}
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

					{/* Pagination */}
					{totalPages > 1 && (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								gap: "4px",
								paddingTop: "32px",
								flexWrap: "wrap",
							}}>
							<button
								onClick={() => setPage((p) => Math.max(1, p - 1))}
								disabled={page === 1}
								className="tab-btn"
								aria-label="Previous page">
								←
							</button>
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
								<button
									key={p}
									onClick={() => setPage(p)}
									className={`tab-btn${page === p ? " active" : ""}`}
									aria-label={`Page ${p}`}
									aria-current={page === p ? "page" : undefined}>
									{p}
								</button>
							))}
							<button
								onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
								disabled={page === totalPages}
								className="tab-btn"
								aria-label="Next page">
								→
							</button>
						</div>
					)}
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
