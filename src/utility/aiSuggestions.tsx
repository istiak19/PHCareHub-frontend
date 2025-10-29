/* eslint-disable @typescript-eslint/no-explicit-any */
import { AISuggestionPayload } from "@/types";

const aiSuggestions = async (payload: AISuggestionPayload) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor/suggestion`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.message || "Failed to fetch AI suggestions.");
        };

        return data;
    } catch (err: any) {
        console.error("AI Suggestion Error:", err);
        throw new Error(err.message || "An unexpected error occurred while getting AI suggestions.");
    }
};

export default aiSuggestions;