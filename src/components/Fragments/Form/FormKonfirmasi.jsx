import Button from '@/components/Elements/Button';
import ImagePreview from '@/components/Elements/Image';
import Text from '@/components/Elements/Text';
import { useFetchOrders } from '@/features/order';
import { useFetchByIdUser } from '@/features/user';
import { ToRupiah } from '@/lib/toRupiah';
import React from 'react'

const FormKonfirmasi = ({ data, onClick }) => {
    const renderStatusBermain = () => {
        if (data?.playStatus === false && data?.orderStatus === true && data?.statusPembayaran === false) {
            return { style: "badge-error", status: "Menunggu Pembayaran" }
        } else if (data?.playStatus === false && data?.orderStatus === true && data?.statusPembayaran === true) {
            return { style: "badge-error", status: "Belum Bermain" }
        } else if (data?.playStatus === true && data?.orderStatus === false && data?.statusPembayaran === true) {
            return { style: "badge-warning", status: "Sedang Bermain" }
        } else if (data?.playStatus === false && data?.orderStatus === false && data.statusPembayaran === true) {
            return { style: "badge-success", status: "Selesai" }
        }
    }

    const { data: user } = useFetchByIdUser(data?.userId)
    const { data: orderDetail, isLoading } = useFetchOrders(data?.id)
    console.log(orderDetail?.data.data);


    return (
        <form className='max-w-xl block space-y-4' action="">
            <div className='flex flex-col items-center justify-center w-full'>
                <figure className='aspect-square max-w-24'>
                    <ImagePreview className="rounded-full" src={process.env.NEXT_PUBLIC_API + "/api/v1/user/picture/" + user?.data.data.picture} />
                </figure>
                <h1 className='font-semibold text-center'>{user?.data.data.fullname}</h1>
            </div>
            <div className="block space-y-2">
                <h1 className='font-semibold'>Rincian transaksi</h1>
                <Text title="Status">
                    <span className={`min-w-36 badge ${renderStatusBermain()?.style} font-semibold text-white p-3 md:p-4`}>
                        <label className='text-sm' htmlFor="">{renderStatusBermain()?.status}</label>
                    </span>
                </Text>
                <Text title="Tempat">{data?.name}</Text>
                <Text title="Lapangan">{data?.lapangan}</Text>
                <Text title="Tipe Lapangan">{data?.type}</Text>
                <Text title="Tanggal">{orderDetail?.data.data.tanggalBermain}</Text>
                <Text className="max-w-36 line-clamp-1" title="ID Transaksi">{orderDetail?.data.data.id}</Text>
                <Text title="Lama Bermain">{orderDetail?.data.data.lamaBermain} Jam</Text>
                <Text title="Waktu">{orderDetail?.data.data.jam[0].open} - {orderDetail?.data.data.jam[orderDetail?.data.data.jam.length - 1].close}</Text>
            </div>
            <hr />
            <div className='block'>
                <Text title="Jumlah">x {orderDetail?.data.data.lamaBermain}</Text>
                <Text title="Harga">{ToRupiah(orderDetail?.data.data.price)}</Text>
            </div>
            <hr />
            <div className='flex justify-between'>
                <h1 className='font-semibold'>Total</h1>
                <h1 className='font-semibold'>{ToRupiah(orderDetail?.data.data.total)}</h1>
            </div>
            <div className={` gap-2 flex flex-col md:flex-row justify-evenly`}>
                <Button className="btn-error w-full md:btn-wide" onClick={onClick}>Batalkan</Button>
                <Button className="btn-success w-full md:btn-wide" onClick={() => { }}>Konfirmasi</Button>
            </div>
        </form>
    )
}

export default FormKonfirmasi