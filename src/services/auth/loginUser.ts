/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";
import { parse } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@/types";
import { getDefaultDashboardRoute, isValidRedirectForRole } from "@/utility/helper";
import { redirect } from "next/navigation";
import { setCookies } from "@/utility/tokenHandlers";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginUser = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const redirectTo = formData.get("redirect") || null;
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        // Validate fields
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

        // Call API
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(validatedFields.data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { success: false, message: errorData.message || "Login failed" };
        };

        // Get cookies from response
        const setCookieHeaders = res.headers.getSetCookie();
        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);
                if (parsedCookie["accessToken"]) accessTokenObject = parsedCookie;
                if (parsedCookie["refreshToken"]) refreshTokenObject = parsedCookie;
            });
        };

        if (!accessTokenObject || !refreshTokenObject) {
            throw new Error("Tokens not found in cookies");
        };

        // Set cookies for frontend
        await setCookies("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject["Max-Age"]) || 60 * 60,
            path: "/",
            sameSite: "lax",
        });

        await setCookies("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject["Max-Age"]) || 60 * 60 * 24 * 90,
            path: "/",
            sameSite: "lax",
        });

        // Verify access token to get role
        const verifiedToken: JwtPayload | string = jwt.verify(
            accessTokenObject.accessToken,
            process.env.JWT_SECRET as string
        );

        if (typeof verifiedToken === "string") throw new Error("Invalid token");

        const userRole: UserRole = verifiedToken.role;

        // Determine final redirect
        if (redirectTo) {
            const requestedPath = redirectTo.toString();
            if (isValidRedirectForRole(requestedPath, userRole)) {
                redirect(`${requestedPath}?loggedIn=true`);
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
            };
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        };

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        };
        console.error("Login Action Error:", error);
        return { success: false, message: "Something went wrong" };
    };
};