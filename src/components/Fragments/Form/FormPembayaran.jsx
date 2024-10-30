import Button from "@/components/Elements/Button"
import { useCheckOut } from "@/features/order"
import { useOrderStore } from "@/store/orderStore"
import { toast } from "react-toastify"
import ListJamLapangan from "../List/Jam/ListJamLapangan"
import ImagePreview from "@/components/Elements/Image"
import { faker } from "@faker-js/faker"
import { ToRupiah } from "@/lib/toRupiah"
import { useSession } from "next-auth/react"
import { jwtDecode } from "jwt-decode"
import { useQueryClient } from "@tanstack/react-query"

const FormPembayaran = ({ item, onClick = () => { } }) => {
    const { data: session } = useSession()
    const queryClient = useQueryClient()

    const [date, jam, clearJam] = useOrderStore((state) => [state.date, state.jam, state.clearJam])

    const { mutate: OrderLapangan } = useCheckOut({
        onSuccess: () => {
            document.getElementById("modalPembayaran" + item?.id).close()
            toast.success("Berhasil ditambahkan pemesanan", { style: { backgroundColor: "#00a96e" } })
            clearJam()

            if (session) {
                const token = jwtDecode(session.user.token)
                
                if(token.role === "customer") {
                    window.location.href = "/pemesanan"
                } else if(token.role === "provider") {
                    queryClient.invalidateQueries({ queryKey: ['fetch.order', 'fetch.statistik'] })
                }
            }
        },
        onError: () => {
            document.getElementById("modalPembayaran" + item?.id).close()
            toast.error("Gagal melakukan checkout", { style: { backgroundColor: "#ff5861" } })
            clearJam()

        }
    })


    const handleSubmitForm = () => {
        event.preventDefault()
        const tanggal = new Date()

        if (session) {
            const token = jwtDecode(session.user.token)

            OrderLapangan({ id: item.id, lapanganId: item.lapanganId, data: { date: token.role === "customer" ? date : tanggal.getDate(), jam } })
        }
    }

    return (
        <form className="block space-y-4 min-w-[36rem]" onSubmit={handleSubmitForm}>
            <div className="flex gap-x-4 h-fit">
                <figure className="aspect-auto max-w-72">
                    <ImagePreview className="rounded-md" src={faker.image.url()} />
                </figure>
                <div className="block space-y-4">
                    <h2 className="font-semibold">{item.name}</h2>
                    <h2 className="font-semibold">{item.type}/<label className="font-bold">{item.statusLapangan}</label></h2>
                    <h2 className="font-semibold">{ToRupiah(item.price)}</h2>
                </div>
            </div>
            <div className="block max-w-[36rem]">
                <h3 className="font-bold text-lg">Deskripsi</h3>
                <p className="font-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus temporibus dicta excepturi eaque voluptatibus quod et, nulla ipsum quasi vitae laborum, suscipit provident, aliquam ab libero totam sed beatae quaerat!</p>
            </div>

            <h3 className="font-bold text-lg">Pilih Jam</h3>
            <ListJamLapangan lapangan={item} />
            <div className="inline-flex gap-4 justify-center w-full">
                <Button className="text-white btn-error " onClick={onClick}>Cancel</Button>
                <Button className={jam < 1 ? "btn-disabled" : "btn-success"} type="submit">Order Sekarang</Button>
            </div>
        </form>
    )
}

export default FormPembayaran