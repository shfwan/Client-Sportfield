import { useQueries, useQuery } from '@tanstack/react-query'
import React from 'react'
import CardLapanganTersedia from '../CardLapangan/CardLapanganTersedia';
import CardLapanganSkeleton from '../CardLapangan/CardLapanganSkeleton';
import { axiosInstace } from '@/lib/axios';
import { useListJam } from '@/features/jam';
import { useOrderStore } from '@/store/orderStore';
import { useFetchLapanganTersedia } from '@/features/detailLapangan';

const ListLapanganTersedia = ({ data }) => {
        
    const { data: lapanganTersedia, isLoading } = useQuery({
        queryKey: ["fetch.lapanganTersedia"],
        queryFn: async () => {
            return await axiosInstace.get(`/api/v1/lapangan/${data.id}/list`)
        },
    })    
    
    return (
        <div className='flex flex-col gap-4'>
            {
                isLoading ? (
                    <CardLapanganSkeleton />
                ) : lapanganTersedia?.data.data.map((item, index) => (<CardLapanganTersedia key={item.id} lapanganTersedia={item} />))
            }
        </div>
    )
}

export default ListLapanganTersedia