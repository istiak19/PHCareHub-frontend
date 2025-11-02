"use client";

import logo from "../../../public/logo.png";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../ui/modeToggle";
import logoutUser from "@/utility/logout";
import { toast } from "react-toastify";
import { UseUser } from "@/Providers/UserProvider";

// Base navigation links
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, user, setAuth } = UseUser();

  const handLogout = async () => {
    const res = await logoutUser();
    if (res.success) {
      toast.success("Logout successful");
      setAuth({ isAuthenticated: false, user: null });
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      toast.error("Failed to logout");
    }
  };

  const roleDashboardLink = isAuthenticated
    ? user?.role === "ADMIN"
      ? { href: "/admin/dashboard", label: "Admin Dashboard" }
      : user?.role === "DOCTOR"
        ? { href: "/doctor/dashboard", label: "Doctor Dashboard" }
        : user?.role === "PATIENT"
          ? { href: "/patient/dashboard", label: "Patient Dashboard" }
          : null
    : null;

  // Combine base links + dashboard link if exists
  const navLinks = roleDashboardLink
    ? [...navigationLinks, roleDashboardLink]
    : [...navigationLinks];

  return (
    <header className="border-b px-4 md:px-6 sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </svg>
              </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className={`py-1.5 block font-medium transition-colors rounded-md px-2 ${isActive
                              ? "text-blue-600 bg-blue-50 dark:bg-blue-950/30 font-semibold"
                              : "text-muted-foreground hover:text-blue-600"
                              }`}
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center group">
              <div className="relative w-10 h-10 overflow-hidden group-hover:scale-105 transition-transform duration-200">
                <Image src={logo} alt="Logo" fill />
              </div>
              <span className="text-xl ml-2 font-bold bg-linear-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                PHCareHub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-4">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href}
                          className={`py-1.5 px-3 rounded-md transition-colors ${isActive
                            ? "text-blue-600 bg-blue-50 dark:bg-blue-950/30 font-semibold"
                            : "text-muted-foreground hover:text-blue-600"
                            }`}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {isAuthenticated ? (
            <Button
              onClick={handLogout}
              size="sm"
              className="cursor-pointer bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </Button>
          ) : (
            <Button asChild size="sm" className="cursor-pointer">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}