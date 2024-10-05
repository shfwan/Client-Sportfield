"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const AuthLayout = (props) => {
    const { title, children } = props
    const { status } = useSession()

    if(status === "authenticated") {
        redirect("/")
    }
    
    return (
        <section className='flex items-center justify-center h-screen md:h-[93.2vh] bg-white'>
            <main className="grid grid-cols-1 md:grid-cols-2 gap-4 md:p-4 bg-white w-full h-full">
                {children}
            </main>
        </section>
    )
}

export default AuthLayout