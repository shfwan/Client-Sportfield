"use client"
import Button from '@/components/Elements/Button'
import EmptyData from '@/components/Fragments/EmptyData'
import FormLapangan from '@/components/Fragments/Form/FormLapangan'
import ModalLayout from '@/components/Layouts/ModalLayout'
import { useFetchByIdLapangan } from '@/features/detailLapangan'
import { useSession } from 'next-auth/react'

const Management = () => {
    const { data: session } = useSession()

    const lapanganId = session.user.lapanganId == "" ? localStorage.getItem("aWQ=") : session.user.lapanganId !== "" && localStorage.getItem("aWQ=") !== null ? localStorage.getItem("aWQ=") : session.user.lapanganId
    
    const { data: detailLapangan, isLoading } = lapanganId != null ? useFetchByIdLapangan(lapanganId) : ""

    const RenderManagement = () => {

        if (localStorage.getItem("aWQ=") !== null) {
            window.location.href = `/management/${lapanganId}`

        }

        if (lapanganId !== undefined && detailLapangan !== undefined) {
            window.location.href = `/management/${lapanganId}`
        }

        return (
            <>
                <div className='absolute left-5 top-5'>
                    <Button className="btn-success text-white" onClick={() => document.getElementById("lapanganCreate").showModal()}>Tambah Lapangan</Button>
                </div>
                <EmptyData title="Saat ini anda belum punya lapangan " />
                <ModalLayout id="lapanganCreate" title="Tambahkan lapangan" btnX={false}>
                    <FormLapangan type='create' onClick={() => document.getElementById("lapanganCreate").close()} />
                </ModalLayout>
            </>
        )
    }

    return (
        <main className='flex flex-col items-center justify-center h-full w-full relative'>
            {
                isLoading ? (
                    <>
                        <h1 className='font-extrabold text-4xl text-success tracking-wide'>Sportfield</h1>
                        <span className="loading loading-spinner text-success loading-lg"></span>
                    </>
                ) : RenderManagement()
            }
        </main>
    )



}

export default Management