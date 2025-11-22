import { UserRole } from ".";
import { IAdmin } from "./admin.interface";
import { IDoctor } from "./doctor";
import { IPatient } from "./patient.interface";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    needPasswordChange: boolean;
    status: "ACTIVE" | "BLOCKED" | "DELETED";
    admin?: IAdmin;
    patient?: IPatient;
    doctor?: IDoctor;
    createdAt: string;
    updatedAt: string;
};