"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n-config";
import { setCookie } from "@/lib/cookies";
import { getRelativeDate } from "@/utils/getRelativeDate";
import { CookieLocaleKey, LocaleItems } from "@/constants/localization";

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
    const currentLocale = pathname.split("/")[1];
    const redirectedPathname = (locale: Locale) => {
        if (!pathname) {
            return "/";
        }

        const segments = pathname.split("/");

        segments[1] = locale;

        return segments.join("/");
    };

    return (
        <>
            {
                i18n.locales.map((locale) => {
                    const { name, icon } = LocaleItems[locale];
                    const classNames = locale === currentLocale
                        ? "bg-neutral-300 text-black"
                        : "bg-neutral-800 border border-neutral-600 hover:border-neutral-400";

                    return (
                        <Link
                            prefetch
                            className={`w-fit h-fit flex items-center gap-2 rounded-md p-2 cursor-pointer transition duration-200 disabled:opacity-60 disabled:cursor-default hover:brightness-105 dark:hover:brightness-125 ${classNames}`}
                            key={locale}
                            href={redirectedPathname(locale)}
                            onClick={() => handleLocaleSwitch(locale)}
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
                })
            }
        </>
    );
}