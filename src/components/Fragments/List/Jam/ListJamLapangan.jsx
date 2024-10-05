import { useEffect, useState } from 'react'
import { useOrderStore } from '@/store/orderStore'
import ListJam from './Jam'
import { useListJam } from '@/features/jam'
import { useQueryClient } from '@tanstack/react-query'

const ListJamLapangan = ({ lapangan }) => {
    const [date] = useOrderStore((state) => [state.date])

    const { data: jam, refetch: refetchJam, isLoading } = useListJam(lapangan, date)

    useEffect(() => {
        refetchJam()
    }, [date, isLoading])

    const renderJamLapangan = () => {
        return jam?.data.data?.jadwal.map((item) => (<ListJam key={item.id} item={item} />))
    }

    return (
        <div className='flex items-center justify-center'>
            <div className='grid grid-cols-4 w-fit lg:grid-cols-4 gap-2 place-items-center'>
                {
                    isLoading ? Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className='skeleton w-28 h-11 rounded-md'></div>
                    )) : jam?.data.data.jadwal.length > 0 ? renderJamLapangan() : <label>Tidak ada Jam</label>
                }
            </div>
        </div>
    )
}

export default ListJamLapangan