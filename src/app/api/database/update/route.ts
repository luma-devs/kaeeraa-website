import { NextRequest } from "next/server";
import { RTLCache } from "@/lib/cache";

export async function GET(request: NextRequest): Promise<Response> {
    const pathname = request.nextUrl.pathname;

    if (RTLCache.has(pathname)) {
        return new Response(null, {
            status: 429,
        });
    }

    RTLCache.set(pathname, true);

    return new Response("sdf", {
        status: 200,
    });
}