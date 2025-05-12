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
}): Promise<void | null> {
    const cookieStore = await cookies();
    const userid = cookieStore.get(UserIDCookieKey)?.value;

    if (action === "dislike") {
        if (!userid) {
            return null;
        }

        LikesCache.delete(userid);

        return;
    }

    if (LikesCache.has(userid as string)) {
        return null;
    }

    if (userid) {
        LikesCache.set(userid, {
            time: new Date(),
        });

        return;
    }

    const generatedUserId = generateUUID();

    await setCookie({
        store: cookieStore,
        key: UserIDCookieKey,
        value: generatedUserId,
        expiresAt: getRelativeDate({ days: 365 }),
        httpOnly: false,
    });

    return;
}