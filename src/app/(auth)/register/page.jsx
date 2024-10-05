import ImagePreview from '@/components/Elements/Image'
import FormRegister from '@/components/Fragments/Form/FormRegister'
import AuthLayout from '@/components/Layouts/AuthLayout'
import React from 'react'

const RegisterPage = () => {
    return (
        <AuthLayout>
            <div className="flex flex-col gap-6 p-6 md:p-0 items-center justify-center bg-success md:rounded-xl">
                <div className="inline-flex md:hidden items-center mt-6">
                    <figure className="aspect-square max-w-16">
                        <ImagePreview src='/Logo.png' />
                    </figure>
                    <h1 className='font-extrabold text-4xl text-white tracking-wide'>Sportfield</h1>
                </div>
                <FormRegister />
            </div>
            <div className="bg-white w-full hidden md:flex flex-col gap-y-6 items-center justify-center">
                <img src="/LogoIcon.png" alt="" className="w-96" />
                <h1 className="text-3xl font-bold text-success">Welcome to SportFields</h1>
                <p className="text-success text-xl">Mari Olahraga Bersama Orang Terdekatmu.</p>
            </div>
        </AuthLayout>
    )
}

export default RegisterPage