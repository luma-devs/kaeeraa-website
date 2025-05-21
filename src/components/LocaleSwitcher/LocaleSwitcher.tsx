"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { type Locale } from "@/i18n-config";
import { setCookie } from "@/lib/cookies";
import { getRelativeDate } from "@/utils/getRelativeDate";
import { CookieLocaleKey, LocaleItems } from "@/constants/localization";

const redirects: Record<Locale, Locale> = {
    ru: "en",
    en: "ru",
};

const handleLocaleSwitch = async (locale: Locale) => {
    await setCookie({
        key: CookieLocaleKey,
        value: JSON.stringify(locale),
        expiresAt: getRelativeDate({ days: 365 }),
        httpOnly: false,
    });
};

export default function LocaleSwitcher() {
    const pathname = usePathname();
    const pathnameLocale = pathname.split("/")[1];
    const currentLocale: Locale = pathnameLocale === "ru"
        ? "ru"
        : "en";
    const { name, icon } = LocaleItems[currentLocale];
    const redirectedPathname = (locale: Locale) => {
        if (!pathname) {
            return "/";
        }

        const segments = pathname.split("/");

        segments[1] = locale;

        return segments.join("/");
    };

    return (
        <Link
            prefetch
            className={"w-fit h-fit flex items-center gap-2 rounded-md p-2 cursor-pointer transition duration-200 focus:opacity-60 focus:cursor-default hover:brightness-105 dark:hover:brightness-125 bg-neutral-800 border border-neutral-600 hover:border-neutral-400"}
            href={redirectedPathname(redirects[currentLocale])}
            onClick={() => handleLocaleSwitch(redirects[currentLocale])}
            aria-label={`${name} locale selector`}
            title={`${name} locale selector`}
        >
            <div className="fill-black dark:fill-white leading-none drop-shadow-xs drop-shadow-[#0005]">
                {icon}
            </div>
            <p>
                {name}
            </p>
        </Link>
    );
}