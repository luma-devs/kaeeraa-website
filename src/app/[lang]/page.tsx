import LikeButton from "@/components/LikeButton/LikeButton";
import { LikesCache } from "@/lib/cache";

export default function Home() {
    const likes = LikesCache.size;

    return (
        <>
            <LikeButton likes={likes} />
        </>
    );
}
