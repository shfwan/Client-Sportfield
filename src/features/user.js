import { useMutation, useQuery } from "@tanstack/react-query"
import { axiosInstace } from "@/lib/axios"
import useAxiosAuth from "@/hooks/useAxiosAuth"

export const useFetchUser = ({ onError }) => {

    return useQuery({
        queryFn: async () => {
            return await axiosInstace.get("/api/v2/user")
        },
        queryKey: ["fetch.user"],
        onError
    })
}

export const useFetchByIdUser = (id) => {
    const axiosAuth = useAxiosAuth()
    return useQuery({
        queryKey: ["fetch.user",id],
        queryFn: async () => {
            return await axiosAuth.get(`/api/v2/user/information?id=${id}`)
        },
        // onError
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