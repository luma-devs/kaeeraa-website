import { NextRequest } from "next/server";
import {LikeEntriesCache, LikesCache, RTLCache} from "@/lib/cache";
import database from "@/db";
import { likesTable } from "@/db/schema";
import { getRelativeDate } from "@/utils/getRelativeDate";
import {LikesQuantityCacheKey} from "@/constants/app";

export async function GET(request: NextRequest): Promise<Response> {
    const pathname = request.nextUrl.pathname;

    // ratelimit for an hour
    if (false && RTLCache.has(pathname)) {
        return new Response(null, {
            status: 429,
        });
    }

    // we sync every recent entry in the cache
    // (which age is not older than 60 minutes)
    const entriesToSync: Array<{
        userid: string;
        createdAt: Date;
    }> = [];
    // it's a linked list
    const entries = LikesCache.entriesDescending();
    let current = entries.next();
    console.log(LikesCache.size, LikeEntriesCache.get(LikesQuantityCacheKey));
    while (current.value !== undefined) {
        const [userid, { time }] = current.value;

        if (time <= getRelativeDate({ hours: -1 })) {
            break;
        }

        entriesToSync.push({
            userid,
            createdAt: time,
        });

        current = entries.next();
    }

    if (entriesToSync.length === 0) {
        RTLCache.set(pathname, true);

        return new Response(null, {
            status: 200,
        });
    }

    try {
        await database
            .insert(likesTable)
            .values(entriesToSync);
    } catch (error) {
        console.log(error);

        return new Response(null, {
            status: 500,
        });
    }

    RTLCache.set(pathname, true);

    return new Response(null, {
        status: 200,
    });
}