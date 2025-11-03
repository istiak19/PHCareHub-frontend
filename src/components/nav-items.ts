"use client";

import { IconFileCheck, type Icon } from "@tabler/icons-react";
import { IconUsers, IconFileDescription } from "@tabler/icons-react";

export interface NavItem {
    title: string;
    url: string;
    icon?: Icon;
    roles?: string[];
}

// Dashboard links per role
export const dashboardMap: Record<
  string,
  { href: string; label: string; icon: Icon }
> = {
  ADMIN: { href: "/admin/dashboard", label: "Admin Dashboard", icon: IconUsers },
  DOCTOR: { href: "/doctor/dashboard", label: "Doctor Dashboard", icon: IconFileDescription },
  PATIENT: { href: "/patient/dashboard", label: "Patient Dashboard", icon: IconFileCheck },
};

// Main navigation items
export const navItems: NavItem[] = [
    // Admin
    { title: "Add Doctor", url: "/admin/dashboard/add-doctor", icon: IconUsers, roles: ["ADMIN"] },
    { title: "Manage Doctors", url: "/admin/dashboard/manage-doctors", icon: IconUsers, roles: ["ADMIN"] },
    { title: "Manage Patients", url: "/admin/dashboard/manage-patients", icon: IconUsers, roles: ["ADMIN"] },

    // Doctor
    { title: "Patient List", url: "/doctor/dashboard/patients", icon: IconFileDescription, roles: ["DOCTOR"] },
    { title: "Appointments", url: "/doctor/dashboard/appointments", icon: IconFileDescription, roles: ["DOCTOR"] },

    // Patient
    { title: "My Records", url: "/patient/dashboard/records", icon: IconFileDescription, roles: ["PATIENT"] },
    { title: "My Appointments", url: "/patient/dashboard/appointments", icon: IconFileDescription, roles: ["PATIENT"] },
];