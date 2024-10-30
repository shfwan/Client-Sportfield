import React, { useEffect } from 'react'
import Text from '@/components/Elements/Text'
import QRCode from 'react-qr-code'
import Button from '@/components/Elements/Button'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { useFetchOrders, usePatchOrder, usePembayaran, userPatchOrderCancel } from '@/features/order'
import CryptoJS from 'crypto-js'
import { ToRupiah } from '@/lib/toRupiah'
import { useSession } from 'next-auth/react'
import { jwtDecode } from 'jwt-decode'
import ImagePreview from '@/components/Elements/Image'
import { useFetchByIdUser } from '@/features/user'
import { socketInstance } from '@/lib/socket'
import { useQueryClient } from '@tanstack/react-query'

const DetailPemesanan = ({ orderId, data, token }) => {    
    

    const { data: session } = useSession()
    const queryClient = useQueryClient()

    useEffect(() => {

        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
        const clientKey = process.env.NEXT_PUBLIC_CLIENT

        const script = document.createElement("script")
        script.src = snapScript
        script.setAttribute("data-client-key", clientKey)
        script.async = true

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }

    }, [])

    const { data: orderDetail, isLoading } = useFetchOrders(orderId)
    const { data: user } = useFetchByIdUser(data.userId)
    

    const { mutate: orderUpdate } = usePatchOrder({
        onSuccess: () => {
            toast.success("Pesananmu berhasil diboking", { style: { backgroundColor: "#00a96e" } })
        }
    })


    const { mutate: order } = usePembayaran({
        onSuccess: (result) => {
            document.getElementById("modalPesanan" + token.role + data.id).close()
            window.snap.pay(result?.data.data.token, {
                onSuccess: (result) => {
                    orderUpdate(data)
                    socketInstance.emit("send_checkout")

                    toast.success("Berhasil ditambahkan pemesanan", { style: { backgroundColor: "#00a96e" } })
                },
                onError: (result) => {
                    toast.error("Gagal melakukan checkout" + result, { style: { backgroundColor: "#ff5861" } })
                }
            })
        },

        onError: (result) => {
            Swal.fire({
                title: 'Gagal untuk pembayaran',
                text: result.response.data.message,
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
            })
        }
    })

    const { mutate:cancelOrder } = userPatchOrderCancel({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch.order"] })
            toast.success("Pesanan Berhasil di batalkan", { style: { backgroundColor: "#00a96e" } })
            document.getElementById("modalPesanan" + token.role + data.id).close()
        },
        onError: () => {
            document.getElementById("modalPesanan" + token.role + data.id).close()
            Swal.fire({
                title: 'Gagal untuk dibatalkan',
                // text: result.response.data.message,
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
            })
        }
    })

    const renderStatusBermain = () => {
        if (data !== undefined) {
            if (data.playStatus === false && data.orderStatus === true && data.statusPembayaran === false) {
                return { style: "badge-error", status: "Menunggu Pembayaran" }
            } else if (data.playStatus === false && data.orderStatus === false && data.statusPembayaran === false) {
                return { style: "badge-error", status: "Dibatalkan" }
            } else if (data.playStatus === false && data.orderStatus === true && data.statusPembayaran === true) {
                return { style: "badge-error", status: "Belum Bermain" }
            } else if (data.playStatus === true && data.orderStatus === false && data.statusPembayaran === true) {
                return { style: "badge-warning", status: "Sedang Bermain" }
            } else if (data.playStatus === false && data.orderStatus === false && data.statusPembayaran === true) {
                return { style: "badge-success", status: "Selesai" }
            }
        } else {
            return { style: "badge-success", status: "Selesai" }
        }
    }

    if (session) {
        const token = jwtDecode(session.user.token)

        if (token.role === "customer" && renderStatusBermain() !== undefined) {
            return (
                <div className='flex flex-col md:flex-row items-center justify-center gap-6'>
                    <div className='block space-y-6 max-w-xl'>
                        {/* <div className='flex justify-center flex-col items-center gap-1'>
                            <IoArrowUpCircleSharp className='text-4xl text-success' />
                            <h1 className='font-semibold text-lg'>Rp. {orderDetail?.data.data.total}</h1>
                            <p>Ditransfer ke {data.name}</p>
                            <p>{date.toLocaleDateString()}<span>, </span>{date.toLocaleTimeString()}</p>
                        </div> */}

                        <div className="block space-y-2">
                            <h1 className='font-semibold'>Rincian transaksi</h1>
                            <Text title="Status">
                                <span className={`min-w-36 badge ${renderStatusBermain().style} font-semibold text-white p-3 md:p-4`}>
                                    <label className='text-sm' htmlFor="">{renderStatusBermain().status}</label>
                                </span>
                            </Text>
                            <Text title="Tempat">{data.name}</Text>
                            <Text title="Tipe Lapangan">{data.type}</Text>
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

                        <div className={`${data.statusPembayaran || renderStatusBermain().status === "Dibatalkan" ? "hidden" : "flex"} gap-2 flex-col md:flex-row justify-evenly`}>
                            <Button
                                className="btn-error w-full md:btn-wide text-white"
                                onClick={() => cancelOrder({id: data.id, lapanganId: data.lapanganId})}>
                                Batalkan
                            </Button>
                            <Button
                                className="btn-success w-full md:btn-wide text-white"
                                onClick={() => { order(data); document.getElementById("modalPesanan" + token.role + data.id).close() }}>
                                Bayar
                            </Button>
                        </div>
                    </div>
                    <div className={`${data.statusPembayaran ? "flex" : "hidden"} flex-col items-center justify-center gap-4`}>
                        <div className='w-fit border rounded-xl shadow-md p-4'>
                            <QRCode
                                size={256}
                                value={CryptoJS.AES.encrypt(JSON.stringify(data), process.env.NEXT_PUBLIC_KEY).toString()}
                            />
                        </div>
                        <label className='font-normal text-lg' htmlFor="">QR Code Order</label>
                    </div>
                </div>
            )
        } else if (token.role === "provider" && renderStatusBermain() !== undefined) {
            return (
                <div className='flex flex-col md:flex-row items-center justify-center gap-6'>
                    <div className='block space-y-6 max-w-xl'>
                        {/* <div className='flex justify-center flex-col items-center gap-1'>
                            <IoArrowUpCircleSharp className='text-4xl text-success' />
                            <h1 className='font-semibold text-lg'>Rp. {orderDetail?.data.data.total}</h1>
                            <p>Ditransfer ke {data.name}</p>
                            <p>{date.toLocaleDateString()}<span>, </span>{date.toLocaleTimeString()}</p>
                        </div> */}

                        <div className='flex flex-col gap-y-2 items-center justify-center w-full'>
                            <figure className='aspect-square max-w-24'>
                                <ImagePreview className="rounded-full" src={process.env.NEXT_PUBLIC_API + "/api/v1/user/picture/" + user?.data.data.picture} />
                            </figure>
                            <h1 className='font-medium text-lg'>{user?.data.data.fullname}</h1>
                        </div>

                        <div className="block space-y-2">
                            <h1 className='font-semibold'>Rincian transaksi</h1>
                            <Text title="Status">
                                <span className={`min-w-36 badge ${renderStatusBermain().style} font-semibold text-white p-3 md:p-4`}>
                                    <label className='text-sm' htmlFor="">{renderStatusBermain().status}</label>
                                </span>
                            </Text>
                            <Text title="Tempat">{data.name}</Text>
                            <Text title="Tipe Lapangan">{data.type}</Text>
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
                    </div>
                </div>
            )
        }

    }

}

export default DetailPemesanan