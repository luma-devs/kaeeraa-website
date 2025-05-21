import FetchLikesWrapper from "@/components/FetchLikesWrapper/FetchLikesWrapper";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";
import Favicon from "@/../public/favicon.webp";
import { Locale } from "@/i18n-config";
import ConfiguredImage from "@/components/ConfiguredImage/ConfiguredImage";

export default function Hero({
    lang,
}: {
    lang: Locale;
}) {
    return (
        <>
            <ConfiguredImage
                src={Favicon}
                alt="Kaeeraa's profile picture"
                className="transition cursor-pointer shrink-0 box-content rounded-2xl p-0.5 w-16 h-16 [background:linear-gradient(45deg,theme(colors.neutral.900))_padding-box,conic-gradient(from_var(--border-angle),theme(colors.neutral.600/.48)_60%,_theme(colors.neutral.300)_72%,_theme(colors.neutral.100)_80%,_theme(colors.neutral.300)_88%,_theme(colors.neutral.600/.48))_border-box] border-2 border-transparent animate-border hover:grayscale-100"
            />
            <div className="p-4 w-full h-fit max-w-224 mx-auto flex gap-2 flex-col">
                <div className="flex gap-2 flex-col sm:flex-row">
                    <div className="flex-2/3 p-8 rounded-2xl bg-neutral-900 border border-neutral-800">
                        <p className="font-semibold text-lg">
                            Hi! I&#39;m Kaeeraa
                        </p>
                        <p className="text-neutral-400">
                            Problem-solver at heart, passionate about Linux (NixOS) and open-source apps.
                        </p>
                    </div>
                    <div className="flex-1/3 p-8 rounded-2xl bg-neutral-900 border border-neutral-800"></div>
                </div>
                <div></div>
            </div>
        </>
    );
}