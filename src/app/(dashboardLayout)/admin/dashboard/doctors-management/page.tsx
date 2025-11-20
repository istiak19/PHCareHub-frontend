import DoctorFilters from "@/components/modules/Admin/DoctorsManagement/DoctorFilters";
import DoctorsManagementHeader from "@/components/modules/Admin/DoctorsManagement/DoctorsManagementHeader";
import DoctorsTable from "@/components/modules/Admin/DoctorsManagement/DoctorsTable";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialties } from "@/services/admin/specialtiesManagement";
import { queryStringFormatter } from "@/utility/formatters";
import { Suspense } from "react";

const DoctorManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj); // {searchTerm: "John", speciality: "Cardiology" => "?searchTerm=John&speciality=Cardiology"}
    const specialtiesResult = await getSpecialties();
    const doctor = await getDoctors(queryString);

    const totalPages = Math.ceil(
        doctor?.data?.meta?.total / doctor?.data?.meta?.limit
    );

    return (
        <div className="space-y-5">
            <DoctorsManagementHeader specialties={specialtiesResult?.data?.data || []} />
            <DoctorFilters specialties={specialtiesResult?.data?.data} />
            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <DoctorsTable doctors={doctor?.data?.data} specialities={specialtiesResult?.data?.data || []} />
                <TablePagination
                    currentPage={doctor?.data?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default DoctorManagementPage;