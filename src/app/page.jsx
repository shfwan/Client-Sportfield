"use client"
import Footer from "@/components/Layouts/Footer";
import { Inter } from "next/font/google";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuCalendarDays } from "react-icons/lu";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia"
import { GiSoccerField } from "react-icons/gi";
import { VscNote } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import ImagePreview from "@/components/Elements/Image";
import Button from "@/components/Elements/Button";
import Link from "next/link";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {data} = useSession()
    
  const keunggulan = [
    {
      id: 1,
      icon: <VscNote />,
      title: "Metode Pembayaran yang Aman dan Variatif",
      description: "Kami menyediakan berbagai metode pembayaran yang aman dan nyaman, termasuk transfer bank dan e-wallet. Transaksi Anda dijamin aman!."
    },
    {
      id: 2,
      icon: <IoCartOutline />,
      title: "Proses Booking Super Cepat",
      description: "Dengan antarmuka yang sederhana dan mudah digunakan, Anda bisa memesan lapangan dalam hitungan detik. Tanpa ribet, tanpa antri!"
    },
    {
      id: 3,
      icon: <LiaMoneyBillWaveAltSolid />,
      title: "Harga Transparan & Kompetitif",
      description: "Lihat harga secara real-time tanpa biaya tersembunyi. Bandingkan berbagai lapangan dengan harga terbaik yang sesuai anggaran Anda."
    },
    {
      id: 4,
      icon: <IoMdCheckmarkCircleOutline />,
      title: "Konfirmasi Instan",
      description: "Setelah memilih lapangan dan waktu, dapatkan konfirmasi instan melalui email atau notifikasi langsung. Tidak perlu menunggu lama!"
    },
    {
      id: 5,
      icon: <GiSoccerField />,
      title: "Pilihan Lapangan yang Beragam",
      description: "Temukan berbagai jenis lapangan olahraga sesuai kebutuhan Anda. Mulai dari lapangan futsal, basket, bulutangkis, hingga tenis - semua tersedia di satu platform."
    },
    {
      id: 6,
      icon: <LuCalendarDays />,
      title: "Jadwal Fleksibel ",
      description: "Atur Jadwal pemesanan sesuai waktu luang Anda. Cek ketersediaan lapangan secara langsung, dan pilih waktu yang paling nyaman bagi Anda."
    },

  ]
  return (
    <main className='min-h-screen flex flex-col justify-center items-center gap-y-32 no-scrollbar'>

      <header className="max-h-96 bg-success w-full">
        <div className="container mx-auto flex flex-row items-center justify-start max-w-7xl px-24">
          <div className='block space-y-4 text-white'>
            <div className="block space-y-3">
              <h1 className='text-5xl font-extrabold tracking-wide'>Sportfields</h1>
              <p className='hidden sm:block text-2xl'>
                Mari Olahraga Bersama Orang Terdekatmu.
              </p>
            </div>
            <Link href={{ pathname: "/lapangan", query: { page: 1 } }} className='btn btn-white btn-wide rounded-full text-success font-bold text-xl'>Booking Sekarang</Link>
          </div>
          <figure className="max-w-96 translate-y-20 ml-auto">
            <ImagePreview src="/LogoIcon.png" />
          </figure>
        </div>
      </header>

      <div className='container mx-auto px-4  space-y-16 max-w-7xl'>
        <h1 className='text-success font-semibold text-center text-2xl md:text-4xl font-poppins'>Keunggulan Booking di SportFields</h1>
        <div className="items-center flex justify-center  md:w-full h-full p-2">
          <div className='gap-8 grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 '>
            {
              keunggulan.map((item, index) => (
                <div className="card bg-base-100 w-full md:w-96 h-60 shadow-md" key={index}>
                  <div className="card-body">
                    <h2 className="card-title">{item.title}</h2>
                    <p>{item.description}</p>
                    
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <section className=' bg-success w-full text-white'>
        <div className="mx-auto max-w-4xl p-8 md:p-16 flex flex-col gap-4 items-center">
          <h1 className=' font-semibold text-2xl md:text-4xl font-poppins text-center'>Mengapa  Harus Daftarkan Lapangan Anda  di SportsField?</h1>
          <p className='text-lg md:text-xl max-w-2xl text-center w-full'>
            Anda pemilik lapangan olahraga? Jadikan lapangan Anda lebih dikenal dan mudah diakses oleh ribuan pemain dengan mendaftarkannya di SportFields. Kami hadir untuk membantu Anda mengelola reservasi dengan lebih efisien dan meningkatkan visibilitas lapangan Anda!
          </p>
        </div>
      </section>
      <div className='gap-10 p-8 flex flex-col md:flex-row md:justify-evenly justify-center items-center rounded-md'>
        <figure className='aspect-auto max-w-96'>
          <ImagePreview src="/lapangan1.png" />
        </figure>
        <ul className='md:ml-auto list-disc text-success font-poppins lg:text-xl flex flex-col gap-3 '>
          <li>Jangkauan Pemain Lebih Luas</li>
          <li>Pengelolaan Booking yang Mudah</li>
          <li>Transaksi Aman dan Terjamin</li>
          <li>Pemasaran Tanpa Biaya Tambahan</li>
          <li>Ulasan Pengguna yang Transparan</li>
          <li>Pengaturan Harga yang Fleksibel</li>
        </ul>
      </div>
      <div className='flex flex-col max-w-2xl md:flex-row justify-center items-center gap-4'>
        <h1 className='text-success font-semibold text-xl '>Ingin Daftarkan Lapangan ?</h1>
        <Link href={{ pathname: "/register", query: { t: btoa("provider") } }} className="btn btn-success rounded-full text-xl text-white">Daftarkan Sekarang!</Link>
      </div>
      <Footer />
    </main>
  )
}
