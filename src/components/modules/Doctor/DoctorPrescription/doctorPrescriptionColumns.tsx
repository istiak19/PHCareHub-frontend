"use client";

import { Column } from "@/components/shared/ReusableManagementTable";
import { Badge } from "@/components/ui/badge";
import { IPrescription } from "@/types/prescription.interface";
import { safeFormat } from "@/utility/safeFormat";

export const doctorPrescriptionColumns: Column<IPrescription>[] = [
    {
        header: "Patient",
        accessor: (p) => (
            <div>
                <p className="font-medium">{p.patient?.name || "N/A"}</p>
                <p className="text-sm text-muted-foreground">
                    {p.patient?.email || "N/A"}
                </p>
            </div>
        ),
    },
    {
        header: "Appointment Date",
        accessor: (p) =>
            safeFormat(p.appointment?.schedule?.startDateTime, "PPP"),
    },
    {
        header: "Follow-up Date",
        accessor: (p) =>
            p.followUpDate ? (
                <Badge variant="outline" className="border-blue-500 text-blue-700">
                    {safeFormat(p.followUpDate, "PPP")}
                </Badge>
            ) : (
                <span className="text-muted-foreground text-sm">-</span>
            ),
    },
    {
        header: "Created At",
        accessor: (p) => safeFormat(p.createdAt, "PPP"),
        sortKey: "createdAt",
    },
];