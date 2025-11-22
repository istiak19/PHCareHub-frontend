/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types";
// import { getCookies } from "@/utility/tokenHandlers";
// import jwt, { JwtPayload } from "jsonwebtoken";

// way-1

// export const getMeUser = async (): Promise<UserInfo | null> => {

//     try {
//         const accessToken = await getCookies("accessToken");

//         if (!accessToken) {
//             return null;
//         }

//         const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

//         if (!verifiedToken) {
//             return null;
//         }

//         const userInfo: UserInfo = {
//             name: verifiedToken.name || "Unknown User",
//             email: verifiedToken.email,
//             role: verifiedToken.role,
//         };

//         return userInfo;
//     } catch (error: any) {
//         console.log(error);
//         return null;
//     }
// };

// way-2

export const getMeUser = async (): Promise<UserInfo | any> => {
    let userInfo: UserInfo | any;
    try {
        const response = await serverFetch.get("/auth/me", {
            cache: "force-cache",
            next: { tags: ["user-info"] }
        });

        const result = await response.json();

        // if (result.success) {
        //     const accessToken = await getCookies("accessToken");

        //     if (!accessToken) {
        //         throw new Error("No access token found");
        //     };

        //     const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

        //     userInfo = {
        //         name: verifiedToken.name || "Unknown User",
        //         email: verifiedToken.email,
        //         role: verifiedToken.role,
        //     }
        // };

        userInfo = {
            name: result.data.admin?.name || result.data.doctor?.name || result.data.patient?.name || result.data.name || "Unknown User",
            ...result.data
        };

        return userInfo;
    } catch (error: any) {
        console.log(error);
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "PATIENT",
        };
    }
}