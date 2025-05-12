import { NextRequest } from "next/server";
import { RTLCache } from "@/lib/cache";

export async function GET(request: NextRequest): Promise<Response> {
    const dsa = RTLCache.peek("");

    return new Response(null, {
        status: 200,
    });
}