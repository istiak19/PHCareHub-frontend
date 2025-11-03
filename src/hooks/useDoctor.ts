import { DoctorInterface } from "@/types/doctor";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Fetch all doctors
export const useGetAllDoctors = () => {
    return useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            const res = await axios.get(`${API_URL}/doctor`, { withCredentials: true });
            return res.data.data;
        },
    });
};

// Fetch single doctor by ID
export const useGetDoctorById = (doctorId: string) => {
    return useQuery<DoctorInterface>({
        queryKey: ["doctor", doctorId],
        queryFn: async () => {
            const res = await axios.get(`${API_URL}/doctor/${doctorId}`, { withCredentials: true });
            return res.data.data;
        },
        enabled: !!doctorId,
    });
};

// Create doctor
export const useCreateDoctor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (doctorData: FormData | Record<string, unknown>) => {
            const res = await axios.post(`${API_URL}/patient/create-doctor`, doctorData, {
                withCredentials: true,
                headers: {
                    "Content-Type": doctorData instanceof FormData ? "multipart/form-data" : "application/json",
                },
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["doctors"] });
        },
    });
};

// Delete doctor
export const useDeleteDoctor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (doctorId: string) => {
            const res = await axios.delete(`${API_URL}/doctor/${doctorId}`, { withCredentials: true });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["doctors"] });
        },
    });
};