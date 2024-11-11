import { axiosInstace } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useListJam = (item, date) => {
    return useQuery({
        queryKey: ["fetch.ListJam", date, item.id],
        queryFn: async () => {
            return await axiosInstace.get(`/api/v1/lapangan/${item.lapanganId}/information/${item.id}/jam?date=${date}`)
        },
    })
}