import FetchLikes from "@/components/FetchLikes/FetchLikes";
import { Suspense } from "react";

export default function Home() {
    return (
        <>
            <Suspense fallback={
                <>Loading...</>
            }>
                <FetchLikes />
            </Suspense>
        </>
    );
}
