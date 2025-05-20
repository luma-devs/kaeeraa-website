import QuickLRU from "quick-lru";
import { getTimeDifference } from "@/utils/getTimeDifference";

export const RTLCache = new QuickLRU<string, true>({
    maxSize: 5000,
    maxAge: getTimeDifference({ hours: 1 }),
});
export const LikesCountCache = new QuickLRU<string, number>({
    maxSize: 1,
    maxAge: getTimeDifference({ hours: 1 }),
});