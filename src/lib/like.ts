"use server";

import { cookies } from 'next/headers';
import { v4 as generateUUID } from "uuid";
import { setCookie } from "@/lib/cookies";
import { getRelativeDate } from "@/utils/getRelativeDate";
import { HasLikedKey, UserIDCookieKey } from "@/constants/app";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import redis from "@/lib/redis";

async function getLikes(): Promise<number | null> {
    let likes: number;

    try {
        likes =  await redis.dbsize();
    } catch (error) {
        console.error("Error while fetching total rows on the redis server:", error);

        return null;
    }

    return likes;
}

async function addLike({
    userid,
    cookieStore,
}: {
    userid: string;
    cookieStore: ReadonlyRequestCookies;
}): Promise<void | null> {
    try {
        await redis.setnx(userid, 1);
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
}

async function removeLike(userid: string): Promise<void | null> {
    try {
        await redis.del(userid);
    } catch (error) {
        console.error("Error while removing a like:", error);

        return null;
    }
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