const { default: useAxiosAuth } = require("@/hooks/useAxiosAuth")
const { axiosInstace } = require("@/lib/axios")
const { useMutation, useQuery } = require("@tanstack/react-query")

const usePostGallery = () => {
    const axiosAuth = useAxiosAuth()

    return useMutation({
        mutationKey: ["post.gallery"],
        
    })
}

const useFetchGallery = (id) => {
    return useQuery({
        queryKey: ["fetch.gallery"],
        queryFn: async () => {
            return await axiosInstace.get(`/api/v1/lapangan/${id}/gallery`)
        }
    })
}