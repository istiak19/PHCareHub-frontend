/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import loginUser from "@/utility/login";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// ✅ Zod schema for validation
const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
    remember: z.boolean().optional(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema) });

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { remember, ...loginData } = data;
            console.log(loginData)
            const res = await loginUser(loginData);
            // Optional: Add a short delay for UX (you can keep it or remove it)
            await new Promise((resolve) => setTimeout(resolve, 1500));
            if (res?.success) {
                toast.success(`Welcome back, ${loginData.email.split("@")[0]}!`);
                router.push("/dashboard")
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.message || "Something went wrong");
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            {/* Email */}
            <div>
                <Label htmlFor="email" className="text-gray-800 dark:text-gray-200">
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className={`mt-1 border ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                        }`}
                />
                {errors.email && (
                    <motion.p
                        className="text-red-500 text-sm mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {errors.email.message}
                    </motion.p>
                )}
            </div>

            {/* Password */}
            <div className="relative">
                <Label htmlFor="password" className="text-gray-800 dark:text-gray-200">
                    Password
                </Label>
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className={`mt-1 pr-10 border ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                        }`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-7 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.password && (
                    <motion.p
                        className="text-red-500 text-sm mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {errors.password.message}
                    </motion.p>
                )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        {...register("remember")}
                        className="rounded border-gray-300"
                    />
                    <span className="text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <Link
                    href="/forgot-password"
                    className="text-blue-600 hover:underline font-medium"
                >
                    Forgot password?
                </Link>
            </div>

            {/* Submit */}
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl font-semibold transition-all duration-300 cursor-pointer"
            >
                {isSubmitting ? "Logging in..." : "Login"}
                {!isSubmitting && <LogIn size={18} className="ml-2" />}
            </Button>
        </motion.form>
    );
};

export default LoginForm;