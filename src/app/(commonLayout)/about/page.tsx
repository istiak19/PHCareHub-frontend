/* eslint-disable react-hooks/purity */
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const About = () => {
    const [sparkles, setSparkles] = useState<{ x: number; y: number }[]>([]);

    useEffect(() => {
        const count = 20;
        const positions = Array.from({ length: count }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
        }));
        setSparkles(positions);
    }, []);

    return (
        <section className="bg-gray-50 dark:bg-[#0f172a] overflow-hidden py-10">
            {/* 🌟 Floating Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
                {sparkles.map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-blue-400 blur-sm opacity-70"
                        initial={{ x: pos.x, y: pos.y, scale: 0, opacity: 0 }}
                        animate={{
                            x: pos.x + (Math.random() - 0.5) * 100,
                            y: pos.y + (Math.random() - 0.5) * 100,
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-full shadow-sm mb-4">
                        <Sparkles className="text-blue-600 size-4" />
                        <span className="text-sm font-medium text-blue-600">
                            About CareHub
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Transforming Healthcare with AI
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        At <span className="font-semibold text-blue-600">CareHub</span>, our
                        mission is to make healthcare smarter, faster, and more accessible
                        for everyone. We use AI to connect patients with the most suitable
                        doctors and provide intelligent recommendations — all within
                        seconds.
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative flex justify-center"
                    >
                        <Image
                            src="/healthcare-team.jpg"
                            alt="Our healthcare team"
                            width={550}
                            height={400}
                            className="rounded-2xl shadow-lg object-cover"
                        />
                    </motion.div>

                    {/* Text & Features */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        {[
                            {
                                title: "Our Vision",
                                desc: "We aim to create a connected healthcare ecosystem powered by data and intelligence — where finding the right doctor is as easy as asking your AI assistant.",
                            },
                            {
                                title: "Our Technology",
                                desc: "Our advanced algorithms analyze symptoms, health records, and doctor expertise to recommend the best care for every patient, instantly.",
                            },
                            {
                                title: "Our Promise",
                                desc: "We are committed to delivering trust, accuracy, and transparency in every healthcare interaction.",
                            },
                        ].map((item, idx) => (
                            <Card
                                key={idx}
                                className="border-none shadow-md dark:bg-gray-900 bg-white rounded-xl"
                            >
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold text-blue-600 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mt-20"
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Join Us in Revolutionizing Healthcare
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                        Be part of a movement that’s changing how people access medical
                        care. Discover, connect, and heal smarter with CareHub.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl">
                        Contact Our Team
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default About;