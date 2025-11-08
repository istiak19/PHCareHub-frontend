"use client";

import { motion } from "framer-motion";
import logo from "../../../../public/logo.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/modules/Auth/LoginForm";

const Login = () => {
    return (
        <section className="flex flex-col md:flex-row items-center justify-center bg-gray-50 dark:bg-black">
            {/* Left side image */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden md:flex md:w-1/2 items-center justify-center relative"
            >
                <Image
                    src="/login-illustration.png"
                    alt="Login illustration"
                    width={700}
                    height={700}
                    className="object-contain drop-shadow-2xl"
                    priority
                />
            </motion.div>

            {/* Right side form */}
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 flex justify-center px-6"
            >
                <Card className="w-full max-w-md border-none shadow-xl bg-white dark:bg-black rounded-2xl">
                    <Link href="/" className="flex items-center mb-4 group">
                        <div className="relative w-12 h-12 overflow-hidden group-hover:scale-105 transition-transform duration-200">
                            <Image src={logo} alt="Logo" fill />
                        </div>
                        <span className="text-2xl ml-3 font-bold bg-linear-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                            PHCareHub
                        </span>
                    </Link>

                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold text-blue-600">
                            Welcome Back
                        </CardTitle>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Login to your <span className="font-semibold">PHCareHub</span> account
                        </p>
                    </CardHeader>

                    <CardContent>
                        <LoginForm />
                        {/* Sign up link */}
                        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
                            Don’t have an account?{" "}
                            <Link href="/register" className="text-blue-600 font-medium hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    );
};

export default Login;