"use server";

import { getCookies } from "@/utility/tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";
import NavbarClient from "./Navbar.Client";

export default async function NavbarServer() {
    const accessToken = await getCookies("accessToken");
    let role: string | null = null;

    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;
            role = decoded?.role ?? null;
        } catch (err) {
            console.error("JWT error:", err);
        }
    }

    return (
        <NavbarClient
            isAuthenticated={!!accessToken}
            role={role}
        />
    );
};