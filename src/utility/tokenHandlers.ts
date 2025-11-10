"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const setCookies = async (key: string, value: string, options: Partial<ResponseCookie>) => {
    const cookiesStore = await cookies();
    cookiesStore.set(key, value, options);
};

export const getCookies = async (key: string): Promise<string | null> => {
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value || null;
};

export const deleteCookie = async (key: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(key);
};