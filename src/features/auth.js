import { axiosInstace } from "@/lib/axios"
import { signOut } from "next-auth/react"

export const usePostLogin = (body) => {
    return axiosInstace.post('/api/v1/auth/login', body).then((res) => res.data)
}

export const usePostRegister = (body) => {
    return axiosInstace.post('/api/v1/auth/register', body).then(res => res.data)
}

export const usePostLogout = () => {
    signOut()
    sessionStorage.clear()
}