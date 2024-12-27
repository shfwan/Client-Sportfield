import Button from "@/components/Elements/Button"
import { useCheckOut } from "@/features/order"
import { useOrderStore } from "@/store/orderStore"
import { toast } from "react-toastify"
import ListJamLapangan from "../List/Jam/ListJamLapangan"
import { useSession } from "next-auth/react"
import { jwtDecode } from "jwt-decode"
import { useQueryClient } from "@tanstack/react-query"
import { TbBuildingCottage } from "react-icons/tb"
import { GiShuttlecock } from "react-icons/gi"

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

                if (token.role === "customer") {
                    window.location.href = "/pemesanan"
                } else if (token.role === "provider") {
                    queryClient.invalidateQueries({queryKey: ['fetch.order']})
                    queryClient.invalidateQueries({queryKey: ['fetch.statistik']})
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

            OrderLapangan({ id: item.id, lapanganId: item.lapanganId, data: { date: token.role === "customer" ? date : tanggal.toLocaleDateString(), jam } })
        }
    }

    return (
        <form className="block space-y-4 min-w-[36rem]" onSubmit={handleSubmitForm}>
            <div className="flex gap-x-4 h-fit">
                <figure className='max-h-72 bg-gray-400'>
                    <img
                        className="max-h-72 min-w-96 max-w-96 rounded-md aspect-video object-cover flex-[1_0_100%]"
                        src={process.env.NEXT_PUBLIC_API + "/api/v1/lapangan/picture/" + item.picture}
                        alt={item.name} />
                </figure>


                <div className="block space-y-4">
                    <h2 className="font-semibold">{item.name}</h2>
                    <span className='inline-flex gap-2 w-full items-center'>
                        <TbBuildingCottage color='#9ca3af' size={20} />
                        <h5 className='text-sm text-gray-400'>{item.statusLapangan}</h5>
                    </span>
                    <span className='inline-flex gap-2 w-full items-center'>
                        <GiShuttlecock color='#9ca3af' size={20} className='-rotate-[140deg] ' />
                        <h5 className='text-sm text-gray-400'>{item.type}</h5>
                    </span>
                    <div className="block max-w-96">
                        <h3 className="font-bold text-lg">Deskripsi</h3>
                        <p className="font-light px-2">{item.description == "" ? "-" : item.description}</p>
                    </div>
                </div>
            </div>

            <h3 className="font-bold text-lg">Pilih Jam</h3>
            <ListJamLapangan lapangan={item} />
            <div className="inline-flex gap-4 justify-center w-full">
                <Button className="text-white btn-error " onClick={onClick}>Cancel</Button>
                <Button className={jam < 1 ? "btn-disabled text-white" : "btn-success text-white"} type="submit">Order Sekarang</Button>
            </div>
        </form>
    )
}

export default FormPembayaran