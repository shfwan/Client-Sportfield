"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoInformationCircle } from 'react-icons/io5'
import { MdNotifications } from "react-icons/md"
import { socketInstance } from '@/lib/socket'
import ListPemesanan from '@/components/Fragments/List/ListOrder'
import ListStat from '@/components/Fragments/List/ListStat'
import ButtonScan from '@/components/Fragments/Button/ButtonScan'
import ButtonBooking from '@/components/Fragments/Button/ButtonBooking'
import { useFetchByIdLapangan } from '@/features/detailLapangan'
import EmptyData from '@/components/Fragments/EmptyData'

const Dashboard = () => {

    const { data: session } = useSession()
    const date = new Date()
    const [time, setTime] = useState(date.toLocaleTimeString())

    useEffect(() => {
        socketInstance.on("receive_checkout", () => {
            // refetch()
            // refetchOrder()
        })
    }, [socketInstance])

    const lapanganId = session.user.lapanganId == "" ? localStorage.getItem("aWQ=") : session.user.lapanganId !== "" && localStorage.getItem("aWQ=") !== null ? localStorage.getItem("aWQ=") : session.user.lapanganId

    const { data: detailLapangan, isLoading } = useFetchByIdLapangan(lapanganId)

    const RenderDashboard = () => {
        if (detailLapangan !== undefined) {
            return (
                <div className='flex flex-col w-full h-full'>
                    <div className='inline-flex items-center p-2 justify-start w-full'>
                        <h1 className='font-semibold text-success text-xl'>Hi {session.user.fullname}</h1>
                        <div className='ml-auto inline-flex gap-4 items-center justify-center'>
                            <span className='p-2 bg-success rounded-md'>
                                <MdNotifications size={24} color='white' />
                            </span>
                            <label className='' htmlFor="">{time}</label>
                        </div>
                    </div>
                    <hr />
                    <div className='flex flex-row h-full gap-4'>

                        <div className='flex flex-col w-full gap-4'>
                            {/* Statistik */}
                            <ListStat />

                            {/* List Order */}
                            <div className='flex flex-col h-full'>
                                <label className='text-xl font-semibold' htmlFor="">Booking hari ini</label>
                                <div className='overflow-y-scroll scroll-smooth no-scrollbar w-full h-full mt-4'>
                                    <ListPemesanan />
                                </div>
                            </div>

                        </div>

                        {/* Notifikasi */}
                        <div className='block space-y-4 h-full border shadow-md w-96 p-4 overflow-y-scroll no-scrollbar'>
                            <h3 className='text-center'>Pemberitahuan</h3>
                            {
                                Array.from({ length: 5 }).map((_, i) => {
                                    if (i === 4) {
                                        return (<Link href="/notification" className="btn text-white w-full btn-info">Tampilkan Lebih</Link>)
                                    } else {
                                        return (
                                            <div className='border shadow p-4 block space-y-2 text-slate-500'>
                                                <span className='inline-flex gap-4'>
                                                    <IoInformationCircle color='#00b5ff' size={24} />
                                                    <label className='text-info' htmlFor="">Pesanan Baru</label>
                                                </span>
                                                <div className="flex flex-col">
                                                    <label htmlFor="">Orang</label>
                                                    <label htmlFor="">Lapangan badminton 1</label>
                                                </div>
                                                <span className='inline-flex justify-between w-full '>
                                                    <label htmlFor="">02-10-2024</label>
                                                    <label htmlFor="">10:00</label>
                                                </span>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>

                    </div>
                    <div className='absolute bottom-0 right-0 inline-flex gap-2 ml-auto'>
                        <ButtonBooking />
                        <ButtonScan />
                    </div>

                </div>
            )
        } else {

            return <EmptyData title="Saat ini anda belum punya lapangan" />
        }
    }

    return (
        <main className='flex flex-col items-center justify-center gap-4 h-full relative'>
            {
                isLoading ? (
                    <>
                        <h1 className='font-extrabold text-4xl text-success tracking-wide'>Sportfield</h1>
                        <span className="loading loading-spinner text-success loading-lg"></span>
                    </>
                ) : RenderDashboard()
            }
        </main>
    )
}

export default Dashboard