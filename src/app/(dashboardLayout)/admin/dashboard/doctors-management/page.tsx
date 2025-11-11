import DoctorTable from "@/components/modules/Admin/DoctorTable";

const ManageDoctors = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Manage Doctors</h1>
            <DoctorTable />
        </div>
    );
};

export default ManageDoctors;