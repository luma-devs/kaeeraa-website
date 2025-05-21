import FetchLikes from "@/components/FetchLikes/FetchLikes";
import { Suspense } from "react";
import { Heart } from "lucide-react";
import { LikesCountCache } from "@/lib/cache";
import { LikesQuantityCacheKey } from "@/constants/app";
import { makeWordEnding } from "@/utils/makeWordEnding";
import { Locale } from "@/i18n-config";

export default function FetchLikesWrapper({
    lang,
}: {
    lang: Locale;
}) {
    const wordForms = {
        single: lang === "ru" ? "лайк" : "like",
        few: lang === "ru" ? "лайка" : "likes",
        many: lang === "ru" ? "лайков" : "likes",
    };
    const cachedLikes = LikesCountCache.get(LikesQuantityCacheKey);
    const likesWord = makeWordEnding({
        replies: cachedLikes ?? 0,
        wordTypes: [
            wordForms.single,
            wordForms.few,
            wordForms.many,
        ],
    });

    return (
        <>
            <Suspense fallback={
                <div className="flex flex-nowrap gap-2">
                    <div className="flex bg-neutral-900 h-9 p-2 leading-none justify-center items-center border border-neutral-800 rounded-md animate-pulse">
                        {cachedLikes ?? "?"} {likesWord}
                    </div>
                    <div className="flex bg-neutral-800 h-9 p-2 leading-none justify-center items-center border border-neutral-600 rounded-md cursor-not-allowed animate-pulse">
                        <Heart className="shrink-0" size={18} />
                    </div>
                </div>
            }>
                <FetchLikes />
            </Suspense>
        </>
    );
}