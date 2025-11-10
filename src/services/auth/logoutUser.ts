"use server";

import { deleteCookie } from "@/utility/tokenHandlers";
import { redirect } from "next/navigation";

export const logoutUser = async () => {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");

    redirect("/login?loggedOut=true");
};