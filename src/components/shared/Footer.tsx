"use client";

import Link from "next/link";
import logo from "../../../public/logo.png"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#0f172a] text-gray-300 py-12 px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Brand Info */}
                <div>
                    <div className="flex items-center group">
                        <div className="relative w-10 h-10 overflow-hidden group-hover:scale-105 transition-transform duration-200">
                            <Image src={logo} alt="Logo" fill />
                        </div>
                        <span className="text-xl ml-2 font-bold text-primary group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                            PHCareHub
                        </span>
                    </div>
                    <p className="text-sm mb-4 leading-relaxed">
                        Your trusted AI-powered healthcare platform connecting patients with the best doctors.
                    </p>
                    <div className="flex space-x-4">
                        <Link href="#" aria-label="Facebook" className="hover:text-blue-400 transition-colors">
                            <Facebook size={18} />
                        </Link>
                        <Link href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
                            <Twitter size={18} />
                        </Link>
                        <Link href="#" aria-label="Instagram" className="hover:text-blue-400 transition-colors">
                            <Instagram size={18} />
                        </Link>
                        <Link href="#" aria-label="LinkedIn" className="hover:text-blue-400 transition-colors">
                            <Linkedin size={18} />
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Find Doctors</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Specialties</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">How It Works</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                    </ul>
                </div>

                {/* For Doctors */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">For Doctors</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Join Our Network</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Doctor Login</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Resources</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Success Stories</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Support</Link></li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                            <Phone size={16} className="text-blue-400 mt-1" />
                            <div>
                                <p>+880 1700-123456</p>
                                <p className="text-gray-400">Sun–Thu 9am–6pm BST</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-2">
                            <Mail size={16} className="text-blue-400 mt-1" />
                            <div>
                                <p>support@phcarehub.com</p>
                                <p className="text-gray-400">24/7 Email Support</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-2">
                            <MapPin size={16} className="text-blue-400 mt-1" />
                            <div>
                                <p>House #23, Road #7, Sector #4</p>
                                <p className="text-gray-400">Uttara, Dhaka-1230, Bangladesh</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>© {new Date().getFullYear()} PHCareHub. All rights reserved.</p>
                <div className="flex space-x-4 mt-3 md:mt-0">
                    <Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
                    <Link href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    );
};