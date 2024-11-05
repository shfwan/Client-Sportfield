"use client"

import Button from "@/components/Elements/Button"
import ListLapanganTersedia from "@/components/Fragments/List/ListLapanganTersedia"
import ListTanggal from "@/components/Fragments/List/ListTanggal"
import ImagePreviewCaraousel from "@/components/Layouts/Detail Lapangan/ImagePreviewCaraouselLayout"
import { useFetchByIdLapangan } from "@/features/detailLapangan"
import { axiosInstace } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from 'next/navigation'
import { Map } from "react-feather"
const DetailPage = () => {
    const state = useSearchParams()
    const { data: detailLapangan, isLoading, error, refetch: refetchLapanganDetail } = useFetchByIdLapangan(state.get("id"))




    // console.log(gallery);



    return (
        <section className="container mx-auto md:max-w-7xl">
            <div className="block space-y-10 bg-white p-5 md:p-10 rounded-xl shadow-md border   ">
                {/* Image preview */}
                {
                    isLoading ? (
                        <div className="skeleton w-full h-[36rem]"></div>
                    ) : <ImagePreviewCaraousel />
                }
                {/* Detail information */}

                <div className="flex flex-col w-full gap-4">
                    {
                        isLoading ? (
                            <div className="max-w-96 p-5 rounded-md skeleton  text-[2rem] font-semibold" />
                        ) : (
                            <label className="text-[2rem] font-semibold">{detailLapangan?.data.data.name}</label>
                        )
                    }
                    <div className="block">
                        <h3 className="text-xl font-bold">Deskripsi</h3>
                        <div className="max-w-96 rounded-md  p-4">
                            <p>
                                {detailLapangan?.data.data.description}
                            </p>
                        </div>
                    </div>
                    
                    {/* Alamat */}
                    <div className="inline-flex w-full border p-4 rounded-md">
                        <div className="block w-full">
                            <h3 className="text-lg font-semibold">Alamat</h3>
                            <label className="w-full" htmlFor="">{detailLapangan?.data.data.alamat}</label>
                        </div>
                        <a href={detailLapangan?.data.data.mapUrl} target="_blank">
                            <Button className="text-white  btn-info  w-fit ">
                                <div className="w-full inline-flex items-center gap-4">
                                    <h4 htmlFor="">Lihat lokasi</h4>
                                    <Map color="#ffffff" />
                                </div>
                            </Button>
                        </a>
                    </div>

                </div>

                {/* Lapangan tersedia */}
                <div className="block space-y-4 w-full">
                    <h1 className="text-black text-2xl font-semibold">Pilih Lapangan yang tersedia</h1>
                    <div className="overflow-x-scroll rounded-md w-full p-4 border no-scrollbar md:overflow-hidden ">
                        <ListTanggal />
                    </div>
                </div>

                <ListLapanganTersedia data={isLoading ? null : detailLapangan?.data.data} />
            </div>
        </section>
    )
}

export default DetailPage