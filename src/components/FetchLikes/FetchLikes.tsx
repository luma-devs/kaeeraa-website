import LikeButton from "@/components/LikeButton/LikeButton";
import redis from "@/lib/redis";
import { HasLikedKey } from "@/constants/app";
import { cookies } from "next/headers";

export default async function FetchLikes() {
    const cookieStore = await cookies();
    const hasLiked = cookieStore.get(HasLikedKey)?.value === undefined
        ? null
        : "liked";

    let likes: number | null | undefined;

    try {
        likes = await redis.dbsize();
    } catch {
        likes = null;
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