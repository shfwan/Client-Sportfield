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
import { GiShuttlecock } from 'react-icons/gi'
import { ToRupiah } from '@/lib/toRupiah'
import { TbBuildingCottage } from "react-icons/tb";

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
        if (status === 'authenticated') {

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
            <div className="card bg-base-100  shadow-lg">
                <figure className='min-h-72 max-h-72 bg-gray-400'>
                    <img
                        src={process.env.NEXT_PUBLIC_API + "/api/v1/lapangan/picture/" + lapanganTersedia.picture}
                        alt={lapanganTersedia.name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{lapanganTersedia.name}</h2>
                    <div className='block w-full'>
                        <span className='inline-flex gap-2 w-full items-center'>
                            <TbBuildingCottage color='#9ca3af' size={20}/>
                            <h5 className='text-sm text-gray-400'>{lapanganTersedia.statusLapangan}</h5>
                        </span>
                        <span className='inline-flex gap-2 w-full items-center'>
                            <GiShuttlecock color='#9ca3af' size={20} className='-rotate-[140deg] ' />
                            <h5 className='text-sm text-gray-400'>{lapanganTersedia.type}</h5>
                        </span>
                        <h4 className='font-semibold text-base'>{ToRupiah(lapanganTersedia.price)} / sesi</h4>
                    </div>
                    <div className="card-actions justify-end">
                        <Button className="text-white btn-success" onClick={handleCheckout}>Order Sekarang</Button>
                        {/* <button className="btn btn-primary">Buy Now</button> */}
                    </div>
                </div>
            </div>
            <ModalLayout id={"modalPembayaran" + lapanganTersedia.id} className='min-h-full' title="Order" btnX={false}>
                <FormPembayaran item={lapanganTersedia} onClick={() => { clearJam([]); document.getElementById("modalPembayaran" + lapanganTersedia.id).close() }} />
            </ModalLayout>
        </>
    )
}

export default CardLapanganTersedia