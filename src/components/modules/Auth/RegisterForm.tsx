/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerPatient } from "@/services/auth/registerPatient";
import Link from "next/link";
import { useActionState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerPatient, null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const getFieldError = (field: string) =>
        state?.errors?.find((err: any) => err.field === field)?.message ?? null;

    useEffect(() => {
        if (state && !state.success && state.message) toast.error(state.message);
    }, [state]);

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
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input id="name" name="name" type="text" placeholder="John Doe" />
                    {getFieldError("name") && (
                        <FieldDescription className="text-red-500 text-xs mt-1">
                            {getFieldError("name")}
                        </FieldDescription>
                    )}
                </Field>

                {/* Address */}
                <Field>
                    <FieldLabel htmlFor="address">Address</FieldLabel>
                    <Input id="address" name="address" type="text" placeholder="123 Main St" />
                    {getFieldError("address") && (
                        <FieldDescription className="text-red-500 text-xs mt-1">
                            {getFieldError("address")}
                        </FieldDescription>
                    )}
                </Field>

                {/* Email */}
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" name="email" type="email" placeholder="m@example.com" />
                    {getFieldError("email") && (
                        <FieldDescription className="text-red-500 text-xs mt-1">
                            {getFieldError("email")}
                        </FieldDescription>
                    )}
                </Field>

                {/* Password */}
                <Field className="relative">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-40 top-10 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {getFieldError("password") && (
                        <FieldDescription className="text-red-500 text-xs mt-1">
                            {getFieldError("password")}
                        </FieldDescription>
                    )}
                </Field>

                {/* Confirm Password */}
                <Field className="relative md:col-span-2">
                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute left-96 top-10 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {getFieldError("confirmPassword") && (
                        <FieldDescription className="text-red-500 text-xs mt-1">
                            {getFieldError("confirmPassword")}
                        </FieldDescription>
                    )}
                </Field>
            </div>

            {/* Submit Button */}
            <div className="mt-4 flex flex-col items-center">
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3 text-base font-medium rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-all duration-300 cursor-pointer"
                >
                    {isPending ? "Creating Account..." : "Create Account"}
                </Button>

                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </motion.form>
    );
};

export default RegisterForm;