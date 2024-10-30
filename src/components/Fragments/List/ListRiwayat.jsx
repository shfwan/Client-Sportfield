import { jwtDecode } from 'jwt-decode'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CardPemesananSkeleton from '../Card/CardPesanan/CardPemesananSkeleton'
import CardPemesanan from '../Card/CardPesanan/CardPemesanan'
import EmptyData from '../EmptyData'
import { useFetchOrderHistory } from '@/features/order'
import Button from '@/components/Elements/Button'

const ListRiwayat = ({ id }) => {
    const [status, setStatus] = useState("?page=1")


    const { data: listHistory, isLoading, refetch } = useFetchOrderHistory(id, status)

    useEffect(() => {
        router.push(status)
        refetch()

    }, [status])

    const router = useRouter()
    const pathname = usePathname()

    return (
        <div className='block space-y-4 p-2 md:p-4 h-full overflow-hidden'>
            <div className='inline-flex items-center justify-center md:justify-start gap-4 w-full'>
                <label className='text-lg font-semibold' htmlFor="">Filter :</label>

                <div className='overflow-x-scroll  no-scrollbar'>
                    <div className='inline-flex gap-4'>
                        <Button className="btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md" onClick={() => setStatus("?page=1")}>Semua</Button>
                        <Button className={`btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md ${pathname === "/riwayat" ? "hidden" : ""}`} onClick={() => setStatus("?page=1&status=Belum Bermain")}>Belum Bermain</Button>
                        <Button className={`btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md ${pathname === "/riwayat" ? "hidden" : ""}`} onClick={() => setStatus("?page=1&status=Sedang Bermain")}>Sedang Bermain</Button>
                        <Button className="btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md" onClick={() => setStatus("?page=1&status=Selesai")}>Selesai</Button>
                        <Button className="btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md" onClick={() => setStatus("?page=1&status=Dibatalkan")}>Dibatalkan</Button>                </div>
                </div>
            </div>
            <div className='w-full h-full flex flex-col gap-4 items-center justify-start'>
                {
                    isLoading ? Array.from({ length: 5 }).map((_, i) => (<CardPemesananSkeleton key={i} />)) : listHistory?.data.data.order.length > 0 ? listHistory?.data.data.order.map((item, index) => (
                        <CardPemesanan key={item.id} data={item} />
                    )) : <EmptyData title="Belum ada pemesanan" />
                }
            </div>
        </div>
    )
}

export default ListRiwayat