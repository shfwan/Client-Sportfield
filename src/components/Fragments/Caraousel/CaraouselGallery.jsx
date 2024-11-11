import Button from '@/components/Elements/Button'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { useOrderStore } from '@/store/orderStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { HiOutlineTrash } from 'react-icons/hi'
import { toast } from 'react-toastify'

const CaraouselGallery = ({ lapanganId, children, data }) => {
    const queryClient = useQueryClient()
    const [imgPos] = useOrderStore((state) => [state.imgPos])

    const { data: session } = useSession()

    const axiosAuth = useAxiosAuth()

    const { mutate: deleteGallery } = useMutation({
        mutationKey: ["delete.gallery"],
        mutationFn: async (body) => {
            return axiosAuth.delete(`/api/v2/lapangan/${body.lapanganId}/information/${body.id}/gallery/remove`)
        },
        onSuccess: () => {
            document.getElementById("previewImage").close()
            queryClient.invalidateQueries("fetch.gallery")
            toast.success("Berhasil Hapus gambar", { style: { backgroundColor: "#00a96e" } })
        },
        onError: () => {
            toast.error("Gagal Menghapus gambar", { style: { backgroundColor: "#ff5861" } })

        }
    })

    const renderDeleteGallery = () => {
        if (session) {
            const token = jwtDecode(session.user.token)
            if (token.role === "provider") {
                return (
                    <div className={`absolute top-0 w-full flex overflow-x-scroll no-scrollbar bg-black/50 p-4 text-white`}>
                        <div className='inline-flex gap-2 w-full container mx-auto max-w-7xl items-center justify-between'>
                            <label htmlFor="">{data[curr]?.filename}</label>
                            <label htmlFor="">{data[curr]?.date}</label>
                            <Button className="text-white btn-error" onClick={() => deleteGallery({ lapanganId: lapanganId, id: data[imgPos].id })}> <HiOutlineTrash size={24} /></Button>
                        </div>
                    </div>
                )
            }
        }
    }



    const [curr, setCurr] = useState(imgPos)

    useEffect(() => {
        setCurr(imgPos)
    }, [imgPos])

    const prev = () => setCurr((curr) => (curr === 0 ? children.length - 1 : curr - 1))
    const next = () => setCurr((curr) => (curr === children.length - 1 ? 0 : curr + 1))

    return (
        <div className='overflow-hidden relative w-full h-full place-content-center'>
            {/* Information */}

            {renderDeleteGallery()}

            <button className="btn btn-sm btn-circle btn-ghost absolute right-10 top-4 text-lg text-white" onClick={() => document.getElementById("previewImage").close()}>✕</button>

            {/* Image */}
            <div className='flex transition-transform ease-out duration-500 w-full ' style={{ transform: `translateX(-${curr * 100}%)` }}>
                {children}
            </div>

            {/* Button next & prev */}
            <button className="absolute left-10 top-[50%] text-white bg-opacity-50 bg-white h-fit rounded-full" onClick={prev}>
                <ChevronLeft size={36} color='white' />
            </button>
            <button className="absolute right-10 top-[50%] text-white bg-opacity-50 bg-white h-fit rounded-full" onClick={next}>
                <ChevronRight size={36} color='white' />
            </button>

            {/* Indicator */}
            <div className={`absolute bottom-0 w-full flex  overflow-x-scroll no-scrollbar bg-black/50 p-2`}>
                <div className='inline-flex gap-2 max-w-16 '>
                    {children?.map((item, i) => (
                        <div
                            key={i}
                            className={`min-w-full aspect-square place-content-center border-8 rounded-sm cursor-pointer hover:scale-110 ${curr === i ? "scale-110" : ""}`}
                            onClick={() => setCurr(i)}
                        >{item}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CaraouselGallery