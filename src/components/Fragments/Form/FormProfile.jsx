import InputForm from '@/components/Elements/Input'
import { useFormik } from 'formik'
import Button from '@/components/Elements/Button'
import ChangePassword from '@/components/Layouts/Profile/ChangePassword'
import { useStorePublic } from '@/store/storePublic'
import { useMutation } from '@tanstack/react-query'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { toast } from 'react-toastify'
const FormProfile = ({ state }) => {
    const { isDisable, setDisable } = useStorePublic()

    const axiosAuth = useAxiosAuth()
    const { mutate: updateUser } = useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.patch(`/api/v2/user/information`, body, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        },
        onSuccess: () => {
            setDisable(!isDisable)
            toast.success("Berhasil Update Profile", { style: { backgroundColor: "#00a96e" } })
        }
    })

    const formik = useFormik({
        initialValues: {
            firstname: state?.fullname.split(" ")[0] || "",
            lastname: state?.fullname.split(" ")[state.fullname.split(" ").length - 1] || "",
            email: state?.email || "",
            phone: state?.phone || "",
        },
        onSubmit: async (values) => {
            try {
                updateUser(values)
            } catch (error) {
                console.error(error);
            }
        }
    })

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }


    return (
        <div className='block w-full space-y-4'>
            <form className='w-full px-4 md:px-0 max-w-2xl' action='' method='patch'>
                <InputForm
                    title="First Name"
                    name="firstname"
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                    value={formik.values.firstname}
                    onChange={handleFormInput}
                    disabled={!isDisable}
                />
                <InputForm
                    title="Last Name"
                    name="lastname"
                    label="Last Name"
                    type="text"
                    placeholder="Last Name"
                    value={formik.values.lastname}
                    onChange={handleFormInput}
                    disabled={!isDisable}
                />
                <InputForm
                    title="Phone"
                    name="phone"
                    label="Phone"
                    type="text"
                    placeholder="Phone"
                    value={formik.values.phone}
                    onChange={handleFormInput}
                    disabled={!isDisable}
                />
                <InputForm
                    title="Email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={handleFormInput}
                    disabled={!isDisable}
                />
                <div className='inline-flex gap-4 mt-3'>
                    <Button className={`text-white w-full ${isDisable ? "flex" : "hidden"} btn btn-info`} onClick={() => formik.handleSubmit()}>Save</Button>
                    <Button className={`text-white ${isDisable ? "hidden" : "visible"} btn btn-warning`} onClick={() => setDisable(!isDisable)}>Edit Profile</Button>
                </div>
            </form>
            <ChangePassword />
        </div>
    )
}

export default FormProfile