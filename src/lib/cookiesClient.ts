import { setCookie } from "cookies-next/client";

export function setCookieClientSide({
    key,
    value,
    expiresAt,
    httpOnly,
}: {
    key: string;
    value: string;
    expiresAt: Date;
    httpOnly: boolean;
}): void {
    setCookie(key, value, {
        httpOnly: httpOnly,
        sameSite: "lax",
        secure: true,
        expires: expiresAt,
        path: "/",
    });
}