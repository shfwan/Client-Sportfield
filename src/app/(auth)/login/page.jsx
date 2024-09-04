import FormLogin from '@/components/Fragments/Form/FormLogin'
import AuthLayout from '@/components/Layouts/AuthLayout'
import React from 'react'

const LoginPage = () => {    
    return (
        <AuthLayout>
            <div className='p-4 border rounded-md shadow-md'>
                <FormLogin/>
            </div>
        </AuthLayout>
    )
}

export default LoginPage