"use client";

import { useState } from "react";
import { Like } from "@/lib/like";
import { Heart } from "lucide-react";
import { setCookieClientSide } from "@/lib/cookiesClient";
import { getRelativeDate } from "@/utils/getRelativeDate";
import { HasLikedKey } from "@/constants/app";

const likedClassNames = "bg-rose-950 border-rose-600";
const defaultClassNames = "bg-neutral-800 border-neutral-600 hover:border-neutral-400 disabled:border-neutral-600";

export default function LikeButton({
    likes,
    initialStatus,
}: {
    likes: number;
    initialStatus: "liked" | null;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [likesData, setLikesData] = useState<{
        count: number | null;
        action: "liked" | "disliked" | null;
    }>({
        count: likes,
        action: initialStatus,
    });
    const status = likesData.action;

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
            <div className="flex bg-black px-2 py-1 justify-center items-center border border-neutral-800 rounded-md">
                {
                    likesData.count === null
                        ? "bwaaa, an error..."
                        : `${likesData.count} likes`
                }
            </div>
            <button
                className={`border ${status === "liked" ? likedClassNames : defaultClassNames} px-2 py-1 rounded-md flex gap-2 flex-nowrap items-center transition cursor-pointer disabled:opacity-60 disabled:cursor-default`}
                onClick={() => handleClick(status)}
                disabled={isLoading}
            >
                <Heart className="shrink-0" size={18} />
                <p>
                    Like
                </p>
            </button>
        </div>
    );
}