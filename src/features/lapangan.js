import { axiosInstace } from "../lib/axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AuthHeader } from "./header"

export const useFetchLapangan = ({ onError }) => {
    return useQuery({
        queryFn: async () => {
            return await axiosInstace.get("/api/v1/lapangan?page=1&limit=10")
        },
        queryKey: ["fetch.lapangan"],
        onError
    })
    
}
    
export const usePostLapangan = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async () => {
            return await axiosInstace.post("/api/v2/lapangan", data, {
                headers: AuthHeader()
            })
        },
        onSuccess: onSuccess
    })
}

export const useUpdateLapangan = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async (data) => {
            return await axiosInstace.patch(`/api/v1/lapangan/${data.id}`, data, {
                headers: AuthHeader()
            })
        },
        onSuccess: onSuccess
    })
}

export const useDeleteLapangan = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async (id) => {
            return await axiosInstace.delete(`/api/v1/lapangan/${id}`, {
                headers: AuthHeader()
            })
        },
        onSuccess: onSuccess
    })
}