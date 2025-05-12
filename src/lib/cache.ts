import QuickLRU from "quick-lru";
import { getTimeDifference } from "@/utils/getTimeDifference";

// ik that a redis server would be better,
// but it's not possible to host it on vercel,
// and upstash redis is much slower than in-memory cache
export const RTLCache = new QuickLRU<string, true>({
    // being used only for the update API route and
    maxSize: 2,
    maxAge: getTimeDifference({ days: 1 }),
});
export const LikesCache = new QuickLRU<string, true>({
    // maximum number of entries in Node.js Map lul
    maxSize: Math.pow(2, 24) - 1,
});