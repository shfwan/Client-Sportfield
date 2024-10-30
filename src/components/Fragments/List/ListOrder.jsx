import { useFetchOrder } from '@/features/order'
import React, { useEffect, useState } from 'react'
import EmptyData from '../EmptyData'
import CardPemesanan from '../Card/CardPesanan/CardPemesanan'
import Button from '@/components/Elements/Button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import CardPemesananSkeleton from '../Card/CardPesanan/CardPemesananSkeleton'
import { jwtDecode } from 'jwt-decode'

const ListPemesanan = ({ id, token }) => {
    const [status, setStatus] = useState("?page=1")


    const { data: listPemesanan, isLoading, refetch } = useFetchOrder(id, status.replace("?", ""))

    useEffect(() => {
        router.push(status)
        refetch()

    }, [status])

    const router = useRouter()
    const pathname = usePathname()

    const renderFilter = () => {
        if (token) {
            const tokenRole = jwtDecode(token)
            if (tokenRole.role === "provider") {
                return (
                    <>
                        <Button className=" btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md" onClick={() => setStatus("?page=1")}>Semua</Button>
                        <Button className={`btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md ${pathname === "/riwayat" ? "hidden" : ""}`} onClick={() => setStatus("?page=1&status=Belum Bermain")}>Belum Bermain</Button>
                        <Button className={`btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md ${pathname === "/riwayat" ? "hidden" : ""}`} onClick={() => setStatus("?page=1&status=Sedang Bermain")}>Sedang Bermain</Button>
                        <Button className="btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md" onClick={() => setStatus("?page=1&status=Selesai")}>Selesai</Button>
                        <Button className="btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md" onClick={() => setStatus("?page=1&status=Dibatalkan")}>Dibatalkan</Button>
                    </>
                )
            } else {

                return (
                    <>

                        <Button className="btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md" onClick={() => setStatus("?page=1")}>Semua</Button>
                        <Button className="btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md" onClick={() => setStatus("?page=1&status=Belum Bermain")}>Belum Bermain</Button>
                        <Button className="btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md" onClick={() => setStatus("?page=1&status=Sedang Bermain")}>Sedang Bermain</Button>
                        <Button className="btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md" onClick={() => setStatus("?page=1&status=Selesai")}>Selesai</Button>
                        <Button className="btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md" onClick={() => setStatus("?page=1&status=Belum Bayar")}>Belum Bayar</Button>
                        <Button className="btn-success border border-success bg-white text-success hover:text-white hover:bg-success hover:border-success rounded-full btn-sm md:btn-md" onClick={() => setStatus("?page=1&status=Dibatalkan")}>Dibatalkan</Button>
                    </>
                )
            }
        }
    }


    return (
        <div className='block space-y-4 p-4 h-full overflow-hidden'>
            <div className='inline-flex items-center justify-center md:justify-start gap-4 w-full'>
                <label className='text-lg font-semibold' htmlFor="">Filter :</label>
                <div className='overflow-x-scroll  no-scrollbar'>
                    <div className='inline-flex gap-4'>
                        {renderFilter()}
                    </div>
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