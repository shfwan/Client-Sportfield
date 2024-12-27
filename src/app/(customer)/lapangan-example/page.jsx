import ImagePreview from '@/components/Elements/Image'
import Search from '@/components/Fragments/Search'
import LapanganLayout from '@/components/Layouts/Home/LapanganLayout'
import { useSession } from 'next-auth/react'
import React from 'react'

const Lapangan = () => {

  return (
    <section className="block space-y-8 md:space-y-16">
      {/* Hero */}
      <header className="block max-h-96 bg-success w-full">
        <div className="container mx-auto max-w-96 md:max-w-5xl block ">
          <div className='flex items-center justify-between'>
            <figure className='hidden md:flex aspect-auto max-w-80'>
              <ImagePreview src="/LogoIcon.png" />
            </figure>
            <div className='text-white block'>
              <h1 className='text-2xl'>Selamat Datang di
                <strong> Sportfields!</strong>
              </h1>
              <p className='hidden sm:block text-lg'>
                Mari Olahraga Bersama Orang Terdekatmu.
              </p>
            </div>
          </div>
          <div className='translate-y-4 px-2'>
            <Search />
          </div>
        </div>
      </header>
      <div className='container mx-auto p-5 md:px-10 max-w-2xl md:max-w-7xl'>
        <LapanganLayout />
      </div>

    </section>
  )
}

export default Lapangan