"use client"
import EmptyData from '@/components/Fragments/EmptyData'
import ListPemesanan from '@/components/Fragments/List/ListOrder'
import Footer from '@/components/Layouts/Footer'
import { useFetchOrder } from '@/features/order'
import { jwtDecode } from 'jwt-decode'
import { useSession } from 'next-auth/react'
import React from 'react'

const PemesananPage = () => {
  const { data: session } = useSession()

  if (session) {
    const role = jwtDecode(session.user.token).role
    if (role === "customer") {
      return (
        <>
          <main className='container mx-auto p-2 md:p-16 min-h-screen'>
            {/* <h1 className='font-bold text-success text-3xl'>Pemesanan</h1> */}
            <ListPemesanan />
          </main>
          <Footer />
        </>
      )
    } else {
      return (
        <main className='container mx-auto p-2 md:p-16 min-h-screen'>
          {/* <h1 className='font-bold text-success text-3xl'>Pemesanan</h1> */}
          <ListPemesanan />
        </main>
      )
    }
  }


}

export default PemesananPage