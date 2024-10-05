"use client"

import AdminLayout from "@/components/Layouts/AdminLayout"
import { socketInstance } from "@/lib/socket"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { toast } from "react-toastify"

const layout = ({ children }) => {
  const pathname = usePathname()

  useEffect(() => {
    socketInstance.on("receive_checkout", () => {
      toast.info("Ada Pesanan baru bang")
    })
  }, [socketInstance])
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  )
}

export default layout