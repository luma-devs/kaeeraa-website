"use server";

import { cookies } from 'next/headers';
import { v4 as generateUUID } from "uuid";
import { setCookie } from "@/lib/cookies";
import { getRelativeDate } from "@/utils/getRelativeDate";
import { HasLikedKey, LikesQuantityCacheKey, UserIDCookieKey } from "@/constants/app";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

async function getLikes(): number {
    return LikeEntriesCache.get(LikesQuantityCacheKey) ?? 0;
}

async function addLike({
    userid,
    cookieStore,
}: {
    userid: string;
    cookieStore: ReadonlyRequestCookies;
}): void {
    LikeEntriesCache.set(LikesQuantityCacheKey, getLikes() + 1);
    LikesCache.set(userid, {
        time: new Date(),
    });

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
        value: userid,
        expiresAt: getRelativeDate({ days: 365 }),
        httpOnly: false,
    });
}

async function removeLike(userid: string): boolean {
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

    addLike(generatedUserId);

    return {
        count: getLikes(),
        action: "liked",
    };
}