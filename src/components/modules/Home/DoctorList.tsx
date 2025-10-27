"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Calendar } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        rating: 4.9,
        reviews: 324,
        location: "New York, NY",
        experience: 15,
        image: "/doctors/doctor-1.jpg",
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Pediatrician",
        rating: 4.8,
        reviews: 289,
        location: "Los Angeles, CA",
        experience: 12,
        image: "/doctors/doctor-1.jpg",
    },
    {
        id: 3,
        name: "Dr. Emily Rodriguez",
        specialty: "Dermatologist",
        rating: 4.9,
        reviews: 412,
        location: "Chicago, IL",
        experience: 18,
        image: "/doctors/doctor-1.jpg",
    },
    {
        id: 4,
        name: "Dr. James Wilson",
        specialty: "Orthopedic Surgeon",
        rating: 4.7,
        reviews: 256,
        location: "Houston, TX",
        experience: 20,
        image: "/doctors/doctor-1.jpg",
    },
    {
        id: 5,
        name: "Dr. Lisa Patel",
        specialty: "Neurologist",
        rating: 4.9,
        reviews: 378,
        location: "Boston, MA",
        experience: 14,
        image: "/doctors/doctor-1.jpg",
    },
    {
        id: 6,
        name: "Dr. Robert Kim",
        specialty: "General Practitioner",
        rating: 4.8,
        reviews: 445,
        location: "Seattle, WA",
        experience: 16,
        image: "/doctors/doctor-1.jpg",
    },
    {
        id: 7,
        name: "Dr. Robert Kim",
        specialty: "General Practitioner",
        rating: 4.8,
        reviews: 445,
        location: "Seattle, WA",
        experience: 16,
        image: "/doctors/doctor-1.jpg",
    },
    {
        id: 8,
        name: "Dr. Lisa Patel",
        specialty: "Neurologist",
        rating: 4.9,
        reviews: 378,
        location: "Boston, MA",
        experience: 14,
        image: "/doctors/doctor-1.jpg",
    },
];

export default function DoctorList() {
    return (
        <section className="py-16 bg-gray-50 dark:bg-[#0f172a]">
            <div className="container mx-auto px-6 text-center">
                {/* Header */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Top Rated Doctors
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-12">
                    Meet our highly qualified and experienced healthcare professionals
                </p>

                {/* Doctor Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {doctors.map((doctor) => (
                        <Card
                            key={doctor.id}
                            className="shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 rounded-2xl"
                        >
                            <CardHeader className="flex flex-col items-center text-center">
                                <div className="relative w-24 h-24 mb-4">
                                    <Image
                                        src={doctor.image}
                                        alt={doctor.name}
                                        fill
                                        className="rounded-full border-2 border-blue-500"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {doctor.name}
                                </h3>
                                <p className="text-blue-600 text-sm font-medium">
                                    {doctor.specialty}
                                </p>
                            </CardHeader>

                            <CardContent className="text-center">
                                {/* Ratings */}
                                <div className="flex items-center justify-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={`${i < Math.floor(doctor.rating)
                                                ? "text-yellow-400"
                                                : "text-gray-300 dark:text-gray-600"
                                                }`}
                                        />
                                    ))}
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                        {doctor.rating} ({doctor.reviews} reviews)
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-2">
                                    <MapPin size={14} />
                                    <span>{doctor.location}</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                                    <Calendar size={14} />
                                    <span>{doctor.experience} years experience</span>
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-center mt-4">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl cursor-pointer">
                                    Book Appointment
                                </Button>
                            </CardFooter>
                        </Card>
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