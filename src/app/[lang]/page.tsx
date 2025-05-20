import FetchLikesWrapper from "@/components/FetchLikesWrapper/FetchLikesWrapper";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";

export default function Home() {
    return (
        <>
            <FetchLikesWrapper />
            <LocaleSwitcher />
        </>
    );
}
