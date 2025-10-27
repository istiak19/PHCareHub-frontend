"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        id: 1,
        name: "Jennifer Martinez",
        title: "Heart Condition",
        feedback:
            "The AI doctor finder helped me find the perfect cardiologist. Dr. Johnson was incredibly professional and caring. I felt confident in my treatment from day one.",
        rating: 5,
        image: "/doctors/doctor-1.jpg",
    },
    {
        id: 2,
        name: "David Thompson",
        title: "Pediatric Care",
        feedback:
            "Dr. Chen has been amazing with my kids. The platform made it so easy to find a pediatrician who was accepting new patients and had great reviews.",
        rating: 5,
        image: "/doctors/doctor-1.jpg",
    },
    {
        id: 3,
        name: "Maria Garcia",
        title: "Skin Treatment",
        feedback:
            "I struggled with skin issues for years. Thanks to phCareHub, I found Dr. Rodriguez who completely transformed my skin health. Highly recommend!",
        rating: 5,
        image: "/doctors/doctor-1.jpg",
    },
];

export default function Testimonials() {
    return (
        <section className="py-10 bg-linear-to-b from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b]">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Patient Testimonials
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-12 text-sm sm:text-base">
                    Read what our patients have to say about their healthcare experience
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: t.id * 0.2 }}
                        >
                            <Card className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300">
                                <CardHeader className="flex flex-col items-start">
                                    <Quote className="text-blue-500 mb-2" size={24} />
                                    <div className="flex items-center mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={`${i < t.rating
                                                        ? "text-yellow-400"
                                                        : "text-gray-300 dark:text-gray-600"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                                        {t.feedback}
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={t.image} alt={t.name} />
                                            <AvatarFallback>{t.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-left">
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {t.name}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {t.title}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};