import { useFetchByIdLapangan, useFetchLapanganTersediaById } from '@/features/detailLapangan'
import { useFetchByIdUser } from '@/features/user'
import { useSession } from 'next-auth/react'
import { jwtDecode } from 'jwt-decode'
import ModalLayout from '@/components/Layouts/ModalLayout'
import DetailPemesanan from './DetailPemesanan'
import ImagePreview from '@/components/Elements/Image'
import { ToRupiah } from '@/lib/toRupiah'

const CardPemesanan = ({ data }) => {

    const { data: lapangan } = useFetchByIdLapangan(data.lapanganId)
    const { data: lapanganTersedia } = useFetchLapanganTersediaById(data)
    const { data: user, isLoading: userLoading } = useFetchByIdUser(data.userId)

    const renderStatusBermain = () => {
        if (data != undefined) {

            if (data.playStatus === false && data.orderStatus === true && data.statusPembayaran === false) {
                return { style: "badge-error", status: "Menunggu Pembayaran" }
            } else if (data.playStatus === false && data.orderStatus === true && data.statusPembayaran === true) {
                return { style: "badge-error", status: "Belum Bermain" }
            } else if (data.playStatus === true && data.orderStatus === false && data.statusPembayaran === true) {
                return { style: "badge-warning", status: "Sedang Bermain" }
            } else if (data.playStatus === false && data.orderStatus === false && data.statusPembayaran === true) {
                return { style: "badge-success", status: "Selesai" }
            }
        }
    }

    const { data: session } = useSession()
    const dataOrder = {
        id: data.id,
        useData: user?.data.data,
        userId: data.userId,
        lapanganId: lapangan?.data.data.id,
        detailLapanganId: data.detailOrder.detailsLapanganId,
        name: lapangan?.data.data.name,
        lapangan: lapanganTersedia?.data.data.name,
        type: lapanganTersedia?.data.data.type + "/" + lapanganTersedia?.data.data.statusLapangan,
        statusPembayaran: data.statusPembayaran,
        orderStatus: data.orderStatus,
        playStatus: data.playStatus

    }

    if (session) {
        const token = jwtDecode(session.user.token)

        if (token.role === "customer") {
            return (
                <>
                    <div className='md:hidden flex flex-col gap-4 w-full border shadow p-4 rounded-md cursor-pointer' onClick={() => document.getElementById("modalPesanan" + token.role + data.id).showModal()}>
                        <div className="inline-flex items-center justify-center w-full border-b pb-2">
                            <label className='whitespace-nowrap font-semibold' htmlFor="">{lapangan?.data.data.name}</label>
                            <span className={`ml-auto min-w-20 badge ${renderStatusBermain().style} font-semibold text-white p-3`}>
                                <label className='text-xs' htmlFor="">{renderStatusBermain().status}</label>
                            </span>
                        </div>
                        <div className='inline-flex gap-x-4'>
                            <figure className='aspect-square max-w-24 rounded-md border'>
                                <ImagePreview src="/LogoIcon.png" />
                            </figure>
                            <div className='flex flex-col'>
                                <label className='line-clamp-1 text-base' htmlFor="">{lapanganTersedia?.data.data.name}</label>
                                <label className='text-sm' htmlFor="">{data.detailOrder.jam[0].open}-{data.detailOrder.jam[data.detailOrder.jam.length - 1].close}</label>
                                <label className='text-sm' htmlFor="">{data.detailOrder.date}</label>

                            </div>
                        </div>
                        <label className='whitespace-nowrap text-md text-end' htmlFor="">Total: {ToRupiah(lapanganTersedia?.data.data.price)}</label>
                    </div>

                    <div className='hidden md:flex flex-col lg:flex-row items-start lg:items-center justify-between w-full border shadow p-6 rounded-md cursor-pointer' onClick={() => document.getElementById("modalPesanan" + token.role + data.id).showModal()}>
                        <label className='whitespace-nowrap' htmlFor="">{lapangan?.data.data.name}</label>
                        <label className=' line-clamp-1' htmlFor="">{lapanganTersedia?.data.data.name}</label>
                        <label className='whitespace-nowrap' htmlFor="">{lapanganTersedia?.data.data.type}/{lapanganTersedia?.data.data.statusLapangan}</label>
                        <label className='whitespace-nowrap' htmlFor="">{data.detailOrder.jam[0].open}-{data.detailOrder.jam[data.detailOrder.jam.length - 1].close}</label>
                        <label className='whitespace-nowrap' htmlFor="">{data.detailOrder.date}</label>
                        <label className='whitespace-nowrap' htmlFor="">{ToRupiah(lapanganTersedia?.data.data.price * data.detailOrder.jam.length)}</label>
                        <span className={`min-w-40 badge ${renderStatusBermain().style} font-semibold text-md text-white p-4`}>
                            <label htmlFor="">{renderStatusBermain().status}</label>
                        </span>
                    </div>
                    <ModalLayout id={"modalPesanan" + token.role + data.id} title="Detail Pesanan" onClick={() => document.getElementById("modalPesanan" + token.role + data.id).close()}>
                        <DetailPemesanan orderId={data.id} data={dataOrder} />
                    </ModalLayout>
                </>
            )
        } else if (token.role === "provider") {
            return (
                <>
                    <div className='grid grid-cols-6 gap-4  place-items-center grid-rows-1 w-full border shadow p-6 rounded-md cursor-pointer' onClick={() => document.getElementById("modalPesanan" + token.role + data.id).showModal()}>
                        <div className='inline-flex gap-4 items-center justify-start w-full'>
                            <figure className='aspect-square max-w-12'>
                                <ImagePreview className="rounded-full" src={process.env.NEXT_PUBLIC_API + "/api/v1/user/picture/" + user?.data.data.picture} />
                            </figure>
                            <label el className='line-clamp-1 h-fit' htmlFor="">{user?.data.data.fullname}</label>
                        </div>
                        <label className='w-full line-clamp-1 h-fit' htmlFor="">{lapanganTersedia?.data.data.name}</label>
                        <label className='w-full line-clamp-1 h-fit' htmlFor="">{lapanganTersedia?.data.data.type}/{lapanganTersedia?.data.data.statusLapangan}</label>
                        <label className='w-full line-clamp-1 h-fit' htmlFor="">{lapanganTersedia?.data.data.type}/{lapanganTersedia?.data.data.statusLapangan}</label>
                        <label className='w-full line-clamp-1 h-fit' htmlFor="">{data.detailOrder.jam[0].open}-{data.detailOrder.jam[data.detailOrder.jam.length - 1].close}</label>
                        <span className={`min-w-40 badge ${renderStatusBermain().style} font-semibold text-md text-white p-4`}>
                            <label htmlFor="">{renderStatusBermain().status}</label>
                        </span>
                    </div>

                    <ModalLayout id={"modalPesanan" + token.role + data.id} title="Detail Pesanan" onClick={() => document.getElementById("modalPesanan" + token.role + data.id).close()}>
                        <DetailPemesanan orderId={data.id} data={dataOrder} />
                    </ModalLayout>
                </>
            )
        }

    }


}

export default CardPemesanan