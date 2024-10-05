"use client"

import Button from "@/components/Elements/Button"
import ListLapanganTersedia from "@/components/Fragments/List/ListLapanganTersedia"
import ListTanggal from "@/components/Fragments/List/ListTanggal"
import ImagePreviewCaraousel from "@/components/Layouts/Detail Lapangan/ImagePreviewCaraouselLayout"
import { useFetchByIdLapangan } from "@/features/detailLapangan"
import { useSearchParams } from 'next/navigation'
import { Map } from "react-feather"
const DetailPage = () => {
    const state = useSearchParams()
    const { data: detailLapangan, isLoading, error, refetch: refetchLapanganDetail } = useFetchByIdLapangan(state.get("id"))


    const renderOpenMap = () => {
        return (
            <div>
                <label htmlFor="">{detailLapangan?.data.data.address?.alamat}</label>
                <a href={detailLapangan?.data.data.address?.mapUrl} target="_blank">
                    <Button className=" btn-info w-fit flex gap-4">
                        <label htmlFor="">Lihat lokasi</label>
                        <Map color="#ffffff" />
                    </Button>
                </a>
            </div>
        )
    }

    return (
        <section className="container mx-auto md:max-w-7xl">
            <div className="block space-y-10 bg-white p-5 md:p-10 rounded-xl shadow-md">
                {/* Image preview */}
                {
                    isLoading ? (
                        <div className="skeleton w-full h-[36rem]"></div>
                    ) : <ImagePreviewCaraousel />
                }
                {/* Detail information */}

                <div className="flex flex-col w-full">
                    {
                        isLoading ? (
                            <div className="max-w-96 p-5 rounded-md skeleton  text-[2rem] font-semibold" />
                        ) : (
                            <label className="text-[2rem] font-semibold">{detailLapangan?.data.data.name}</label>
                        )
                    }
                </div>
                {/* Lapangan tersedia */}
                {renderOpenMap()}

            <div className="block space-y-4">
                    <h1 className="text-black text-xl font-semibold">Pilih Lapangan yang tersedia</h1>
                    <div className="overflow-x-scroll rounded-md p-4 border no-scrollbar">
                        <ListTanggal />
                    </div>
                </div>

                <ListLapanganTersedia data={isLoading ? null : detailLapangan?.data.data} />
            </div>
        </section>
    )
}

export default DetailPage