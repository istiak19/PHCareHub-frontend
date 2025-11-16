import DoctorsManagementHeader from "@/components/modules/Admin/DoctorsManagement/DoctorsManagementHeader";
import DoctorsTable from "@/components/modules/Admin/DoctorsManagement/DoctorsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialties } from "@/services/admin/specialtiesManagement";
import { ISpecialty } from "@/types/specialties";
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
        doctor.data.meta.total / doctor.data.meta.limit
    );

    return (
        <div className="space-y-5">
            <DoctorsManagementHeader specialties={specialtiesResult?.data?.data} />
            <div className="flex space-x-2">
                <SearchFilter paramName="searchTerm" placeholder="Search doctors..." />
                <SelectFilter
                    paramName="specialty" // ?specialty="Cardiology"
                    options={specialtiesResult?.data?.data.map((specialty: ISpecialty) => ({
                        label: specialty.title,
                        value: specialty.title,
                    }))}
                    placeholder="Filter by specialty"
                />
                <RefreshButton />
            </div>
            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <DoctorsTable doctors={doctor?.data?.data} specialities={specialtiesResult?.data?.data} />
                <TablePagination
                    currentPage={doctor.data.meta.page}
                    totalPages={totalPages}
                />
            </Suspense>
        </div>
    );
};

export default DoctorManagementPage;