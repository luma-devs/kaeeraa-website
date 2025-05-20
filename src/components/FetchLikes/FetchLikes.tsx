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

    let likes: number | null | undefined = LikesCountCache.get(LikesQuantityCacheKey);

    if (likes === undefined) {
        try {
            likes = await redis.dbsize();
        } catch {
            likes = null;
        }

        LikesCountCache.set(LikesQuantityCacheKey, likes ?? 0);
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