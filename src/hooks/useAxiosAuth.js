import { axiosInstace } from "@/lib/axios"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRefreshToken } from "./useRefreshToken"

const useAxiosAuth = () => {
    const { data: session } = useSession()
    const refreshToken = useRefreshToken()

    useEffect(() => {

        const requestInterceptor = axiosInstace.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${session.user.token}`
                }
                return config
            }, (error) => {
                return Promise.reject(error)
            }
        )

        const responseInterceptor = axiosInstace.interceptors.response.use(
            (response) => response, async (error) => {
                const prevRequest = error.config

                if (error.response.status === 401 && !prevRequest.sent) {                    
                    prevRequest.sent = true
                    await refreshToken()
                    prevRequest.headers["Authorization"] = `Bearer ${session.user.token}`

                    return axiosInstace(prevRequest)
                }

                return Promise.reject(error)
            }
        )


        return () => {
            axiosInstace.interceptors.request.eject(requestInterceptor)
            axiosInstace.interceptors.response.eject(responseInterceptor)
        }

    }, [session])

    return axiosInstace
}

export default useAxiosAuth