import FetchLikesWrapper from "@/components/FetchLikesWrapper/FetchLikesWrapper";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";

export default function Hero() {
    return (
        <>
            <div className="p-4 w-full h-fit max-w-224 mx-auto flex gap-2 flex-col md:flex-row">
                <div className="p-2 rounded-md flex flex-col border border-neutral-800 bg-neutral-950 flex-2/5 h-full">
                    asd
                </div>
                <div className="p-2 rounded-md flex flex-col flex-3/5 border border-neutral-800 bg-neutral-950 h-full">
                    <div className="flex">
                        <div>
                            <FetchLikesWrapper />
                            <LocaleSwitcher />
                        </div>
                        <div></div>
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    );
}