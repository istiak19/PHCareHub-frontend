import SpecialtiesTable from "@/components/modules/Admin/SpecialtiesManagement/SpecialitiesTable";
import SpecialtiesManagementHeader from "@/components/modules/Admin/SpecialtiesManagement/SpecialtiesManagementHeader";
import RefreshButton from "@/components/shared/RefreshButton";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getSpecialties } from "@/services/admin/specialtiesManagement";
import { Suspense } from "react";

const SpecialtiesManagementPage = async () => {
    const specialties = await getSpecialties();

    return (
        <div className="space-y-5">
            <SpecialtiesManagementHeader />
            <div className="flex">
                <RefreshButton />
            </div>
            <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
                <SpecialtiesTable specialties={specialties?.data?.data} />
            </Suspense>
        </div>
    );
};

export default SpecialtiesManagementPage;