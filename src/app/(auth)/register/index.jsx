import FormRegister from '@/components/Fragments/Form/FormRegister'
import AuthLayout from '@/components/Layouts/AuthLayout'
import React from 'react'

const RegisterPage = () => {
    return (
        <AuthLayout>
            <div className='p-4 border rounded-md shadow-md'>
                <FormRegister/>
            </div>
        </AuthLayout>
    )
}

export default RegisterPage