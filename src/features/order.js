import useAxiosAuth from "@/hooks/useAxiosAuth"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useCheckOut = ({ onSuccess }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (id, data) => {
            // return await axiosInstace.post(`/api/v2/order/lapangan/${id.lapanganId}/information/${id.id}/checkout`, data, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // })
        },
        onSuccess
    })
}

export const useFetchOrder = () => {
    const axiosAuth = useAxiosAuth()

    return useQuery({
        queryKey: ["fetch.order"],
        queryFn: async () => {
            return await axiosAuth.get("/api/v2/order")
        }
    })
}