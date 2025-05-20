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
        const currentCount = await redis.dbsize();

        LikesCountCache.set(LikesQuantityCacheKey, currentCount);

        return currentCount;
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
    const likes = await getLikes();

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

    LikesCountCache.set(LikesQuantityCacheKey, likes + 1);
}

async function removeLike(userid: string): Promise<boolean> {
    const likes = await getLikes();
    const disliked = await redis.del(userid);

    if (disliked === 1) {
        LikesCountCache.set(LikesQuantityCacheKey, likes - 1);
    }

    return Boolean(disliked);
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

        const disliked = await removeLike(userid);

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

    if (await redis.exists(userid as string)) {
        return {
            count: await getLikes(),
            action: null,
        };
    }

    if (userid) {
        await addLike({
            userid,
            cookieStore,
        });

        return {
            count: await getLikes(),
            action: "liked",
        };
    }

    const generatedUserId = generateUUID();

    await addLike({
        userid: generatedUserId,
        cookieStore,
    });

    return {
        count: await getLikes(),
        action: "liked",
    };
}