import { useMutation, useQuery } from "@tanstack/react-query"
import { axiosInstace } from "@/lib/axios"

export const useFetchUser = ({ onError }) => {

    return useQuery({
        queryFn: async () => {
            return await axiosInstace.get("/api/v1/user")
        },
        queryKey: ["fetch.user"],
        onError
    })
}

export const useFetchByIdUser = ({ onError }) => {

    return useQuery({
        queryFn: async () => {
            return await axiosInstace.get("/api/v2/user/information", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        queryKey: ["fetch.user"],
        onError
    })
}

export const useUpdateUser = ({ onSuccess }) => {

    return useMutation({
        mutationFn: async (data) => {
            return await axiosInstace.patch(`/api/v2/user`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess
    })
}

export const useDeleteUser = ({ onSuccess }) => {

    return useMutation({
        mutationFn: async (id) => {
            return await axiosInstace.delete(`/api/v1/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess
    })
}