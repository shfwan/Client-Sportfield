import ImagePreview from '@/components/Elements/Image'
import { useFetchLapanganTersedia } from '@/features/detailLapangan'
import { faker } from '@faker-js/faker'
import { useSession } from 'next-auth/react'
import CardLapangan from '../Card/CardLapangan/CardLapangan'
import { ToRupiah } from '@/lib/toRupiah'
import Button from '@/components/Elements/Button'
import ModalLayout from '@/components/Layouts/ModalLayout'
import { useOrderStore } from '@/store/orderStore'
import FormPembayaran from '../Form/FormPembayaran'

const ListBookingLapangan = () => {
    const [clearJam] = useOrderStore((state) => [state.clearJam])
    const { data: session } = useSession()
    const lapanganId = session.user.lapanganId == "" ? localStorage.getItem("aWQ=") : session.user.lapanganId !== "" && localStorage.getItem("aWQ=") !== null ? localStorage.getItem("aWQ=") : session.user.lapanganId

    const { data: lapanganTersedia, isLoading: lapanganTersediaLoading } = useFetchLapanganTersedia(lapanganId)

    const handleOpenModalBooking = () => {
    }

    return (
        <>
            <div className='grid grid-cols-3 gap-4'>
                {
                    lapanganTersedia?.data.data.map((item, index) => (
                        <>
                            <CardLapangan className="w-fit h-fit min-w-96  cursor-pointer hover:scale-[101%]" key={index}>
                                <CardLapangan.Header className="">
                                    <figure className='max-w-96'>
                                        <ImagePreview
                                            className="rounded-t-xl"
                                            src={process.env.NEXT_PUBLIC_API + "/api/v1/user/picture/" + item.picture}
                                            alt="Shoes"
                                            loading="lazy"
                                        />
                                    </figure>
                                </CardLapangan.Header>
                                <CardLapangan.Body className="card-body">
                                    <label className="text-ellipsis overflow-hidden text-nowrap text-lg font-bold">{item.name}</label>
                                    <p>{item.description}</p>
                                    <label htmlFor="jam">{item.jam[0].open} - {item.jam[item.jam.length - 1].close}</label>
                                    <label className='font-semibold' htmlFor="status&type">{item.type}/{item.statusLapangan}</label>
                                    <label className='font-bold' htmlFor="price">{ToRupiah(item.price)} / <strong>Jam</strong></label>
                                </CardLapangan.Body>
                                <CardLapangan.Footer className="justify-end">
                                    <Button className="text-white btn-success" onClick={() => {
                                        document.getElementById("orderManual").close()
                                        document.getElementById("modalPembayaran" + item.id).showModal()
                                    }}>Booking</Button>
                                </CardLapangan.Footer>
                            </CardLapangan>
                            <ModalLayout id={"modalPembayaran" + item.id} onClick={() => document.getElementById("modalPembayaran" + item.id).close()}>
                                <FormPembayaran item={item} onClick={() => { clearJam([]); document.getElementById("modalPembayaran" + item.id).close() }} />
                            </ModalLayout>
                        </>
                    ))
                }
            </div>
        </>
    )
}

export default ListBookingLapangan