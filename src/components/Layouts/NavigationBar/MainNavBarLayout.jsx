// import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import TopNavbarLayout from './TopNavbarLayout'
import Link from 'next/link'
import { useStoreSportField } from '@/store/store'
import { usePostLogout } from '@/features/auth'
import SideNavbarLayout from './SideNavbarLayout'
import { useSession } from 'next-auth/react'

const NavBar = () => {
    const [role, setRole] = useState("customer")
    const { data: session } = useSession()
    
    useEffect(() => {
        if(session) {
            setRole(jwtDecode(session.user.token).role)
        }
        
    },[session])

    console.log(role);
    
    return (
        <div className='bg-[#f8fafc] text-black sticky top-0 z-50'>
            {/* {
                !session && (role != "customer" && role == "administrator") ? <TopNavbarLayout /> : <SideNavbarLayout />
            } */}
            <TopNavbarLayout />
        </div>
    )
}

export default NavBar