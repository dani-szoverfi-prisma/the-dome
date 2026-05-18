import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ReservationSection from "@/components/ReservationSection";
import PageHero from "@/components/PageHero";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "reservation" });
	return {
		title: t("heading"),
		description: t("subheading"),
	};
}

export default async function ReservationPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "reservation" });

	return (
		<>
			<PageHero
				heading={t("heading")}
				subheading={t("subheading")}
				image="/images/food45.webp"
			/>

			{/* Form */}
			<ReservationSection locale={locale} />

			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebPage",
						name: `${t("heading")} — The Dome`,
						url: "https://thedome.ro/ro/reservation",
					}),
				}}
			/>
		</>
	);
}
