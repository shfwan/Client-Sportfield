import EmptyData from '@/components/Fragments/EmptyData'
import { useFetchOrder } from '@/features/order'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import React from 'react'

const PemesananPage = () => {
  const {data: listPemesanan, isLoading} = useFetchOrder()
  
  return (
    <div>
      {
        listPemesanan?.data.orders > 0 ? <label>ada pemesanan</label> : <EmptyData tittle="Belum ada pemesanan"/>
      }
    </div>
  )
}

export default PemesananPage