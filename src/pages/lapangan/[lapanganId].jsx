"use client"

import Button from "@/components/Elements/Button"
import ListLapanganTersedia from "@/components/Fragments/List/ListLapanganTersedia"
import ListTanggal from "@/components/Fragments/List/ListTanggal"
import ImagePreviewCaraousel from "@/components/Layouts/Detail Lapangan/ImagePreviewCaraouselLayout"
import { useFetchByIdLapangan } from "@/features/detailLapangan"
import { faker } from '@faker-js/faker'
import { useQueries } from "@tanstack/react-query"
import Image from "next/image"
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router"
import React, { useState } from 'react'
import { Map } from "react-feather"
const DetailPage = () => {
    const state = useSearchParams()
    const { data: detailLapangan, isLoading, error } = useFetchByIdLapangan(state.get("id"))
    const router = useRouter()

    if(error?.response.status == 500) {
        router.push("/500")
    } else if(error?.response.status == 404) {
        router.push("/404")
    }
    console.log();
    

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
        <div className="flex flex-col gap-4">
            <div className="inline-flex xl:flex-row flex-col gap-10">
                {/* Image preview */}
                {
                    isLoading ? (
                        <span className="flex-[1_0_62%] skeleton h-[36rem]"></span>
                    ) : <ImagePreviewCaraousel />
                }

                {/* Detail information */}
                <div className="flex flex-col w-full">
                    {
                        isLoading ? (
                            <label className="max-w-full p-5 rounded-md skeleton  text-[2rem] font-semibold" />
                        ) : (
                            <label className="text-[2rem] font-semibold">{detailLapangan?.data.data.name}</label>
                        )
                    }
                </div>
            </div>
            {/* <GalleryLapanganLayout/> */}

            {/* Lapangan tersedia */}
            {renderOpenMap()}

            <h1 className="text-black text-xl font-semibold">Pilih Lapangan yang tersedia</h1>

            <ListTanggal />
            <ListLapanganTersedia data={detailLapangan?.data.data} />
        </div>
    )
}

export default DetailPage