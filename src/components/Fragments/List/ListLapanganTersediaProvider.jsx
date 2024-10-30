import Button from '@/components/Elements/Button'
import ModalLayout from '@/components/Layouts/ModalLayout'
import React from 'react'
import FormLapanganTersedia from '../Form/FormLapanganTersedia'
import CardLapangan from '../Card/CardLapangan/CardLapangan'
import ImagePreview from '@/components/Elements/Image'
import { useDeleteAllLapanganTersedia, useDeleteLapanganTersedia, useFetchLapanganTersedia } from '@/features/detailLapangan'
import Swal from 'sweetalert2'
import CardLapanganSkeleton from '../Card/CardLapangan/CardLapanganSkeleton'
import { faker } from '@faker-js/faker'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ToRupiah } from '@/lib/toRupiah'

const ListLapanganTersediaProvider = ({ id, jam }) => {


    const { data: lapanganTersedia, isLoading: lapanganTersediaLoading, refetch } = useFetchLapanganTersedia(id)

    const { mutate: deleteLapanganTersedia } = useDeleteLapanganTersedia({
        onSuccess: () => {
            socketInstance.emit("send_refreshLapanganTersedia")
            refetch()
            toast.success("Lapangan Berhasil di hapus", { style: { backgroundColor: "#00a96e" } })
        },
        onError: () => {
            toast.error("Lapangan Gagal dihapus", { style: { backgroundColor: "#ff5861" } })
        }
    })

    const { mutate: deleteAllLapangan } = useDeleteAllLapanganTersedia({
        onSuccess: () => {
            socketInstance.emit("send_refreshLapanganTersedia")
            toast.success("Semua Lapangan tersedia Berhasil di hapus", { style: { backgroundColor: "#00a96e" } })
            refetch()
        }
    })

    const handleDeleteAllLapangan = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAllLapangan({ id: id })
            }
        })
    }

    return (
        <div className='flex flex-col gap-y-8'>
            <label className="text-2xl font-semibold">Lapangan Tersedia</label>
            <div className="inline-flex gap-4">
                <Button className="text-white btn-info" onClick={() => document.getElementById("lapanganTersediaCreate").showModal()}>Tambah</Button>
                <Button className="text-white btn-error" onClick={handleDeleteAllLapangan}>Hapus Semua</Button>
            </div>

            <ModalLayout id="lapanganTersediaCreate" title="Tambah Lapangan Tersedia" onClick={() => document.getElementById("lapanganTersediaCreate").close()}>
                <FormLapanganTersedia type='create' id={id} jam={jam} onClick={() => document.getElementById("lapanganTersediaCreate").close()} />
            </ModalLayout>

            <div className='flex justify-start items-center'>
                <div className='grid grid-row-2 grid-flow-dense lg:grid-flow-col-dense w-fit gap-4'>
                    {
                        lapanganTersediaLoading ? CardLapanganSkeleton() : lapanganTersedia?.data.data.map((item, index) => (
                            <div key={index}>
                                <CardLapangan className="w-fit h-fit cursor-pointer">
                                    <CardLapangan.Header className="">
                                        <figure className='max-w-96'>
                                            <ImagePreview
                                                className="rounded-t-xl"
                                                src={process.env.NEXT_PUBLIC_API + "/api/v1/lapangan/picture/" + item.picture}
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
                                        <Button className="text-white btn-warning" onClick={() => document.getElementById("lapanganTersediaUpdate" + item.id).showModal()}><HiOutlinePencilAlt size={24} /></Button>
                                        <Button className="text-white btn-error" onClick={() => deleteLapanganTersedia({ id: item.id, lapanganId: item.lapanganId })}><HiOutlineTrash size={24} /></Button>
                                    </CardLapangan.Footer>
                                </CardLapangan>
                                <ModalLayout id={"lapanganTersediaUpdate" + item.id} title="Edit Lapangan Tersedia" btnX={false}>
                                    <FormLapanganTersedia type='update' jam={jam} data={item} id={id} onClick={() => document.getElementById("lapanganTersediaUpdate" + item.id).close()} />
                                </ModalLayout>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ListLapanganTersediaProvider