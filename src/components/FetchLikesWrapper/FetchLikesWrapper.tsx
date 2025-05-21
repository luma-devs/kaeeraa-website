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
                <>
                    <div
                        className="flex bg-neutral-800 px-2 py-1 justify-center items-center rounded-full cursor-not-allowed animate-pulse gap-2"
                        aria-label={`${cachedLikes ?? "?"} ${likesWord}`}
                        title={`${cachedLikes ?? "?"} ${likesWord}`}
                    >
                        <Heart className="shrink-0" size={18} />
                        <div>
                            {cachedLikes ?? "?"}
                        </div>
                    </div>
                </>
            }>
                <FetchLikes />
            </Suspense>
        </>
    );
}