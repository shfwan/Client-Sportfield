import React, { useEffect, useState } from 'react'
import CardLapangan from './CardLapangan'
import ImagePreview from '@/components/Elements/Image'
import Button from '@/components/Elements/Button'
import { useOrderStore } from '@/store/orderStore'
import { faker } from '@faker-js/faker'
import ModalLayout from '@/components/Layouts/ModalLayout'
import FormPembayaran from '../../Form/FormPembayaran'
import { signIn, useSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import { redirect, useRouter } from 'next/navigation'

const CardLapanganTersedia = ({ lapanganTersedia }) => {
    const { data: session, status } = useSession()
    const [
        date,
        clearJam,
    ] = useOrderStore((state) => [
        state.date,
        state.clearJam,
    ])

    const slides = [
        faker.image.url(),
        faker.image.url(),
        faker.image.url(),
    ]


    const [isJam, setIsJam] = useState(false)
    const handleJamClick = () => {
        setIsJam(!isJam)
    }

    useEffect(() => { setIsJam(false) }, [date])

    const router = useRouter()
    const handleCheckout = () => {
        if(status === 'authenticated') {
            
            clearJam([])
            document.getElementById("modalPembayaran" + lapanganTersedia.id).showModal()
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Login dulu untuk lanjut",
            }).then((result) => {
                if (result.isConfirmed) {
                    signIn()
                }
            })
        }
    }

    return (
        <>
            <CardLapangan className="w-fit md:w-full shadow cursor-pointer hover:scale-[102%]">
                <CardLapangan.Header>
                    <figure>
                        <ImagePreview
                            className="rounded-t-xl"
                            src={faker.image.url()}
                            alt="Shoes"
                            loading="lazy"
                        />
                    </figure>
                </CardLapangan.Header>
                <CardLapangan.Body className="card-body">
                    <label className="text-ellipsis overflow-hidden text-nowrap text-lg font-bold">{lapanganTersedia.name}</label>
                    <p>{lapanganTersedia.description}</p>
                </CardLapangan.Body>
                <CardLapangan.Footer className="justify-end">
                    <Button className="btn-success" onClick={handleCheckout}>Order Sekarang</Button>
                </CardLapangan.Footer>
            </CardLapangan>
            <ModalLayout id={"modalPembayaran" + lapanganTersedia.id} title="Order" btnX={false}>
                <FormPembayaran item={lapanganTersedia} onClick={() => { clearJam([]); document.getElementById("modalPembayaran" + lapanganTersedia.id).close() }} />
            </ModalLayout>
        </>
    )
}

export default CardLapanganTersedia