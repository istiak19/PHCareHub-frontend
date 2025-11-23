/* eslint-disable react-hooks/purity */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DoctorCard from "../Consultation/DoctorCard";
import { IDoctor } from "@/types/doctor";

// ✨ Sparkle Component
function Sparkle({ delay }: { delay: number }) {
    const [x, setX] = useState(() => Math.random() * 100);
    const [y, setY] = useState(() => Math.random() * 100);

    useEffect(() => {
        const interval = setInterval(() => {
            setX(Math.random() * 100);
            setY(Math.random() * 100);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="absolute w-2 h-2 bg-blue-400 rounded-full blur-sm opacity-70"
            style={{ top: `${y}%`, left: `${x}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 1, 0],
            }}
            transition={{
                delay,
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

export default function DoctorListClient({ doctors }: { doctors: IDoctor[] }) {
    return (
        <section className="relative py-10 bg-gray-50 dark:bg-[#0f172a] overflow-hidden">
            {/* ✨ Floating Sparkles Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <Sparkle key={i} delay={Math.random() * 5} />
                ))}
            </div>

            <div className="container mx-auto px-6 text-center relative z-10">
                {/* Header */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Top Rated Doctors
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-12">
                    Meet our highly qualified and experienced healthcare professionals
                </p>

                {/* Doctor Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-12">
                    <Link href="#">
                        <Button className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                            View All Doctors
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};