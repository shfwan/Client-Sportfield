import InputForm from '@/components/Elements/Input'
import { useStoreSportField } from '@/store/store'
import { useFormik } from 'formik'
import Button from '@/components/Elements/Button'
import ChangePassword from '@/components/Layouts/Profile/ChangePassword'
import { useStorePublic } from '@/store/storePublic'
import { useUpdateUser } from '@/features/user'
import { useEffect } from 'react'
const FormProfile = ({ state }) => {
    const { isDisable, setDisable } = useStorePublic()

    // useEffect(() => {}, [state])

    
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
            } catch (error) {
                console.error(error);
            }
        }
    })
    console.log(formik.values);
    

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
                value={formik.values.firstname}
                onChange={handleFormInput}
                disabled={isDisable}
            />
            <InputForm
                title="Last Name"
                name="lastname"
                label="Last Name"
                type="text"
                placeholder="Last Name"
                value={formik.values.lastname}
                onChange={handleFormInput}
                disabled={isDisable}
            />
            <InputForm
                title="Phone"
                name="phone"
                label="Phone"
                type="text"
                placeholder="Phone"
                value={formik.values.phone}
                onChange={handleFormInput}
                disabled={isDisable}
            />
            <InputForm
                title="Email"
                name="email"
                label="Email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={handleFormInput}
                disabled={isDisable}
            />
            <div className='inline-flex gap-4 mt-3'>
                <div className={isDisable ? "hidden" : "visible"}>
                    <Button className={`${isDisable ? "hidden" : "visible"} btn btn-info`} onClick={() => formik.handleSubmit()}>Save</Button>
                </div>
                <Button className={`${!isDisable ? "hidden" : "visible"} btn btn-warning`} onClick={handleClickEdit}>Edit Profile</Button>
                <ChangePassword />
            </div>
        </form>
    )
}

export default FormProfile