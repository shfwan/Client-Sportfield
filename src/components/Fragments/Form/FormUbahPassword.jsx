import Button from '@/components/Elements/Button'
import InputForm from '@/components/Elements/Input'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { signOut } from 'next-auth/react'
import { toast } from 'react-toastify'
import * as yup from "yup"

const FormUbahPassword = () => {
    const axiosAuth = useAxiosAuth()
    const { mutate: updatePassword } = useMutation({
        mutationFn: async (body) => {

            return await axiosAuth.patch(`/api/v2/user/password`, body)
        },
        onSuccess: () => {
            document.getElementById("changePassword").close()
            toast.success("Berhasil Ubah Password", { style: { backgroundColor: "#00a96e" } })
            signOut()

        }
    })

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validationSchema: yup.object().shape({
            password: yup.string().min(8, "Password minimal 8 karakter"),
            confirmPassword: yup.string().min(8, "Password minimal 8 karakter").oneOf([yup.ref("password"), null], "Password tidak sama"),
        }),
        onSubmit: (value) => {
            event.preventDefault()
            updatePassword(value)
        }
    })

    const handleFormikInput = (e) => {
        formik.setFieldValue(e.target.name, e.target.value)
    }

    return (
        <form className='block space-y-4' onSubmit={formik.handleSubmit} action="#" method='patch'>
            <InputForm
                name="password"
                title="Password Baru"
                placeholder="Masukkan Password Baru"
                type="password"
                label="PasswordBaru"
                value={formik.values.password}
                onChange={handleFormikInput}
                isInvalid={formik.errors.password}
            />
            <InputForm
                name="confirmPassword"
                title="Konfirmasi Password Baru"
                placeholder="Konfirmasi Password Baru"
                type="password"
                label="KonfirmasiPasswordBaru"
                value={formik.values.confirmPassword}
                onChange={handleFormikInput}
                isInvalid={formik.errors.confirmPassword}

            />
            <div className='flex justify-end mr-3 mt-3 gap-x-3'>
                <Button className="text-white btn btn-error" onClick={() => document.getElementById("changePassword").close()}>Batal</Button>
                <Button type="submit" className="text-white btn btn-info">Simpan</Button>
            </div>
        </form>
    )
}

export default FormUbahPassword