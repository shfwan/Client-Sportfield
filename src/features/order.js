import useAxiosAuth from "@/hooks/useAxiosAuth"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useCheckOut = ({ onSuccess }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.post(`/api/v2/order/lapangan/${body.lapanganId}/information/${body.id}/checkout`, body)
        },
        onSuccess
    })
}

export const useFetchOrder = () => {
    const axiosAuth = useAxiosAuth()

    return useQuery({
        queryKey: ["fetch.pemesanan"],
        queryFn: async () => {
            return await axiosAuth.get("/api/v2/order")
        }
    })
}