/* eslint-disable @typescript-eslint/no-explicit-any */
export function normalizeApiResponse(result: any) {
    return {
        success: result?.success || false,
        data: result?.data?.data || [],
        meta: result?.data?.meta || {},
        message: result?.message || "",
    };
};