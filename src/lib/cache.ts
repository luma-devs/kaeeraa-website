import QuickLRU from "quick-lru";

export const LikesCountCache = new QuickLRU<string, number>({
    maxSize: 1,
});