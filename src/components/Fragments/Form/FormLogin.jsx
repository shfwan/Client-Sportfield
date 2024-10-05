"use client"

import { useFormik } from "formik"
import Button from "@/components/Elements/Button"
import InputForm from "@/components/Elements/Input"
import Link from "next/link"
import * as yup from "yup"
import Swal from "sweetalert2"
import { useState } from "react"
import { getSession, signIn, useSession } from "next-auth/react"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import { jwtDecode } from "jwt-decode"

const FormLogin = () => {
    const router = useRouter()
    const callbackParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            user: "",
            password: ""
        },
        onSubmit: async () => {
            event.preventDefault()
            try {
                setIsLoading(true)
                const res = await signIn('credentials', {
                    redirect: false,
                    user: formik.values.user,
                    password: formik.values.password,
                    callbackUrl: callbackParams.get("callbackUrl") || "/lapangan",
                })

                if (res.ok) {
                    const session = await getSession()

                    if (session) {
                        const role = jwtDecode(session.user.token).role

                        if (role === "customer") {
                            router.push(callbackParams.get("callbackUrl") || "/lapangan")
                        } else if (role === "provider") {
                            router.push("/dashboard")
                        } else if (role === "administrator") {
                            router.push("/dashboard")
                        }
                    }

                } else {
                    throw new Error(res.error)
                }

            } catch (error) {
                setIsLoading(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                })
            }
        },
        validationSchema: yup.object().shape({
            user: yup.string(),
            password: yup.string().min(8, "Password minimal 8 karakter")
        }),
        onReset: () => {
            formik.setFieldValue("user", "")
            formik.setFieldValue("password", "")
        }
    })

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }

    const handleLoading = () => (<span className="loading loading-spinner loading-md"></span>)
    return (
        <div className='flex flex-col w-full h-fit max-w-96 items-center gap-4'>
            <form className="flex flex-col items-center w-full gap-4 bg-white p-8 rounded-lg" onSubmit={formik.handleSubmit} method="POST">
                <label className="font-bold text-2xl text-success">Login</label>
                <InputForm
                    name="user"
                    title="Email / Nomor Hp"
                    className="w-full"
                    type="text"
                    placeholder="Email atau Nomor HP"
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
                <Button className={`btn-success bg-[#008c6e] text-white w-full rounded-full ${isLoading ? "btn-disabled" : ""}`} type="submit">{isLoading ? handleLoading() : "Login"}</Button>
            </form>
            <span className='text-white font-medium text-lg'>Don't have an account yet?</span>
            <Link className="btn w-full rounded-full bg-white font-semibold text-success cursor-pointer hover:text-[#006a45]" href="/register">Register</Link>
        </div>
    )
}

export default FormLogin