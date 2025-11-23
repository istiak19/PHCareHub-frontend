"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { ModeToggle } from "../ui/modeToggle";
import Image from "next/image";
import logo from "../../../public/logo.png";
import LogoutButton from "./LogoutButton";

interface NavbarClientProps {
  isAuthenticated: boolean;
  role: string | null;
}

export default function NavbarClient({ isAuthenticated, role }: NavbarClientProps) {
  const pathname = usePathname();

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/consultation", label: "Consultation" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ];

  const dashboardLink =
    role === "ADMIN"
      ? { href: "/admin/dashboard", label: "Admin Dashboard" }
      : role === "DOCTOR"
        ? { href: "/doctor/dashboard", label: "Doctor Dashboard" }
        : role === "PATIENT"
          ? { href: "/dashboard", label: "Patient Dashboard" }
          : null;

  const navLinks = dashboardLink ? [...navigationLinks, dashboardLink] : navigationLinks;

  return (
    <header className="border-b px-4 md:px-6 sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center group">
            <Image src={logo} alt="Logo" width={40} height={40} />
            <span className="text-xl ml-2 font-bold bg-linear-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              PHCareHub
            </span>
          </Link>

          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-4">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className={`py-1.5 px-3 rounded-md transition-colors ${pathname === link.href
                        ? "text-blue-600 bg-blue-50 dark:bg-blue-950/30 font-semibold"
                        : "text-muted-foreground hover:text-blue-600"
                        }`}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {isAuthenticated ? (
            <LogoutButton />
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};