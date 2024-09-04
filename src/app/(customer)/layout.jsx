import MainLayout from '@/components/Layouts/MainLayout'
import React from 'react'

const layout = ({ children }) => {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
}

export default layout