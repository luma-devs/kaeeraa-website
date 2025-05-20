import LikeButton from "@/components/LikeButton/LikeButton";
import redis from "@/lib/redis";
import { LikesCountCache } from "@/lib/cache";
import { HasLikedKey, LikesQuantityCacheKey } from "@/constants/app";
import { cookies } from "next/headers";

export default async function FetchLikes() {
    const cookieStore = await cookies();
    const hasLiked = cookieStore.get(HasLikedKey)?.value === undefined
        ? null
        : "liked";

    let likes = LikesCountCache.get(LikesQuantityCacheKey);

    if (likes === undefined) {
        try {
            likes = await redis.dbsize();
        } catch {
            likes = 0;
        }

        LikesCountCache.set(LikesQuantityCacheKey, likes);
    }

    return (
        <>
            <LikeButton
                likes={likes}
                initialStatus={hasLiked}
            />
        </>
    );
}