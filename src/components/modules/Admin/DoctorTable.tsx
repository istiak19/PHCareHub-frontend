"use client";

import { useGetAllDoctors, useDeleteDoctor } from "@/hooks/useDoctor";
import { toast } from "react-toastify";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, Trash2, Pencil } from "lucide-react";
import { DoctorInterface } from "@/types/doctor";
import Loader from "@/components/shared/Loader";
import { useRouter } from "next/navigation";

const DoctorTable = () => {
    const router = useRouter();
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

    const handleEdit = (id: string) => {
        router.push(`/admin/dashboard/manage-doctors/edit/${id}`);
    };

    if (isLoading) {
        return <Loader />;
    };

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
                            <TableHead className="w-[30%]">Name</TableHead>
                            <TableHead className="w-[30%]">Email</TableHead>
                            <TableHead className="text-center w-[40%]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {doctors?.data?.length ? (
                            doctors.data.map((doc: DoctorInterface) => (
                                <TableRow key={doc.id}>
                                    <TableCell className="font-medium">{doc.name}</TableCell>
                                    <TableCell>{doc.email}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex justify-center gap-2">
                                            {/* Edit Button */}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(doc.id)}
                                                className="flex items-center gap-2"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                Edit
                                            </Button>

                                            {/* Delete Button */}
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
                                        </div>
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