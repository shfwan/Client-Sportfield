import React from 'react'
import { IoArrowUpCircleSharp } from 'react-icons/io5'
import { AiFillCheckCircle } from 'react-icons/ai'
import { useQuery } from '@tanstack/react-query'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { ToRupiah } from '@/lib/toRupiah'

const DetailRiwayat = ({ orderId, data }) => {
    const axiosAuth = useAxiosAuth()
    const { data: orderDetail, isLoading } = useQuery({
        queryKey: ["fetch.detailOrder", orderId],
        queryFn: async () => {
            return await axiosAuth.get(`/api/v2/order/${orderId}`)
        }
    })

    const date = new Date(orderDetail?.data.data.tanggalOrder)

    return (
        <div className='block space-y-6 min-w-text-2xl'>
            <div className='flex justify-center flex-col items-center gap-1'>
                <IoArrowUpCircleSharp className='text-4xl text-success' />
                <h1 className='font-semibold text-lg'>{ToRupiah(orderDetail?.data.data.total)}</h1>
                <p>Ditransfer ke {data.name}</p>
                <p>{date.toLocaleDateString()}<span>, </span>{date.toLocaleTimeString()}</p>
            </div>

            <div className="block space-y-2">
                <h1 className='font-semibold'>Rincian transaksi</h1>
                <Text title="Status">
                    <span className='inline-flex items-center gap-2'>
                        Selesai <AiFillCheckCircle className='text-success' />
                    </span>
                </Text>
                <Text title="Tempat">{data.name}</Text>
                <Text title="Tipe Lapangan">{data.type}</Text>
                <Text title="Tanggal">{orderDetail?.data.data.tanggalBermain}</Text>
                <Text className="max-w-36 line-clamp-1" title="ID Transaksi">{orderDetail?.data.data.id}</Text>
                <Text title="Lama Bermain">{orderDetail?.data.data.lamaBermain}</Text>
                <Text title="Waktu">{orderDetail?.data.data.jam[0].open}-{orderDetail?.data.data.jam[orderDetail?.data.data.jam.length - 1].close}</Text>
            </div>

            <div className='block'>
                <Text title="Jumlah">x {orderDetail?.data.data.lamaBermain}</Text>
                <Text title="Harga">{ToRupiah(orderDetail?.data.data.price)}</Text>
            </div>
            <hr />
            <div className='flex justify-between'>
                <h1 className='font-semibold'>Total</h1>
                <h1 className='font-semibold'>{ToRupiah(orderDetail?.data.data.total)}</h1>
            </div>
        </div>
    )
}

export default DetailRiwayat