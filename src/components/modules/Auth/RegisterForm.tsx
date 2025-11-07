/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerPatient } from "@/services/auth/registerPatient";
import Link from "next/link";
import { useActionState } from "react";
import { motion } from "framer-motion";

const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerPatient, null);

    const getFieldError = (fieldName: string) => {
        if (state && state.errors) {
            const error = state.errors.find((err: any) => err.field === fieldName);
            return error ? error.message : null;
        } else {
            return null;
        };
    };

    return (
        <motion.form
            action={formAction}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <Field>
                    <FieldLabel htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Full Name
                    </FieldLabel>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    />
                    {getFieldError("name") && (
                        <FieldDescription className="text-red-500 text-xs mt-1">
                            {getFieldError("name")}
                        </FieldDescription>
                    )}
                </Field>

                {/* Address */}
                <Field>
                    <FieldLabel htmlFor="address" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Address
                    </FieldLabel>
                    <Input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="123 Main St"
                        className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    />
                    {getFieldError("address") && (
                        <FieldDescription className="text-red-500 text-xs mt-1">
                            {getFieldError("address")}
                        </FieldDescription>
                    )}
                </Field>

                {/* Email */}
                <Field>
                    <FieldLabel htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Email
                    </FieldLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    />
                    {getFieldError("email") && (
                        <FieldDescription className="text-red-500 text-xs mt-1">
                            {getFieldError("email")}
                        </FieldDescription>
                    )}
                </Field>

                {/* Password */}
                <Field>
                    <FieldLabel htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Password
                    </FieldLabel>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    />
                    {getFieldError("password") && (
                        <FieldDescription className="text-red-500 text-xs mt-1">
                            {getFieldError("password")}
                        </FieldDescription>
                    )}
                </Field>

                {/* Confirm Password */}
                <Field className="md:col-span-2">
                    <FieldLabel htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Confirm Password
                    </FieldLabel>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    />
                    {getFieldError("confirmPassword") && (
                        <FieldDescription className="text-red-500 text-xs mt-1">
                            {getFieldError("confirmPassword")}
                        </FieldDescription>
                    )}
                </Field>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex flex-col items-center">
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3 text-base font-medium rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-all duration-300"
                >
                    {isPending ? "Creating Account..." : "Create Account"}
                </Button>

                {/* Sign in Link */}
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </motion.form>
    );
};

export default RegisterForm;