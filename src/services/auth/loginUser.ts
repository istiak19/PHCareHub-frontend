/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";
import { parse } from "cookie";
import { cookies } from "next/headers";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginUser = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        // const redirectTo = formData.get('redirect') || null;
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        const validatedFields = loginSchema.safeParse(data);
        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map((i) => ({
                    field: i.path[0],
                    message: i.message,
                })),
            };
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(validatedFields.data),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        });

        const setCookies = res.headers.getSetCookie();
        if (setCookies && setCookies.length > 0) {
            setCookies.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);
                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                };
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                };
            });
        } else {
            throw new Error("Not cookies");
        };

        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies");
        };

        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies");
        };

        const cookieStore = await cookies();

        cookieStore.set("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['SameSite'] || "none",
        });

        cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || "/",
            sameSite: refreshTokenObject['SameSite'] || "none",
        });

        const result = await res.json();

        if (!res.ok) {
            return { success: false, message: result.message || "Login failed" };
        }

        return result;

    } catch (error) {
        console.error("Login Action Error:", error);
        return { success: false, message: "Something went wrong" };
    }
};