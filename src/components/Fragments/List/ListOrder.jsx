import { useFetchOrder } from '@/features/order'
import React, { useEffect, useState } from 'react'
import EmptyData from '../EmptyData'
import CardPemesanan from '../Card/CardPesanan/CardPemesanan'
import Button from '@/components/Elements/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import CardPemesananSkeleton from '../Card/CardPesanan/CardPemesananSkeleton'

const ListPemesanan = () => {
    const { data: session } = useSession()
    const [status, setStatus] = useState("?page=1")

    const { data: listPemesanan, isLoading, refetch } = useFetchOrder(session.user.lapanganId, status.replace("?", ""))

    useEffect(() => {
        router.push(status)
        refetch()
    }, [status])

    const router = useRouter()
    const query = useSearchParams()
    return (
        <div className='block space-y-4 p-2 md:p-4 h-full overflow-hidden'>
            <div className='overflow-x-scroll  no-scrollbar'>
                <div className='inline-flex gap-4'>
                    <Button className="btn-success btn-outline" onClick={() => setStatus("?page=1")}>Semua</Button>
                    <Button className="btn-success btn-outline" onClick={() => setStatus("?page=1&status=Belum Bermain")}>Belum Bermain</Button>
                    <Button className="btn-success btn-outline" onClick={() => setStatus("?page=1&status=Sedang Bermain")}>Sedang Bermain</Button>
                    <Button className="btn-success btn-outline" onClick={() => setStatus("?page=1&status=Selesai")}>Selesai</Button>
                    <Button className="btn-success btn-outline" onClick={() => setStatus("?page=1&status=Belum Bayar")}>Belum Bayar</Button>
                    <Button className="btn-success btn-outline" onClick={() => setStatus("?page=1&status=Sudah Bayar")}>Sudah Bayar</Button>
                    <Button className="btn-success btn-outline" onClick={() => setStatus("?page=1&status=Dibatalkan")}>Dibatalkan</Button>
                </div>
            </div>
            <div className='w-full h-full flex flex-col gap-4 items-center justify-start'>
                {
                    isLoading ? Array.from({ length: 5 }).map((_, i) => (<CardPemesananSkeleton key={i} />)) : listPemesanan?.data.data.order.length > 0 ? listPemesanan?.data.data.order.map((item, index) => (
                        <CardPemesanan key={item.id} data={item} />
                    )) : <EmptyData title="Belum ada pemesanan" />
                }
            </div>
        </div>
    )
}

export default ListPemesanan