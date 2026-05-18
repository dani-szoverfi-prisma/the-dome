import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const localeUrls: Record<string, string> = {
    ro: "https://thedome.ro/ro",
    en: "https://thedome.ro/en",
    hu: "https://thedome.ro/hu",
    de: "https://thedome.ro/de",
  };

  return {
    alternates: {
      canonical: localeUrls[locale] ?? "https://thedome.ro/ro",
      languages: localeUrls as Record<string, string>,
    },
    openGraph: {
      siteName: "The Dome",
      locale,
      type: "website",
      description: t("heroSubtitle"),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <head>
        {/* Swap favicon based on OS colour scheme — media attr on <link> is ignored by most browsers */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var mq=window.matchMedia('(prefers-color-scheme: dark)');function set(){var l=document.querySelector('link[rel*="icon"][type="image/svg+xml"]');if(l)l.href=mq.matches?'/favicon/favicon.svg':'/favicon/favicon-96x96.png';}set();mq.addEventListener('change',set);})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
