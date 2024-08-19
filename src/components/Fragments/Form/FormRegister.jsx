"use client"

import { useFormik } from "formik"
import { usePostRegister } from "@/features/auth"
import Button from "@/components/Elements/Button"
import InputForm from "@/components/Elements/Input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Swal from "sweetalert2"
import * as yup from "yup"

const FormRegister = () => {
    const router = useRouter()
    // const { setMsg } = useAppStore()

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: async () => {
            try {
                event.preventDefault()
                await usePostRegister(formik.values).then(() => {
                    router.push("/login")

                }).catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err.response.data.message,
                    })
                })
            } catch (error) {
                console.log(error);
            }
        },
        validationSchema: yup.object().shape({
            firstname: yup.string().min(3, "Firstname must be at least 3 characters"),
            lastname: yup.string().min(3, "Lastname must be at least 3 characters"),
            email: yup.string().email("Email is not valid"),
            phone: yup.string(),
            password: yup.string().min(8, "Password must be at least 8 characters"),
            confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match")
        })
    })

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }

    return (
        <div className='flex flex-col items-center p-4 gap-4'>
            <form className="flex flex-col gap-4 overflow-hidden" onSubmit={formik.handleSubmit} method="post">
                <div className="grid p-2 gap-4 xl:grid-cols-2">
                    <InputForm
                        name="firstname"
                        title="Firstname"
                        className="w-full"
                        type="text"
                        placeholder="Firstname"
                        required={true}
                        onChange={handleFormInput}
                        value={formik.values.firstname}
                        isInvalid={formik.errors.firstname}
                    />
                    <InputForm
                        name="lastname"
                        title="Lastname"
                        className="w-full"
                        type="text"
                        placeholder="lastname"
                        required={true}
                        onChange={handleFormInput}
                        value={formik.values.lastname}
                        isInvalid={formik.errors.lastname}
                    />
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
                        name=""
                        title="Phone Number"
                        className="w-full"
                        type="number"
                        placeholder="Phone Number"
                        required={true}
                        onChange={handleFormInput}
                        value={formik.values.phone}
                        isInvalid={formik.errors.phone}
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
                    <InputForm
                        name="confirmPassword"
                        title="Confirm Password"
                        className="w-full"
                        type="password"
                        placeholder="Confirm Password"
                        required={true}
                        onChange={handleFormInput}
                        value={formik.values.confirmPassword}
                        isInvalid={formik.errors.confirmPassword}
                    />

                </div>
                <Button className="w-full btn-success text-white" type="submit">Daftar</Button>
            </form>
            <span className='text-black'>Already have an account? <Link className="font-semibold text-success cursor-pointer hover:text-[#006a45]" href="/auth/login">Login</Link> </span>
        </div>
    )
}

export default FormRegister