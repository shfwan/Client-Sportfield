"use client"

import { jwtDecode } from 'jwt-decode'
import TopNavbarLayout from './TopNavbarLayout'
import SideNavbarLayout from './SideNavbarLayout'
import { useSession } from 'next-auth/react'

const NavBar = () => {
    const { data: session } = useSession()
    
    const renderNavigate = () => {
        if(session) {
            const role = jwtDecode(session.user.token).role
            
            if(role === "provider" || role === "administrator") {
                // return <SideNavbarLayout/>
                return <TopNavbarLayout/>

            } else {
                return <TopNavbarLayout/>
            }
        } else {
            return <TopNavbarLayout/>
        }
    }
    return (
        <div className='bg-[#f8fafc] text-black sticky top-0 z-50'>
            {renderNavigate()}
        </div>
    )
}

export default NavBar