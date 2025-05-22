"use client";

import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Locale } from "@/i18n-config";
import { DefaultLocale } from "@/constants/localization";

export const DictionariesContext = createContext<{
    dictionaries: DictionariesType;
    currentLocale: Locale;
    setCurrentLocale: Dispatch<SetStateAction<Locale>>;
}>({
    dictionaries: undefined,
    currentLocale: DefaultLocale,
    setCurrentLocale: () => {},
});

export function DictionariesProvider({
    children,
    dictionaries,
    lang,
}: {
    children: React.ReactNode;
    dictionaries: Record<Locale, DictionariesType>;
    lang: Locale;
}) {
    const { ru: russian, en: english, uwu } = dictionaries;
    const [currentLocale, setCurrentLocale] = useState<Locale>(lang);
    let selectedDictionaries: DictionariesType;

    switch (currentLocale) {
        case "en": {
            selectedDictionaries = english;

            break;
        }
        case "ru": {
            selectedDictionaries = russian;

            break;
        }
        case "uwu": {
            selectedDictionaries = uwu;

            break;
        }
    }

    return (
        <DictionariesContext.Provider value={{
            dictionaries: selectedDictionaries,
            currentLocale,
            setCurrentLocale,
        }}>
            {children}
        </DictionariesContext.Provider>
    );
}