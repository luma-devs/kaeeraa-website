"use client";

import Image, { ImageProps, StaticImageData } from "next/image";
import { useState } from "react";

export default function ConfiguredImage({
    ...properties
}: Partial<ImageProps> & {
    alt: string;
    src: string | StaticImageData;
}) {
    const [opacity, setOpacity] = useState(0);

    return (
        <>
            <Image
                { ...properties }
                style={{
                    opacity,
                    ...properties.style,
                }}
                src={properties.src}
                alt={properties.alt}
                onLoad={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    properties?.onLoad?.(event);
                    setOpacity(1);
                }}
                unoptimized={properties.unoptimized ?? true}
            />
        </>
    );
}