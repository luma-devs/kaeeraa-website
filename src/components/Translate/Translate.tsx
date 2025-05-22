"use client";

import { useContext } from "react";
import { DictionariesContext } from "@/utils/DictionariesProvider";
import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";

export default function Translate({
    property,
}: {
    property: keyof NonNullable<DictionariesType>;
}) {
    const { dictionaries } = useContext(DictionariesContext);

    return (
        <>
            {dictionaries?.[property]}
        </>
    );
}