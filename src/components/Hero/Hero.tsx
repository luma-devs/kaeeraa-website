import FetchLikesWrapper from "@/components/FetchLikesWrapper/FetchLikesWrapper";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";
import Favicon from "@/../public/favicon.webp";
import { Locale } from "@/i18n-config";
import ConfiguredImage from "@/components/ConfiguredImage/ConfiguredImage";
import { AboutMe, ProgrammingLanguages, Socials } from "@/constants/misc";
import Translate from "@/components/Translate/Translate";
import Link from "next/link";

export default function Hero({
    lang,
}: {
    lang: Locale;
}) {
    return (
        <>
            <div className="p-8 w-full h-fit max-w-324 flex flex-wrap gap-4 flex-col lg:flex-row">
                <div className="flex-1 min-h-106 flex flex-col justify-between gap-4 p-8 rounded-3xl lg:rounded-r-lg bg-neutral-950">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap sm:flex-nowrap gap-4">
                            <ConfiguredImage
                                src={Favicon}
                                alt="Kaeeraa's profile picture"
                                className="mx-auto h-24 w-24 object-cover shrink-0 box-content rounded-full p-0.5 [background:linear-gradient(45deg,theme(colors.neutral.900))_padding-box,conic-gradient(from_var(--border-angle),theme(colors.neutral.600/.48)_60%,_theme(colors.neutral.300)_72%,_theme(colors.neutral.100)_80%,_theme(colors.neutral.300)_88%,_theme(colors.neutral.600/.48))_border-box] border-2 border-transparent animate-border transition"
                            />
                            <div className="shrink-0 flex-1 flex flex-col gap-2 justify-center">
                                <p className="font-medium leading-none text-lg">
                                    <Translate property={"components.hero.title"} />
                                </p>
                                <p className="text-neutral-400 leading-none">
                                    <Translate property={"components.hero.description"} />
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
                        <div>
                            <ul>
                                {
                                    AboutMe.map((about) => {
                                        return (
                                            <div key={about} className="flex flex-nowrap items-center gap-4 mt-4">
                                                <p className="leading-none">
                                                    ✦
                                                </p>
                                                <p className="leading-none text-pretty text-neutral-400">
                                                    <Translate property={about} />
                                                </p>
                                            </div>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-end justify-end gap-2">
                        <LocaleSwitcher />
                        <FetchLikesWrapper lang={lang} />
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <div className="p-8 h-full rounded-3xl lg:rounded-br-lg lg:rounded-l-lg bg-neutral-950">
                        <p className="font-medium text-lg">
                            <Translate property={"components.hero.projects.title"} />
                        </p>

                    </div>
                    <div className="p-8 shrink-0 rounded-3xl lg:rounded-tr-lg lg:rounded-l-lg bg-neutral-950 flex flex-col gap-4">
                        <p className="font-medium text-lg">
                            <Translate property={"components.hero.socials.title"} />
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {
                                Socials.map((social) => {
                                    return (
                                        <Link
                                            key={social.name}
                                            className="bg-neutral-800 w-fit px-2 py-1 flex flex-nowrap gap-2 rounded-full items-center transition hover:bg-neutral-700"
                                            target="_blank"
                                            href={social.link}
                                        >
                                            <div className="flex justify-center items-center w-4 h-4">
                                                {social.icon}
                                            </div>
                                            <p>
                                                {social.name}
                                            </p>
                                        </Link>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}