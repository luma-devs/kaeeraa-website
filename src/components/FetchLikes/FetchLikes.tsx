import LikeButton from "@/components/LikeButton/LikeButton";
import redis from "@/lib/redis";
import { LikesCountCache } from "@/lib/cache";
import { HasLikedKey, LikesQuantityCacheKey } from "@/constants/app";
import { cookies } from "next/headers";

export default async function FetchLikes() {
    const cookieStore = await cookies();
    const hasLiked = cookieStore.get(HasLikedKey)?.value === "liked"
        ? "liked"
        : null;

    let likes = LikesCountCache.get(LikesQuantityCacheKey);

    if (likes === undefined) {
        likes = await redis.dbsize();

        LikesCountCache.set(LikesQuantityCacheKey, likes);
    }

    return (
        <>
            <LikeButton
                likes={likes}
                status={hasLiked}
            />
        </>
    );
}