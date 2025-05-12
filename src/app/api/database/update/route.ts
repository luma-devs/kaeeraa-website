import { NextRequest } from "next/server";
import { LikesCache, RTLCache } from "@/lib/cache";
import database from "@/db";
import { likesTable } from "@/db/schema";
import {getRelativeDate} from "@/utils/getRelativeDate";

export async function GET(request: NextRequest): Promise<Response> {
    const pathname = request.nextUrl.pathname;

    if (RTLCache.has(pathname)) {
        return new Response(null, {
            status: 429,
        });
    }

    LikesCache.set("asdfasdf", {
        time: getRelativeDate({ minutes: -70 }),
    });
    LikesCache.set("asdfdsfsdaf", {
        time: getRelativeDate({ minutes: -59 }),
    });
    LikesCache.set("wr23r23", {
        time: getRelativeDate({ minutes: 0 }),
    });

    const entries = LikesCache.entriesDescending();
    let current = entries.next();

    while (current.value !== undefined) {
        console.log(current);
        current = entries.next();
    }

    try {
        await database
            .insert(likesTable)
            .values([

            ]);
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