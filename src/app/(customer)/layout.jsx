import Footer from '@/components/Layouts/Footer'
import MainLayout from '@/components/Layouts/MainLayout'
import React from 'react'

const layout = ({ children }) => {
  return (
    <main className='block'>
      {children}
      <Footer />
    </main>
  )
}

export default layout