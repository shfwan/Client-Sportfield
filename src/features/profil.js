import { useQuery } from "@tanstack/react-query"
import useAxiosAuth from "@/hooks/useAxiosAuth"

export const useGetProfil = () => {
    const axiosAuth = useAxiosAuth()
    return useQuery({
        queryKey: ["fetch.profil"],
        queryFn: async () => {
            return await axiosAuth.get("/api/v2/user/information")            
        }
    })
}