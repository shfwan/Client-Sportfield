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
import { TbBuildingCottage } from 'react-icons/tb'
import { GiShuttlecock } from 'react-icons/gi'

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
                                            <Button className="text-white btn-warning" onClick={() => document.getElementById("lapanganTersediaUpdate" + item.id).showModal()}><HiOutlinePencilAlt size={24} /></Button>
                                            <Button className="text-white btn-error" onClick={() => deleteLapanganTersedia({ id: item.id, lapanganId: item.lapanganId })}><HiOutlineTrash size={24} /></Button>
                                        </div>
                                    </div>
                                </div>
                                <ModalLayout  id={"lapanganTersediaUpdate" + item.id} title="Edit Lapangan Tersedia" btnX={false}>
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