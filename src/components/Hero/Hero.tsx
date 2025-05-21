import FetchLikesWrapper from "@/components/FetchLikesWrapper/FetchLikesWrapper";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";
import Image from "next/image";
import Favicon from "@/../public/favicon.webp";

export default function Hero() {
    return (
        <>
            <div className="p-4 w-full h-fit max-w-224 mx-auto flex gap-2 flex-col md:flex-row">
                <div className="p-2 rounded-md flex flex-col border border-neutral-800 bg-neutral-950 flex-2/5 h-full items-center gap-4">
                    <Image
                        src={Favicon}
                        alt="Kaeeraa's profile picture"
                        className="shrink-0 box-content rounded-full p-0.5 w-16 h-16 [background:linear-gradient(45deg,theme(colors.neutral.900))_padding-box,conic-gradient(from_var(--border-angle),theme(colors.neutral.600/.48)_60%,_theme(colors.neutral.300)_72%,_theme(colors.neutral.100)_80%,_theme(colors.neutral.300)_88%,_theme(colors.neutral.600/.48))_border-box] border-2 border-transparent animate-border"
                    />
                    <p className="text-xl font-bold">
                        Kaeeraa
                    </p>
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