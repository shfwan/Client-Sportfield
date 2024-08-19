import LogoIcon from '@/assets/icon/png/LogoIcon.png'
import { Search } from 'react-feather'

const Dashboard = () => {
  return (
    <section className="flex flex-col mb-5 h-fit py-5 bg-success w-full rounded-lg shadow-md">
        <div className="p-4">
            <div className="flex justify-around text-center items-center">
                <div className="hidden lg:block place-items-center items-center justify-center">
                    <img
                    src={LogoIcon}
                    className='img-shadow relative w-72'
                    />
                </div>

                <div className='flex-row font-poppins justify-start text-start'>
                    <div className='text-white flex-row  '>
                        <h1 className='text-2xl'>Selamat Datang di 
                            <strong> Sportfields!</strong>
                        </h1>
                        <p className='hidden sm:block text-lg'>
                            Mari Olahraga Bersama Orang Terdekatmu.
                        </p>
                    </div>
                    <div className='flex items-center justify-between bg-white xl:w-[32rem] sm:w-[24rem] mt-3 px-3 py-2 text-xl rounded-md shadow shadow-black/20 border border-white'>
                        <input
                        type='text'
                        placeholder='Search'
                        className='text-black bg-white w-full outline-none text-lg'
                        />
                        <div className='bg-success p-2 text-2xl text-white rounded-md hover:bg-success/20'>
                            <Search/>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </section>
  )
}

export default Dashboard