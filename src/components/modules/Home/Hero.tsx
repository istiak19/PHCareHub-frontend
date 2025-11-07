/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Search, Calendar, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { LargeSparkleIcon, SparkleIcon } from "@/assets/icons/SparkleIcon";
import { toast } from "react-toastify";
import { HeroProps } from "@/types";
import aiSuggestions from "@/services/aiSuggestions";

const SPARKLE_COUNT = 20;

export default function Hero({
    badge = { text: "AI-Powered Healthcare" },
    heading = { line1: "Find Your Perfect", line2: "Doctor with AI" },
    description = [
        "Our advanced AI analyzes your symptoms, history, and preferences",
        "to instantly connect you with the most suitable doctors worldwide.",
    ],
    buttons = {
        primary: { text: "Find Your Doctor" },
        secondary: { text: "Book Appointment" },
    },
    stats = [
        { value: "50K+", label: "Patients Served" },
        { value: "1000+", label: "Expert Doctors" },
        { value: "4.9", label: "Patient Rating", icon: <Star className="size-6 fill-yellow-400 stroke-yellow-400" /> },
    ],
    formCard = {
        title: "AI Doctor Finder",
        symptomLabel: "What are your symptoms?",
        symptomPlaceholder: "e.g., headache, fever, cough",
        submitText: "Get AI Recommendations",
        footerText: "✨ Powered by advanced AI algorithms for accurate doctor matching",
    },
}: HeroProps) {
    const [symptoms, setSymptoms] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);

    const sparkles = Array.from({ length: SPARKLE_COUNT }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 2}px`,
        delay: Math.random() * 5,
        color: ["#FACC15", "#22D3EE", "#EC4899", "#34D399"][Math.floor(Math.random() * 4)],
    }));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!symptoms.trim()) {
            toast.error("Please describe your symptoms.");
            return;
        }

        try {
            setLoading(true);
            const payload = { symptoms };
            const data = await aiSuggestions(payload);
            setResult(data.data);
            toast.success("AI analysis complete! Check below.");
        } catch (error: any) {
            toast.error(error.message || "Failed to get AI suggestions.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative w-full overflow-hidden bg-linear-to-br from-blue-50 via-white to-teal-50 dark:from-[#0a0a0f] dark:via-[#0d1117] dark:to-[#0f172a]">
            {/* Sparkles */}
            <div className="absolute inset-0 z-0">
                {sparkles.map((s, idx) => (
                    <span
                        key={idx}
                        className="absolute rounded-full animate-sparkle"
                        style={{
                            top: s.top,
                            left: s.left,
                            width: s.size,
                            height: s.size,
                            backgroundColor: s.color,
                            animationDelay: `${s.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Glowing Orbs */}
            <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-400/30 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-teal-400/30 blur-[120px] rounded-full" />

            <div className="relative max-w-[1200px] mx-auto px-4 py-10 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col space-y-8 z-10"
                    >
                        <div className="inline-flex items-center gap-3 self-start rounded-full bg-blue-100/70 dark:bg-blue-900/30 px-4 py-2 backdrop-blur-sm border border-blue-200/50">
                            <SparkleIcon />
                            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 tracking-wide">{badge.text}</span>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl lg:text-4xl font-bold leading-[1.2] text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500">
                                {heading.line1}
                            </h1>
                            <h1 className="text-3xl lg:text-4xl font-bold leading-[1.2] text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-blue-500">
                                {heading.line2}
                            </h1>
                        </div>

                        <div className="space-y-1 text-[17px] leading-7 text-gray-600 dark:text-gray-300 max-w-md">
                            {description.map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {buttons.primary && (
                                <Button
                                    onClick={buttons.primary.onClick}
                                    className="gap-3 rounded-xl bg-linear-to-r from-blue-600 to-teal-500 px-8 py-6 text-white shadow-lg shadow-blue-500/30 hover:shadow-teal-500/40 transition-all cursor-pointer"
                                >
                                    <Search className="size-5" /> {buttons.primary.text}
                                </Button>
                            )}
                            {buttons.secondary && (
                                <Button
                                    onClick={buttons.secondary.onClick}
                                    variant="outline"
                                    className="gap-3 rounded-xl border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-6 cursor-pointer"
                                >
                                    <Calendar className="size-5" /> {buttons.secondary.text}
                                </Button>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-6">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <p className="text-[28px] font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                        {stat.icon}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center lg:justify-end z-10"
                    >
                        <div className="w-full max-w-[500px] rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 shadow-xl shadow-blue-200/30 dark:shadow-blue-900/30 p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{formCard.title}</h2>
                                <LargeSparkleIcon />
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="symptoms" className="text-sm text-gray-700 dark:text-gray-300">
                                        {formCard.symptomLabel}
                                    </Label>
                                    <Input
                                        id="symptoms"
                                        name="symptoms"
                                        placeholder={formCard.symptomPlaceholder}
                                        value={symptoms}
                                        onChange={(e) => setSymptoms(e.target.value)}
                                        className="h-12 rounded-xl border-gray-300 dark:border-gray-600 bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="h-12 w-full rounded-xl bg-linear-to-r from-blue-600 to-teal-500 hover:from-teal-600 hover:to-blue-600 transition-all shadow-lg shadow-blue-400/30 text-white font-medium text-base cursor-pointer"
                                >
                                    {loading ? <Loader2 className="size-5 animate-spin mr-2" /> : null}
                                    {formCard.submitText}
                                </Button>
                            </form>

                            {result.length > 0 && (
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {result.slice(0, 2).map((doctor: any) => (
                                        <div
                                            key={doctor.id}
                                            className="flex flex-col bg-white/80 dark:bg-slate-900/70 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-4 space-y-2"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{doctor.name}</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.designation}</p>
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                    Specialty:{" "}
                                                    {doctor.doctorSpecialties.map((s: any) => s.specialities.title).join(", ")}
                                                </p>

                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                    Fee: ৳{doctor.appointmentFee}
                                                </p>

                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                    Working at: {doctor.currentWorkingPlace}
                                                </p>
                                            </div>

                                            <Button
                                                className="mt-2 w-full bg-linear-to-r from-blue-600 to-teal-500 text-white hover:from-teal-600 hover:to-blue-600 cursor-pointer"
                                                onClick={() => toast.info(`Book appointment with ${doctor.name}`)}
                                            >
                                                Book Appointment
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                                <p className="text-center text-xs text-gray-600 dark:text-gray-400">{formCard.footerText}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                @keyframes sparkle {
                    0%, 100% {
                        transform: translateY(0) scale(1);
                        opacity: 0.5;
                    }
                    50% {
                        transform: translateY(-20px) scale(1.3);
                        opacity: 1;
                    }
                }
                .animate-sparkle {
                    animation: sparkle 3s infinite ease-in-out;
                }
            `}</style>
        </section>
    );
};