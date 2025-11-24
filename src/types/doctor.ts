// export interface DoctorSpeciality {
//     specialitiesId: string;
//     doctorId: string;
//     specialities: {
//         id: string;
//         title: string;
//         icon: string;
//     };
// };

// export interface DoctorSchedule {
//     doctorId: string;
//     scheduleId: string;
//     isBook: boolean;
//     schedule: {
//         id: string;
//         startDateTime: string;
//         endDateTime: string;
//         createdAt: string;
//         updatedAt: string;
//     };
// };

// export interface DoctorReview {
//     rating: number;
//     comment: string;
// };

// export interface IDoctor {
//     id: string;
//     name: string;
//     email: string;
//     password: string;
//     profilePhoto: File | string;
//     contactNumber: string;
//     address: string;
//     registrationNumber: string;
//     experience: number;
//     gender: "MALE" | "FEMALE";
//     appointmentFee: number;
//     qualification: string;
//     currentWorkingPlace: string;
//     designation: string;
//     averageRating: number;
//     isDeleted: boolean;
//     createdAt: string;
//     updatedAt: string;
//     doctorSpecialties: DoctorSpeciality[];
//     doctorSchedules: DoctorSchedule[];
//     Review: DoctorReview[];
// };


export interface IDoctor {
    doctorSchedules: never[];
    id?: string;
    name: string;
    email: string;
    password: string;
    contactNumber: string;
    address?: string;
    registrationNumber: string;
    experience?: number;
    gender: "MALE" | "FEMALE";
    appointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    specialties?: string[];
    profilePhoto?: File | string;
    removeSpecialties?: string[];
    isDeleted?: boolean;
    averageRating?: number;
    createdAt?: string;
    updatedAt?: string;
    doctorSpecialties?: Array<{
        specialitiesId: string;
        specialities?: {
            id: string;
            title: string;
            icon?: string;
        };
    }>;
}