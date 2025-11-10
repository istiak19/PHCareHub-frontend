/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import { loginUser } from "./loginUser";

const registerValidationZodSchema = z
    .object({
        name: z.string().min(1, { message: "Name is required" }),
        address: z.string().optional(),
        email: z.string().email({ message: "Valid email is required" }),
        password: z
            .string()
            .min(6, {
                message: "Password is required and must be at least 6 characters long",
            })
            .max(100, {
                message: "Password must be at most 100 characters long",
            }),
        confirmPassword: z
            .string()
            .min(6, {
                message:
                    "Confirm Password is required and must be at least 6 characters long",
            }),
    })
    .refine((data: any) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const registerPatient = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const validationData = {
            name: formData.get("name"),
            address: formData.get("address"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        };

        // ✅ Validate input
        const validatedFields = registerValidationZodSchema.safeParse(validationData);
        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map((issue) => ({
                    field: issue.path[0],
                    message: issue.message,
                })),
            };
        };

        // ✅ Prepare data for backend
        const registerData = {
            password: formData.get("password"),
            patient: {
                name: formData.get("name"),
                address: formData.get("address"),
                email: formData.get("email"),
            },
        };

        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(registerData));
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patient/create-patient`, {
            method: "POST",
            body: newFormData,
        }
        );

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                errors: [{ field: "general", message: data.message || "Registration failed" }],
            };
        };

        if (data.success) {
            await loginUser(_currentState, formData);
        };

        return data;
    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        };
        console.error("Registration error:", error);
        return { error: "Registration failed" };
    }
};