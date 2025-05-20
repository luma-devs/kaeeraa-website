"use server";

import { cookies } from 'next/headers';
import { v4 as generateUUID } from "uuid";
import { setCookie } from "@/lib/cookies";
import { getRelativeDate } from "@/utils/getRelativeDate";
import { HasLikedKey, LikesQuantityCacheKey, UserIDCookieKey } from "@/constants/app";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { LikesCountCache } from "@/lib/cache";
import redis from "@/lib/redis";

async function getLikes(): Promise<number | null> {
    const cachedLikes = LikesCountCache.get(LikesQuantityCacheKey);

    if (!cachedLikes) {
        let currentCount: number;

        try {
            currentCount =  await redis.dbsize();
        } catch (error) {
            console.error("Error while fetching total rows on the redis server:", error);

            return null;
        }

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
}): Promise<void | null> {
    const likes = await getLikes();

    if (likes === null) {
        return null;
    }

    try {
        await redis.set(userid, 1);
    } catch (error) {
        console.error("Error while adding a like:", error);

        return null;
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

async function removeLike(userid: string): Promise<boolean | null> {
    const likes = await getLikes();

    if (likes === null) {
        return null;
    }

    let disliked: number;

    try {
        disliked = await redis.del(userid);
    } catch (error) {
        console.error("Error while removing a like:", error);

        return null;
    }

    if (disliked === 1) {
        LikesCountCache.set(LikesQuantityCacheKey, likes - 1);
    }

    return Boolean(disliked);
}

const errorResponse = {
    count: null,
    action: null,
};

export async function Like({
    action,
}: {
    action: "like" | "dislike";
}): Promise<{
    count: number | null;
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

        if (disliked === null) {
            return errorResponse;
        }

        return {
            count: await getLikes(),
            action: "disliked",
        };
    }

    let userExists: number;

    try {
        userExists = await redis.exists(userid as string);
    } catch (error) {
        console.error("Error while checking if user exists:", error);

        return errorResponse;
    }

    if (userExists) {
        return {
            count: await getLikes(),
            action: "liked",
        };
    }

    if (userid) {
        const liked = await addLike({
            userid,
            cookieStore,
        });

        if (liked === null) {
            return errorResponse;
        }

        return {
            count: await getLikes(),
            action: "liked",
        };
    }

    const generatedUserId = generateUUID();

    const liked = await addLike({
        userid: generatedUserId,
        cookieStore,
    });

    if (liked === null) {
        return errorResponse;
    }

    return {
        count: await getLikes(),
        action: "liked",
    };
}