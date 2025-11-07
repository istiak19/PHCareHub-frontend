"use server";

import { ILogin } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
const loginUser = async (payload: ILogin) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            credentials: "include",
        });

        const data = await res.json();

        return data;
    } catch (err: any) {
        throw new Error(
            err.message || "An error occurred while logging in."
        );
    }
};

export default loginUser;