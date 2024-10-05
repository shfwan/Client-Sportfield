import Button from '@/components/Elements/Button'
import InputForm from '@/components/Elements/Input'
import { useFormik } from 'formik'
import * as yup from "yup"

const FormUbahPassword = () => {
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validate: yup.object().shape({
            password: yup.string().min(8, "Password minimal 8 karakter"),
            confirmPassword: yup.string().min(8, "Password minimal 8 karakter")
        }),
        onSubmit: () => {
            document.getElementById("changePassword").close()
        }
    })

    const handleFormikInput = (e) => {
        formik.setFieldValue(e.target.name, e.target.value)
    }

    return (
        <form className='block space-y-4' onSubmit={formik.handleSubmit}>
            <InputForm
                name="password"
                title="Password Baru"
                placeholder="Masukkan Password Baru"
                type="password"
                label="PasswordBaru"
                value={formik.values.password}
                onChange={handleFormikInput}
            />
            <InputForm
                name="confirmPassword"
                title="Konfirmasi Password Baru"
                placeholder="Konfirmasi Password Baru"
                type="password"
                label="KonfirmasiPasswordBaru"
                value={formik.values.confirmPassword}
                onChange={handleFormikInput}

            />
            <div className='flex justify-end mr-3 mt-3 gap-x-3'>
                <Button className="btn btn-error" onClick={() => document.getElementById("changePassword").close()}>Batal</Button>
                <Button className="btn btn-info">Simpan</Button>
            </div>
        </form>
    )
}

export default FormUbahPassword