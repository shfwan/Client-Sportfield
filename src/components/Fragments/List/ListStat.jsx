import React from 'react'
import CardStat from '../Card/CardStat'
import { ToRupiah } from '@/lib/toRupiah'
import { IoCheckmarkCircleOutline, IoFileTrayStackedOutline, IoWalletOutline } from 'react-icons/io5'
import { useQuery } from '@tanstack/react-query'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { useSession } from 'next-auth/react'

const ListStat = () => {
    const { data: session } = useSession()
    const axiosAuth = useAxiosAuth()
    const lapanganId = session.user.lapanganId == "" ? localStorage.getItem("aWQ=") : session.user.lapanganId !== "" && localStorage.getItem("aWQ=") !== null ? localStorage.getItem("aWQ=") : session.user.lapanganId


    const { data: statistik, isLoading } = useQuery({
        queryKey: ['fetch.statistik'],
        queryFn: () => axiosAuth.get(`/api/v2/order/${lapanganId}/stat`)
    })

    return (
        <div className='flex flex-col md:flex-row gap-4 w-full'>
            {
                isLoading ? Array.from({length: 3}).map((_, i) => (
                    <div  key={i} className='flex flex-col border items-center justify-center w-full p-4 h-44 rounded-md shadow-md space-y-4'>
                        <div className="inline-flex justify-center items-center gap-4">
                            <label className='skeleton w-10 h-10' htmlFor=""></label>
                            <label className='skeleton w-52 h-6' htmlFor=""></label>
                        </div>
                        <label className='skeleton w-20 h-6' ></label>
                    </div>
                )) : (
                    <>
                        <CardStat name="totalOrder" title="Total Order" total={statistik?.data.data.totalOrder || 0} icon={<IoFileTrayStackedOutline size={36} />} />
                        <CardStat name="konfirmasi" title="Konfirmasi" total={statistik?.data.data.confirmed || 0} icon={<IoCheckmarkCircleOutline size={36} />} />
                        <CardStat name="pendapatan" title="Pendapatan" total={ToRupiah(statistik?.data.data.income)} icon={<IoWalletOutline size={36} />} />
                    </>
                )
            }
        </div>
    )
}

export default ListStat