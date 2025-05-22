import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getDictionary } from "@/get-dictionary";
import { i18n, Locale } from "@/i18n-config";
import { Kaeeraa } from "@/constants/app";
import { DictionariesProvider } from "@/utils/DictionariesProvider";
import { DefaultLocale } from "@/constants/localization";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export async function generateMetadata({
    params,
}: {
    params: Promise<{
        lang: Locale;
    }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const { "metadata.description": description } = await getDictionary(lang);

    return {
        icons: "/favicon.webp",
        title: {
            template: `%s | ${Kaeeraa}`,
            default: Kaeeraa,
        },
        description: description,
    };
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
}>) {
    const { lang } = await params;
    let currentLang: Locale;

    switch (lang) {
        case "en":
        case "ru":
        case "uwu": {
            currentLang = lang;
            break;
        }
        default: {
            currentLang = DefaultLocale;
        }
    }

    const englishDictionaries = await getDictionary("en");
    const russianDictionaries = await getDictionary("ru");
    const uwuDictionaries = await getDictionary("uwu");

    return (
        <html lang={lang}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} grid place-items-center h-[100svh] bg-[#040404] antialiased`}
            >
                <DictionariesProvider dictionaries={{
                    en: englishDictionaries,
                    ru: russianDictionaries,
                    uwu: uwuDictionaries,
                }} lang={currentLang}>
                    {children}
                </DictionariesProvider>
            </body>
        </html>
    );
}
