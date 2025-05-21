import Hero from "@/components/Hero/Hero";
import { Locale } from "@/i18n-config";

export default async function Home({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;

    return (
        <>
            <Hero lang={lang} />
        </>
    );
}
