"use client"

import Button from "@/components/Elements/Button"
import InputForm from "@/components/Elements/Input"
import SelectInput from "@/components/Elements/Select Input"
import Textarea from "@/components/Elements/Textarea"
import FormLapanganTersedia from "@/components/Fragments/Form/FormLapanganTersedia"
import ListLapanganTersedia from "@/components/Fragments/List/ListLapanganTersedia"
import ListTanggal from "@/components/Fragments/List/ListTanggal"
import ImagePreviewCaraousel from "@/components/Layouts/Detail Lapangan/ImagePreviewCaraouselLayout"
import ModalLayout from "@/components/Layouts/ModalLayout"
import { useFetchByIdLapangan, usePostLapanganTersedia } from "@/features/detailLapangan"
import { useQueryClient } from "@tanstack/react-query"
import { useFormik } from "formik"
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Map } from "react-feather"
import * as yup from "yup"
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

    const [add, setAdd] = useState(false)

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

            <button className="btn btn-success max-w-min font-bold text-white" onClick={() => setAdd(!add)}>Tambah lapangan</button>
            <ModalLayout className="bg-white" open={add} onClick={() => setAdd(!add)}>
                <FormLapanganTersedia id={state.get("id")} onClick={() => setAdd(!add)}/>
            </ModalLayout>

            {
                isLoading ? <span className="loading loading-dots loading-lg bg-slate-500"></span> : <ListLapanganTersedia data={isLoading ? null : detailLapangan?.data.data} />
            }

        </div>
    )
}

export default DetailPage