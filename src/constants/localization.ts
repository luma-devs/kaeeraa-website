import { Locale } from "@/i18n-config";

export const CookieLocaleKey = "locale";
export const DefaultLocale = "en";
export const Locales: Array<"en" | "ru"> = ["en", "ru"];
export const LocaleItems: Record<Locale, {
    name: string;
    icon: string;
}> = {
    en: {
        name: "English",
        icon: "🇺🇸",
    },
    ru: {
        name: "Русский",
        icon: "🇷🇺",
    },
};