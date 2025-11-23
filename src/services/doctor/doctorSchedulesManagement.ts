"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";
import { normalizeApiResponse } from "@/utility/normalize";

export async function getDoctorOwnSchedules(queryString?: string) {
    try {
        const response = await serverFetch.get(
            `/doctor-schedule/my-schedule${queryString ? `?${queryString}` : ""}`
        );
        const result = await response.json();
        return normalizeApiResponse(result);
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            data: [],
            meta: {},
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}

export async function getAvailableSchedules() {
    try {
        const response = await serverFetch.get(`/schedule`);
        const result = await response.json();
        return normalizeApiResponse(result);
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            data: [],
            meta: {},
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}

export async function createDoctorSchedule(scheduleIds: string[]) {
    try {
        const response = await serverFetch.post(
            `/doctor-schedule/create-doctor-schedule`,
            {
                body: JSON.stringify({ scheduleIds }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const result = await response.json();
        return normalizeApiResponse(result);
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            data: [],
            meta: {},
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}

export async function deleteDoctorOwnSchedule(scheduleId: string) {
    try {
        const response = await serverFetch.delete(
            `/doctor-schedule/${scheduleId}`
        );
        const result = await response.json();

        return {
            success: result.success,
            message: result.message || "Schedule removed successfully",
        };
    } catch (error: any) {
        console.error("Delete schedule error:", error);
        return {
            success: false,
            message: error.message || "Failed to remove schedule",
        };
    }
}