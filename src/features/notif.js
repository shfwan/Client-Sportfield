import useAxiosAuth from "@/hooks/useAxiosAuth"
import { useQuery } from "@tanstack/react-query"

export const useFetchNotification = () => {
    const axiosAuth = useAxiosAuth()
    return useQuery({
        queryKey: ["fetch.notification"],
        queryFn: async () => {
            return await axiosAuth.get("/api/v2/notification")
        }
    })
}