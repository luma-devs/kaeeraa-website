import FetchLikes from "@/components/FetchLikes/FetchLikes";
import { Suspense } from "react";

export default function Home() {
    return (
        <>
            <Suspense fallback={
                <div className="flex flex-nowrap gap-2">
                    <div className="w-20 h-9 rounded-md bg-neutral-800 animate-pulse" />
                    <div className="w-9 h-9 rounded-md bg-neutral-800 animate-pulse" />
                </div>
            }>
                <FetchLikes />
            </Suspense>
        </>
    );
}
