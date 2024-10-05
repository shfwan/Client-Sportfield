import InputForm from '@/components/Elements/Input'
import { useFormik } from 'formik'
import Button from '@/components/Elements/Button'
import ChangePassword from '@/components/Layouts/Profile/ChangePassword'
import { useStorePublic } from '@/store/storePublic'
const FormProfile = ({ state }) => {
    const { isDisable, setDisable } = useStorePublic()

    const handleClickEdit = () => {
        if (isDisable) {
            setDisable(!isDisable)
        }
    }

    const formik = useFormik({
        initialValues: {
            firstname: state?.fullname.split(" ")[0],
            lastname: state?.fullname.split(" ")[state.fullname.split(" ").length - 1],
            email: state?.email,
            phone: state?.phone,
        },
        onSubmit: async () => {
            try {
                // const {isSuccess} = await useUpdateUser(formik.values)
                // if(isSuccess) setDisable(!isDisable)
                setDisable(!isDisable)
            } catch (error) {
                console.error(error);
            }
        }
    })

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }


    return (
        <form className='w-full px-4 md:px-0' action=''>
            <InputForm
                title="First Name"
                name="firstname"
                label="First Name"
                type="text"
                placeholder="First Name"
                value={state?.fullname.split(" ")[0] || formik.values.firstname}
                onChange={handleFormInput}
                disabled={!isDisable}
            />
            <InputForm
                title="Last Name"
                name="lastname"
                label="Last Name"
                type="text"
                placeholder="Last Name"
                value={state?.fullname.split(" ")[state.fullname.split(" ").length - 1] || formik.values.lastname}
                onChange={handleFormInput}
                disabled={!isDisable}
            />
            <InputForm
                title="Phone"
                name="phone"
                label="Phone"
                type="text"
                placeholder="Phone"
                value={state?.phone || formik.values.phone}
                onChange={handleFormInput}
                disabled={!isDisable}
            />
            <InputForm
                title="Email"
                name="email"
                label="Email"
                type="email"
                placeholder="Email"
                value={state?.email || formik.values.email}
                onChange={handleFormInput}
                disabled={!isDisable}
            />
            <div className='inline-flex gap-4 mt-3'>
                <Button className={`${isDisable ? "flex" : "hidden"} btn btn-info`} onClick={() => formik.handleSubmit()}>Save</Button>
                <Button className={`${isDisable ? "hidden" : "visible"} btn btn-warning`} onClick={() => setDisable(!isDisable)}>Edit Profile</Button>
                <ChangePassword />
            </div>
        </form>
    )
}

export default FormProfile