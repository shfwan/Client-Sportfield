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
        queryKey: ["fetch.lapangan"],
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
            return await axiosAuth.post("/api/v2/lapangan", body)
        },
        onSuccess
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