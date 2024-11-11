import Button from '@/components/Elements/Button'
import InputForm from '@/components/Elements/Input'
import Textarea from '@/components/Elements/Textarea'
import { usePostLapangan, useUpdateLapangan } from '@/features/lapangan'
import { useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'

const FormLapangan = ({ data, onClick, type = "create" }) => {
    const queryClient = useQueryClient()

    const { mutate: createLapangan } = usePostLapangan({

        onSuccess: (res) => {
            localStorage.setItem("aWQ=", res.data.data.id)
            queryClient.invalidateQueries('fetch.detailLapangan')
            document.getElementById("lapanganCreate").close()
            window.location.reload()
        }
    })

    const { mutate: updateLapangan } = useUpdateLapangan({

        onSuccess: () => {
            document.getElementById("lapanganUpdate").close()
            queryClient.invalidateQueries('fetch.detailLapangan')
            toast.success("Berhasil Perbarui Lapangan", { style: { backgroundColor: "#00a96e" } })

        }
    })

    const formik = useFormik({
        initialValues: {
            name: data?.name || "",
            picture: data?.picture || "",
            description: data?.description || "",
            alamat: data?.alamat || "",
            mapUrl: data?.mapUrl || "",
            open: data?.open || "",
            close: data?.close || ""
        },

        onSubmit: async (value) => {
            event.preventDefault()

            if (type === "create") {

                createLapangan({
                    name: value.name,
                    picture: value.picture,
                    description: value.description,
                    alamat: value.alamat,
                    mapUrl: value.mapUrl,
                    open: value.open,
                    close: value.close,
                })
            } else if (type === "update") {
                updateLapangan({
                    id: data.id,
                    data: value
                })
            }
        }
    })

    const handleFormikInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }

    const handleFormikFile = (event) => {
        const formdata = new FormData()

        formdata.append("file", event.target.files[0])
        formik.setFieldValue(event.target.name, formdata.get("file"))
    }

    return (
        <form className='w-full h-full' onSubmit={formik.handleSubmit} action="#">
            <div className="flex flex-col gap-4 w-full">
                <InputForm onChange={handleFormikInput} type="text" value={formik.values.name} title="Name" name="name" />
                <input type="file" name="picture" id="" onChange={handleFormikFile} className='file-input w-full max-w-xs' />
                <Textarea name="description" title="Deskripsi" className="" placeholder="Deskripsi lapangan" onChange={handleFormikInput} />
                <InputForm onChange={handleFormikInput} type="text" value={formik.values.alamat} title="Alamat" name="alamat" />
                <InputForm onChange={handleFormikInput} type="text" value={formik.values.mapUrl} title="URL map" name="mapUrl" />
                <div className='inline-flex gap-2'>
                    <InputForm onChange={handleFormikInput} value={formik.values.open} type="time" title="Open" name="open" />
                    <InputForm onChange={handleFormikInput} value={formik.values.close} type="time" title="Close" name="close" />
                </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row gap-4 mt-5">
                <Button className="text-white btn-error hidden lg:flex btn-wide" type="button" onClick={onClick}>Cancel</Button>
                <Button className={`lg:btn-wide text-white ${type === "update" ? "btn-warning" : "btn-success"}`} type="submit">{type === "update" ? "Ubah" : "Tambah"}</Button>
            </div>
        </form>
    )
}

export default FormLapangan