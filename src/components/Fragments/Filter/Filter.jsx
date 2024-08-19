import DropdownFilter from "@/components/Elements/Dropdown/DropdownFilter"
import {CiFilter} from "react-icons/ci"

const Filter = () => {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
        <div className="btn bg-success m-1" tabIndex={0} role="button">
            <CiFilter className=" text-white text-2xl"/>
            <h1 className="hidden md:block text-lg text-white">Filter</h1>
        </div>
        <div className="dropdown-content menu bg-white rounded-box gap-3 w-52 z-[1] mt-3 p-2 shadow-md"
        tabIndex={0}
        >
            <DropdownFilter text="Terdekat"/>
            <DropdownFilter text="Harga Termurah "/>
            <DropdownFilter text="Harga Tertinggi"/>
        </div>
    </div>
  )
}

export default Filter