"use client";

import { useState } from "react";
import { Like } from "@/lib/like";

export default function LikeButton({
    likes,
    status,
}: {
    likes: number;
    status: "liked" | null;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [likesData, setLikesData] = useState<{
        count: number;
        action: "liked" | "disliked" | null;
    }>({
        count: likes,
        action: status,
    });

    async function handleClick(action: "like" | "dislike") {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        const { action: status, count } = await Like({ action });

        setLikesData({
            action: status,
            count,
        });
        setIsLoading(false);

        return;
    }

    return (
        <>
            <div>{isLoading.toString()}</div>
            <div>{likesData.count}</div>
            <div>{likesData.action}</div>
            {
                likesData.action === "liked" ? (
                    <button onClick={() => handleClick("dislike")}>
                        dislike?
                    </button>
                ) : (
                    <button onClick={() => handleClick("like")}>
                        like?
                    </button>
                )
            }
        </>
    );
}