import SchedulesFilter from "@/components/modules/Admin/SchedulesManagement/SchedulesFilter";
import SchedulesManagementHeader from "@/components/modules/Admin/SchedulesManagement/SchedulesManagementHeader";
import SchedulesTable from "@/components/modules/Admin/SchedulesManagement/SchedulesTable";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getSchedules } from "@/services/admin/schedulesManagement";
import { queryStringFormatter } from "@/utility/formatters";
import { Suspense } from "react";

const AdminSchedulesManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    const queryString = queryStringFormatter(searchParamsObj);
    const schedulesResult = await getSchedules(queryString);

    const totalPages = Math.ceil(
        (schedulesResult?.data?.meta?.total || 1) / (schedulesResult?.data?.meta?.limit || 1)
    );

    return (
        <div className="space-y-6">
            <SchedulesManagementHeader />

            {/* Filters */}
            <SchedulesFilter />

            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
                <SchedulesTable schedules={schedulesResult?.data?.data || []} />
                <TablePagination
                    currentPage={schedulesResult?.data?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default AdminSchedulesManagementPage;