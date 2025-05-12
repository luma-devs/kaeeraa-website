import { NextRequest } from "next/server";
import {LikesCache, RTLCache} from "@/lib/cache";
import database from "@/db";
import { likesTable } from "@/db/schema";

export async function GET(request: NextRequest): Promise<Response> {
    const pathname = request.nextUrl.pathname;

    if (RTLCache.has(pathname)) {
        return new Response(null, {
            status: 429,
        });
    }

    console.log(LikesCache.entriesDescending());

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