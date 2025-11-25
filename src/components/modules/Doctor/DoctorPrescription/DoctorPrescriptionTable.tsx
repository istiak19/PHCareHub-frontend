"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IPrescription } from "@/types/prescription.interface";
import ReusableManagementTable from "@/components/shared/ReusableManagementTable";
import { doctorPrescriptionColumns } from "./doctorPrescriptionColumns";
import { safeFormat } from "@/utility/safeFormat";

interface DoctorPrescriptionsTableProps {
    prescriptions: IPrescription[];
}

export default function DoctorPrescriptionsTable({
    prescriptions = [],
}: DoctorPrescriptionsTableProps) {
    const router = useRouter();
    const [viewingPrescription, setViewingPrescription] =
        useState<IPrescription | null>(null);

    const handleView = (prescription: IPrescription) => {
        setViewingPrescription(prescription);
    };

    const handleClose = () => {
        setViewingPrescription(null);
        router.refresh();
    };

    return (
        <>
            <ReusableManagementTable
                data={prescriptions}
                columns={doctorPrescriptionColumns}
                onView={handleView}
                getRowKey={(prescription) => prescription.id}
                emptyMessage="No prescriptions found"
            />

            {viewingPrescription && (
                <Dialog open={!!viewingPrescription} onOpenChange={handleClose}>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Prescription Details</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6">

                            {/* Patient Information */}
                            <div className="border rounded-lg p-4 bg-muted/50">
                                <h3 className="font-semibold text-lg mb-3">
                                    Patient Information
                                </h3>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Name</p>
                                        <p className="font-medium">
                                            {viewingPrescription.patient?.name || "N/A"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Email</p>
                                        <p className="font-medium">
                                            {viewingPrescription.patient?.email || "N/A"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Contact Number</p>
                                        <p className="font-medium">
                                            {viewingPrescription.patient?.contactNumber ||
                                                "Not provided"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Address</p>
                                        <p className="font-medium">
                                            {viewingPrescription.patient?.address || "Not provided"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Appointment Information */}
                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold text-lg mb-3">
                                    Appointment Information
                                </h3>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Appointment Date</p>
                                        <p className="font-medium">
                                            {safeFormat(
                                                viewingPrescription.appointment?.schedule
                                                    ?.startDateTime,
                                                "PPP"
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Time</p>
                                        <p className="font-medium">
                                            {viewingPrescription.appointment?.schedule
                                                ?.startDateTime &&
                                                viewingPrescription.appointment?.schedule?.endDateTime
                                                ? `${safeFormat(
                                                    viewingPrescription.appointment.schedule
                                                        .startDateTime,
                                                    "p"
                                                )} - ${safeFormat(
                                                    viewingPrescription.appointment.schedule
                                                        .endDateTime,
                                                    "p"
                                                )}`
                                                : "N/A"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Status</p>
                                        <Badge variant="default" className="bg-green-600">
                                            {viewingPrescription.appointment?.status || "N/A"}
                                        </Badge>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Payment</p>
                                        <Badge variant="default">
                                            {viewingPrescription.appointment?.paymentStatus ||
                                                "N/A"}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Prescription Details */}
                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold text-lg mb-3">
                                    Prescription Details
                                </h3>

                                <div className="space-y-4">

                                    <div>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Instructions
                                        </p>
                                        <div className="bg-muted/50 p-4 rounded-md">
                                            <p
                                                className="text-sm whitespace-pre-wrap"
                                                dangerouslySetInnerHTML={{
                                                    __html: viewingPrescription.instructions,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {viewingPrescription.followUpDate && (
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Follow-up Date
                                            </p>
                                            <Badge
                                                variant="outline"
                                                className="border-blue-500 text-blue-700 bg-blue-50"
                                            >
                                                {safeFormat(
                                                    viewingPrescription.followUpDate,
                                                    "PPP"
                                                )}
                                            </Badge>
                                        </div>
                                    )}

                                    <div>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Prescribed On
                                        </p>
                                        <p className="text-sm font-medium">
                                            {safeFormat(viewingPrescription.createdAt, "PPP p")}
                                        </p>
                                    </div>

                                    <div className="text-xs text-muted-foreground italic pt-2 border-t">
                                        Note: Prescriptions are read-only and cannot be edited or
                                        deleted
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t">
                            <Button variant="outline" onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}