import Button from "@/components/Elements/Button"
import InputForm from "../../Elements/Input"
import { useFormik } from "formik"
import { useCheckOut } from "@/features/order"
import { useOrderStore } from "@/store/orderStore"

const FormPembayaran = ({ onClick = () => { } }) => {
    const [date, jam] = useOrderStore((state) => [state.date, state.jam])
    const formik = useFormik({
        initialValues: {
            date: date,
            jam: jam
        },
        onSubmit: async () => {
            event.preventDefault()
            try {
                OrderLapangan(state, formik.values)
                // window.location.reload
            } catch (error) {
                console.error(error);
            }
        }
    })

    const { mutate: OrderLapangan } = useCheckOut({ onSuccess: () => window.location.reload() })

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }


    return (
        <form className="flex flex-col gap-y-4" action="#" method="post" onSubmit={formik.handleSubmit}>
            <InputForm
                name="date"
                title="Email"
                className="w-[16rem]"
                type="text"
                placeholder="Email"
                required={true}
                value={formik.values.date}
                onChange={handleFormInput}
            />
            <p className="font-bold">Pilih Jam</p>
            <div className="flex gap-4 flex-wrap">
                {
                    formik.values.jam.map((item, i) => (
                        <div key={item.id} className="btn btn-outline btn-disabled w-fit">
                            <label htmlFor="">{item.open}</label>
                            <label htmlFor="">{item.close}</label>
                        </div>
                    ))
                }
            </div>
            <div className="inline-flex gap-4 justify-center w-full">
                <Button className="btn-error " onClick={onClick}>Cancel</Button>
                <Button className="btn-success" type="submit">Order Sekarang</Button>
            </div>
        </form>
    )
}

export default FormPembayaran