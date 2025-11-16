import SpecialtiesManagementHeader from "@/components/modules/Admin/SpecialtiesManagement/SpecialtiesManagementHeader";
import RefreshButton from "@/components/shared/RefreshButton";

const SpecialtiesManagementPage = () => {
    return (
        <div className="space-y-5">
            <SpecialtiesManagementHeader />
            <div className="flex">
                <RefreshButton />
            </div>
        </div>
    );
};

export default SpecialtiesManagementPage;