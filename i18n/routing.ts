import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["ro", "en", "hu", "de"],
	defaultLocale: "ro",
	localePrefix: "as-needed",
});
