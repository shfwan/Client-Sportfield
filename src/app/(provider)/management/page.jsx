"use client"
import Button from '@/components/Elements/Button'
import EmptyData from '@/components/Fragments/EmptyData'
import FormLapangan from '@/components/Fragments/Form/FormLapangan'
import ModalLayout from '@/components/Layouts/ModalLayout'
import { useFetchByIdLapangan } from '@/features/detailLapangan'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Management = () => {
    const { data: session } = useSession()

    const lapanganId = session.user.lapanganId == "" ? localStorage.getItem("aWQ=") : session.user.lapanganId !== "" && localStorage.getItem("aWQ=") !== null ? localStorage.getItem("aWQ=") : session.user.lapanganId

    const { data: detailLapangan, isLoading } = useFetchByIdLapangan(lapanganId)

    const router = useRouter()

    const RenderManagement = () => {

        if (localStorage.getItem("aWQ=") !== null) {
            router.push(`/management/${lapanganId}`)
        }

        if (session.user.lapanganId !== "" || localStorage.getItem("aWQ=") !== null) {

            if (detailLapangan !== undefined) {
                router.push(`/management/${lapanganId}`)
            }
        }

        return (
            <>
                <div className='absolute left-5 top-5'>
                    <Button className="btn-success" onClick={() => document.getElementById("lapanganCreate").showModal()}>Tambah Lapangan</Button>
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