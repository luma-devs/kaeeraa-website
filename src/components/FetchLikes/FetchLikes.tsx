import { Suspense } from "react";
import LikeButton from "@/components/LikeButton/LikeButton";
import { LikeEntriesCache } from "@/lib/cache";
import { LikesQuantityCacheKey } from "@/constants/app";
import database from "@/db";
import { likesTable } from "@/db/schema";

export default async function FetchLikes() {
    const cachedLikes = LikeEntriesCache.get(LikesQuantityCacheKey) ?? 0;
    let likes = cachedLikes;

    if (cachedLikes === 0) {
        try {
            const totalRows = await database.$count(likesTable);

            LikeEntriesCache.set(LikesQuantityCacheKey, totalRows);
            likes = totalRows;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Suspense fallback={
                <>Loading...</>
            }>
                <LikeButton likes={likes} />
            </Suspense>
        </>
    );
}