"use client"

import { jwtDecode } from 'jwt-decode'
import TopNavbarLayout from './TopNavbarLayout'
import SideNavbarLayout from './SideNavbarLayout'
import { useSession } from 'next-auth/react'
import { redirect, usePathname } from 'next/navigation'
import Footer from '../Footer'

const NavBar = ({ children }) => {
    const { data: session, status } = useSession()

    const pathname = usePathname()

    const renderNavigate = () => {
        if (session) {
            const role = jwtDecode(session.user.token).role

            if (role === "provider" || role === "administrator") {

                if (pathname === "/") {
                    redirect("/dashboard")
                }

                return (
                    <div className='bg-[#f8fafc] text-black flex flex-col lg:flex-row w-full'>
                        <SideNavbarLayout >
                        </SideNavbarLayout>
                        {children}
                    </div>
                )

            } else {
                return (
                    <div className='bg-[#f8fafc] text-black sticky top-0 z-50'>
                        <TopNavbarLayout />
                        {children}
                    </div>
                )
            }
        } else {
            if (status === "loading") {
                return (
                    <div className='bg-[#f8fafc] flex justify-center items-center w-screen h-screen sticky top-0 z-50'>
                        <div className='flex flex-col justify-center items-center gap-4'>
                            <h1 className='font-extrabold text-4xl text-success tracking-wide'>Sportfield</h1>
                            <span className="loading loading-spinner text-success loading-lg"></span>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className='bg-[#f8fafc] text-black sticky top-0 z-50'>
                        <TopNavbarLayout />
                        {children}
                    </div>
                )
            }
        }
    }
    return renderNavigate()
}

export default NavBar