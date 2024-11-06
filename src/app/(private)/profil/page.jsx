"use client"
import React from 'react'
import EditPhotoProfil from '@/components/Fragments/EditPhotoProfil/EditPhotoProfil'
import FormProfile from '@/components/Fragments/Form/FormProfile'
import { useGetProfil } from '@/features/profil'
const ProfilPage = () => {
    const { data: profil, isLoading } = useGetProfil()

    return (
        <main className='container mx-auto min-h-screen'>
            <div className="flex flex-col items-center justify-center gap-4 bg-white h-screen">
                <div className="w-full h-fit flex-col  md:justify-evenly items-center  flex justify-center border-black rounded-md">
                    
                    <div className="w-96 items-start flex flex-col gap-4">
                        {
                            !isLoading ? <FormProfile state={profil?.data?.data} /> : <>Loading</>
                        }
                        
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProfilPage