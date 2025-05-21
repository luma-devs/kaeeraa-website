import { Locale } from "@/i18n-config";
import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";

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
export const ProgrammingLanguages: Array<string> = ["Python", "C++", "Go"];
export const AboutMe: Array<keyof NonNullable<DictionariesType>[keyof Pick<NonNullable<DictionariesType>, "components">]["hero"]> = [
    "about-work",
    "about-code-style",
    "about-nixos",
    "about-free-time",
];
//uwu: ["i wowk as a p-pwogwammer and wove w-wwiting cwean.., weadable code"],