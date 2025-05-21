"use client";

import { useContext, useState } from "react";
import { Like } from "@/lib/like";
import { Heart } from "lucide-react";
import { setCookieClientSide } from "@/lib/cookiesClient";
import { getRelativeDate } from "@/utils/getRelativeDate";
import { HasLikedKey } from "@/constants/app";
import { DictionariesContext } from "@/utils/DictionariesProvider";
import { makeWordEnding } from "@/utils/makeWordEnding";

const likedClassNames = "bg-rose-950 border-rose-600";
const defaultClassNames = "bg-neutral-800 border-neutral-600 hover:border-neutral-400 disabled:border-neutral-600";

export default function LikeButton({
    likes,
    initialStatus,
}: {
    likes: number | null;
    initialStatus: "liked" | null;
}) {
    const { dictionaries } = useContext(DictionariesContext);
    const [isLoading, setIsLoading] = useState(false);
    const [likesData, setLikesData] = useState<{
        count: number | null;
        action: "liked" | "disliked" | null;
    }>({
        count: likes,
        action: initialStatus,
    });
    const status = likesData.action;
    const likesWord = makeWordEnding({
        replies: likesData.count ?? 0,
        wordTypes: [
            dictionaries?.components?.likeButton?.likesSingle as string,
            dictionaries?.components?.likeButton?.likesFew as string,
            dictionaries?.components?.likeButton?.likesMany as string,
        ],
    });

    async function handleClick(currentStatus: typeof status) {
        if (isLoading) {
            return;
        }

        const action = currentStatus === "liked"
            ? "dislike"
            : "like";

        setIsLoading(true);

        const { action: changedStatus, count } = await Like({ action });

        if (action === "like") {
            setCookieClientSide({
                key: HasLikedKey,
                value: "yeah bro",
                expiresAt: getRelativeDate({ days: 365 }),
                httpOnly: false,
            });
        } else {
            setCookieClientSide({
                key: HasLikedKey,
                value: "",
                expiresAt: getRelativeDate({ milliseconds: 0 }),
                httpOnly: false,
            });
        }

        setLikesData({
            action: changedStatus,
            count,
        });
        setIsLoading(false);

        return;
    }

    return (
        <div className="flex flex-nowrap gap-2">
            <div className="flex bg-neutral-900 h-9 p-2 leading-none justify-center items-center border border-neutral-800 rounded-md">
                {
                    likesData.count === null
                        ? dictionaries?.components?.likeButton?.error
                        : `${likesData.count} ${likesWord}`
                }
            </div>
            <button
                className={`border ${status === "liked" ? likedClassNames : defaultClassNames} w-9 h-9 p-2 rounded-md flex items-center transition cursor-pointer active:opacity-60 active:cursor-default disabled:opacity-60 disabled:cursor-default`}
                onClick={() => handleClick(status)}
                disabled={isLoading}
            >
                <Heart className="shrink-0" size={18} />
            </button>
        </div>
    );
}