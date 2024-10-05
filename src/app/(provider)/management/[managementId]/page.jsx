"use client"
import { useFetchByIdLapangan } from '@/features/detailLapangan'
import React, { useState } from 'react'
import ImagePreview from '@/components/Elements/Image'
import { faker } from '@faker-js/faker'
import Button from '@/components/Elements/Button'
import { useQuery } from '@tanstack/react-query'
import { axiosInstace } from '@/lib/axios'
import FormLapangan from '@/components/Fragments/Form/FormLapangan'
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import ModalLayout from '@/components/Layouts/ModalLayout'
import GalleryMasonryLayout from '@/components/Layouts/GalleryMasonryLayout'
import CaraouselModalPreview from '@/components/Fragments/Caraousel/CaraouselModalPreview'
import { ArrowLeft } from 'react-feather'
import { toast } from 'react-toastify'
import ListLapanganTersediaProvider from '@/components/Fragments/List/ListLapanganTersediaProvider'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useDeleteLapangan } from '@/features/lapangan'

const ManagementDetail = () => {
    const { data: session } = useSession()
    const router = useRouter()

    const lapanganId = session.user.lapanganId == "" ? localStorage.getItem("aWQ=") : session.user.lapanganId !== "" && localStorage.getItem("aWQ=") !== null ? localStorage.getItem("aWQ=") : session.user.lapanganId

    const { data: detailLapangan, isLoading } = useFetchByIdLapangan(lapanganId)

    const { data: gallery, isLoading: galleryLoading } = useQuery({
        queryKey: ["fetch.gallery"],
        queryFn: async () => {
            return await axiosInstace.get(`/api/v1/lapangan/${lapanganId}/gallery`)
        }
    })

    const slides = [
        "/404.png",
        "/Logo.png",
        "/LogoIcon.png",
    ]

    const [isPreview, setIsPreview] = useState(false)

    const [foto, setFoto] = useState(0)

    const jam = {
        open: detailLapangan?.data.data.open,
        close: detailLapangan?.data.data.close
    }


    const {mutate: deleteLapangan} = useDeleteLapangan({
        onSuccess: () => {
            localStorage.removeItem("aWQ=")
            toast.success("Berhasil Hapus Lapangan", { style: { backgroundColor: "#00a96e" } })
            router.push("/management")
        },
        onError: () => {
            toast.error("Gagal Menghapus Lapangan", { style: { backgroundColor: "#ff5861" } })
        }
    })
    const handleDeleteLapangan = () => {
        deleteLapangan(session.user.lapanganId)
    }
    return (
        <main className=' p-8 bg-white'>
            <div className="flex flex-col gap-y-10">
                <div className='flex flex-row justify-between'>
                    <div className='inline-flex xl:flex-row flex-col gap-10'>
                        {/* Image preview */}
                        {
                            isLoading ? (
                                <span className="flex-[1_0_62%] skeleton h-[36rem]"></span>
                            ) : (
                                <figure className='max-w-[36rem] aspect-auto'>
                                    <ImagePreview className="rounded-md" src={faker.image.urlLoremFlickr()} />
                                </figure>
                            )
                        }
                        {/* Detail information */}
                        <div className="flex flex-col w-full">
                            {
                                isLoading ? (
                                    <label className="max-w-full-5 rounded-md skeleton  text-[2rem] font-semibold" />
                                ) : (
                                    <div className='flex flex-col gap-4 items-start justify-start'>
                                        <label className="text-2xl font-semibold">{detailLapangan?.data.data.name}</label>
                                        <div className='max-w-96'>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae omnis, quo reprehenderit molestiae illo quos voluptatibus hic quia ducimus veritatis facere at neque aut sit alias consequuntur nostrum, corrupti dicta.</p>
                                        </div>
                                        <div className='flex flex-col gap-4 max-w-96'>
                                            <label className='text-lg font-semibold' htmlFor="desc">Alamat</label>
                                            <p>{detailLapangan?.data.data.address?.alamat}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {
                        isLoading ? <span className=''></span> : (
                            <>
                                <div className="inline-flex gap-4">
                                    <Button className="btn-warning" onClick={() => document.getElementById("lapanganUpdate").showModal()}><HiOutlinePencilAlt size={24} /></Button>
                                    <Button className="btn-error" onClick={handleDeleteLapangan}><HiOutlineTrash size={24} /></Button>
                                </div>

                                <ModalLayout id="lapanganUpdate" onClick={() => document.getElementById("lapanganUpdate").close()} title="Edit Lapangan">
                                    <FormLapangan type='update' data={detailLapangan?.data.data} onClick={() => document.getElementById("lapanganUpdate").close()} />
                                </ModalLayout>
                            </>
                        )
                    }
                </div>

                {/* Galeri */}
                <label className="text-2xl font-semibold">Galeri</label>
                <div className="inline-flex gap-4 w-full">
                    <Button className="btn-info">Tambah</Button>
                    <Button className="btn-error">Hapus Semua</Button>
                </div>

                <GalleryMasonryLayout>
                    {
                        Array.from({ length: 4 }).map((_, index) => (

                            <figure className='bg-gray-200 break-inside-avoid' key={index} onClick={() => { document.getElementById("lapanganGaleri").showModal() }}>
                                <img className='rounded-md flex-[1_0_100%]' src={faker.image.url()} alt="Image" loading='lazy' />
                            </figure>
                        ))
                    }
                </GalleryMasonryLayout>
                <ModalLayout id="lapanganGaleri" onClick={() => { !isPreview ? document.getElementById("lapanganGaleri").close() : setIsPreview(!isPreview) }}>
                    {
                        isPreview ? (
                            <>
                                <ArrowLeft className='absolute top-4 left-4 ' onClick={() => setIsPreview(!isPreview)} color='gray' size={32} />
                                <CaraouselModalPreview className='max-w-[60rem]'>
                                    {/* {
                                        slides.map((item, i) => (
                                            ))
                                        } */}
                                    <ImagePreview
                                        className="rounded-md"
                                        // key={i}
                                        src={slides[foto]}
                                        alt="Image" />
                                </CaraouselModalPreview>
                            </>

                        ) : (

                            <GalleryMasonryLayout>
                                {
                                    slides.map((item, index) => (
                                        <figure className='bg-gray-200 break-inside-avoid ' key={index} onClick={() => { setFoto(index); setIsPreview(!isPreview) }}>
                                            <img className='rounded-md flex-[1_0_100%]' src={item.toString()} alt="Image" loading='lazy' />
                                        </figure>
                                    ))
                                }
                            </GalleryMasonryLayout>
                        )
                    }
                </ModalLayout>

                {/* Lapangan Tersedia */}
                <ListLapanganTersediaProvider id={lapanganId} jam={jam} />
            </div>
        </main>
    )
}

export default ManagementDetail