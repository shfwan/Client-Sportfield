"use client"
import ListPemesanan from '@/components/Fragments/List/ListOrder'
import ListRiwayat from '@/components/Fragments/List/ListRiwayat'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

const Riwayat = () => {
    const { data: session } = useSession()
    const lapanganId = session.user.lapanganId == "" ? localStorage.getItem("aWQ=") : session.user.lapanganId !== "" && localStorage.getItem("aWQ=") !== null ? localStorage.getItem("aWQ=") : session.user.lapanganId

    const axiosAuth = useAxiosAuth()
    const {data: history} = useQuery({
        queryKey: ["fetch.riwayat"],
        queryFn: async () => {
            return await axiosAuth.get(`/api/v2/order/${lapanganId}/history?page=1&limit=10`)
        }
    })
    
    return (
        <main className='container mx-auto p-2 md:p-16 min-h-screen'>
            {/* <h1 className='font-bold text-success text-3xl'>Pemesanan</h1> */}
            <ListRiwayat id={lapanganId} />
            {/* <ListPemesanan id={lapanganId} token={session.user.token} /> */}
        </main>
    )
}

export default Riwayat