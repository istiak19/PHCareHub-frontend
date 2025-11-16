import { Column } from "@/components/shared/ReusableManagementTable";
import { ISpecialty } from "@/types/specialties";
import Image from "next/image";

export const SpecialtiesColumns: Column<ISpecialty>[] = [
  {
    header: "Icon",
    accessor: (specialty) => (
      <Image
        src={specialty.icon}
        alt={specialty.title}
        width={40}
        height={40}
        className="rounded-full"
      />
    ),
  },
  {
    header: "Title",
    accessor: (specialty) => specialty.title,
  },
];