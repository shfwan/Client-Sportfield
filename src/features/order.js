import useAxiosAuth from "@/hooks/useAxiosAuth"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useCheckOut = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.post(`/api/v2/order/lapangan/${body.lapanganId}/information/${body.id}/checkout`, body.data)
        },
        onSuccess,
        onError
    })
}

export const usePembayaran = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationKey: ["post.pembayaran"],
        mutationFn: async (body) => {            
            return axiosAuth.post(`/api/v2/order/lapangan/${body.lapanganId}/information/${body.detailLapanganId}/pembayaran?orderId=${body.id}`)
        },
        onSuccess,
        onError
    })
}

export const usePatchOrder = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationKey: ["update.orderStatus"],
        mutationFn: async (body) => {
            console.log(body);
            
            return axiosAuth.patch(`/api/v2/order/lapangan/${body.lapanganId}/information/${body.detailOrder.detailLapanganId}/pembayaran?orderId=${body.id}`)
        },
        onSuccess,
        onError
    })
}

export const useFetchOrder = (lapanganId, status) => {
    const axiosAuth = useAxiosAuth()
    
    return useQuery({
        queryKey: ["fetch.pemesanan"],
        queryFn: async () => {
            return await axiosAuth.get("/api/v2/order" + (lapanganId != undefined ? "?id=" + lapanganId + "&" : "?") + status)
        }
    })
}

export const useFetchOrders = (id) => {
    const axiosAuth = useAxiosAuth()

    return useQuery({
        queryKey: ["fetch.detailOrder", id],
        queryFn: async () => {
            return await axiosAuth.get(`/api/v2/order/${id}`)
        }
    })
}
