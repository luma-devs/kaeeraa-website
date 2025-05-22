import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import { GithubIcon, SteamIcon, TelegramIcon, DiscordIcon } from "@/components/Icons";
import { StaticImageData } from "next/image";
import Matter from "@/../public/matter.webp";
import Ndfined from "@/../public/ndfined.webp";
import FreesmLauncher from "@/../public/freesmlauncher.webp";

export const ProgrammingLanguages: Array<string> = ["Python", "C++", "Go"];
export const AboutMe: Array<keyof NonNullable<DictionariesType>> = [
    "components.hero.about.work",
    "components.hero.about.code-style",
    "components.hero.about.nixos",
    "components.hero.about.free-time",
];
export const Projects: Array<{
    name: keyof NonNullable<DictionariesType>;
    description: keyof NonNullable<DictionariesType>;
    link: string;
    image: StaticImageData;
}> = [
    {
        name: "components.hero.projects.ayu-gram.title",
        description: "components.hero.projects.ayu-gram.description",
        link: "https://github.com/ndfined-crp/ayugram-desktop",
        image: Ndfined,
    },
    {
        name: "components.hero.projects.matter.title",
        description: "components.hero.projects.matter.description",
        link: "https://github.com/kaeeraa/Matter",
        image: Matter,
    },
    {
        name: "components.hero.projects.freesm-launcher.title",
        description: "components.hero.projects.freesm-launcher.description",
        link: "https://github.com/FreesmTeam/FreesmLauncher",
        image: FreesmLauncher,
    },
];
export const Socials: Array<{
    name: keyof NonNullable<DictionariesType>;
    link: string;
    icon: React.ReactNode;
}> = [
    {
        name: "components.hero.socials.github",
        link: "https://github.com/kaeeraa",
        icon: <GithubIcon />,
    },
    {
        name: "components.hero.socials.telegram",
        link: "https://t.me/stdflush",
        icon: <TelegramIcon />,
    },
    {
        name: "components.hero.socials.steam",
        link: "https://steamcommunity.com/id/kaeeraa_off/",
        icon: <SteamIcon />,
    },
    {
        name: "components.hero.socials.discord",
        link: "https://discord.com/users/919249985873252412",
        icon: <DiscordIcon />,
    },
];