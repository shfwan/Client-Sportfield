import { useMutation, useQuery } from "@tanstack/react-query"
import { axiosInstace } from "@/lib/axios"
import { AuthHeader } from "./header"
import useAxiosAuth from "@/hooks/useAxiosAuth"

export const useFetchByIdLapangan = (id) => {
    const lapnganId = id
    return useQuery({
        queryKey: ["fetch.lapangan"],

        queryFn: async (id) => {
            return await axiosInstace.get(`/api/v1/lapangan/${lapnganId}`)
        },
    })
}

export const useFetchLapanganTersedia = (id) => {
    
    return useQuery({
        queryKey: ["fetch.lapanganTersedia"],
        queryFn: async () => {
            return await axiosInstace.get(`/api/v1/lapangan/${id}/list`)
        },
    })
}

export const usePostLapanganTersedia = ({ onSuccess }) => {
    const axiosAuth = useAxiosAuth()

    return useMutation({
        mutationKey: ["post.lapanganTersedia"],
        mutationFn: async (body) => {            
            return await axiosAuth.post(`/api/v2/lapangan/${body.id}`, body)
        },
        onSuccess,
        
    })
}

export const useUpdateLapanganTersedia = ({ onSuccess }) => {
    const axiosAuth = useAxiosAuth()

    return useMutation({
        mutationKey: ["update.lapangan"],
        mutationFn: async (body) => {
            return await axiosAuth.patch(`/api/v2/lapangan/${body.id}/information`, body)
        },
        onSuccess
    })
}

export const useDeleteLapanganTersedia = ({ onSuccess }) => {
    const axiosAuth = useAxiosAuth()
    
    return useMutation({
        mutationKey: ["delete.lapanganTersedia"],
        mutationFn: async (id) => {            
            return await axiosAuth.delete(`/api/v2/lapangan/${id}/information`)
        },
        onSuccess
    })
}