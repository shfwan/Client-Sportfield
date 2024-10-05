import Button from '@/components/Elements/Button'
import ImagePreview from '@/components/Elements/Image'
import FormLogin from '@/components/Fragments/Form/FormLogin'
import AuthLayout from '@/components/Layouts/AuthLayout'
import React from 'react'

const LoginPage = () => {
    return (
        <AuthLayout>
            <div className="hidden bg-white w-full md:flex flex-col gap-y-6 items-center justify-center">
                <img src="/LogoIcon.png" alt="" className="w-96" />
                <h1 className="text-3xl font-bold text-success">Welcome to SportFields</h1>
                <p className="text-success text-xl">Mari Olahraga Bersama Orang Terdekatmu.</p>
            </div>
            <div className="flex flex-col items-center justify-start md:justify-center gap-6 bg-success p-6 md:p-0 md:rounded-xl">
                <div className="inline-flex md:hidden items-center">
                    <figure className="aspect-square max-w-16">
                        <ImagePreview src='/Logo.png' />
                    </figure>
                    <h1 className='font-extrabold text-4xl text-white tracking-wide'>Sportfield</h1>
                </div>
                <FormLogin />
            </div>
        </AuthLayout>
    )
}

export default LoginPage