/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";
import { parse } from "cookie";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@/types";
import { getDefaultDashboardRoute, isValidRedirectForRole } from "@/utility/helper";
import { redirect } from "next/navigation";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginUser = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const redirectTo = formData.get('redirect') || null;
        console.log("to-->", redirectTo);
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
        };

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

        const verifiedToken: JwtPayload | string = jwt.verify(accessTokenObject.accessToken, process.env.JWT_SECRET as string);

        if (typeof verifiedToken === "string") {
            throw new Error("Invalid token");
        };

        const userRole: UserRole = verifiedToken.role;
        if (redirectTo) {
            const requestedPath = redirectTo.toString();
            if (isValidRedirectForRole(requestedPath, userRole)) {
                redirect(requestedPath);
            } else {
                redirect(getDefaultDashboardRoute(userRole));
            };
        };

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error("Login Action Error:", error);
        return { success: false, message: "Something went wrong" };
    }
};