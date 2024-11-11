import axios, { axiosInstace } from "../lib/axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AuthHeader } from "./header"
import useAxiosAuth from "@/hooks/useAxiosAuth"


export const useFetchSearchLapangan = (value) => {
    return useQuery({
        queryKey: ["fetch.lapangan.search"],
        queryFn: async () => {
            return await axiosInstace.get(`/api/v1/lapangan/search?value=${value}`)
        }
    })
}

export const useFetchLapangan = (page, limit, value) => {
    return useQuery({
        queryKey: ["fetch.lapangan", page, value],
        queryFn: async () => {
            return await axios.get(`/api/v1/lapangan?page=${page}&limit=${limit}&value=${value}`)
        },
    })

}

export const usePostLapangan = ({ onSuccess }) => {
    const axiosAuth = useAxiosAuth()

    return useMutation({
        mutationKey: ["post.lapangan"],
        mutationFn: async (body) => {            
            return await axiosAuth.post("/api/v2/lapangan", body, { headers: { "Content-Type": "multipart/form-data" } })
        },
        onSuccess
    })
}

export const useUpdateLapangan = ({ onSuccess }) => {
    const axiosAuth = useAxiosAuth()

    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.patch(`/api/v2/lapangan/${body.id}`, body.data)
        },
        onSuccess
    })
}

export const useDeleteLapangan = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (id) => {
            return await axiosAuth.delete(`/api/v2/lapangan/${id}`)
        },
        onSuccess,
        onError
    })
}