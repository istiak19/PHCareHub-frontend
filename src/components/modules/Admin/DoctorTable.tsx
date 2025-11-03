"use client";

import { useGetAllDoctors, useDeleteDoctor } from "@/hooks/useDoctor";
import { toast } from "react-toastify";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, Trash2 } from "lucide-react";
import { DoctorInterface } from "@/types/doctor";

const DoctorTable = () => {
    const { data: doctors, isLoading } = useGetAllDoctors();
    const { mutate: deleteDoctor, isPending } = useDeleteDoctor();

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this doctor?")) {
            deleteDoctor(id, {
                onSuccess: () => toast.success("✅ Doctor deleted successfully!"),
                onError: () => toast.error("❌ Failed to delete doctor."),
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-primary w-6 h-6 mr-2" />
                <p className="text-gray-500">Loading doctors...</p>
            </div>
        );
    }

    return (
        <Card className="m-6 shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">Doctors List</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>All registered doctors in the system.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40%]">Name</TableHead>
                            <TableHead className="w-[40%]">Email</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {doctors.data?.length ? (
                            doctors.data.map((doc: DoctorInterface) => (
                                <TableRow key={doc.id}>
                                    <TableCell className="font-medium">{doc.name}</TableCell>
                                    <TableCell>{doc.email}</TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(doc.id)}
                                            disabled={isPending}
                                            className="flex items-center gap-2"
                                        >
                                            {isPending ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                <>
                                                    <Trash2 className="h-4 w-4" />
                                                    Delete
                                                </>
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-gray-500">
                                    No doctors found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default DoctorTable;