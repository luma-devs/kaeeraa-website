import LikeButton from "@/components/LikeButton/LikeButton";
import redis from "@/lib/redis";
import { LikesCountCache } from "@/lib/cache";
import { LikesQuantityCacheKey } from "@/constants/app";

export default async function FetchLikes() {
    let likes = LikesCountCache.get(LikesQuantityCacheKey);

    if (likes === undefined) {
        likes = await redis.dbsize();

        LikesCountCache.set(LikesQuantityCacheKey, likes);
    }

    return (
        <>
            <LikeButton likes={likes} />
        </>
    );
}