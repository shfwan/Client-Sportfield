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
import { TbBuildingCottage } from 'react-icons/tb'
import { GiShuttlecock } from 'react-icons/gi'

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
                            <div className="card bg-base-100 w-96 shadow-lg">
                                <figure className='min-h-72 max-h-72 bg-gray-400'>
                                    <img
                                        src={process.env.NEXT_PUBLIC_API + "/api/v1/lapangan/picture/" + item.picture}
                                        alt={item.name} />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{item.name}</h2>
                                    {/* <p>{item.description}</p> */}
                                    <div className='block w-full'>
                                        <p>{item.description}</p>
                                        <label htmlFor="jam">{item.jam[0].open} - {item.jam[item.jam.length - 1].close}</label>

                                        <span className='inline-flex gap-2 w-full items-center'>
                                            <TbBuildingCottage color='#9ca3af' size={20} />
                                            <h5 className='text`-sm text-gray-400'>{item.statusLapangan}</h5>
                                        </span>
                                        <span className='inline-flex gap-2 w-full items-center'>
                                            <GiShuttlecock color='#9ca3af' size={20} className='-rotate-[140deg] ' />
                                            <h5 className='text-sm text-gray-400'>{item.type}</h5>
                                        </span>
                                        <h4 className='font-semibold text-base'>{ToRupiah(item.price)} / sesi</h4>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <Button className="text-white btn-success" onClick={() => {
                                            document.getElementById("orderManual").close()
                                            document.getElementById("modalPembayaran" + item.id).showModal()
                                        }}>Booking</Button>
                                    </div>
                                </div>
                            </div>
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