import QuickLRU from "quick-lru";
import { getTimeDifference } from "@/utils/getTimeDifference";

export const LikesCountCache = new QuickLRU<string, number>({
    maxSize: 1,
    maxAge: getTimeDifference({ hours: 1 }),
});