import { useMutation, useQuery } from "@tanstack/react-query"
import { axiosInstace } from "@/lib/axios"
import { AuthHeader } from "./header"
import useAxiosAuth from "@/hooks/useAxiosAuth"

export const useFetchByIdLapangan = (id) => {
    
    return useQuery({
        queryKey: ["fetch.detailLapangan"],

        queryFn: async () => {
            return await axiosInstace.get(`/api/v1/lapangan/${id}`)
        },
    })
}

export const useFetchLapanganTersedia = (id) => {
    
    return useQuery({
        queryKey: ["fetch.ListLapanganTersedia"],
        queryFn: async () => {
            return await axiosInstace.get(`/api/v1/lapangan/${id}/list`)
        },
    })
}

export const useFetchLapanganTersediaById = (body) => {
    return useQuery({
        queryKey: ["fetch.detailLapangan", body.id],
        queryFn: async () => {
            return axiosInstace.get(`/api/v1/lapangan/${body.lapanganId}/information?id=${body.detailOrder.detailsLapanganId}`)
        }
    })
}

export const usePostLapanganTersedia = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()

    return useMutation({
        mutationKey: ["post.lapanganTersedia"],
        mutationFn: async (body) => {            
            return await axiosAuth.post(`/api/v2/lapangan/${body.id}`, body, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        },
        onSuccess,
        onError
    })
}

export const useUpdateLapanganTersedia = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()

    return useMutation({
        mutationKey: ["update.lapangan"],
        mutationFn: async (body) => {
            return await axiosAuth.patch(`/api/v2/lapangan/${body.lapanganId}/information/${body.id}`, body.data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        },
        onSuccess,
        onError
    })
}

export const useDeleteLapanganTersedia = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    
    return useMutation({
        mutationKey: ["delete.lapanganTersedia"],
        mutationFn: async (body) => {
            return await axiosAuth.delete(`/api/v2/lapangan/${body.lapanganId}/information/${body.id}`)
        },
        onSuccess,
        onError
    })
}

export const useDeleteAllLapanganTersedia = ({ onSuccess }) => {
    const axiosAuth = useAxiosAuth()
    
    return useMutation({
        mutationKey: ["reset.lapanganTersedia"],
        mutationFn: async (body) => {
            return await axiosAuth.delete(`/api/v2/lapangan/${body.id}/information/reset`)
        },
        onSuccess
    })
}