import { useMutation, useQuery } from "@tanstack/react-query"
import { axiosInstace } from "@/lib/axios"
import { AuthHeader } from "./header"

export const useFetchByIdLapangan = (id) => {
    const lapnganId = id
    return useQuery({
        queryKey: ["fetch.lapangan"],
        
        queryFn: async (id) => {
            return await axiosInstace.get(`/api/v1/lapangan/${lapnganId}`)
        },
    })
}

export const useUpadateLapangan = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async (data) => {
            return await axiosInstace.patch(`/api/v1/lapangan/${data.id}/information`, data, {
                headers: AuthHeader()
            })
        },
        onSuccess
    })
}