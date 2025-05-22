import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import { GithubIcon, SteamIcon, TelegramIcon, DiscordIcon } from "@/components/Icons";

export const ProgrammingLanguages: Array<string> = ["Python", "C++", "Go"];
export const AboutMe: Array<keyof NonNullable<DictionariesType>> = [
    "components.hero.about.work",
    "components.hero.about.code-style",
    "components.hero.about.nixos",
    "components.hero.about.free-time",
];
export const Socials: Array<{
    name: string;
    link: string;
    icon: React.ReactNode;
}> = [
    {
        name: "Github",
        link: "https://github.com/kaeeraa",
        icon: <GithubIcon />,
    },
    {
        name: "Telegram",
        link: "https://t.me/devstdin",
        icon: <TelegramIcon />,
    },
    {
        name: "Steam",
        link: "https://steamcommunity.com/id/kaeeraa_off/",
        icon: <SteamIcon />,
    },
    {
        name: "Discord",
        link: "https://discord.com/users/919249985873252412",
        icon: <DiscordIcon />,
    },
];