import { useEffect, useState } from 'react'
import { useOrderStore } from '@/store/orderStore'
import ListJam from './Jam'
import { useListJam } from '@/features/jam'

const ListJamLapangan = ({ lapangan }) => {

    const [date] = useOrderStore((state) => [state.date, state.setJam, state.removeJam])


    const { data: jam, refetch: refetchJam } = useListJam(lapangan, date)

    useEffect(() => { refetchJam() }, [date])    

    const renderJamLapangan = () => {
        return jam?.data.data?.jadwal.map((item, index) => (<ListJam key={item.id} item={item} />))
    }

    return jam?.data.data.jadwal.length > 0 ? (
        <div className='grid grid-cols-4 w-full xl:grid-cols-4 gap-2 place-items-center'>
            {renderJamLapangan()}
        </div>
    ) : (
        <label>Tidak ada Jam</label>
    )
}

export default ListJamLapangan