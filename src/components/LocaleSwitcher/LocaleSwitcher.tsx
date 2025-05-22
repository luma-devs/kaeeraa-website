"use client";

import { type Locale } from "@/i18n-config";
import { getRelativeDate } from "@/utils/getRelativeDate";
import { CookieLocaleKey, LocaleItems } from "@/constants/localization";
import { setCookieClientSide } from "@/lib/cookiesClient";
import { useContext } from "react";
import { DictionariesContext } from "@/utils/DictionariesProvider";

const redirects: Record<Locale, Locale> = {
    ru: "en",
    en: "uwu",
    uwu: "ru",
};

export default function LocaleSwitcher() {
    const { dictionaries, currentLocale, setCurrentLocale } = useContext(DictionariesContext);
    const { name, icon } = LocaleItems[redirects[currentLocale]];
    const handleLocaleSwitch = () => {
        if (typeof globalThis === "undefined") {
            return;
        }

        const switchedLocale = redirects[currentLocale];

        globalThis.history.pushState({}, "", `/${switchedLocale}`);
        setCurrentLocale(switchedLocale);
        setCookieClientSide({
            key: CookieLocaleKey,
            value: JSON.stringify(switchedLocale),
            expiresAt: getRelativeDate({ days: 365 }),
            httpOnly: false,
        });
    };

    return (
        <button
            className={"w-fit h-fit flex items-center gap-2 rounded-full px-2 py-1 cursor-pointer transition duration-200 active:opacity-60 active:cursor-default hover:brightness-105 dark:hover:brightness-125 bg-neutral-800 hover:bg-neutral-700"}
            onClick={handleLocaleSwitch}
            aria-label={`${dictionaries?.["components.locale-switcher.select"]} ${name}`}
            title={`${dictionaries?.["components.locale-switcher.select"]} ${name}`}
        >
            <div className="fill-black dark:fill-white drop-shadow-xs drop-shadow-[#0005]">
                {icon}
            </div>
            <p>
                {name}
            </p>
        </button>
    );
}