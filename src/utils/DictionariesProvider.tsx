"use client";

import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import { createContext } from "react";

export const DictionariesContext = createContext<{
    dictionaries: DictionariesType;
}>({
    dictionaries: undefined,
});

export function DictionariesProvider({
    children,
    dictionaries,
}: {
    children: React.ReactNode;
    dictionaries: DictionariesType;
}) {
    return (
        <DictionariesContext.Provider value={{
            dictionaries,
        }}>
            {children}
        </DictionariesContext.Provider>
    );
}