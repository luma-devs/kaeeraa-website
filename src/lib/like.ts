"use server";

import { cookies } from 'next/headers';
import { v4 as generateUUID } from "uuid";
import { setCookie } from "@/lib/cookies";
import { getRelativeDate } from "@/utils/getRelativeDate";
import { LikesQuantityCacheKey, UserIDCookieKey } from "@/constants/app";

function getLikes(): number {
    return LikeEntriesCache.get(LikesQuantityCacheKey) ?? 0;
}

function addLike(userid: string): void {
    LikeEntriesCache.set(LikesQuantityCacheKey, getLikes() + 1);
    LikesCache.set(userid, {
        time: new Date(),
    });
}

function removeLike(userid: string): boolean {
    const disliked = LikesCache.delete(userid);

    if (disliked) {
        LikeEntriesCache.set(LikesQuantityCacheKey, getLikes() - 1);
    }

    return disliked;
}

export async function Like({
    action,
}: {
    action: "like" | "dislike";
}): Promise<{
    count: number;
    action: "liked" | "disliked" | null;
}> {
    const cookieStore = await cookies();
    const userid = cookieStore.get(UserIDCookieKey)?.value;

    if (action === "dislike") {
        if (!userid) {
            return {
                count: getLikes(),
                action: null,
            };
        }

        const disliked = removeLike(userid);

        if (!disliked) {
            return {
                count: getLikes(),
                action: null,
            };
        }

        return {
            count: getLikes(),
            action: "disliked",
        };
    }

    if (LikesCache.has(userid as string)) {
        return {
            count: getLikes(),
            action: null,
        };
    }

    if (userid) {
        addLike(userid);

        return {
            count: getLikes(),
            action: "liked",
        };
    }

    const generatedUserId = generateUUID();

    await setCookie({
        store: cookieStore,
        key: UserIDCookieKey,
        value: generatedUserId,
        expiresAt: getRelativeDate({ days: 365 }),
        httpOnly: false,
    });

    addLike(generatedUserId);

    return {
        count: getLikes(),
        action: "liked",
    };
}