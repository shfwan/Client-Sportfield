"use client"

import { useFormik } from "formik"
import Button from "@/components/Elements/Button"
import InputForm from "@/components/Elements/Input"
import Link from "next/link"
import { useRouter } from "next/router"
import * as yup from "yup"
import Swal from "sweetalert2"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

const FormLogin = () => {
    const router = useRouter()
    const callbackParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async () => {
            event.preventDefault()
            try {
                setIsLoading(true)
                const res = await signIn('credentials', {
                    redirect: false,
                    email: formik.values.email,
                    password: formik.values.password,
                    callbackUrl: callbackParams.get("callbackUrl") || "/",
                })   
                
                if (res.ok) {
                    router.push(callbackParams.get("callbackUrl") || "/")
                } else {
                    throw new Error(res.error)
                }

            } catch (error) {
                setIsLoading(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                }).then((result) => {
                    if(result.isConfirmed) {
                        window.location.reload()
                    }
                })
            }
        },
        validationSchema: yup.object().shape({
            email: yup.string().email("Email tidak valid"),
            password: yup.string().min(8, "Password minimal 8 karakter")
        }),
        onReset: () => {
            formik.setFieldValue("email", "")
            formik.setFieldValue("password", "")
        }
    })

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }

    const handleLoading = () => (<span className="loading loading-spinner loading-md"></span>)
    return (
        <div className='flex flex-col h-fit items-center p-4 gap-4'>
            <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
                <InputForm
                    name="email"
                    title="Email"
                    className="w-full"
                    type="text"
                    placeholder="Email"
                    required={true}
                    onChange={handleFormInput}
                    value={formik.values.email}
                    isInvalid={formik.errors.email}
                />
                <InputForm
                    name="password"
                    title="Password"
                    className="w-full"
                    type="password"
                    placeholder="Password"
                    required={true}
                    onChange={handleFormInput}
                    value={formik.values.password}
                    isInvalid={formik.errors.password}
                />
                <Button className={`btn-wide btn-success text-white ${isLoading ? "btn-disabled" : ""}`} type="submit">{isLoading ? handleLoading() : "Login"}</Button>
            </form>
            <span className='text-black'>Don't have an account yet? <Link className="font-semibold text-success cursor-pointer hover:text-[#006a45]" href="/auth/register">Register</Link> </span>
        </div>
    )
}

export default FormLogin