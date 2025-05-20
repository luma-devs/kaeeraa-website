"use server";

import { cookies } from 'next/headers';
import { v4 as generateUUID } from "uuid";
import { setCookie } from "@/lib/cookies";
import { getRelativeDate } from "@/utils/getRelativeDate";
import { HasLikedKey, LikesQuantityCacheKey, UserIDCookieKey } from "@/constants/app";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { LikesCountCache } from "@/lib/cache";
import redis from "@/lib/redis";

async function getLikes(): Promise<number> {
    const cachedLikes = LikesCountCache.get(LikesQuantityCacheKey);

    if (!cachedLikes) {
        return redis.dbsize();
    }

    return cachedLikes;
}

async function addLike({
    userid,
    cookieStore,
}: {
    userid: string;
    cookieStore: ReadonlyRequestCookies;
}): Promise<void | Error> {
    try {
        await redis.set(userid, 1);
    } catch (error) {
        console.error("Error while adding a like:", error);

        throw new Error("Error while add a like.");
    }

    await setCookie({
        store: cookieStore,
        key: UserIDCookieKey,
        value: userid,
        expiresAt: getRelativeDate({ days: 365 }),
        httpOnly: false,
    });
    await setCookie({
        store: cookieStore,
        key: HasLikedKey,
        value: "yeah bro",
        expiresAt: getRelativeDate({ days: 365 }),
        httpOnly: false,
    });

    const likes = await getLikes();

    LikesCountCache.set(LikesQuantityCacheKey, likes + 1);
}

async function removeLike(userid: string): Promise<boolean> {
    const disliked = LikesCache.delete(userid);

    if (disliked) {
        LikeEntriesCache.set(LikesQuantityCacheKey, getLikes() - 1);
    }

    const likes = await getLikes();

    LikesCountCache.set(LikesQuantityCacheKey, likes + 1);

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
                count: await getLikes(),
                action: null,
            };
        }

        const disliked = removeLike(userid);

        if (!disliked) {
            return {
                count: await getLikes(),
                action: null,
            };
        }

        return {
            count: await getLikes(),
            action: "disliked",
        };
    }

    if (LikesCache.has(userid as string)) {
        return {
            count: await getLikes(),
            action: null,
        };
    }

    if (userid) {
        addLike(userid);

        return {
            count: await getLikes(),
            action: "liked",
        };
    }

    const generatedUserId = generateUUID();

    addLike(generatedUserId);

    return {
        count: await getLikes(),
        action: "liked",
    };
}