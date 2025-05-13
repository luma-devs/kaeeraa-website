"use client";

import { useState } from "react";
import { Like } from "@/lib/like";

export default function LikeButton({
    likes,
}: {
    likes: number;
}) {
    const [likesData, setLikesData] = useState<{
        count: number;
        action: "liked" | "disliked" | "nah mate, you already did that" | null;
    }>({
        count: likes,
        action: null,
    });

    async function handleClick(action: "like" | "dislike") {
        const { action: status, count } = await Like({ action });

        if (status === null) {
            setLikesData({
                action: "nah mate, you already did that",
                count,
            });

            return;
        }

        setLikesData({
            action: status,
            count,
        });

        return;
    }

    return (
        <>
            <div>{likesData.count}</div>
            <div>{likesData.action}</div>
            <button onClick={() => handleClick("like")}>
                like?
            </button>
            <button onClick={() => handleClick("dislike")}>
                dislike?
            </button>
        </>
    );
}