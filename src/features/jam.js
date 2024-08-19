import axios, { axiosInstace } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useListJam = (item, date) => {
    console.log(item);    
    return useQuery({
        queryKey: ["fetch.ListJam", item.id],
        queryFn: async () => {
            const res = await axios.get(`/api/v1/lapangan/${item.lapanganId}/information/${item.id}/jam?day=${date}&month=08&year=2024`)
            console.log(res);
            
            return res
        },
    })
}