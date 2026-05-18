"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ScrollReveal";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";

const menuData = {
	food: [
		{
			name: "Carpaccio de vită",
			description: "Cu rucola, parmezan și trufe de vară",
			price: "68 RON",
		},
		{
			name: "Rilette de rată",
			description: "Cu compot de afine și pâine artizanală",
			price: "58 RON",
		},
		{
			name: "Supă cremă de ciuperci",
			description: "Cu ulei de trufe și crutoane",
			price: "42 RON",
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
		{
			name: "Rață confit",
			description: "Cu linte belugă, portocale și jus de rată",
			price: "98 RON",
		},
		{
			name: "Crème brûlée cu vanilie Bourbon",
			description: "Servit cu fructe de sezon",
			price: "38 RON",
		},
		{
			name: "Tort de ciocolată neagră",
			description: "Cu cremă de caramel și înghețată de vanilie",
			price: "42 RON",
		},
	],
	drinks: [
		{
			name: "Negroni",
			description: "Gin, Campari, vermouth dulce",
			price: "45 RON",
		},
		{
			name: "Aperol Spritz",
			description: "Aperol, Prosecco, sifon, portocală",
			price: "38 RON",
		},
		{
			name: "Old Fashioned",
			description: "Bourbon, bitters, zahăr brun, portocală",
			price: "55 RON",
		},
		{
			name: "Espresso Martini",
			description: "Vodcă, Kahlúa, espresso proaspăt",
			price: "52 RON",
		},
		{
			name: "Apă minerală",
			description: "500ml — Stilles / Sprudelnd",
			price: "15 RON",
		},
		{
			name: "Sucuri naturale",
			description: "Portocale, grapefruit sau mere presate",
			price: "28 RON",
		},
	],
	wine: [
		{
			name: "Cramele Recaș — Cuvée Uberland",
			description: "Roșu, Banat · 2021",
			price: "185 RON",
		},
		{
			name: "Davino — Monogram",
			description: "Roșu, Dealu Mare · 2019",
			price: "320 RON",
		},
		{
			name: "Liliac — Private Selection Pinot Noir",
			description: "Roșu, Lechința · 2020",
			price: "210 RON",
		},
		{
			name: "Crama Bauer — Riesling",
			description: "Alb, Miniș · 2022",
			price: "165 RON",
		},
		{
			name: "Jidvei — Gewürztraminer",
			description: "Alb, Transilvania · 2022",
			price: "145 RON",
		},
		{
			name: "Domaine Weinbach — Riesling Grand Cru",
			description: "Alb, Alsacia · 2020",
			price: "480 RON",
		},
	],
};

type Tab = "food" | "drinks" | "wine";

function MenuContent() {
	const t = useTranslations("menu");
	const searchParams = useSearchParams();
	const [activeTab, setActiveTab] = useState<Tab>(() => {
		const tab = searchParams.get("tab");
		return tab === "food" || tab === "drinks" || tab === "wine" ? tab : "food";
	});

	const tabs: { key: Tab; label: string }[] = [
		{ key: "food", label: t("food") },
		{ key: "drinks", label: t("drinks") },
		{ key: "wine", label: t("wine") },
	];

	const items = menuData[activeTab];

	return (
		<>
			<PageHero heading={t("heading")} image="/images/food73.webp" />

			{/* Tab switcher */}
			<section
				style={{
					backgroundColor: "var(--bg-secondary)",
					position: "sticky",
					top: "72px",
					zIndex: 10,
					borderBottom: "1px solid var(--accent-border)",
				}}>
				<div className="container">
					<div style={{ display: "flex", gap: "0", overflowX: "auto" }}>
						{tabs.map(({ key, label }) => (
							<button
								key={key}
								onClick={() => setActiveTab(key)}
								aria-selected={activeTab === key}
								className={`tab-btn${activeTab === key ? " active" : ""}`}>
								{label}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Menu items */}
			<section
				className="section"
				style={{ backgroundColor: "var(--bg-primary)" }}>
				<div className="container">
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
							gap: "0 4rem",
						}}>
						{items.map((item, i) => (
							<ScrollReveal key={`${activeTab}-${i}`} delay={i * 60}>
								<div
									style={{
										padding: "1.5rem 0",
										borderBottom: "1px solid var(--accent-border)",
									}}>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "baseline",
											gap: "1rem",
											marginBottom: "0.4rem",
										}}>
										<h3
											style={{
												fontFamily: "var(--font-cormorant)",
												fontSize: "1.15rem",
												fontWeight: 400,
											}}>
											{item.name}
										</h3>
										<span
											style={{
												color: "var(--accent-gold)",
												fontFamily: "var(--font-cormorant)",
												fontSize: "1.05rem",
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
										}}>
										{item.description}
									</p>
								</div>
							</ScrollReveal>
						))}
					</div>

					<div style={{ marginTop: "3rem", textAlign: "center" }}>
						<Button href="#" variant="gold">
							{t("downloadPdf")}
						</Button>
					</div>
				</div>
			</section>

			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebPage",
						name: "Meniu — The Dome",
						url: "https://thedome.ro/ro/menu",
					}),
				}}
			/>
		</>
	);
}

export default function MenuPage() {
	return (
		<Suspense>
			<MenuContent />
		</Suspense>
	);
}
