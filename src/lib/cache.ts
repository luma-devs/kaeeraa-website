import QuickLRU from "quick-lru";
import { getTimeDifference } from "@/utils/getTimeDifference";
import { LikesQuantityCacheKey } from "@/constants/app";

// ik that a redis server would be better than this cache,
// but it's not possible to host it on vercel,
// and remote redis hosting is much slower than in-memory cache
export const RTLCache = new QuickLRU<string, true>({
    maxSize: 5000,
    maxAge: getTimeDifference({ hours: 1 }),
});
// faster than just a cached database fetch
export const LikesCache = new QuickLRU<string, {
    time: Date;
}>({
    // maximum number of entries in Node.js Map lul
    // if somehow all the entries get deleted (could be a restart)
    // we still have a database. tho i'm not fetching every row from it,
    // only the total rows count
    maxSize: Math.pow(2, 24) - 1,
});
export const LikeEntriesCache = new QuickLRU<string, number>({
    maxSize: 1,
});

LikeEntriesCache.set(LikesQuantityCacheKey, 0);
