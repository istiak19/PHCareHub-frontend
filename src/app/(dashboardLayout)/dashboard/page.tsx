"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, Users, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
    const stats = [
        { id: 1, title: "Appointments", value: "128", icon: Calendar },
        { id: 2, title: "Active Doctors", value: "42", icon: Stethoscope },
        { id: 3, title: "Patients", value: "2,345", icon: Users },
        { id: 4, title: "System Uptime", value: "99.9%", icon: Activity },
    ];

    return (
        <section className="min-h-screen bg-gray-50 dark:bg-[#0f172a] py-10 px-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    Dashboard Overview
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage and monitor your healthcare platform efficiently.
                </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
                {stats.map(({ id, title, value, icon: Icon }) => (
                    <Card
                        key={id}
                        className="bg-white dark:bg-gray-900 border-none shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl"
                    >
                        <CardHeader className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                {title}
                            </CardTitle>
                            <Icon className="text-blue-600" size={22} />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-blue-600">{value}</p>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>

            {/* Recent Activity / Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
                {/* Recent Appointments */}
                <Card className="bg-white dark:bg-gray-900 border-none shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-blue-600">
                            Recent Appointments
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { name: "John Doe", doctor: "Dr. Smith", date: "Oct 25, 2025" },
                            { name: "Emily Carter", doctor: "Dr. Brown", date: "Oct 26, 2025" },
                            { name: "Michael Lee", doctor: "Dr. Johnson", date: "Oct 27, 2025" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center border-b pb-3 last:border-b-0"
                            >
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        {item.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {item.doctor} — {item.date}
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    View
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* System Announcements */}
                <Card className="bg-white dark:bg-gray-900 border-none shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-blue-600">
                            Announcements
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            {
                                title: "New AI Scheduling System Launched",
                                desc: "Smarter appointment allocation using patient history.",
                            },
                            {
                                title: "Doctor Portal Update",
                                desc: "New dashboard analytics are live for doctor accounts.",
                            },
                            {
                                title: "System Maintenance",
                                desc: "Scheduled maintenance on Oct 30 from 1 AM to 3 AM.",
                            },
                        ].map((a, i) => (
                            <div key={i}>
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                                    {a.title}
                                </h4>
                                <p className="text-gray-500 text-sm">{a.desc}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    );
};