/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";

export const safeFormat = (date: any, formatStr = "PPP") => {
    if (!date) return "N/A";

    const d = new Date(date);
    if (isNaN(d.getTime())) return "N/A";

    return format(d, formatStr);
};