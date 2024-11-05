import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import CardLapanganTersedia from '../Card/CardLapangan/CardLapanganTersedia';
import CardLapanganSkeleton from '../Card/CardLapangan/CardLapanganSkeleton';
import { axiosInstace } from '@/lib/axios';
import { socketInstance } from '@/lib/socket';

const ListLapanganTersedia = ({ data }) => {
    const { data: lapanganTersedia, isLoading, refetch } = useQuery({
        queryKey: ["fetch.lapanganTersedia"],
        queryFn: async () => {
            return await axiosInstace.get(`/api/v1/lapangan/${data.id}/list`)
        },
    })

    useEffect(() => {
        socketInstance.on("receive_refreshLapanganTersedia", () => {
            refetch()
        })
    }, [socketInstance])

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full '>
            {
                isLoading ? (
                    <CardLapanganSkeleton />
                ) : lapanganTersedia?.data.data.length > 0 ? lapanganTersedia?.data.data.map((item, index) => (<CardLapanganTersedia key={item.id} lapanganTersedia={item} />)) : <label>Belum ada lapangan</label>
            }
        </div>
    )
}

export default ListLapanganTersedia