"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodValidator } from "@/lib/zodValidator";
import { getCookies } from "@/utility/tokenHandlers";
import jwt from "jsonwebtoken";
import { getMeUser } from "../user/getMeUser";
import { UserRole } from "@/types";
import { serverFetch } from "@/lib/server-fetch";
import { getDefaultDashboardRoute, isValidRedirectForRole } from "@/utility/helper";
import { resetPasswordSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

// Reset Password
export async function resetPassword(_prevState: any, formData: FormData) {

    const redirectTo = formData.get('redirect') || null;

    // Build validation payload
    const validationPayload = {
        newPassword: formData.get("newPassword") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validate
    const validatedPayload = zodValidator(validationPayload, resetPasswordSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    try {
        const accessToken = await getCookies("accessToken");

        if (!accessToken) {
            throw new Error("User not authenticated");
        }

        const verifiedToken = jwt.verify(accessToken as string, process.env.JWT_SECRET!) as jwt.JwtPayload;

        const userRole: UserRole = verifiedToken.role;

        const user = await getMeUser();
        // API Call
        const response = await serverFetch.post("/auth/reset-password", {
            body: JSON.stringify({
                id: user?.id,
                password: validationPayload.newPassword,
            }),
            headers: {
                "Authorization": accessToken,
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Reset password failed");
        }

        if (result.success) {
            // await get
            revalidateTag("user-info", { expire: 0 });
        }

        if (redirectTo) {
            const requestedPath = redirectTo.toString();
            if (isValidRedirectForRole(requestedPath, userRole)) {
                redirect(`${requestedPath}?loggedIn=true`);
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
            }
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        }

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Something went wrong",
            formData: validationPayload,
        };
    }
}