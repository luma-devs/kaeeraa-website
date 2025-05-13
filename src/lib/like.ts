"use server";

import { cookies } from 'next/headers';
import { LikesCache } from "@/lib/cache";
import { v4 as generateUUID } from "uuid";
import { setCookie } from "@/lib/cookies";
import { getRelativeDate } from "@/utils/getRelativeDate";
import { UserIDCookieKey } from "@/constants/app";

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
                count: LikesCache.size,
                action: null,
            };
        }

        const disliked = LikesCache.delete(userid);

        if (!disliked) {
            return {
                count: LikesCache.size,
                action: null,
            };
        }

        return {
            count: LikesCache.size,
            action: "disliked",
        };
    }

    if (LikesCache.has(userid as string)) {
        return {
            count: LikesCache.size,
            action: null,
        };
    }

    if (userid) {
        LikesCache.set(userid, {
            time: new Date(),
        });

        return {
            count: LikesCache.size,
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

    LikesCache.set(generatedUserId, {
        time: new Date(),
    });

    return {
        count: LikesCache.size,
        action: "liked",
    };
}