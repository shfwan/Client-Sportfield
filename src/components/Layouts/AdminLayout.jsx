import { usePathname } from 'next/navigation'
import React from 'react'

const AdminLayout = ({ children }) => {
    const pathname = usePathname()

    return (
        <section className='p-4 space-y-2 w-full h-screen md:overflow-scroll relative z-10 no-scrollbar'>
            {children}
        </section>
    )
}

export default AdminLayout