"use client"
import { useState } from 'react'
import { faker } from '@faker-js/faker'
import { useQuery } from '@tanstack/react-query'
import { axiosInstace } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useFetchByIdLapangan } from '@/features/detailLapangan'
import { toast } from 'react-toastify'
import { useDeleteLapangan } from '@/features/lapangan'
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { ArrowLeft } from 'react-feather'
import ImagePreview from '@/components/Elements/Image'
import Button from '@/components/Elements/Button'
import ListLapanganTersediaProvider from '@/components/Fragments/List/ListLapanganTersediaProvider'
import CaraouselModalPreview from '@/components/Fragments/Caraousel/CaraouselModalPreview'
import FormLapangan from '@/components/Fragments/Form/FormLapangan'
import FormGallery from '@/components/Fragments/Form/FormGallery'
import GalleryMasonryLayout from '@/components/Layouts/GalleryMasonryLayout'
import ModalLayout from '@/components/Layouts/ModalLayout'

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

    const jam = {
        open: detailLapangan?.data.data.open,
        close: detailLapangan?.data.data.close
    }


    const { mutate: deleteLapangan } = useDeleteLapangan({
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
        <main className='md:p-8 bg-white md:shadow'>
            <div className="flex flex-col gap-y-10">
                <div className='flex flex-row justify-between'>
                    <div className='inline-flex xl:flex-row flex-col gap-10'>
                        <div className='flex md:hidden flex-row gap-4 justify-between items-center'>
                            <label className="text-2xl font-semibold">{detailLapangan?.data.data.name}</label>
                            <div className="inline-flex md:hidden gap-4">
                                <Button className="text-white btn-warning" onClick={() => document.getElementById("lapanganUpdate").showModal()}><HiOutlinePencilAlt size={24} /></Button>
                                <Button className="text-white btn-error" onClick={handleDeleteLapangan}><HiOutlineTrash size={24} /></Button>
                            </div>
                        </div>

                        {/* Image preview */}
                        {
                            isLoading ? (
                                <span className="flex-[1_0_62%] skeleton h-[36rem]"></span>
                            ) : (
                                <figure className='max-w-2xl aspect-video'>
                                    <ImagePreview className="rounded-md" src={process.env.NEXT_PUBLIC_API + "/api/v1/lapangan/picture/" + detailLapangan?.data.data.picture} />
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
                                        <label className="text-2xl font-semibold hidden md:flex">{detailLapangan?.data.data.name}</label>
                                        <div className='max-w-96'>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae omnis, quo reprehenderit molestiae illo quos voluptatibus hic quia ducimus veritatis facere at neque aut sit alias consequuntur nostrum, corrupti dicta.</p>
                                        </div>
                                        <div className='flex flex-col gap-4 max-w-96'>
                                            <label className='text-lg font-semibold' htmlFor="desc">Alamat</label>
                                            <p>{detailLapangan?.data.data.alamat}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {
                        isLoading ? <span className=''></span> : (
                            <>
                                <div className="hidden md:inline-flex gap-4">
                                    <Button className="text-white btn-warning" onClick={() => document.getElementById("lapanganUpdate").showModal()}><HiOutlinePencilAlt size={24} /></Button>
                                    <Button className="text-white btn-error" onClick={handleDeleteLapangan}><HiOutlineTrash size={24} /></Button>
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
                    <Button className="text-white btn-info" onClick={() => document.getElementById("modalGalleryTambah").showModal()}>Tambah</Button>
                    <Button className="text-white btn-error">Hapus Semua</Button>
                </div>

                <ModalLayout title="Upload Foto" id="modalGalleryTambah" onClick={() => document.getElementById("modalGalleryTambah").close()}>
                    <FormGallery data={detailLapangan?.data.data} />
                </ModalLayout>

                <div className='border rounded-md min-h-96 h-full'>
                    <GalleryMasonryLayout>
                        {
                            gallery?.data.data.length > 0 ? gallery?.data.data.map((item, index) => (

                                <figure className='bg-gray-200 break-inside-avoid' key={index} onClick={() => { document.getElementById("lapanganGaleri").showModal() }}>
                                    <ImagePreview className="rounded-md" src={process.env.NEXT_PUBLIC_API + "/api/v1/lapangan/picture/" + item.filename} alt="Image" loading='lazy' />
                                </figure>
                            )) : <label className='' htmlFor="">Tidak ada Gambar</label>
                        }
                    </GalleryMasonryLayout>
                </div>
                <ModalLayout id="lapanganGaleri" onClick={() => { !isPreview ? document.getElementById("lapanganGaleri").close() : setIsPreview(!isPreview) }}>
                    <div className='w-full h-full flex flex-col'>
                        <div className="overflow-scroll">
                            <div className='w-full h-full inline-flex gap-2'>
                                {
                                    Array.from({ length: 1 }).map((_, i) => (
                                        <div className=' h-full  cursor-zoom-in' key={i}>
                                            <ImagePreview src={faker.image.url()} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {/* <div className='w-full h-full inline-flex gap-2'>
                            {
                                Array.from({ length: 12 }).map((_, i) => (
                                    <div className='w-full h-full max-w-24' key={i}>
                                        <ImagePreview src={faker.image.url()} />
                                    </div>
                                ))
                            }
                        </div> */}
                    </div>
                </ModalLayout>

                {/* Lapangan Tersedia */}
                <ListLapanganTersediaProvider id={lapanganId} jam={jam} />
            </div>
        </main>
    )
}

export default ManagementDetail