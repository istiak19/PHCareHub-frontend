/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
} from "@/components/ui/field";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import checkAuthStatus from "@/utility/auth";
import { UseUser } from "@/Providers/UserProvider";
import { loginUser } from "@/services/auth/loginUser";

const LoginForm = () => {
    const router = useRouter();
    const { setAuth } = UseUser();
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, isPending] = useActionState(loginUser, null);

    // ✅ Handle login result
    useEffect(() => {
        if (state?.success) {
            toast.success("Login successful!");

            (async () => {
                const authStatus = await checkAuthStatus();
                setAuth(authStatus);

                if (authStatus.isAuthenticated && authStatus.user) {
                    const { role } = authStatus.user;
                    switch (role) {
                        case "ADMIN":
                            router.push("/admin/dashboard");
                            break;
                        case "DOCTOR":
                            router.push("/doctor/dashboard");
                            break;
                        case "PATIENT":
                            router.push("/patient/dashboard");
                            break;
                        default:
                            router.push("/");
                    }
                }
            })();
        } else if (state?.message && !state.success) {
            toast.error(state.message);
        }
    }, [state, router, setAuth]);

    // ✅ Error helper
    const getError = (fieldName: string) => {
        if (state && state.errors) {
            const error = state.errors.find((err: any) => err.field === fieldName);
            return error ? error.message : null;
        } else {
            return null;
        };
    }

    return (
        <motion.form
            action={formAction}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto w-full p-8"
        >
            <FieldGroup className="space-y-3">
                {/* Email */}
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className="mt-1"
                    />
                    {getError("email") && (
                        <FieldDescription className="text-red-600">
                            {getError("email")}
                        </FieldDescription>
                    )}
                </Field>

                {/* Password */}
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pr-10 mt-1"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {getError("password") && (
                        <FieldDescription className="text-red-600">
                            {getError("password")}
                        </FieldDescription>
                    )}
                </Field>

                {/* Submit */}
                <Field className="pt-2">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl font-semibold transition-all duration-300 cursor-pointer"
                    >
                        {isPending ? "Logging in..." : "Login"}
                    </Button>
                </Field>
            </FieldGroup>
        </motion.form>
    );
};

export default LoginForm;