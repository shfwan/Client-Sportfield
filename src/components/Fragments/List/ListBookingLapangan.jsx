import ImagePreview from '@/components/Elements/Image'
import { useFetchLapanganTersedia } from '@/features/detailLapangan'
import { faker } from '@faker-js/faker'
import { useSession } from 'next-auth/react'
import CardLapangan from '../Card/CardLapangan/CardLapangan'
import { ToRupiah } from '@/lib/toRupiah'

const ListBookingLapangan = () => {
    const { data: session } = useSession()
    const { data: lapanganTersedia, isLoading: lapanganTersediaLoading } = useFetchLapanganTersedia(session.user.lapanganId)

    return (
        <div className='grid grid-cols-3 gap-4'>
            {
                lapanganTersedia?.data.data.map((item, index) => (
                    <CardLapangan className="w-fit h-fit cursor-pointer hover:scale-[101%]" key={index}>
                        <CardLapangan.Header className="">
                            <figure className='max-w-96'>
                                <ImagePreview
                                    className="rounded-t-xl"
                                    src={faker.image.url()}
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
                        </CardLapangan.Footer>
                    </CardLapangan>
                ))
            }
        </div>
    )
}

export default ListBookingLapangan