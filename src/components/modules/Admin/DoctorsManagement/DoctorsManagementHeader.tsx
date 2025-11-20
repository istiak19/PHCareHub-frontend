"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import DoctorFormDialog from "./DoctorFormDialog";
import { ISpecialty } from "@/types/specialties";

interface DoctorsManagementHeaderProps {
    specialties?: ISpecialty[];
};

const DoctorsManagementHeader = ({
    specialties,
}: DoctorsManagementHeaderProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const [dialogKey, setDialogKey] = useState(0);

    const handleOpenDialog = () => {
        setDialogKey((prev) => prev + 1); // Force remount
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <DoctorFormDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
                specialities={specialties}
            />

            <ManagementPageHeader
                title="Doctors Management"
                description="Manage Doctors information and details"
                action={{
                    label: "Add Doctor",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </>
    );
};

export default DoctorsManagementHeader;