import FetchLikesWrapper from "@/components/FetchLikesWrapper/FetchLikesWrapper";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";
import Favicon from "@/../public/favicon.webp";
import { Locale } from "@/i18n-config";
import ConfiguredImage from "@/components/ConfiguredImage/ConfiguredImage";
import Link from "next/link";
import {ProgrammingLanguages} from "@/constants/app";

export default function Hero({
    lang,
}: {
    lang: Locale;
}) {
    return (
        <>
            <div className="p-8 w-full h-fit max-w-324 flex flex-wrap gap-4 flex-col lg:flex-row">
                <div className="flex-1 flex gap-4 p-8 rounded-3xl lg:rounded-l-3xl lg:rounded-r-lg bg-neutral-950">
                    <ConfiguredImage
                        src={Favicon}
                        alt="Kaeeraa's profile picture"
                        className="h-24 w-24 object-cover shrink-0 box-content rounded-full p-0.5 [background:linear-gradient(45deg,theme(colors.neutral.900))_padding-box,conic-gradient(from_var(--border-angle),theme(colors.neutral.600/.48)_60%,_theme(colors.neutral.300)_72%,_theme(colors.neutral.100)_80%,_theme(colors.neutral.300)_88%,_theme(colors.neutral.600/.48))_border-box] border-2 border-transparent animate-border"
                    />
                    <div className="flex flex-col gap-2 justify-center">
                        <p className="font-medium leading-none text-lg">
                            Hi! I&#39;m Kaeeraa
                        </p>
                        <p className="text-neutral-400 leading-none">
                            Problem-solver at heart, passionate about Linux (NixOS) and open-source apps.
                        </p>
                        <div className="flex gap-2">
                            {
                                ProgrammingLanguages.map((name) => {
                                    return (
                                        <div
                                            key={name}
                                            className="bg-neutral-900 w-fit px-2 py-1 text-sm rounded-full"
                                        >
                                            {name}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-8 rounded-3xl lg:rounded-r-3xl lg:rounded-l-lg bg-neutral-950">
                    <p className="font-medium text-lg">
                        Hi! I&#39;m Kaeeraa
                    </p>
                    <p className="text-neutral-400">
                        Problem-solver at heart, passionate about Linux (NixOS) and open-source apps.
                    </p>
                </div>
            </div>
        </>
    );
}