/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginUser = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
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